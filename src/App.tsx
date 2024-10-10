import { Routes, Route } from 'react-router-dom'
import { SchemasList } from './pages/SchemaList'
import { DataExtraction } from './pages/DataExtraction'
import { Schema } from './pages/Schema'
import { NotFound } from './pages/NotFound'
import { AuthenticationGuard } from './AuthenticationGuard'
import { Callback } from './pages/Callback'
import { Home } from './pages/Home'

export function App() {
  return (
    <div className="flex min-h-screen">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-schema" element={<AuthenticationGuard component={Schema} />} />
        <Route path="/my-schemas" element={<AuthenticationGuard component={SchemasList} />} />
        <Route path="/data-extraction" element={<AuthenticationGuard component={DataExtraction} />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  )
}
