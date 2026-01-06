import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { OfflinePage } from '../features/offline/OfflinePage'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { NotificationsPage } from '../features/notifications/NotificationsPage'

export function AppRouter() {
  return (
    <Layout>
      <OfflinePage />
      <Routes future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </Layout>
  )
}
