import fs from 'node:fs'
import { execSync } from 'node:child_process'

const projectRoot = process.cwd()
const ports = [5173, 8787]

function run(command) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim()
  } catch {
    return ''
  }
}

function getPidsForPort(port) {
  const output = run(`lsof -t -iTCP:${port} -sTCP:LISTEN`)
  if (!output) {
    return []
  }

  return output
    .split('\n')
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isInteger(value) && value > 0)
}

function getProcessInfo(pid) {
  const command = run(`ps -p ${pid} -o command=`)
  let cwd = ''

  try {
    cwd = fs.readlinkSync(`/proc/${pid}/cwd`)
  } catch {
    cwd = ''
  }

  return { command, cwd }
}

function belongsToProject(processInfo) {
  return processInfo.cwd === projectRoot || processInfo.cwd.startsWith(`${projectRoot}/`)
}

function isAlive(pid) {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const blocked = []

for (const port of ports) {
  const pids = [...new Set(getPidsForPort(port))]

  for (const pid of pids) {
    const processInfo = getProcessInfo(pid)
    if (!belongsToProject(processInfo)) {
      blocked.push({ port, pid, command: processInfo.command || 'unknown' })
      continue
    }

    try {
      process.kill(pid, 'SIGTERM')
      for (let i = 0; i < 10; i += 1) {
        if (!isAlive(pid)) {
          break
        }
        await sleep(100)
      }
      if (isAlive(pid)) {
        process.kill(pid, 'SIGKILL')
      }
      console.log(`Stopped existing local process on port ${port} (pid ${pid})`)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error(`Failed to stop pid ${pid} on port ${port}: ${message}`)
      process.exit(1)
    }
  }
}

if (blocked.length > 0) {
  console.error('Cannot start dev stack: required port is used by another project/process.')
  for (const item of blocked) {
    console.error(`- port ${item.port}, pid ${item.pid}, command: ${item.command}`)
  }
  process.exit(1)
}
