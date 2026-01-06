import { useState } from 'react'
import { ThemeToggle } from '../ui/ThemeToggle'
import { useOnlineStatus } from '../../hooks/useOnlineStatus'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const isOnline = useOnlineStatus()

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
        aria-label="Menú"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-50 dark:bg-opacity-75" onClick={() => setIsOpen(false)}>
          <div
            className="fixed right-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menú</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <nav className="p-4 space-y-2">
              <div className="flex items-center gap-2 p-2 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {isOnline ? 'En línea' : 'Offline'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg">
                <span className="text-sm text-gray-700 dark:text-gray-300">Tema</span>
                <ThemeToggle />
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
