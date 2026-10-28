import type { Lang } from '../i18n/types';
import { useLeaderboard } from '../hooks/useLeaderboard';
import LeaderboardRow from '../components/LeaderboardRow';
import QRCodeDisplay from '../components/QRCodeDisplay';
import { Link } from 'react-router-dom';

function PodiumCard({ row, place, lang }: { row: any; place: 1 | 2 | 3; lang: Lang }) {
  const orderByLang: Record<Lang, Record<number, string>> = {
    fr: { 1: 'sm:order-2', 2: 'sm:order-1', 3: 'sm:order-3' },
    ar: { 1: 'sm:order-2', 2: 'sm:order-3', 3: 'sm:order-1' },
  };
  const styles = {
    1: { border: 'border-t-gold-metallic', text: 'text-gold-metallic', icon: 'emoji_events' },
    2: { border: 'border-t-on-surface-variant', text: 'text-on-surface', icon: 'workspace_premium' },
    3: { border: 'border-t-emerald-bright', text: 'text-emerald-bright', icon: 'military_tech' },
  }[place];

  return (
    <div className={`card-moroccan border-t-4 ${styles.border} ${orderByLang[lang][place]} p-space-md text-center flex flex-col items-center gap-space-xs`}>
      <span className={`material-symbols-outlined text-3xl ${styles.text}`} style={{ fontVariationSettings: "'FILL' 1" }}>
        {styles.icon}
      </span>
      <div className={`font-serif text-2xl font-bold ${styles.text}`}>#{place}</div>
      <div className="font-semibold text-text-on-dark-primary truncate max-w-full">{row.full_name}</div>
      <div className="text-[11px] text-on-surface-variant truncate max-w-full">
        {row.class_name} • {row.year_of_study}
      </div>
      <div className={`font-serif text-2xl font-bold ${styles.text}`}>{row.score}</div>
      <div className="text-xs text-on-surface-variant">
        {row.correct_count}/10 {lang === 'ar' ? 'إجابة صحيحة' : 'correctes'}
      </div>
    </div>
  );
}

export default function Leaderboard({ lang }: { lang: Lang }) {
  const { rows, loading, error, refetch } = useLeaderboard();
  const siteUrl = (import.meta.env.VITE_PUBLIC_SITE_URL as string) || 'https://lwahda.vercel.app';
  const top3 = rows.slice(0, 3);

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(180deg, rgba(9,20,36,0.88) 0%, rgba(17,40,74,0.92) 100%), url(/bg/leaderboard-bg.jpeg) center/cover no-repeat' }}
    >
      <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-xl">
        <div className="flex items-start gap-space-xs mb-space-sm">
          <span className="w-2 h-7 bg-secondary-container rounded-sm mt-1 shrink-0"></span>
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-on-dark-primary">
              {lang === 'ar' ? 'لوحة الشرف' : 'Classement'}
            </h1>
            <p className="text-on-surface-variant mt-1">
              {lang === 'ar' ? 'أفضل محاولة لكل لاعب — تُحدَّث تلقائياً' : 'Meilleure tentative par joueur — mise à jour automatique'}
            </p>
          </div>
        </div>

        {error && (
          <div className="card-moroccan p-space-md mb-space-lg border-error/40 flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-error">cloud_off</span>
              <div>
                <div className="text-text-on-dark-primary font-semibold">
                  {lang === 'ar' ? 'تعذر تحميل الترتيب' : 'Impossible de charger le classement'}
                </div>
                <div className="text-on-surface-variant text-sm break-all">{error}</div>
              </div>
            </div>
            <button onClick={refetch} className="btn-secondary shrink-0">
              {lang === 'ar' ? 'إعادة المحاولة' : 'Réessayer'}
            </button>
          </div>
        )}

        {top3.length > 0 && (
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-space-md mb-space-xl" aria-label={lang === 'ar' ? 'المنصة' : 'Podium'}>
            {top3.map((row: any, i: number) => (
              <PodiumCard key={row.rank ?? i} row={row} place={(i + 1) as 1 | 2 | 3} lang={lang} />
            ))}
          </section>
        )}

        <div className="grid lg:grid-cols-3 gap-space-xl items-start">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-space-xs mb-space-md">
              <span className="w-2 h-6 bg-secondary-container rounded-sm"></span>
              <h2 className="font-serif text-2xl font-semibold text-text-on-dark-primary">
                {lang === 'ar' ? 'الترتيب الكامل' : 'Classement complet'}
              </h2>
            </div>

            <div className="space-y-space-sm">
              {loading && rows.length === 0 &&
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-[58px] rounded-lg bg-surface-container animate-pulse border border-gold-metallic/10" />
                ))}

              {!loading && rows.slice(0, 50).map((r: any, i: number) => (
                <LeaderboardRow
                  key={r.rank || i}
                  rank={r.rank || i + 1}
                  name={r.full_name}
                  cls={r.class_name}
                  year={r.year_of_study}
                  score={r.score}
                  correct={r.correct_count}
                />
              ))}

              {!loading && !error && rows.length === 0 && (
                <div className="card-moroccan p-space-xl text-center flex flex-col items-center gap-space-sm">
                  <span className="material-symbols-outlined text-5xl text-gold-metallic/60">trophy</span>
                  <div className="text-text-on-dark-primary font-serif text-xl font-semibold">
                    {lang === 'ar' ? 'لا توجد نتائج بعد' : 'Aucun résultat pour le moment'}
                  </div>
                  <p className="text-on-surface-variant text-sm max-w-sm">
                    {lang === 'ar'
                      ? 'كن أول من يشارك في الاختبار ويظهر اسمه في لوحة الشرف.'
                      : 'Soyez le premier à participer et à faire apparaître votre nom au classement.'}
                  </p>
                  <Link to="/quiz" className="btn-primary mt-space-xs">
                    {lang === 'ar' ? 'ابدأ الاختبار' : 'Commencer le quiz'}
                  </Link>
                </div>
              )}
            </div>
          </div>

          <aside className="flex flex-col items-center lg:items-start gap-space-md">
            <QRCodeDisplay url={`${siteUrl}/quiz`} lang={lang} />
            <div className="card-moroccan p-space-md w-full max-w-[280px] hidden lg:block">
              <div className="flex items-center gap-space-xs text-gold-metallic mb-space-xs">
                <span className="material-symbols-outlined text-lg">info</span>
                <span className="font-semibold text-sm">{lang === 'ar' ? 'كيف يُحسب الترتيب؟' : 'Comment est calculé le classement ?'}</span>
              </div>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                {lang === 'ar'
                  ? 'تُحسب أفضل محاولة لكل لاعب: النقاط أولاً، ثم عدد الإجابات الصحيحة، ثم الوقت.'
                  : "La meilleure tentative de chaque joueur est retenue : score, puis bonnes réponses, puis temps."}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
