import { useState, useEffect } from 'react';
import type { Lang } from '../i18n/types';

const STORAGE_KEY = 'tawhda_lang';

export function useLanguage() {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem(STORAGE_KEY) as Lang) ?? 'fr';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  return { lang, setLang };
}
