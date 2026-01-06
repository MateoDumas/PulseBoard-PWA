import { useEffect, useState } from 'react'
import { pushNotificationService } from '../../services/pushNotifications'

export function NotificationsPage() {
  const [permission, setPermission] = useState('default')
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }

    pushNotificationService.setupNotificationClick()
  }, [])

  const requestPermission = async () => {
    const granted = await pushNotificationService.requestPermission()
    setPermission(granted ? 'granted' : 'denied')
  }

  const testNotification = async () => {
    await pushNotificationService.showNotification('Test Notification', {
      body: 'Esta es una notificación de prueba',
      tag: 'test',
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Notificaciones Push</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Estado de Permisos</h2>
        <p className="text-gray-600 mb-4">
          Estado actual: <span className="font-semibold">{permission}</span>
        </p>

        {permission !== 'granted' && (
          <button
            onClick={requestPermission}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Solicitar Permisos
          </button>
        )}

        {permission === 'granted' && (
          <button
            onClick={testNotification}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 ml-4"
          >
            Probar Notificación
          </button>
        )}
      </div>
    </div>
  )
}
