import { faFile, faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div>
      {/* Overlay for mobile when the sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={
          `fixed inset-y-0 left-0 w-64 bg-gray-800 text-white z-30 transform
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
           transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-full`
        }
      >
        <div className="p-4 font-bold text-lg">
          Gerenciador de modelos
        </div>
        <ul className="mt-6 space-y-2">
          <li>
            <Link to="/" className="block px-4 py-2 hover:bg-gray-700" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Criar novo modelo
            </Link>
          </li>
          <li>
            <Link to="/schemas" className="block px-4 py-2 hover:bg-gray-700" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faList} className="mr-2" />
              Meus modelos
            </Link>
          </li>
          <li>
            <Link to="/extraction" className="block px-4 py-2 hover:bg-gray-700" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faFile} className="mr-2" />
              Extrair dados
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
