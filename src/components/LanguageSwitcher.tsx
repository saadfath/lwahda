import type { Lang } from '../i18n/types';

export default function LanguageSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center gap-2 border border-white/25 rounded-full px-2 py-0.5">
      <button onClick={() => setLang('ar')} className={`px-2 py-0.5 rounded-full text-xs ${lang === 'ar' ? 'bg-amber text-ink' : 'text-cream'}`}>AR</button>
      <span className="text-cream/50">|</span>
      <button onClick={() => setLang('fr')} className={`px-2 py-0.5 rounded-full text-xs ${lang === 'fr' ? 'bg-amber text-ink' : 'text-cream'}`}>FR</button>
    </div>
  );
}
