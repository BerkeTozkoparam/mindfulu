'use client'

import {
  Send,
  MessageCircle,
  Heart,
  Sparkles,
  Menu,
  X,
  Plus,
  Trash2,
  ChevronRight,
  Moon,
  Sun,
  Phone,
  AlertCircle,
  CheckCircle,
  Loader2,
  ArrowRight,
  Shield,
  Clock,
  Users,
  Brain,
  Leaf,
  MessagesSquare,
  Settings,
  LogOut,
  History,
  HelpCircle,
  ExternalLink,
} from 'lucide-react'

export {
  Send,
  MessageCircle,
  Heart,
  Sparkles,
  Menu,
  X,
  Plus,
  Trash2,
  ChevronRight,
  Moon,
  Sun,
  Phone,
  AlertCircle,
  CheckCircle,
  Loader2,
  ArrowRight,
  Shield,
  Clock,
  Users,
  Brain,
  Leaf,
  MessagesSquare,
  Settings,
  LogOut,
  History,
  HelpCircle,
  ExternalLink,
}

export function Logo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="url(#gradient)" />
      <path
        d="M20 12C16.5 12 13.5 14.5 13 18C12.5 21.5 14.5 24.5 17.5 26L18 30H22L22.5 26C25.5 24.5 27.5 21.5 27 18C26.5 14.5 23.5 12 20 12Z"
        fill="white"
        fillOpacity="0.9"
      />
      <circle cx="17" cy="18" r="1.5" fill="currentColor" className="text-emerald-600" />
      <circle cx="23" cy="18" r="1.5" fill="currentColor" className="text-emerald-600" />
      <path
        d="M17 22C17 22 18.5 24 20 24C21.5 24 23 22 23 22"
        stroke="currentColor"
        className="text-emerald-600"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="gradient" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#059669" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg>
  )
}
