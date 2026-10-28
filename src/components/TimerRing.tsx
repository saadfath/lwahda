import { useEffect, useRef, useState } from 'react';
import type { Lang } from '../i18n/types';

export default function TimerRing({ duration = 20, onExpire, lang = 'fr' }: { duration?: number; onExpire: () => void; lang?: Lang }) {
  const [s, setS] = useState(duration);
  const hasExpired = useRef(false);

  useEffect(() => {
    setS(duration);
    hasExpired.current = false;
  }, [duration]);

  useEffect(() => {
    if (s <= 0) {
      if (!hasExpired.current) {
        hasExpired.current = true;
        onExpire();
      }
      return;
    }
    const t = setTimeout(() => setS(s - 1), 1000);
    return () => clearTimeout(t);
  }, [s, onExpire]);

  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (s / duration);
  const color = s <= 3 ? '#ffb4ab' : s <= 7 ? '#F59E0B' : '#86d89d';
  const label = lang === 'ar'
    ? `${s} ${s === 1 ? 'ثانية' : 'ثوانٍ'} متبقية`
    : `${s} ${s === 1 ? 'seconde' : 'secondes'} restantes`;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="72" height="72" role="timer" aria-live="polite" aria-label={label}>
        <circle cx="36" cy="36" r={radius} stroke="#44474d" strokeWidth="6" fill="none" />
        <circle cx="36" cy="36" r={radius} stroke={color} strokeWidth="6" fill="none" strokeDasharray={circ} strokeDashoffset={circ - offset} strokeLinecap="round" transform="rotate(-90 36 36)" />
        <text x="36" y="42" textAnchor="middle" fill="#FDFBF7" fontSize="16">{s}</text>
      </svg>
      <span className="text-[11px] text-on-surface-variant">
        {lang === 'ar' ? 'ثانية' : 'secondes'}
      </span>
    </div>
  );
}
