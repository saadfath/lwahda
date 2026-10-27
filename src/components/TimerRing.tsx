import { useEffect, useState } from 'react';

export default function TimerRing({ duration = 20, onExpire }: { duration?: number; onExpire: () => void }) {
  const [s, setS] = useState(duration);
  useEffect(() => {
    if (s <= 0) { onExpire(); return; }
    const t = setTimeout(() => setS(s - 1), 1000);
    return () => clearTimeout(t);
  }, [s, onExpire]);
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (s / duration);
  const color = s <= 3 ? '#c0392b' : s <= 7 ? '#F2A93B' : '#1F9A94';
  return (
    <svg width="72" height="72">
      <circle cx="36" cy="36" r={radius} stroke="#ffffff22" strokeWidth="6" fill="none" />
      <circle cx="36" cy="36" r={radius} stroke={color} strokeWidth="6" fill="none" strokeDasharray={circ} strokeDashoffset={circ - offset} strokeLinecap="round" transform="rotate(-90 36 36)" />
      <text x="36" y="42" textAnchor="middle" fill="#F6E7CB" fontSize="16">{s}</text>
    </svg>
  );
}
