export function setupDashboardSocket(io) {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    // Send dashboard updates every 5 seconds
    const interval = setInterval(() => {
      const data = {
        metrics: [
          { id: 1, label: 'Usuarios Activos', value: Math.floor(Math.random() * 1000) + 500, trend: '+12%' },
          { id: 2, label: 'Ventas Hoy', value: `$${Math.floor(Math.random() * 50000) + 10000}`, trend: '+5%' },
          { id: 3, label: 'Tiempo Promedio', value: `${Math.floor(Math.random() * 5) + 2}min`, trend: '-3%' },
          { id: 4, label: 'Conversión', value: `${(Math.random() * 5 + 2).toFixed(1)}%`, trend: '+1.2%' },
        ],
        chartData: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
          value: Math.floor(Math.random() * 100) + 50,
        })),
      }
      socket.emit('dashboard:update', data)
    }, 5000)

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
      clearInterval(interval)
    })
  })
}
