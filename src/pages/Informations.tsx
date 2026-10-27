import type { Lang } from '../i18n/types';
import infoAr from '../data/info.ar.json';
import infoFr from '../data/info.fr.json';
import KeyFacts from '../components/KeyFacts';
import Timeline from '../components/Timeline';
import Sources from '../components/Sources';

export default function Informations({ lang }: { lang: Lang }) {
  const data = lang === 'ar' ? (infoAr as any) : (infoFr as any);
  return (
    <div>
      <section className="relative h-[50vh] flex items-center" style={{ background: 'linear-gradient(180deg, rgba(11,31,75,0.55) 0%, rgba(74,36,24,0.72) 100%), url(/bg/hero-info.jpeg) center/cover no-repeat' }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-teal text-sm mb-2">{data.pageHeader.eyebrow}</div>
          <h1 className="text-cream text-4xl md:text-5xl font-semibold mb-4">{data.pageHeader.title}</h1>
          <p className="text-cream text-lg md:text-xl">{data.pageHeader.introduction}</p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-10">
        <KeyFacts items={data.keyFacts} />
      </section>
      <section className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {(data.sections || []).map((s: any, i: number) => (
          <div key={i} className="p-6 rounded-lg bg-white/5" style={{ backgroundImage: 'repeating-conic-gradient(from 0deg, rgba(31,154,148,0.06) 0deg 90deg, transparent 90deg 180deg)', backgroundSize: '40px 40px' }}>
            <h2 className="text-cream text-2xl font-semibold mb-4">{s.title}</h2>
            {s.paragraphs?.map((p: string, j: number) => (
              <p key={j} className={`text-cream/90 mb-3 leading-relaxed ${p.includes('Explication') || p.includes('شرح') ? 'border-l-4 border-teal pl-4 italic' : ''}`}>{p}</p>
            ))}
            {s.sources && <div className="mt-4"><Sources items={s.sources} /></div>}
          </div>
        ))}
      </section>
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-cream text-2xl font-semibold mb-6">Chronologie</h2>
        <Timeline items={data.timeline || []} lang={lang} />
      </section>
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-cream text-2xl font-semibold mb-4">Sources</h2>
        <Sources items={(data.sources || []).map((s: any, i: number) => ({ id: String(i), title: s.title || s, url: s.url || '#' }))} />
      </section>
    </div>
  );
}
