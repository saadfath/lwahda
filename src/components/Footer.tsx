import { Link } from 'react-router-dom';
import type { Lang } from '../i18n/types';

export default function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  const links = [
    { path: '/', labelAr: 'الرئيسية', labelFr: 'Accueil' },
    { path: '/informations', labelAr: 'التوثيق والمعلومات', labelFr: 'Informations' },
    { path: '/quiz', labelAr: 'الاختبار المعرفي', labelFr: 'Quiz' },
    { path: '/leaderboard', labelAr: 'لوحة الشرف', labelFr: 'Classement' },
  ];

  return (
    <footer className="relative border-t border-gold-metallic/20 bg-surface-container-lowest">
      <div className="absolute inset-0 zellige-pattern pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-xl">
        <div className="grid gap-space-lg md:grid-cols-3">
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <img src="/logos/cmcbmk.png" alt="CMC Béni Mellal-Khénifra" className="h-12 w-auto object-contain" />
              <div>
                <div className="font-serif text-lg text-text-on-dark-primary">
                  {lang === 'ar' ? 'عيد الوحدة' : "Fête de l'Unité"}
                </div>
                <div className="text-[11px] text-text-on-dark-secondary">31 octobre · 31 أكتوبر</div>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-xs">
              {lang === 'ar'
                ? 'مبادرة تربوية للمركز الجهوي لمهن التربية والتكوين ببني ملال-خنيفرة، للتعريف بعيد الوحدة واختبار المعارف.'
                : "Une initiative pédagogique du Centre Régional des Métiers de l'Éducation et de la Formation de Béni Mellal-Khénifra, pour découvrir la Fête de l'Unité et tester ses connaissances."}
            </p>
          </div>

          <nav className="flex flex-col gap-space-xs" aria-label={lang === 'ar' ? 'روابط التذييل' : 'Liens du pied de page'}>
            <div className="font-serif text-base text-gold-metallic mb-space-xs">
              {lang === 'ar' ? 'روابط سريعة' : 'Liens rapides'}
            </div>
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-on-surface-variant hover:text-gold-metallic transition-colors w-fit"
              >
                {lang === 'ar' ? link.labelAr : link.labelFr}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-space-sm">
            <div className="font-serif text-base text-gold-metallic">
              {lang === 'ar' ? 'عن الحدث' : "À propos de l'événement"}
            </div>
            <div className="flex items-center gap-space-xs text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-lg text-gold-metallic">calendar_month</span>
              <span>{lang === 'ar' ? 'يُحتفى به كل 31 أكتوبر' : 'Célébrée chaque 31 octobre'}</span>
            </div>
            <div className="flex items-center gap-space-xs text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-lg text-gold-metallic">school</span>
              <span>{lang === 'ar' ? 'اختبار معرفي مفتوح للمتعلمين' : 'Quiz ouvert aux apprenants'}</span>
            </div>
            <div className="flex items-center gap-space-xs text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-lg text-gold-metallic">location_on</span>
              <span>Béni Mellal-Khénifra, Maroc</span>
            </div>
          </div>
        </div>

        <div className="mt-space-lg pt-space-md border-t border-outline-variant/40 flex flex-col sm:flex-row items-center justify-between gap-space-sm text-center sm:text-start">
          <span className="text-[11px] text-text-on-dark-secondary">
            © {year} CMC Béni Mellal-Khénifra. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}
          </span>
          <Link to="/quiz" className="text-[11px] text-gold-metallic hover:text-gold-amber transition-colors">
            {lang === 'ar' ? 'شارك في الاختبار' : 'Participer au quiz'}
          </Link>
        </div>
      </div>
    </footer>
  );
}
