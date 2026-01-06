import { useState } from 'react'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import { Modal } from '../../../components/ui/Modal'

export function AlertSettings({ onSave }) {
  const [isOpen, setIsOpen] = useState(false)
  const [metric, setMetric] = useState('')
  const [condition, setCondition] = useState('')
  const [threshold, setThreshold] = useState('')

  const metrics = [
    { value: 'usuarios', label: 'Usuarios Activos' },
    { value: 'ventas', label: 'Ventas' },
    { value: 'tiempo', label: 'Tiempo Promedio' },
    { value: 'conversion', label: 'Conversión' },
  ]

  const conditions = [
    { value: 'greater', label: 'Mayor que' },
    { value: 'less', label: 'Menor que' },
    { value: 'equal', label: 'Igual a' },
  ]

  const handleSave = () => {
    if (metric && condition && threshold) {
      onSave({ metric, condition, threshold: parseFloat(threshold) })
      setIsOpen(false)
      setMetric('')
      setCondition('')
      setThreshold('')
    }
  }

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        Alertas
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Configurar Alertas"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Guardar
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Select
            label="Métrica"
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            options={metrics}
          />
          <Select
            label="Condición"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            options={conditions}
          />
          <Input
            type="number"
            label="Umbral"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            placeholder="Ej: 1000"
          />
        </div>
      </Modal>
    </>
  )
}
