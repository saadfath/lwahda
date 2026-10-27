interface KeyFact { label: string; value: string }
export default function KeyFacts({ items }: { items: KeyFact[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, i) => (
        <div key={i} className="bg-cream/10 border border-cream/20 rounded-lg p-4">
          <div className="text-teal text-sm mb-1">{item.label}</div>
          <div className="text-cream">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
