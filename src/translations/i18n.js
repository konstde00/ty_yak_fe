import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en';
import translationUK from './locales/uk';

i18n.use(initReactI18next).init({
  resources: {
    uk: { translation: translationUK },
    en: { translation: translationEN },
  },
  lng: 'uk',
  fallbackLng: 'uk',
  interpolation: { escapeValue: false },
});

export default i18n;
