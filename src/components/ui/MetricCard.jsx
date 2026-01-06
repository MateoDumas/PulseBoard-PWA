import { useEffect, useState } from 'react'

const metricIcons = {
  'Usuarios Activos': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  'Ventas Hoy': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'Tiempo Promedio': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'Conversión': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
}

const getGradient = (label) => {
  const gradients = {
    'Usuarios Activos': 'from-blue-500 to-cyan-500',
    'Ventas Hoy': 'from-green-500 to-emerald-500',
    'Tiempo Promedio': 'from-purple-500 to-pink-500',
    'Conversión': 'from-orange-500 to-red-500',
  }
  return gradients[label] || 'from-gray-500 to-gray-600'
}

export function MetricCard({ metric }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [prevValue, setPrevValue] = useState(metric.value)

  useEffect(() => {
    if (metric.value !== prevValue) {
      setIsAnimating(true)
      setPrevValue(metric.value)
      const timer = setTimeout(() => setIsAnimating(false), 600)
      return () => clearTimeout(timer)
    }
  }, [metric.value, prevValue])

  const Icon = metricIcons[metric.label] || null
  const gradient = getGradient(metric.label)
  const isPositive = metric.trend?.startsWith('+')

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-transparent">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} text-white`}>
          {Icon}
        </div>
        {metric.trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
            isPositive
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
          }`}>
            {isPositive ? (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {metric.trend}
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          {metric.label}
        </p>
        <p
          className={`text-3xl font-bold text-gray-900 dark:text-white transition-all duration-300 ${
            isAnimating ? 'scale-110 text-blue-600 dark:text-blue-400' : ''
          }`}
        >
          {metric.value}
        </p>
      </div>
    </div>
  )
}
