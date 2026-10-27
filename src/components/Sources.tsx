interface Source { id: string; title: string; url: string }
export default function Sources({ items }: { items: Source[] }) {
  return (
    <ul className="space-y-2">
      {items.map((s) => (
        <li key={s.id} className="text-sm text-cream/90">
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-teal">{s.title}</a>
        </li>
      ))}
    </ul>
  );
}
