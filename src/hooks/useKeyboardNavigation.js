import { useEffect } from 'react'

export function useKeyboardNavigation(handler, deps = []) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      handler(event)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, deps)
}
