import type { Lang } from '../i18n/types';

export default function LanguageSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center bg-surface-container-low rounded-full p-0.5" role="group" aria-label="Choix de la langue">
      <button
        onClick={() => setLang('ar')}
        aria-pressed={lang === 'ar'}
        className={`px-2 py-1 rounded-full text-xs min-h-[28px] ${lang === 'ar' ? 'bg-gold-metallic text-surface-container-lowest font-bold' : 'text-on-surface-variant'}`}
      >
        AR
      </button>
      <button
        onClick={() => setLang('fr')}
        aria-pressed={lang === 'fr'}
        className={`px-2 py-1 rounded-full text-xs min-h-[28px] ${lang === 'fr' ? 'bg-gold-metallic text-surface-container-lowest font-bold' : 'text-on-surface-variant'}`}
      >
        FR
      </button>
    </div>
  );
}
