import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MindfulU - Student Mental Health Support',
  description: 'A supportive AI companion for student mental health and wellbeing',
  keywords: ['student', 'mental health', 'psychology', 'support', 'wellbeing'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
