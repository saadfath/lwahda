import { Link } from 'react-router-dom';
import type { Lang } from '../i18n/types';

export default function NotFound({ lang }: { lang: Lang }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-margin-mobile">
      <div className="card-moroccan p-space-xl text-center max-w-md w-full">
        <div className="font-serif text-7xl font-bold text-gold-metallic mb-space-sm">404</div>
        <h1 className="font-serif text-2xl font-semibold text-text-on-dark-primary mb-space-sm">
          {lang === 'ar' ? 'الصفحة غير موجودة' : 'Page non trouvée'}
        </h1>
        <p className="text-on-surface-variant text-sm mb-space-lg">
          {lang === 'ar' ? 'الصفحة التي تبحث عنها غير موجودة.' : "La page que vous recherchez n'existe pas."}
        </p>
        <Link to="/" className="btn-primary">
          {lang === 'ar' ? 'العودة إلى الصفحة الرئيسية' : "Retour à l'accueil"}
        </Link>
      </div>
    </div>
  );
}
