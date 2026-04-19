import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()

const port = Number(process.env.PORT ?? 8787)
const apiKey = process.env.LLM_API_KEY ?? ''
const configuredModel = process.env.LLM_MODEL ?? 'meta-llama/Llama-3.1-8B-Instruct'
const apiBaseUrl = (process.env.LLM_API_BASE_URL ?? 'https://llm.karunya.ai').replace(/\/+$/, '')
const configuredChatEndpoint = process.env.LLM_CHAT_ENDPOINT ?? '/v1/chat/completions'
const systemPrompt =
  process.env.SYSTEM_PROMPT ??
  'You are a concise and practical code assistant. Provide correct, implementation-focused help.'
const formattingPrompt = `
Format all replies in clean GitHub-flavored Markdown:
- Use short sections and bullet points when helpful.
- Use fenced code blocks with language tags for any code.
- Keep explanations concise and readable.
`.trim()

app.use(express.json({ limit: '1mb' }))

function normalizeChatEndpoints(endpoint) {
  const fallbackEndpoints = ['/v1/chat/completions', '/api/chat/completions']
  const endpoints = [endpoint, ...fallbackEndpoints]
    .map((value) => (typeof value === 'string' ? value.trim() : ''))
    .filter((value) => value.length > 0)
    .map((value) => (value.startsWith('/') ? value : `/${value}`))

  return [...new Set(endpoints)]
}

function normalizeModel(value) {
  const raw = typeof value === 'string' ? value.trim() : ''
  const normalized = raw.toLowerCase()

  if (
    normalized === 'llama-3.1-8b-instruct' ||
    normalized === 'llama-3.1-8b-instrucut' ||
    normalized === 'meta-llama/llama-3.1-8b-instruct'
  ) {
    return 'meta-llama/Llama-3.1-8B-Instruct'
  }

  return raw || 'meta-llama/Llama-3.1-8B-Instruct'
}

const model = normalizeModel(configuredModel)

function normalizeMessages(messages) {
  if (!Array.isArray(messages)) {
    return []
  }

  return messages
    .filter((message) => message && typeof message.text === 'string' && typeof message.sender === 'string')
    .map((message) => ({
      role: message.sender === 'user' ? 'user' : 'assistant',
      content: message.text.trim(),
    }))
    .filter((message) => message.content.length > 0)
    .slice(-20)
}

function extractReply(payload) {
  const choice = payload?.choices?.[0]

  if (typeof choice?.message?.content === 'string') {
    return choice.message.content.trim()
  }

  if (Array.isArray(choice?.message?.content)) {
    const joined = choice.message.content
      .map((part) => (typeof part?.text === 'string' ? part.text : ''))
      .join('')
      .trim()
    if (joined) {
      return joined
    }
  }

  if (typeof choice?.text === 'string') {
    return choice.text.trim()
  }

  if (typeof payload?.message?.content === 'string') {
    return payload.message.content.trim()
  }

  return ''
}

app.get('/api/health', (_, res) => {
  res.json({
    status: 'ok',
    configured: Boolean(apiKey),
    model,
  })
})

app.post('/api/chat', async (req, res) => {
  if (!apiKey) {
    return res.status(500).json({
      error: 'Missing LLM_API_KEY. Add it to your .env file.',
    })
  }

  const messages = normalizeMessages(req.body?.messages)
  if (messages.length === 0) {
    return res.status(400).json({
      error: 'At least one user message is required.',
    })
  }

  try {
    const chatEndpoints = normalizeChatEndpoints(configuredChatEndpoint)
    let upstreamResponse = null
    let payload = null

    for (const endpoint of chatEndpoints) {
      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          stream: false,
          temperature: 0.4,
          messages: [{ role: 'system', content: `${systemPrompt}\n\n${formattingPrompt}` }, ...messages],
        }),
      })

      const body = await response.json().catch(() => null)

      if (response.status === 404) {
        upstreamResponse = response
        payload = body
        continue
      }

      upstreamResponse = response
      payload = body
      break
    }

    if (!upstreamResponse) {
      return res.status(502).json({
        error: 'Unable to connect to the configured LLM endpoint.',
      })
    }

    if (!upstreamResponse.ok) {
      const upstreamMessage =
        (typeof payload?.error === 'string' && payload.error) ||
        (typeof payload?.error?.message === 'string' && payload.error.message) ||
        `Upstream LLM call failed (${upstreamResponse.status}).`

      return res.status(upstreamResponse.status).json({ error: upstreamMessage })
    }

    const reply = extractReply(payload)
    if (!reply) {
      return res.status(502).json({
        error: 'The model returned an empty response.',
      })
    }

    return res.json({ reply })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected backend error.'
    return res.status(500).json({ error: message })
  }
})

app.listen(port, () => {
  console.log(`Chat backend running on http://127.0.0.1:${port}`)
})
