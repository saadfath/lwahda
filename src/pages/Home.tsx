import type { Lang } from '../i18n/types';
import homeAr from '../data/home.ar.json';
import homeFr from '../data/home.fr.json';
import ImageCarousel from '../components/ImageCarousel';
import { Link } from 'react-router-dom';

export default function Home({ lang }: { lang: Lang }) {
  const data = lang === 'ar' ? (homeAr as any) : (homeFr as any);
  const carouselImages = [
    { src: '/bg/hero-home.jpeg', alt: lang === 'ar' ? (data.hero.image?.altAr || 'مسجد الحسن الثاني') : (data.hero.image?.altFr || 'Mosquée Hassan II au coucher du soleil') },
    { src: '/bg/hero-info.jpeg', alt: lang === 'ar' ? 'فناء رياض مغربي' : 'Riad marocain' },
    { src: '/bg/accent-zellige.jpeg', alt: lang === 'ar' ? 'زليج مغربي' : 'Zellige marocain' },
    { src: '/bg/quiz-bg.jpeg', alt: lang === 'ar' ? 'مسجد الحسن الثاني' : 'Mosquée Hassan II' },
    { src: '/bg/leaderboard-bg.jpeg', alt: lang === 'ar' ? 'أسوار تارودانت' : 'Remparts de Taroudant' },
  ];
  return (
    <div className="min-h-screen">
      {/* TODO: verify image license before public deployment */}
      <section className="relative min-h-[70vh] flex items-center" style={{ background: 'linear-gradient(180deg, rgba(9,20,36,0.75) 0%, rgba(17,40,74,0.85) 100%), url(/bg/hero-home.jpeg) center/cover no-repeat' }}>
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-xl relative z-10">
          <div className="flex items-center gap-space-xs text-gold-metallic mb-space-sm">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="font-label-md text-sm uppercase tracking-widest">{data.hero.eyebrow}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[48px] leading-tight font-bold text-text-on-dark-primary mb-space-md max-w-4xl">{data.hero.title}</h1>
          <p className="text-lg md:text-xl leading-relaxed text-on-surface-variant mb-space-md max-w-3xl">{data.hero.subtitle}</p>
          <div className="font-serif text-xl text-gold-metallic mb-space-xl">{data.hero.dateLabel}</div>
          <div className="flex flex-wrap gap-space-md">
            <Link to="/quiz" className="btn-primary">{typeof data.hero.primaryCta === 'string' ? data.hero.primaryCta : data.hero.primaryCta?.label}</Link>
            <Link to="/informations" className="btn-secondary">{typeof data.hero.secondaryCta === 'string' ? data.hero.secondaryCta : data.hero.secondaryCta?.label}</Link>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </section>
      <section className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-xl grid md:grid-cols-2 gap-space-xl items-center">
        <ImageCarousel images={carouselImages} lang={lang} />
        <div className="card-moroccan p-space-lg">
          <h2 className="font-serif text-3xl font-semibold text-text-on-dark-primary mb-space-md">{data.introduction.title}</h2>
          {data.introduction.paragraphs.map((p: string, i: number) => <p key={i} className="text-on-surface mb-space-md leading-relaxed">{p}</p>)}
          <div className="grid gap-space-sm mt-space-lg">
            {data.highlights.map((h: any, i: number) => (
              <div key={i} className="p-space-md rounded bg-surface-container-high border-s-4 border-secondary-container">
                <div className="text-text-on-dark-primary font-semibold mb-1">{h.title}</div>
                <div className="text-on-surface-variant text-sm">{h.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-lg">
        <div className="flex items-center gap-space-xs mb-space-md">
          <span className="w-2 h-6 bg-secondary-container rounded-sm"></span>
          <h2 className="font-serif text-3xl font-semibold text-text-on-dark-primary">{lang === 'ar' ? 'التسلسل الزمني' : 'Chronologie'}</h2>
        </div>
        <div className="grid gap-space-sm">
          {(data.timelinePreview || []).slice(0,4).map((t: any) => (
            <div key={t.id} className="card-moroccan p-space-md">
              <div className="text-gold-metallic text-sm mb-1">{t.date}</div>
              <div className="text-text-on-dark-primary">{t.title}</div>
            </div>
          ))}
        </div>
        <Link to="/informations" className="inline-flex items-center gap-2 mt-space-md text-gold-metallic hover:text-gold-amber transition-colors">
          {lang === 'ar' ? 'عرض التسلسل الزمني الكامل' : 'Voir la chronologie complète'}
          <span className="material-symbols-outlined text-sm rtl:rotate-180">arrow_forward</span>
        </Link>
      </section>
      <section className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-lg pb-space-xl">
        <div className="card-moroccan p-space-lg md:p-space-xl text-center">
          <h3 className="font-serif text-3xl font-semibold text-text-on-dark-primary mb-space-sm">{data.quizPromotion.title}</h3>
          <p className="text-on-surface-variant mb-space-lg max-w-2xl mx-auto">{data.quizPromotion.description}</p>
          <Link to="/quiz" className="btn-primary">{lang === 'ar' ? 'ابدأ الاختبار' : 'Commencer le quiz'}</Link>
        </div>
      </section>
    </div>
  );
}
