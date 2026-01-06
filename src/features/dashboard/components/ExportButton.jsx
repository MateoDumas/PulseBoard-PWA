import { Button } from '../../../components/ui/Button'
import { Dropdown, DropdownItem } from '../../../components/ui/Dropdown'

export function ExportButton({ data, filename = 'dashboard-data' }) {
  const exportToCSV = () => {
    if (!data || data.length === 0) return

    const headers = Object.keys(data[0]).join(',')
    const rows = data.map(row => Object.values(row).join(','))
    const csv = [headers, ...rows].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${filename}.csv`
    link.click()
  }

  const exportToJSON = () => {
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${filename}.json`
    link.click()
  }

  const exportToPDF = () => {
    // Simple PDF export using window.print
    window.print()
  }

  return (
    <Dropdown
      trigger={
        <Button variant="outline" size="sm">
          <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Exportar
        </Button>
      }
    >
      <DropdownItem onClick={exportToCSV}>
        Exportar como CSV
      </DropdownItem>
      <DropdownItem onClick={exportToJSON}>
        Exportar como JSON
      </DropdownItem>
      <DropdownItem onClick={exportToPDF}>
        Exportar como PDF
      </DropdownItem>
    </Dropdown>
  )
}
