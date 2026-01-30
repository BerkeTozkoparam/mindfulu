'use client'

import { motion } from 'framer-motion'
import { Logo } from './Icons'

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
        <Logo className="w-5 h-5" />
      </div>
      <div className="bg-card border border-border shadow-sm rounded-2xl rounded-tl-md px-4 py-3">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-emerald-500 rounded-full typing-dot" />
          <div className="w-2 h-2 bg-emerald-500 rounded-full typing-dot" />
          <div className="w-2 h-2 bg-emerald-500 rounded-full typing-dot" />
        </div>
      </div>
    </motion.div>
  )
}
