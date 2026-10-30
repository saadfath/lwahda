import type { Lang } from '../i18n/types';
import infoAr from '../data/info.ar.json';
import infoFr from '../data/info.fr.json';
import KeyFacts from '../components/KeyFacts';
import Timeline from '../components/Timeline';
import Sources from '../components/Sources';
import { Link } from 'react-router-dom';

export default function Informations({ lang }: { lang: Lang }) {
  const data = lang === 'ar' ? (infoAr as any) : (infoFr as any);
  return (
    <div className="min-h-screen">
      <section className="relative min-h-[50vh] flex items-center" style={{ background: 'linear-gradient(180deg, rgba(26,7,9,0.80) 0%, rgba(94,15,26,0.90) 100%), url(/bg/hero-info.jpeg) center/cover no-repeat' }}>
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-xl relative z-10">
          <div className="flex items-center gap-space-xs text-gold-metallic mb-space-sm">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="font-label-md text-sm uppercase tracking-widest">{data.pageHeader.eyebrow}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-text-on-dark-primary mb-space-md max-w-4xl">{data.pageHeader.title}</h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-3xl">{data.pageHeader.introduction}</p>
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#9FE7B7_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </section>
      {data.keyFacts && (
        <section className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-xl">
          <KeyFacts items={data.keyFacts} />
        </section>
      )}
      <section className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-lg space-y-space-lg">
        {(data.sections || []).map((s: any, i: number) => (
          <article key={i} className="card-moroccan p-space-lg md:p-space-xl">
            <div className="flex items-center gap-space-xs mb-space-md">
              <span className="w-2 h-6 bg-secondary-container rounded-sm"></span>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-text-on-dark-primary">{s.title}</h2>
            </div>
            {s.paragraphs?.map((p: string, j: number) => (
              <p key={j} className={`text-on-surface mb-space-md leading-relaxed ${p.includes('Explication') || p.includes('شرح') || p.includes('pédagogique') || p.includes('تعليمي') ? 'border-s-4 border-gold-metallic/40 ps-space-md italic bg-surface-container-high/50 py-space-sm rounded-e' : ''}`}>{p}</p>
            ))}
            {s.sources && <div className="mt-space-lg"><Sources items={s.sources} /></div>}
          </article>
        ))}
      </section>
      {(data.timeline && data.timeline.length > 0) && (
        <section className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-lg">
          <div className="flex items-center gap-space-xs mb-space-lg">
            <span className="w-2 h-6 bg-secondary-container rounded-sm"></span>
            <h2 className="font-serif text-3xl font-semibold text-text-on-dark-primary">{lang === 'ar' ? 'التسلسل الزمني' : 'Chronologie'}</h2>
          </div>
          <Timeline items={data.timeline || []} lang={lang} />
        </section>
      )}
      {(data.sources && data.sources.length > 0) && (
        <section className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-lg">
          <div className="flex items-center gap-space-xs mb-space-md">
            <span className="w-2 h-6 bg-secondary-container rounded-sm"></span>
            <h2 className="font-serif text-3xl font-semibold text-text-on-dark-primary">{lang === 'ar' ? 'المصادر' : 'Sources'}</h2>
          </div>
          <div className="card-moroccan p-space-lg">
            <Sources items={(data.sources || []).map((s: any, i: number) => ({ id: String(i), title: typeof s === 'string' ? s : s.title, url: typeof s === 'string' ? '#' : (s.url || '#') }))} />
          </div>
        </section>
      )}
      <section className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-lg pb-space-xl">
        <div className="card-moroccan p-space-lg md:p-space-xl text-center">
          <h3 className="font-serif text-3xl font-semibold text-text-on-dark-primary mb-space-sm">{lang === 'ar' ? 'اختبر معلوماتك' : 'Testez vos connaissances'}</h3>
          <p className="text-on-surface-variant mb-space-lg">{lang === 'ar' ? 'بعد قراءة المعلومات، جرب اختبار عيد الوحدة' : "Après avoir lu les informations, testez-vous avec le quiz de l'Aïd Al Wahda"}</p>
          <Link to="/quiz" className="btn-primary">{lang === 'ar' ? 'ابدأ الاختبار' : 'Commencer le quiz'}</Link>
        </div>
      </section>
    </div>
  );
}
