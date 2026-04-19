import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const appendAssistantMessage = (text: string) => {
    const aiMessage: Message = {
      id: (Date.now() + Math.floor(Math.random() * 1000)).toString(),
      text,
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmedInput,
      sender: 'user',
      timestamp: new Date(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage =
          (typeof payload?.error === 'string' && payload.error) ||
          `AI request failed (${response.status}).`;
        throw new Error(errorMessage);
      }

      const reply = typeof payload?.reply === 'string' ? payload.reply.trim() : '';
      if (!reply) {
        throw new Error('The model returned an empty response.');
      }

      appendAssistantMessage(reply);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unexpected chat error.';
      appendAssistantMessage(`Sorry, I couldn't process that request. ${errorMessage}`);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${
              message.sender === 'ai' ? 'bg-[#444654]' : 'bg-[#343541]'
            } border-b border-white/10`}
          >
            <div className="max-w-3xl mx-auto px-4 py-6 flex gap-6">
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center ${
                  message.sender === 'ai'
                    ? 'bg-[#10a37f] text-white'
                    : 'bg-[#5436DA] text-white'
                }`}
              >
                {message.sender === 'ai' ? (
                  <Bot size={18} />
                ) : (
                  <User size={18} />
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1 space-y-2">
                <div className="text-sm text-gray-100 leading-relaxed break-words">
                  {message.sender === 'ai' ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
                        li: ({ children }) => <li>{children}</li>,
                        h1: ({ children }) => (
                          <h1 className="text-base font-semibold mt-4 mb-2 first:mt-0">{children}</h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-base font-semibold mt-4 mb-2 first:mt-0">{children}</h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-sm font-semibold mt-3 mb-2 first:mt-0">{children}</h3>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-2 border-white/30 pl-3 italic text-gray-300 mb-3">
                            {children}
                          </blockquote>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#10a37f] underline hover:text-[#1bc59a]"
                          >
                            {children}
                          </a>
                        ),
                        pre: ({ children }) => (
                          <pre className="bg-black/40 rounded-md p-3 mb-3 overflow-x-auto">{children}</pre>
                        ),
                        code: ({ className, children, ...props }) => {
                          const isInline = !className;
                          if (isInline) {
                            return (
                              <code
                                className="bg-black/40 rounded px-1 py-0.5 text-xs text-green-200"
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          }
                          return (
                            <code
                              className={`${className} block whitespace-pre text-xs leading-relaxed text-green-200`}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  ) : (
                    <div className="whitespace-pre-wrap">{message.text}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="bg-[#444654] border-b border-white/10">
            <div className="max-w-3xl mx-auto px-4 py-6 flex gap-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-[#10a37f] flex items-center justify-center text-white">
                <Bot size={18} />
              </div>
              <div className="flex-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 bg-[#343541]">
        <div className="max-w-3xl mx-auto p-4">
          <div className="relative flex items-center bg-[#40414f] rounded-lg shadow-lg">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Send a message..."
              rows={1}
              className="flex-1 bg-transparent px-4 py-3 pr-12 resize-none focus:outline-none text-white placeholder-gray-400 text-sm"
              style={{
                maxHeight: '200px',
                minHeight: '44px',
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-2 p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-xs text-center text-gray-500 mt-3">
            AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
}
