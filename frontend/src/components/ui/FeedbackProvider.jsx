import React from 'react'
import { Alert, Snackbar } from '@mui/material'

const FeedbackContext = React.createContext({ showToast: () => {} })

export function FeedbackProvider({ children }) {
  const [toast, setToast] = React.useState({ open: false, message: '', severity: 'success' })

  const showToast = React.useCallback((message, severity = 'success') => {
    setToast({ open: true, message, severity })
  }, [])

  const closeToast = React.useCallback(() => {
    setToast(current => ({ ...current, open: false }))
  }, [])

  return (
    <FeedbackContext.Provider value={{ showToast }}>
      {children}
      <Snackbar open={toast.open} autoHideDuration={2600} onClose={closeToast} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={closeToast} severity={toast.severity} variant="filled" sx={{ width: '100%', borderRadius: 3 }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </FeedbackContext.Provider>
  )
}

export function useToast() {
  return React.useContext(FeedbackContext)
}