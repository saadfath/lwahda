import type { Lang } from '../i18n/types';

interface TimelineItem { id: string; date: string; title: string; description?: string }
interface TimelineProps { items: TimelineItem[]; lang: Lang }

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative pl-6 md:pl-0">
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-teal -translate-x-1/2" />
      <div className="md:hidden absolute left-2 top-0 bottom-0 w-[2px] bg-teal" />
      {items.map((item, idx) => (
        <div key={item.id} className={`relative mb-8 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'}`}>
          <div className="absolute left-0 md:left-auto md:right-0 md:translate-x-1/2 w-4 h-4 rounded-full bg-amber" style={{ [idx % 2 === 0 ? 'right' : 'left']: idx % 2 === 0 ? '-8px' : '-8px', top: '4px' }} />
          <div className="text-teal text-sm mb-1">{item.date}</div>
          <div className="text-cream font-semibold mb-1">{item.title}</div>
          {item.description && <div className="text-cream/90 text-sm">{item.description}</div>}
        </div>
      ))}
    </div>
  );
}
