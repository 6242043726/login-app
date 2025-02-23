import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from './LanguageDetector';
import { translation } from './translation';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    compatibilityJSON: 'v3' as any,
    resources: translation,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
};

export default i18n;
