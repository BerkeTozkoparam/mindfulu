'use client'

import { motion } from 'framer-motion'
import { Sparkles, Brain, Heart, Clock, Shield, Users } from './Icons'
import { Logo } from './Icons'

interface WelcomeScreenProps {
  onSelectPrompt: (prompt: string) => void
}

const suggestions = [
  "I'm feeling stressed about my exams",
  "I'm having trouble sleeping lately",
  "I feel lonely at college",
  "I'm struggling with motivation",
  "I'm overwhelmed with assignments",
  "I need help managing anxiety",
]

const features = [
  {
    icon: Heart,
    title: 'Empathetic Support',
    description: 'A caring companion who listens without judgment',
  },
  {
    icon: Clock,
    title: 'Available 24/7',
    description: 'Get support whenever you need it, day or night',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    description: 'Your conversations stay confidential',
  },
]

export function WelcomeScreen({ onSelectPrompt }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center px-4 py-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        {/* Logo and title */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Logo className="w-12 h-12" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome to <span className="gradient-text">MindfulU</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Your compassionate AI companion for student wellbeing
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="p-4 bg-card rounded-xl border border-border"
            >
              <feature.icon className="w-8 h-8 text-emerald-600 mb-2 mx-auto" />
              <h3 className="font-semibold text-sm">{feature.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Quick prompts or type your own message below
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectPrompt(suggestion)}
                className="px-4 py-2 bg-card border border-border rounded-full text-sm hover:bg-accent hover:border-emerald-300 hover:text-emerald-700 transition-all"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
