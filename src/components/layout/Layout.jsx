import { useOnlineStatus } from '../../hooks/useOnlineStatus'
import { Navbar } from './Navbar'
import { ToastContainer } from '../ui/ToastContainer'

export function Layout({ children }) {
  const isOnline = useOnlineStatus()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Online/Offline Banner */}
      {!isOnline && (
        <div className="bg-red-500 text-white px-4 py-2 text-center text-sm font-medium">
          🔴 Sin conexión - Modo offline
        </div>
      )}

      <Navbar />
      <ToastContainer />

      <main className="pb-8 px-4 pt-6">
        {children}
      </main>
    </div>
  )
}
