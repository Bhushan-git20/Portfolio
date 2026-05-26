import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { Portfolio } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Portfolio />
    <Analytics />
  </StrictMode>,
)
