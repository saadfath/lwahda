import type { Lang } from '../i18n/types';
import { useLeaderboard } from '../hooks/useLeaderboard';
import LeaderboardRow from '../components/LeaderboardRow';
import QRCodeDisplay from '../components/QRCodeDisplay';

export default function Leaderboard({ lang }: { lang: Lang }) {
  const { rows } = useLeaderboard();
  const siteUrl = (import.meta.env.VITE_PUBLIC_SITE_URL as string) || window.location.origin;
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, rgba(11,31,75,0.6) 0%, rgba(74,36,24,0.75) 100%), url(/bg/leaderboard-bg.jpeg) center/cover no-repeat' }}>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-cream text-4xl font-semibold mb-2">{lang === 'ar' ? 'الترتيب' : 'Classement'}</h1>
        <p className="text-cream/80 mb-8">{lang === 'ar' ? 'أفضل محاولة لكل لاعب' : 'Meilleure tentative par joueur'}</p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-2">
            {rows.slice(0,50).map((r: any, i: number) => (
              <LeaderboardRow key={i} rank={r.rank || i+1} name={r.full_name} cls={r.class_name} year={r.year_of_study} score={r.score} correct={r.correct_count} />
            ))}
          </div>
          <div className="flex justify-center">
            <QRCodeDisplay url={`${siteUrl}/quiz`} />
          </div>
        </div>
      </div>
    </div>
  );
}
