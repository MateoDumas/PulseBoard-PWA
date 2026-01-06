import { lazy, Suspense } from 'react'
import { Routes, Route, createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { OfflinePage } from '../features/offline/OfflinePage'

// Lazy load pages for code splitting
const DashboardPage = lazy(() => import('../features/dashboard/DashboardPage').then(module => ({ default: module.DashboardPage })))
const NotificationsPage = lazy(() => import('../features/notifications/NotificationsPage').then(module => ({ default: module.NotificationsPage })))

export function AppRouter() {
  return (
    <Layout>
      <OfflinePage />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <Routes future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
