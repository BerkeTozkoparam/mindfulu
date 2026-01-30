'use client'

import { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'
import { Message } from '@/types'
import { formatTime, cn } from '@/lib/utils'
import { Logo } from './Icons'

interface ChatMessageProps {
  message: Message
  isLatest?: boolean
}

export const ChatMessage = memo(function ChatMessage({ message, isLatest }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={isLatest ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isUser ? 'bg-emerald-600 text-white' : 'bg-emerald-100'
        )}
      >
        {isUser ? (
          <span className="text-sm font-medium">Y</span>
        ) : (
          <Logo className="w-5 h-5" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3',
          isUser
            ? 'bg-emerald-600 text-white rounded-tr-md'
            : 'bg-card border border-border shadow-sm rounded-tl-md'
        )}
      >
        <div className={cn('prose-chat', isUser && 'text-white')}>
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              strong: ({ children }) => (
                <strong className={cn('font-semibold', isUser && 'text-white')}>
                  {children}
                </strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
              ul: ({ children }) => (
                <ul className="list-disc list-outside ml-4 mb-2 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-outside ml-4 mb-2 space-y-1">{children}</ol>
              ),
              li: ({ children }) => <li>{children}</li>,
              code: ({ children }) => (
                <code
                  className={cn(
                    'px-1.5 py-0.5 rounded text-xs font-mono',
                    isUser ? 'bg-white/20' : 'bg-muted'
                  )}
                >
                  {children}
                </code>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        <p
          className={cn(
            'text-[10px] mt-2',
            isUser ? 'text-emerald-200' : 'text-muted-foreground'
          )}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </motion.div>
  )
})
