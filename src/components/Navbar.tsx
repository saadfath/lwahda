import type { Lang } from '../i18n/types';

interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 h-14 flex items-center justify-between px-4" style={{ background: 'rgba(11,31,75,0.88)', backdropFilter: 'blur(20px) saturate(180%)' }}>
      <div className="text-cream font-semibold" style={{ fontSize: '21px' }}>TAWḤDA</div>
      <div className="hidden md:flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="flex items-center gap-1.5 border border-white/25 rounded-full px-2.5 py-1 text-xs text-cream">
          <img src="/logos/cmcbmk.png" alt="CMC BMK" style={{ height: '18px', width: 'auto' }} />
          <span>cmc bmk</span>
        </div>
        <div className="flex items-center gap-1.5 border border-white/25 rounded-full px-2.5 py-1 text-xs text-cream">
          <img src="/logos/e-cmc.png" alt="e-CMC" style={{ height: '18px', width: 'auto' }} />
          <span>c-cmc</span>
        </div>
        <div className="flex items-center gap-1.5 border border-white/25 rounded-full px-2.5 py-1 text-xs text-cream">
          <img src="/logos/youth5.png" alt="Youth 5.0" style={{ height: '18px', width: 'auto' }} />
          <span>youth5</span>
        </div>
        <div className="border border-white/25 rounded-full px-2.5 py-1 text-xs text-cream">fablap</div>
        <div className="border border-white/25 rounded-full px-2.5 py-1 text-xs text-cream">icebear</div>
      </div>
      <div className="flex items-center gap-2 border border-white/25 rounded-full px-2 py-0.5">
        <button onClick={() => setLang('ar')} className={`px-2 py-0.5 rounded-full text-xs ${lang === 'ar' ? 'bg-amber text-ink' : 'text-cream'}`}>AR</button>
        <span className="text-cream/50">|</span>
        <button onClick={() => setLang('fr')} className={`px-2 py-0.5 rounded-full text-xs ${lang === 'fr' ? 'bg-amber text-ink' : 'text-cream'}`}>FR</button>
      </div>
    </nav>
  );
}
