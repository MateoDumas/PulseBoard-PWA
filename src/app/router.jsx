import { Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { OfflinePage } from '../features/offline/OfflinePage'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { NotificationsPage } from '../features/notifications/NotificationsPage'

export function AppRouter() {
  console.log('🛣️ AppRouter rendering')
  const location = useLocation()
  console.log('📍 Current location:', location.pathname)
  
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Routes>
      </Suspense>
      <OfflinePage />
    </Layout>
  )
}
