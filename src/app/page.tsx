'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  Logo,
  Menu,
  Phone,
  ChatMessage,
  ChatInput,
  TypingIndicator,
  CrisisModal,
  Sidebar,
  WelcomeScreen,
} from '@/components'
import { Message, Conversation } from '@/types'
import { storage } from '@/lib/storage'
import { generateId } from '@/lib/utils'

export default function Home() {
  // State
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load conversations from storage on mount
  useEffect(() => {
    const savedConversations = storage.getConversations()
    setConversations(savedConversations)

    const currentId = storage.getCurrentChatId()
    if (currentId) {
      const current = savedConversations.find((c) => c.id === currentId)
      if (current) {
        setCurrentConversation(current)
      }
    }

    setIsInitialized(true)
  }, [])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentConversation?.messages])

  // Save conversation to storage
  const saveConversation = useCallback((conversation: Conversation) => {
    storage.saveConversation(conversation)
    setConversations((prev) => {
      const existing = prev.findIndex((c) => c.id === conversation.id)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = conversation
        return updated
      }
      return [conversation, ...prev]
    })
  }, [])

  // Create new conversation
  const createNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: generateId(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setCurrentConversation(newConversation)
    storage.setCurrentChatId(newConversation.id)
    return newConversation
  }, [])

  // Handle sending message
  const handleSendMessage = async (content: string) => {
    let conversation = currentConversation
    if (!conversation) {
      conversation = createNewConversation()
    }

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    // Update conversation with user message
    const updatedConversation: Conversation = {
      ...conversation,
      messages: [...conversation.messages, userMessage],
      title: conversation.messages.length === 0 ? content.slice(0, 50) : conversation.title,
      updatedAt: new Date(),
    }

    setCurrentConversation(updatedConversation)
    saveConversation(updatedConversation)
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedConversation.messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      }

      const finalConversation: Conversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, assistantMessage],
        updatedAt: new Date(),
      }

      setCurrentConversation(finalConversation)
      saveConversation(finalConversation)
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content:
          "I'm sorry, I'm having trouble connecting right now. Please try again in a moment. If you're in crisis, please use the crisis resources button.",
        timestamp: new Date(),
      }

      const errorConversation: Conversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, errorMessage],
        updatedAt: new Date(),
      }

      setCurrentConversation(errorConversation)
      saveConversation(errorConversation)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle selecting a conversation
  const handleSelectConversation = (id: string) => {
    const conversation = conversations.find((c) => c.id === id)
    if (conversation) {
      setCurrentConversation(conversation)
      storage.setCurrentChatId(id)
    }
  }

  // Handle deleting a conversation
  const handleDeleteConversation = (id: string) => {
    storage.deleteConversation(id)
    setConversations((prev) => prev.filter((c) => c.id !== id))
    if (currentConversation?.id === id) {
      setCurrentConversation(null)
      storage.setCurrentChatId(null)
    }
  }

  // Handle new conversation
  const handleNewConversation = () => {
    setCurrentConversation(null)
    storage.setCurrentChatId(null)
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse">
          <Logo className="w-16 h-16" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        conversations={conversations}
        currentConversationId={currentConversation?.id || null}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
        onOpenCrisis={() => setIsCrisisModalOpen(true)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen max-w-4xl mx-auto w-full">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <Logo className="w-8 h-8" />
                <span className="font-bold text-lg gradient-text hidden sm:inline">MindfulU</span>
              </div>
            </div>
            <button
              onClick={() => setIsCrisisModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-rose-600 bg-rose-50 dark:bg-rose-900/20 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Crisis Help</span>
            </button>
          </div>
        </header>

        {/* Chat area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {!currentConversation || currentConversation.messages.length === 0 ? (
            <WelcomeScreen onSelectPrompt={handleSendMessage} />
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentConversation.messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isLatest={index === currentConversation.messages.length - 1}
                />
              ))}
              <AnimatePresence>
                {isLoading && <TypingIndicator />}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input */}
          <ChatInput
            onSend={handleSendMessage}
            isLoading={isLoading}
          />

          {/* Disclaimer */}
          <div className="px-4 pb-3">
            <p className="text-[10px] text-center text-muted-foreground">
              MindfulU is an AI companion and not a substitute for professional mental health care.
              If you're in crisis, please contact emergency services or use the crisis resources.
            </p>
          </div>
        </main>
      </div>

      {/* Crisis Modal */}
      <CrisisModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
      />
    </div>
  )
}
