interface Source { id: string; title: string; url: string }
export default function Sources({ items }: { items: Source[] }) {
  return (
    <ul className="space-y-space-sm">
      {items.map((s) => (
        <li key={s.id} className="text-sm text-on-surface-variant">
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-gold-metallic/40 hover:text-gold-metallic transition-colors">{s.title}</a>
        </li>
      ))}
    </ul>
  );
}
