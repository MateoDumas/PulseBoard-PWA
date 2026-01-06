export function Skeleton({ className = '', variant = 'default' }) {
  const baseClasses = 'animate-shimmer bg-gray-200 dark:bg-gray-700 rounded'
  
  const variants = {
    default: '',
    text: 'h-4',
    title: 'h-8',
    card: 'h-32',
    metric: 'h-24',
    chart: 'h-64',
  }

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} />
  )
}

export function MetricCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <Skeleton variant="text" className="w-24 mb-4" />
      <Skeleton variant="title" className="w-32 mb-2" />
      <Skeleton variant="text" className="w-16" />
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <Skeleton variant="text" className="w-32 mb-4 h-6" />
      <Skeleton variant="chart" />
    </div>
  )
}
