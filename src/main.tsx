import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Auth0ProviderWithNavigate } from './contexts/Auth0ProviderWithNavigate.tsx'
import { App } from './App.tsx'
import './index.css'
import { ServicesContextProvider } from './contexts/ServicesContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Auth0ProviderWithNavigate>
        <ServicesContextProvider>
          <App />
        </ServicesContextProvider>
      </Auth0ProviderWithNavigate>
    </Router>
  </StrictMode>,
)
