export default function LeaderboardRow({ rank, name, cls, year, score, correct }: { rank: number; name: string; cls: string; year: string; score: number; correct: number }) {
  const border = rank === 1 ? 'border-l-amber' : rank === 2 ? 'border-l-cream' : rank === 3 ? 'border-l-teal' : 'border-l-white/20';
  return (
    <div className={`flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/10 border-l-4 ${border}`}>
      <div className="w-8 text-center text-cream">{rank}</div>
      <div className="flex-1 text-cream">{name}</div>
      <div className="text-cream/80">{cls} • {year}</div>
      <div className="text-amber font-semibold">{score}</div>
      <div className="text-cream/70">{correct}/10</div>
    </div>
  );
}
