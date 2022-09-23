import { createContext, useContext, useState } from 'react'

import { Alert, Snackbar } from '@mui/material'

const ToastContext = createContext()

export function useToaster() {
  return useContext(ToastContext)
}

export default function Toaster({ children }) {
  const [ toasts, setToasts ] = useState([])

  function addToast(message, severity) {
    const toast = { message, severity }
    console.debug("Add tosat", toast)
    setToasts([ ...toasts, toast ])
  }

  function shift() {
    setToasts(toasts.slice(1))
  }

  return <ToastContext.Provider value={addToast}>
    {children}

    {
      toasts.map(({ message, severity }) =>
        <Snackbar open autoHideDuration={6000} onClose={shift}>
          <Alert onClose={shift} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      )
    }
  </ToastContext.Provider>
}
