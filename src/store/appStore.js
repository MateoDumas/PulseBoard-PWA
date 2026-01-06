import { create } from 'zustand'

// Initial mock data to ensure dashboard always has content
const initialMockData = {
  metrics: [
    { id: 1, label: 'Usuarios Activos', value: 750, trend: '+12%' },
    { id: 2, label: 'Ventas Hoy', value: '$25000', trend: '+5%' },
    { id: 3, label: 'Tiempo Promedio', value: '3min', trend: '-3%' },
    { id: 4, label: 'Conversión', value: '3.5%', trend: '+1.2%' },
  ],
  chartData: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
    value: Math.floor(Math.random() * 100) + 50,
  })),
  lastUpdate: new Date().toISOString(),
}

export const useAppStore = create((set) => ({
  // Dashboard data - initialize with mock data
  dashboardData: initialMockData,

  // Online/Offline state
  isOnline: navigator.onLine,

  // Socket connection state
  socketConnected: false,

  // Toasts
  toasts: [],

  // Actions
  setDashboardData: (data) =>
    set((state) => ({
      dashboardData: {
        ...data,
        lastUpdate: new Date().toISOString(),
      },
    })),

  setIsOnline: (isOnline) => set({ isOnline }),

  setSocketConnected: (connected) => set({ socketConnected: connected }),

  // Toast actions
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now(), ...toast }],
    })),

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),

  // Clear store
  reset: () =>
    set({
      dashboardData: { metrics: [], charts: [], lastUpdate: null },
      isOnline: navigator.onLine,
      socketConnected: false,
      toasts: [],
    }),
}))
