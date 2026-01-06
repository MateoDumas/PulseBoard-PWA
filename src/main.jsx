import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/App'
import './styles/index.css'

console.log('🚀 Main.jsx loaded')
console.log('Root element:', document.getElementById('root'))

const root = ReactDOM.createRoot(document.getElementById('root'))
console.log('React root created:', root)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

console.log('✅ App rendered')
