'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, ExternalLink, Heart } from './Icons'

interface CrisisModalProps {
  isOpen: boolean
  onClose: () => void
}

const crisisResources = [
  {
    name: 'National Suicide Prevention Lifeline',
    phone: '988',
    description: 'Free, confidential support 24/7',
    region: 'US',
  },
  {
    name: 'Crisis Text Line',
    phone: 'Text HOME to 741741',
    description: 'Free crisis counseling via text',
    region: 'US',
  },
  {
    name: 'International Association for Suicide Prevention',
    url: 'https://www.iasp.info/resources/Crisis_Centres/',
    description: 'Find crisis centers worldwide',
    region: 'International',
  },
  {
    name: 'IMAlive',
    url: 'https://www.imalive.org',
    description: 'Online crisis chat network',
    region: 'US',
  },
]

export function CrisisModal({ isOpen, onClose }: CrisisModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[10%] md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-card rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Crisis Support</h2>
                    <p className="text-white/80 text-sm">You're not alone. Help is available.</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <p className="text-muted-foreground mb-6">
                If you're experiencing a mental health emergency or having thoughts of self-harm,
                please reach out to one of these resources immediately:
              </p>

              <div className="space-y-4">
                {crisisResources.map((resource) => (
                  <div
                    key={resource.name}
                    className="p-4 bg-muted/50 rounded-xl border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{resource.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                        <span className="inline-block mt-2 text-xs bg-secondary px-2 py-1 rounded-full text-secondary-foreground">
                          {resource.region}
                        </span>
                      </div>
                      {resource.phone ? (
                        <a
                          href={`tel:${resource.phone.replace(/\D/g, '')}`}
                          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          <span className="text-sm font-medium">{resource.phone}</span>
                        </a>
                      ) : (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm font-medium">Visit</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Remember:</strong> MindfulU is an AI companion and not a substitute for
                  professional mental health care. If you're in crisis, please contact a professional
                  or emergency services immediately.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
