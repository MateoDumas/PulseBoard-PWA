import { ThemeToggle } from '../ui/ThemeToggle'
import { useOnlineStatus } from '../../hooks/useOnlineStatus'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const isOnline = useOnlineStatus()

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <MobileMenu />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PulseBoard
            </h1>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Online Status */}
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <div
                className={`w-2 h-2 rounded-full ${
                  isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                }`}
              />
              <span className="text-gray-600 dark:text-gray-400">
                {isOnline ? 'En línea' : 'Offline'}
              </span>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
