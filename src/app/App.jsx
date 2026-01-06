import { AppProviders } from './providers'
import { AppRouter } from './router'

export function App() {
  console.log('📱 App component rendering')
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  )
}
