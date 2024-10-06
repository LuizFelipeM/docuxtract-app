import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FieldEditor } from './components/FieldEditor'
import { Sidebar } from './components/Sidebar'
import { SchemasList } from './pages/SchemaList'
import { DataExtraction } from './pages/DataExtraction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen">
        <button
          className="fixed lg:hidden mb-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<FieldEditor />} />
            <Route path="/schemas" element={<SchemasList />} />
            <Route path="/extraction" element={<DataExtraction />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
