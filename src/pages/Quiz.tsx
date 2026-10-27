import type { Lang } from '../i18n/types';
import questionsData from '../data/quiz.questions.json';
import { useQuizAttempt } from '../hooks/useQuizAttempt';
import TimerRing from '../components/TimerRing';
import QuizQuestion from '../components/QuizQuestion';
import { useState } from 'react';
import { isUsingMock } from '../lib/supabase';

export default function Quiz({ lang }: { lang: Lang }) {
  const { state, register, selectOption, advanceOrFinish, timeExpired, restart } = useQuizAttempt();
  const [fullName, setFullName] = useState('');
  const [className, setClassName] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('1ère année');
  const [errors, setErrors] = useState<any>({});
  const [localError, setLocalError] = useState<string | null>(null);

  const validate = () => {
    const e: any = {};
    if (fullName.trim().length < 2 || fullName.trim().length > 60) e.fullName = 'Invalid';
    if (className.trim().length < 1 || className.trim().length > 40) e.className = 'Invalid';
    if (!['1ère année','2ème année','3ème année'].includes(yearOfStudy)) e.yearOfStudy = 'Invalid';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onRegister = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setLocalError(null);
    if (!validate()) { setLocalError(lang === 'ar' ? 'يرجى التحقق من البيانات' : 'Vérifiez vos données'); return; }
    try {
      await register(fullName, className, yearOfStudy);
    } catch (err: any) {
      setLocalError(err?.message || 'Erreur');
    }
  };

  const qs = ((questionsData as any).quiz?.questions || []) as any[];

  if (state.screen === 'playing') {
    const qsList = qs;
    if (!qsList || qsList.length === 0) return <div className="min-h-screen flex items-center justify-center text-cream">No questions</div>;
    const q = qsList[state.currentIndex];
    const question = { id: q.id, text: lang === 'ar' ? q.question.ar : q.question.fr, options: q.options.map((o: any) => ({ id: o.id, text: lang === 'ar' ? o.text.ar : o.text.fr })) };
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, rgba(11,31,75,0.6) 0%, rgba(74,36,24,0.75) 100%), url(/bg/quiz-bg.jpeg) center/cover no-repeat' }}>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="mb-4 text-cream">Question {state.currentIndex + 1} / {qsList.length}</div>
          <div className="w-full h-2 bg-white/20 rounded mb-6"><div className="h-2 bg-amber rounded" style={{ width: `${((state.currentIndex + 1)/qsList.length)*100}%` }} /></div>
          <div className="flex justify-center mb-6"><TimerRing duration={20} onExpire={() => timeExpired(qsList)} key={state.currentIndex} /></div>
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <QuizQuestion question={question} selected={state.selectedOption} locked={state.isLocked} onSelect={selectOption} />
            <button disabled={!state.isLocked || state.isSubmitting} onClick={() => advanceOrFinish(qsList)} className="mt-6 px-6 py-3 rounded-full bg-amber text-ink">{lang === 'ar' ? 'التالي' : 'Suivant'}</button>
          </div>
        </div>
      </div>
    );
  }

  if (state.screen === 'register') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, rgba(11,31,75,0.6) 0%, rgba(74,36,24,0.75) 100%), url(/bg/quiz-bg.jpeg) center/cover no-repeat' }}>
        <form onSubmit={onRegister} className="bg-white/10 backdrop-blur p-6 rounded-lg max-w-md w-full space-y-4">
          {isUsingMock && (
            <div className="bg-red-500/80 text-white text-xs rounded p-2">
              ⚠️ Mode hors-ligne (Supabase non configuré) — les données ne seront pas sauvegardées.
            </div>
          )}
          <h1 className="text-cream text-2xl">{lang === 'ar' ? 'التسجيل' : 'Inscription'}</h1>
          <div>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={lang === 'ar' ? 'الاسم الكامل' : 'Nom complet'} className="w-full p-2 rounded bg-white/10 text-cream" />
            {errors.fullName && <div className="text-red-400 text-xs">{errors.fullName}</div>}
          </div>
          <div>
            <input value={className} onChange={(e) => setClassName(e.target.value)} placeholder={lang === 'ar' ? 'القسم' : 'Classe'} className="w-full p-2 rounded bg-white/10 text-cream" />
            {errors.className && <div className="text-red-400 text-xs">{errors.className}</div>}
          </div>
          <div className="flex gap-4 text-cream">
            {['1ère année','2ème année','3ème année'].map(y => (
              <label key={y} className="flex items-center gap-2"><input type="radio" checked={yearOfStudy === y} onChange={() => setYearOfStudy(y)} />{y}</label>
            ))}
          </div>
          <button type="submit" disabled={state.isSubmitting} className="w-full px-6 py-3 rounded-full bg-amber text-ink">{lang === 'ar' ? 'بدء' : 'Commencer'}</button>
          {(localError || state.error) && <div className="text-red-400 text-sm">{localError || state.error}</div>}
        </form>
      </div>
    );
  }

  if (state.screen === 'result' && state.result) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, rgba(11,31,75,0.6) 0%, rgba(74,36,24,0.75) 100%), url(/bg/quiz-bg.jpeg) center/cover no-repeat' }}>
        <div className="bg-white/10 backdrop-blur p-8 rounded-lg text-center space-y-4">
          <div className="text-amber text-6xl font-bold">{state.result.score}</div>
          <div className="text-cream">{state.result.correct_count}/10 {lang === 'ar' ? 'صحيحة' : 'correctes'}</div>
          <div className="text-cream/80">{lang === 'ar' ? 'الوقت' : 'Temps'}: {state.result.total_time_seconds}s</div>
          <div className="text-cream/80">{lang === 'ar' ? 'الترتيب' : 'Rang'}: {state.result.rank}</div>
          <div className="flex gap-3 justify-center">
            <a href="/leaderboard" className="px-6 py-3 rounded-full bg-amber text-ink">{lang === 'ar' ? 'الترتيب' : 'Classement'}</a>
            <button onClick={restart} className="px-6 py-3 rounded-full border border-amber text-amber">{lang === 'ar' ? 'إعادة' : 'Rejouer'}</button>
          </div>
        </div>
      </div>
    );
  }

  return <div>...</div>;
}
