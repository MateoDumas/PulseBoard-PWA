import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export function BarChart({ data, dataKey = 'value', name = 'Valor' }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
        No hay datos disponibles
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
        <XAxis 
          dataKey="date" 
          stroke="#6b7280"
          className="dark:stroke-gray-400"
        />
        <YAxis 
          stroke="#6b7280"
          className="dark:stroke-gray-400"
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
          className="dark:bg-gray-800 dark:border-gray-700"
        />
        <Legend />
        <Bar 
          dataKey={dataKey} 
          name={name}
          fill="#3b82f6"
          radius={[8, 8, 0, 0]}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
