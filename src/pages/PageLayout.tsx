import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Sidebar } from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

export const PageLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <button
        className="fixed lg:hidden mb-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </>
  )
}
