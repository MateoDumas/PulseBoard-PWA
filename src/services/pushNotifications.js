// Firebase Cloud Messaging service for push notifications
class PushNotificationService {
  constructor() {
    this.messaging = null
    this.isSupported = 'Notification' in window && 'serviceWorker' in navigator
  }

  async initialize() {
    if (!this.isSupported) {
      console.warn('Push notifications not supported')
      return false
    }

    try {
      // Initialize Firebase (you'll need to add your Firebase config)
      // const { initializeApp } = await import('firebase/app')
      // const { getMessaging, getToken, onMessage } = await import('firebase/messaging')
      
      // For now, using Web Push API directly
      return await this.requestPermission()
    } catch (error) {
      console.error('Failed to initialize push notifications:', error)
      return false
    }
  }

  async requestPermission() {
    if (!this.isSupported) {
      return false
    }

    try {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    } catch (error) {
      console.error('Error requesting notification permission:', error)
      return false
    }
  }

  async showNotification(title, options = {}) {
    if (!this.isSupported) {
      return false
    }

    const permission = await Notification.requestPermission()
    if (permission !== 'granted') {
      console.warn('Notification permission not granted')
      return false
    }

    const registration = await navigator.serviceWorker.ready
    
    await registration.showNotification(title, {
      body: options.body || '',
      icon: options.icon || '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      tag: options.tag || 'default',
      data: options.data || {},
      requireInteraction: options.requireInteraction || false,
      ...options,
    })

    return true
  }

  setupNotificationClick() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'NOTIFICATION_CLICK') {
          // Handle notification click
          window.focus()
          // You can navigate to a specific route here
        }
      })
    }
  }
}

export const pushNotificationService = new PushNotificationService()
