import type { Lang } from '../i18n/types';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', labelAr: 'الرئيسية', labelFr: 'Accueil' },
    { path: '/informations', labelAr: 'التوثيق والمعلومات', labelFr: 'Informations' },
    { path: '/quiz', labelAr: 'الاختبار المعرفي', labelFr: 'Quiz' },
    { path: '/leaderboard', labelAr: 'لوحة الشرف', labelFr: 'Classement' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface-navy/90 backdrop-blur-xl shadow-moroccan border-b border-gold-metallic/20">
      <div className="h-20 max-w-[1280px] mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-space-sm">
        <Link to="/" className="flex items-center gap-space-sm min-w-0">
          <img src="/logos/cmcbmk.png" alt="CMC Béni Mellal-Khénifra" className="h-10 w-auto object-contain shrink-0" />
          <div className="w-px h-6 bg-gold-metallic/30 mx-space-xs hidden sm:block shrink-0"></div>
          <div className="hidden sm:flex flex-col text-start min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="font-serif text-lg text-text-on-dark-primary tracking-wide whitespace-nowrap">
                {lang === 'ar' ? 'عيد الوحدة' : "Fête de l'Unité"}
              </span>
              <span className="font-label-sm text-[10px] leading-none bg-secondary-container text-ivory-base px-space-xs py-1 rounded-full whitespace-nowrap">
                {lang === 'ar' ? '31 أكتوبر' : '31 octobre'}
              </span>
            </div>
            <span className="font-label-sm text-[10px] leading-tight text-text-on-dark-secondary truncate">
              CMC Béni Mellal-Khénifra
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-space-xs p-1 bg-surface-container-lowest/60 rounded-xl" aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Navigation principale'}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive(item.path) ? 'page' : undefined}
              className={`px-space-md py-space-xs rounded-lg font-body-sm text-sm transition-all ${
                isActive(item.path)
                  ? 'bg-surface-container-high text-gold-metallic'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {lang === 'ar' ? item.labelAr : item.labelFr}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-space-sm shrink-0">
          <div className="flex items-center bg-surface-container-low rounded-full p-0.5 shadow-inner" role="group" aria-label={lang === 'ar' ? 'اختيار اللغة' : 'Choix de la langue'}>
            <button
              onClick={() => setLang('ar')}
              aria-pressed={lang === 'ar'}
              className={`px-space-xs py-1 font-label-sm text-xs rounded-full min-h-[32px] min-w-[36px] transition-colors ${
                lang === 'ar' ? 'bg-gold-metallic text-surface-container-lowest font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              عربي
            </button>
            <button
              onClick={() => setLang('fr')}
              aria-pressed={lang === 'fr'}
              className={`px-space-xs py-1 font-label-sm text-xs rounded-full min-h-[32px] min-w-[36px] transition-colors ${
                lang === 'fr' ? 'bg-gold-metallic text-surface-container-lowest font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              FR
            </button>
          </div>

          <Link
            to="/quiz"
            className="hidden sm:inline-flex items-center justify-center px-space-md py-space-xs rounded-lg bg-secondary-container text-ivory-base font-label-md text-sm hover:bg-crimson-accent shadow-moroccan-elevated transition-all min-h-[40px]"
          >
            {lang === 'ar' ? 'ابدأ الاختبار' : 'Commencer le quiz'}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen
              ? (lang === 'ar' ? 'إغلاق القائمة' : 'Fermer le menu')
              : (lang === 'ar' ? 'فتح القائمة' : 'Ouvrir le menu')}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gold-metallic/30 text-gold-metallic hover:bg-gold-metallic/10 transition-colors"
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-gold-metallic/20 bg-surface-navy/98 backdrop-blur-xl">
          <nav className="max-w-[1280px] mx-auto px-margin-mobile py-space-md flex flex-col gap-space-xs" aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Navigation principale'}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(item.path) ? 'page' : undefined}
                className={`flex items-center justify-between px-space-md py-space-sm rounded-lg text-base transition-colors ${
                  isActive(item.path)
                    ? 'bg-surface-container-high text-gold-metallic'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span>{lang === 'ar' ? item.labelAr : item.labelFr}</span>
                <span className="material-symbols-outlined text-lg opacity-60">{lang === 'ar' ? 'chevron_left' : 'chevron_right'}</span>
              </Link>
            ))}
            <Link
              to="/quiz"
              onClick={() => setMenuOpen(false)}
              className="mt-space-xs inline-flex items-center justify-center px-space-md py-space-sm rounded-lg bg-secondary-container text-ivory-base font-label-md hover:bg-crimson-accent transition-all min-h-[44px]"
            >
              {lang === 'ar' ? 'ابدأ الاختبار' : 'Commencer le quiz'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
