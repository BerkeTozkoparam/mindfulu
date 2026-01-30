import { Conversation, Message } from '@/types'

const STORAGE_KEY = 'mindfulu_conversations'
const CURRENT_CHAT_KEY = 'mindfulu_current_chat'

export const storage = {
  getConversations: (): Conversation[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    try {
      const conversations = JSON.parse(data)
      return conversations.map((c: Conversation) => ({
        ...c,
        createdAt: new Date(c.createdAt),
        updatedAt: new Date(c.updatedAt),
        messages: c.messages.map((m: Message) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })),
      }))
    } catch {
      return []
    }
  },

  saveConversation: (conversation: Conversation): void => {
    if (typeof window === 'undefined') return
    const conversations = storage.getConversations()
    const existingIndex = conversations.findIndex((c) => c.id === conversation.id)

    if (existingIndex >= 0) {
      conversations[existingIndex] = conversation
    } else {
      conversations.unshift(conversation)
    }

    // Keep only last 50 conversations
    const trimmed = conversations.slice(0, 50)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
  },

  deleteConversation: (id: string): void => {
    if (typeof window === 'undefined') return
    const conversations = storage.getConversations()
    const filtered = conversations.filter((c) => c.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  },

  getCurrentChatId: (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(CURRENT_CHAT_KEY)
  },

  setCurrentChatId: (id: string | null): void => {
    if (typeof window === 'undefined') return
    if (id) {
      localStorage.setItem(CURRENT_CHAT_KEY, id)
    } else {
      localStorage.removeItem(CURRENT_CHAT_KEY)
    }
  },

  clearAll: (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(CURRENT_CHAT_KEY)
  },
}
