import { create } from 'zustand'

export const useAppStore = create((set) => ({
  // Dashboard data
  dashboardData: {
    metrics: [],
    charts: [],
    lastUpdate: null,
  },

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
