import React from 'react'
import AppRouter from './routes/Router'
import { FeedbackProvider } from './components/ui/FeedbackProvider'

export default function App() {
  return (
    <FeedbackProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <AppRouter />
      </div>
    </FeedbackProvider>
  )
}
