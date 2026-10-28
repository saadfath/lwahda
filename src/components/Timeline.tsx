import type { Lang } from '../i18n/types';

interface TimelineItem { id: string; date: string; title: string; description?: string }
interface TimelineProps { items: TimelineItem[]; lang: Lang }

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute start-[7px] top-2 bottom-2 w-px bg-gold-metallic/25" aria-hidden="true" />
      <ol className="space-y-space-md">
        {items.map((item) => (
          <li key={item.id} className="relative ps-space-lg">
            <span
              className="absolute start-0 top-1.5 w-[15px] h-[15px] rounded-full bg-surface-container border-2 border-gold-metallic"
              aria-hidden="true"
            />
            <div className="card-moroccan p-space-md">
              <div className="text-gold-metallic text-sm mb-1">{item.date}</div>
              <div className="text-text-on-dark-primary font-semibold mb-1">{item.title}</div>
              {item.description && <div className="text-on-surface-variant text-sm leading-relaxed">{item.description}</div>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
