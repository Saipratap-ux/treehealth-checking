import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, Translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'sc_plant_health_lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved && (saved === 'en' || saved === 'or' || saved === 'hi')) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang === 'or' ? 'or' : lang === 'hi' ? 'hi' : 'en';
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language === 'or' ? 'or' : language === 'hi' ? 'hi' : 'en';
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
