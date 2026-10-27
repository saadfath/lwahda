import type { Lang } from '../i18n/types';
import homeAr from '../data/home.ar.json';
import homeFr from '../data/home.fr.json';
import ImageCarousel from '../components/ImageCarousel';

export default function Home({ lang }: { lang: Lang }) {
  const data = lang === 'ar' ? (homeAr as any) : (homeFr as any);
  const carouselImages = [
    { src: '/bg/hero-home.jpeg', alt: lang === 'ar' ? 'مسجد الحسن الثاني' : 'Mosquée Hassan II au coucher du soleil' },
    { src: '/bg/hero-info.jpeg', alt: lang === 'ar' ? 'فناء رياض مغربي' : 'Riad marocain' },
    { src: '/bg/accent-zellige.jpeg', alt: lang === 'ar' ? 'زليج مغربي' : 'Zellige marocain' },
    { src: '/bg/quiz-bg.jpeg', alt: lang === 'ar' ? 'مسجد الحسن الثاني' : 'Mosquée Hassan II' },
    { src: '/bg/leaderboard-bg.jpeg', alt: lang === 'ar' ? 'أسوار تارودانت' : 'Remparts de Taroudant' },
  ];
  return (
    <div>
      <section className="relative h-[70vh] flex items-center" style={{ background: 'linear-gradient(180deg, rgba(11,31,75,0.55) 0%, rgba(74,36,24,0.72) 100%), url(/bg/hero-home.jpeg) center/cover no-repeat' }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-cream/80 text-sm mb-2">{data.hero.eyebrow}</div>
          <h1 className="text-cream text-5xl md:text-6xl font-semibold leading-tight mb-4" style={{ letterSpacing: '-0.28px' }}>{data.hero.title}</h1>
          <p className="text-cream text-xl md:text-2xl mb-4">{data.hero.subtitle}</p>
          <div className="text-teal text-xl mb-6">{data.hero.dateLabel}</div>
          <div className="flex gap-3">
            <a href="/quiz" className="px-6 py-3 rounded-full bg-amber text-ink hover:bg-gold transition" style={{ minHeight: '44px' }}>{String(data.hero.primaryCta)}</a>
            <a href="/informations" className="px-6 py-3 rounded-full border border-amber text-amber hover:bg-amber/10 transition" style={{ minHeight: '44px' }}>{String(data.hero.secondaryCta)}</a>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <ImageCarousel images={carouselImages} />
        <div>
          <h2 className="text-cream text-3xl font-semibold mb-4">{data.introduction.title}</h2>
          {data.introduction.paragraphs.map((p: string, i: number) => <p key={i} className="text-cream/90 mb-3 leading-relaxed">{p}</p>)}
          <div className="grid gap-3 mt-6">
            {data.highlights.map((h: any, i: number) => (
              <div key={i} className="p-4 rounded-lg bg-cream/10 border-l-4 border-teal">
                <div className="text-cream font-semibold">{h.title}</div>
                <div className="text-cream/80 text-sm">{h.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-cream text-2xl font-semibold mb-4">Timeline</h2>
        <div className="grid gap-2">
          {(data.timelinePreview || []).slice(0,4).map((t: any) => (
            <div key={t.id} className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-teal text-sm">{t.date}</div>
              <div className="text-cream">{t.title}</div>
            </div>
          ))}
        </div>
        <a href="/informations" className="inline-block mt-4 text-amber underline">Voir la chronologie complète</a>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="p-6 rounded-lg bg-terracotta/80">
          <h3 className="text-cream text-xl font-semibold mb-2">{data.quizPromotion.title}</h3>
          <p className="text-cream/90 mb-4">{data.quizPromotion.description}</p>
          <a href="/quiz" className="px-6 py-3 rounded-full bg-amber text-ink">{lang === 'ar' ? 'ابدأ الاختبار' : 'Commencer le quiz'}</a>
        </div>
      </section>
    </div>
  );
}
