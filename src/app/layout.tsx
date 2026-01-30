import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'MindfulU - AI Mental Health Support for Students',
    template: '%s | MindfulU',
  },
  description:
    'MindfulU is your compassionate AI companion for student mental health. Get support for academic stress, anxiety, loneliness, and more. Available 24/7.',
  keywords: [
    'student mental health',
    'AI therapy',
    'college counseling',
    'academic stress',
    'anxiety support',
    'student wellbeing',
    'mental health app',
    'therapy chatbot',
  ],
  authors: [{ name: 'MindfulU' }],
  creator: 'MindfulU',
  publisher: 'MindfulU',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mindfulu.app',
    siteName: 'MindfulU',
    title: 'MindfulU - AI Mental Health Support for Students',
    description:
      'Your compassionate AI companion for student mental health. Get support for academic stress, anxiety, loneliness, and more.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MindfulU - Student Mental Health Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindfulU - AI Mental Health Support for Students',
    description:
      'Your compassionate AI companion for student mental health. Available 24/7.',
    images: ['/og-image.png'],
    creator: '@mindfulu',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
