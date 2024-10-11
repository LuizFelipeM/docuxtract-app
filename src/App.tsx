import { Routes, Route } from 'react-router-dom'
import { SchemasList } from './pages/SchemaList'
import { DataExtraction } from './pages/DataExtraction'
import { Schema } from './pages/Schema'
import { NotFound } from './pages/NotFound'
import { AuthenticationGuard } from './AuthenticationGuard'
import { Callback } from './pages/Callback'
import { PageLayout } from './pages/PageLayout'

export function App() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/callback" element={<Callback />} />

        <Route path="/" element={<AuthenticationGuard component={PageLayout} />}>

          <Route path="schema">
            <Route path="new" element={<Schema />} />
            <Route path=":id" element={<Schema />} />
            <Route path="list" element={<SchemasList />} />
          </Route>

          <Route path="extraction" element={<DataExtraction />} />

        </Route>
      </Routes>

    </div>
  )
}
