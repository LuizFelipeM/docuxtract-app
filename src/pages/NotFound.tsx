import React from "react";
import { useTranslation } from "react-i18next";

export const NotFound: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen text-gray-800 p-4">
      <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
      <p className="text-lg md:text-xl mb-8 text-center">
        {t("sorryPageNotFound")}
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base"
      >
        {t("goHome")}
      </a>
    </div>
  );
};
