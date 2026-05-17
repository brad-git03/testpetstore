import React from 'react'
import AppRouter from './routes/Router'
import { FeedbackProvider } from './components/ui/FeedbackProvider'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
    button: { textTransform: 'none', fontWeight: 700 }
  },
  palette: {
    primary: { main: '#14b8a6', contrastText: '#ffffff' }, // Teal 500
    secondary: { main: '#fb923c', contrastText: '#ffffff' }, // Orange 400
    background: { default: '#fafaf9', paper: '#ffffff' }
  },
  shape: { borderRadius: 16 }
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <FeedbackProvider>
        <div className="min-h-screen bg-[#fafaf9] text-slate-800">
          <AppRouter />
        </div>
      </FeedbackProvider>
    </ThemeProvider>
  )
}
