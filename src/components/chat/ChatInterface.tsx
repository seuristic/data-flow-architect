import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Loader2, User, Bot } from 'lucide-react'
import { useDataFlowStore } from '@/store/useStore'
import { formatTimestamp } from '@/utils'
import type { Message } from '@/types'

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, isLoading, processUserInput } = useDataFlowStore()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && !isLoading) {
      processUserInput(inputValue.trim())
      setInputValue('')
    }
  }

  const renderMessage = (message: Message) => (
    <div
      key={message.id}
      className={`flex ${
        message.type === 'user' ? 'justify-end' : 'justify-start'
      } mb-4`}
    >
      <div
        className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-lg`}
      >
        <div
          className={`flex items-start ${
            message.type === 'user'
              ? 'flex-row-reverse gap-2'
              : 'flex-row gap-2'
          }`}
        >
          <div
            className={`flex-shrink-0 ${
              message.type === 'user' ? 'text-primary' : 'text-gray-400'
            }`}
          >
            {message.type === 'user' ? (
              <User className="w-4 h-4 sm:w-4 sm:h-4" />
            ) : (
              <Bot className="w-4 h-4 sm:w-4 sm:h-4" />
            )}
          </div>
          <div
            className={`flex-1 p-2 sm:p-3 rounded-b-xl w-[calc(100%-24px)] sm:w-[calc(100%-32px)] ${
              message.type === 'user'
                ? 'rounded-tl-xl bg-blue-500 text-white'
                : 'rounded-tr-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
            }`}
          >
            <p className="text-xs sm:text-sm">{message.content}</p>
            <p
              className={`text-xs mt-1 ${
                message.type === 'user'
                  ? 'text-blue-100'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {formatTimestamp(message.timestamp)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !isLoading ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            <p>Start a conversation to configure your data flow</p>
          </div>
        ) : (
          messages.map(renderMessage)
        )}

        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-1 text-sm sm:text-base"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim() || isLoading}
            className="p-2 sm:p-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
