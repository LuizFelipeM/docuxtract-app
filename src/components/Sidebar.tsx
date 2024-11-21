import { faFile, faList, faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { t, i18n } = useTranslation();
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setLanguageDropdownOpen(false); // Close dropdown after selection
  };

  const currentLanguage = i18n.language;

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
        className={`
          fixed inset-y-0 left-0 w-64 bg-slate-950 text-white z-30 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-full`}
      >
        <div className="p-4 font-bold text-lg">{t("manageSchemas")}</div>
        <ul className="mt-6 space-y-2">
          <li>
            <Link
              to="/schemas/new"
              className="block px-4 py-2 transition-all hover:bg-gray-800"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              {t("createNewSchema")}
            </Link>
          </li>
          <li>
            <Link
              to="/schemas/list"
              className="block px-4 py-2 transition-all hover:bg-gray-800"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faList} className="mr-2" />
              {t("mySchemas")}
            </Link>
          </li>
          <li>
            <Link
              to="/extraction"
              className="block px-4 py-2 transition-all hover:bg-gray-800"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faFile} className="mr-2" />
              {t("extractData")}
            </Link>
          </li>
        </ul>
        <div className="absolute bottom-0 w-full">
          <div className="p-4 bg-gray-800 relative">
            {/* Current Language Display */}
            <button
              className="w-full flex items-center justify-between px-4 py-2 bg-gray-700 rounded text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setLanguageDropdownOpen((prev) => !prev)}
            >
              <span>{t(currentLanguage)}</span>
              <FontAwesomeIcon icon={faChevronDown} />
            </button>

            {/* Language Dropdown */}
            {isLanguageDropdownOpen && (
              <div className="absolute left-0 right-0 -top-full mb-2 bg-gray-700 rounded shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                  onClick={() => changeLanguage("en")}
                >
                  {t("en")}
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                  onClick={() => changeLanguage("pt")}
                >
                  {t("pt")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
