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
    <div className="space-y-4">
      <div className="text-cream text-lg">{question.text}</div>
      <div className="space-y-2">
        {question.options.map((opt) => {
          let cls = "w-full text-left px-5 py-4 rounded-[11px] border min-h-[56px] text-cream";
          if (reveal?.show) {
            if (reveal.correctId === opt.id) cls += " border-teal bg-teal/20";
            else if (selected === opt.id) cls += " border-red-500 bg-red-500/15";
            else cls += " border-white/18 bg-white/5";
          } else {
            if (selected === opt.id) cls += " border-amber bg-amber/15";
            else cls += " border-white/18 bg-white/5";
          }
          return (
            <button key={opt.id} disabled={locked} onClick={() => onSelect(opt.id)} className={cls}>
              {opt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
