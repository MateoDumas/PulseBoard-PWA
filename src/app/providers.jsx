import { BrowserRouter } from 'react-router-dom'

export function AppProviders({ children }) {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {children}
    </BrowserRouter>
  )
}
