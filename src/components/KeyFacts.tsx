interface KeyFact { label: string; value: string }
export default function KeyFacts({ items }: { items: KeyFact[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
      {items.map((item, i) => (
        <div key={i} className="card-moroccan p-space-md flex flex-col justify-between hover:bg-surface-container-high transition-colors">
          <div className="flex items-start justify-between gap-space-xs mb-space-sm">
            <span className="font-label-sm text-xs bg-primary-container text-on-primary-container px-2 py-0.5 rounded">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="material-symbols-outlined text-gold-metallic">verified</span>
          </div>
          <div className="text-gold-metallic font-serif text-lg mb-2">{item.label}</div>
          <div className="text-on-surface text-sm leading-relaxed">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
