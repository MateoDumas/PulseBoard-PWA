import { useEffect, useState } from 'react'
import { useAppStore } from '../../store/appStore'
import { useSocket } from '../../hooks/useSocket'
import { apiService } from '../../services/api'
import { indexedDBService } from '../../services/indexedDB'
import { MetricCard } from '../../components/ui/MetricCard'
import { LineChart } from '../../components/charts/LineChart'
import { BarChart } from '../../components/charts/BarChart'
import { PieChart } from '../../components/charts/PieChart'
import { MultiLineChart } from '../../components/charts/MultiLineChart'
import { MetricCardSkeleton, ChartSkeleton } from '../../components/ui/Skeleton'
import { DateRangeFilter } from './components/DateRangeFilter'
import { ExportButton } from './components/ExportButton'
import { ChartSelector } from './components/ChartSelector'
import { ComparisonPanel } from './components/ComparisonPanel'
import { AlertSettings } from './components/AlertSettings'
import { EmptyState } from '../../components/ui/EmptyState'
import { Button } from '../../components/ui/Button'
import { SearchInput } from '../../components/ui/SearchInput'
import { Breadcrumbs } from '../../components/layout/Breadcrumbs'

// Mock data generator
function generateMockData() {
  return {
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
}

export function DashboardPage() {
  console.log('📊 DashboardPage component MOUNTED')
  const { dashboardData, setDashboardData, isOnline, addToast } = useAppStore()
  console.log('📊 Dashboard data from store:', dashboardData)
  
  const [chartType, setChartType] = useState('area')
  const [dateFilter, setDateFilter] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [isStale, setIsStale] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Get metrics - use store data or fallback to empty array
  const metrics = dashboardData?.metrics || []
  const chartData = dashboardData?.chartData || []
  console.log('📊 Metrics count:', metrics.length, 'Chart data count:', chartData.length)

  // Socket connection for real-time updates
  const { isConnected } = useSocket('dashboard:update', (data) => {
    try {
      if (data && data.metrics && Array.isArray(data.metrics)) {
        setDashboardData(data)
      }
    } catch (error) {
      console.error('Error updating dashboard data:', error)
    }
  })

  // Initialize IndexedDB (non-blocking)
  useEffect(() => {
    indexedDBService.init().catch(() => {})
  }, [])

  // Check for stale data
  useEffect(() => {
    if (dashboardData?.lastUpdate) {
      const lastUpdate = new Date(dashboardData.lastUpdate)
      const now = new Date()
      const minutesDiff = (now - lastUpdate) / (1000 * 60)
      setIsStale(minutesDiff > 5)
    }
  }, [dashboardData?.lastUpdate])

  // Fetch initial data (non-blocking)
  useEffect(() => {
    if (!isOnline) return

    const fetchData = async () => {
      try {
        const data = await apiService.get('/dashboard')
        if (data && data.metrics) {
          setDashboardData(data)
          indexedDBService.saveData(data).catch(() => {})
        }
      } catch (error) {
        // Silently fail - use existing data
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [isOnline, setDashboardData])

  // Filter chart data
  const filteredChartData = dateFilter && chartData.length > 0
    ? chartData.filter((item) => {
        const itemDate = new Date(item.date)
        return itemDate >= new Date(dateFilter.startDate) && itemDate <= new Date(dateFilter.endDate)
      })
    : chartData

  // Prepare pie data
  const pieData = metrics.length > 0 
    ? metrics.map((metric) => ({
        name: metric.label,
        value: typeof metric.value === 'string' 
          ? parseFloat(metric.value.replace(/[^0-9.]/g, '')) 
          : metric.value,
      }))
    : []

  // Render chart based on type
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <BarChart data={filteredChartData} />
      case 'pie':
        return <PieChart data={pieData} />
      case 'line':
        return (
          <MultiLineChart
            data={filteredChartData}
            lines={[
              { dataKey: 'value', name: 'Valor', color: '#3b82f6' },
            ]}
          />
        )
      default:
        return <LineChart data={filteredChartData} />
    }
  }

  // Filter metrics by search term
  const filteredMetrics = searchTerm && metrics.length > 0
    ? metrics.filter((metric) =>
        metric.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : metrics

  // Always render - if no metrics, show empty state
  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Dashboard' },
        ]}
      />

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <div className="flex items-center gap-2 mt-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                }`}
              />
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {isConnected ? 'Conectado en tiempo real' : 'Modo offline'}
              </p>
              {isStale && (
                <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full">
                  Datos desactualizados
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <ComparisonPanel onCompare={() => addToast?.({ message: 'Comparación iniciada', type: 'info' })} />
            <AlertSettings onSave={(alert) => setAlerts([...alerts, { ...alert, id: Date.now(), metricId: alert.metric === 'usuarios' ? 1 : alert.metric === 'ventas' ? 2 : alert.metric === 'tiempo' ? 3 : 4 }])} />
            <ExportButton data={filteredChartData} />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <SearchInput
          onSearch={setSearchTerm}
          placeholder="Buscar métricas..."
          className="max-w-md"
        />
        <DateRangeFilter onFilterChange={setDateFilter} />
      </div>

      {/* Metrics Grid */}
      {filteredMetrics.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {filteredMetrics.map((metric, index) => (
            <div
              key={metric.id}
              className={`animate-fade-in fade-in-delay-${Math.min(index, 4)}`}
            >
              <MetricCard metric={metric} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-6 animate-fade-in">
          <EmptyState
            title="No hay métricas disponibles"
            description="Los datos aparecerán aquí cuando estén disponibles."
            action={
              <Button onClick={() => window.location.reload()}>
                Recargar
              </Button>
            }
          />
        </div>
      )}

      {/* Charts */}
      {chartData.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 mb-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tendencias</h2>
            <ChartSelector value={chartType} onChange={setChartType} />
          </div>
          {renderChart()}
        </div>
      )}
    </div>
  )
}
