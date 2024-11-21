import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Auth0ProviderWithNavigate } from './contexts/Auth0ProviderWithNavigate.tsx'
import { ServicesContextProvider } from './contexts/ServicesContextProvider.tsx'
import { App } from './App.tsx'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import './index.css'
import './i18n'


const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(`Algo inesperado aconteceu: ${error.message}`)
      console.error(error)
    }
  })
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Auth0ProviderWithNavigate>
        <QueryClientProvider client={queryClient}>
          <ServicesContextProvider>
            <App />
          </ServicesContextProvider>
        </QueryClientProvider>
      </Auth0ProviderWithNavigate>
    </Router>
  </StrictMode>,
)
