export default function LeaderboardRow({ rank, name, cls, year, score, correct }: { rank: number; name: string; cls: string; year: string; score: number; correct: number }) {
  const borderColor = rank === 1 ? 'border-s-gold-metallic' : rank === 2 ? 'border-s-on-surface-variant' : rank === 3 ? 'border-s-emerald-bright' : 'border-s-outline-variant';
  const bgColor = rank === 1 ? 'bg-gold-metallic/10' : rank === 2 ? 'bg-surface-container-high' : rank === 3 ? 'bg-emerald-bright/10' : 'bg-surface-container';
  const rankColor = rank === 1 ? 'text-gold-metallic' : rank === 2 ? 'text-on-surface' : rank === 3 ? 'text-emerald-bright' : 'text-on-surface-variant';
  return (
    <div className={`flex items-center gap-3 md:gap-4 p-3 rounded-lg border border-gold-metallic/20 border-s-4 ${borderColor} ${bgColor} hover:bg-surface-container-high transition-colors`}>
      <div className={`w-8 text-center font-bold font-serif ${rankColor}`}>{rank}</div>
      <div className="flex-1 text-text-on-dark-primary truncate min-w-0">{name}</div>
      <div className="text-on-surface-variant text-sm hidden sm:block">{cls} • {year}</div>
      <div className="text-gold-metallic font-semibold">{score}</div>
      <div className="text-on-surface-variant text-sm">{correct}/10</div>
    </div>
  );
}
