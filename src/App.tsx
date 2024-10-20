import { Routes, Route } from 'react-router-dom'
import { SchemasList } from './pages/SchemaList'
import { DataExtraction } from './pages/DataExtraction'
import { Schema } from './pages/Schema'
import { NotFound } from './pages/NotFound'
import { AuthenticationGuard } from './components/AuthenticationGuard'
import { Callback } from './pages/Callback'
import { PageLayout } from './pages/PageLayout'
import { Toaster } from 'react-hot-toast'
import { SchemaEdit } from './pages/SchemaEdit'

export function App() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <Toaster />

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/callback" element={<Callback />} />

        <Route path="/" element={<AuthenticationGuard Component={PageLayout} />}>

          <Route path="schemas">
            <Route path="new" element={<Schema />} />
            <Route path=":id" element={<SchemaEdit />} />
            <Route path="list" element={<SchemasList />} />
          </Route>

          <Route path="extraction" element={<DataExtraction />} />

        </Route>
      </Routes>

    </div>
  )
}
