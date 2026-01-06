import { BrowserRouter } from 'react-router-dom'

// Get base path for GitHub Pages
const getBasePath = () => {
  if (window.location.hostname === 'mateodumas.github.io') {
    return '/PulseBoard-PWA'
  }
  return ''
}

export function AppProviders({ children }) {
  const basename = getBasePath()
  console.log('🌐 BrowserRouter basename:', basename)
  
  return (
    <BrowserRouter basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {children}
    </BrowserRouter>
  )
}
