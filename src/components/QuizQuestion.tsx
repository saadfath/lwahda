interface Option { id: string; text: string }
interface QuizQuestionProps {
  question: { id: string; text: string; options: Option[] };
  selected: string | null;
  locked: boolean;
  onSelect: (id: string) => void;
  reveal?: { correctId: string; show: boolean };
}
export default function QuizQuestion({ question, selected, locked, onSelect, reveal }: QuizQuestionProps) {
  return (
    <div className="space-y-space-md">
      <div className="text-text-on-dark-primary text-lg leading-relaxed">{question.text}</div>
      <div className="space-y-space-sm">
        {question.options.map((opt) => {
          let cls = "w-full text-start px-5 py-4 rounded border min-h-[56px] text-on-surface transition-all";
          if (reveal?.show) {
            if (reveal.correctId === opt.id) cls += " border-emerald-bright bg-emerald-bright/20";
            else if (selected === opt.id) cls += " border-error bg-error/15";
            else cls += " border-outline-variant bg-surface-container-high";
          } else {
            if (selected === opt.id) cls += " border-gold-metallic bg-gold-metallic/15";
            else cls += " border-outline-variant bg-surface-container-high hover:border-gold-metallic/50 hover:bg-gold-metallic/10";
          }
          return (
            <button key={opt.id} disabled={locked} onClick={() => onSelect(opt.id)} className={cls} aria-pressed={selected === opt.id}>
              {opt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
