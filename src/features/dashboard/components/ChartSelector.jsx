import { Select } from '../../../components/ui/Select'

export function ChartSelector({ value, onChange }) {
  const chartTypes = [
    { value: 'area', label: 'Área' },
    { value: 'bar', label: 'Barras' },
    { value: 'line', label: 'Líneas' },
    { value: 'pie', label: 'Circular' },
  ]

  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={chartTypes}
      placeholder="Tipo de gráfico"
      className="w-48"
    />
  )
}
