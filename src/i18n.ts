import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { pt } from './locales/pt';

i18n
  .use(initReactI18next)
  .init({
    resources: { en, pt, },
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
