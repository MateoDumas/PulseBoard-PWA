import { useState } from 'react'
import { Button } from '../../../components/ui/Button'
import { Select } from '../../../components/ui/Select'
import { Modal } from '../../../components/ui/Modal'

export function ComparisonPanel({ onCompare }) {
  const [isOpen, setIsOpen] = useState(false)
  const [period1, setPeriod1] = useState('')
  const [period2, setPeriod2] = useState('')

  const periods = [
    { value: 'today', label: 'Hoy' },
    { value: 'yesterday', label: 'Ayer' },
    { value: 'week', label: 'Esta Semana' },
    { value: 'lastWeek', label: 'Semana Pasada' },
    { value: 'month', label: 'Este Mes' },
    { value: 'lastMonth', label: 'Mes Pasado' },
  ]

  const handleCompare = () => {
    if (period1 && period2) {
      onCompare({ period1, period2 })
      setIsOpen(false)
    }
  }

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Comparar
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Comparar Períodos"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCompare}>
              Comparar
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Select
            label="Período 1"
            value={period1}
            onChange={(e) => setPeriod1(e.target.value)}
            options={periods}
          />
          <Select
            label="Período 2"
            value={period2}
            onChange={(e) => setPeriod2(e.target.value)}
            options={periods}
          />
        </div>
      </Modal>
    </>
  )
}
