# MindfulU - Student Mental Health Support

A supportive AI companion designed to help students with their mental health and emotional wellbeing.

## Features

- Empathetic conversations about academic stress, exam anxiety, and more
- Practical coping strategies and study tips
- Beautiful, calming user interface
- Crisis support resources when needed

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root directory:

```
ANTHROPIC_API_KEY=your_api_key_here
```

Get your API key from [Anthropic Console](https://console.anthropic.com/)

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. Add environment variable:
   - `ANTHROPIC_API_KEY`: Your Anthropic API key
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

When prompted, add the `ANTHROPIC_API_KEY` environment variable.

## Tech Stack

- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **Anthropic Claude API** - AI backend
- **TypeScript** - Type safety

## Important Note

MindfulU is an AI companion and not a replacement for professional mental health services. For serious mental health concerns, please contact a qualified professional or crisis helpline.
