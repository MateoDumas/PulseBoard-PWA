import { useState } from 'react'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'

export function DateRangeFilter({ onFilterChange }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleApply = () => {
    onFilterChange({ startDate, endDate })
  }

  const handleReset = () => {
    setStartDate('')
    setEndDate('')
    onFilterChange({ startDate: '', endDate: '' })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Filtrar por Fechas
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="date"
          label="Fecha Inicio"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="date"
          label="Fecha Fin"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="flex gap-2 mt-4">
        <Button onClick={handleApply} size="sm">
          Aplicar
        </Button>
        <Button onClick={handleReset} variant="secondary" size="sm">
          Limpiar
        </Button>
      </div>
    </div>
  )
}
