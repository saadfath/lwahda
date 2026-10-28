import type { Lang } from '../i18n/types';
import questionsData from '../data/quiz.questions.json';
import { useQuizAttempt } from '../hooks/useQuizAttempt';
import TimerRing from '../components/TimerRing';
import QuizQuestion from '../components/QuizQuestion';
import { useState } from 'react';
import { isUsingMock } from '../lib/supabase';
import { Link } from 'react-router-dom';

export default function Quiz({ lang }: { lang: Lang }) {
  const { state, register, selectOption, advanceOrFinish, timeExpired, restart } = useQuizAttempt();
  const [fullName, setFullName] = useState('');
  const [className, setClassName] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('1ère année');
  const [errors, setErrors] = useState<any>({});
  const [localError, setLocalError] = useState<string | null>(null);

  const validate = () => {
    const e: any = {};
    if (fullName.trim().length < 2 || fullName.trim().length > 60) e.fullName = lang === 'ar' ? 'الاسم يجب أن يكون بين 2 و60 حرفا' : 'Le nom doit faire entre 2 et 60 caractères';
    if (className.trim().length < 1 || className.trim().length > 40) e.className = lang === 'ar' ? 'القسم مطلوب' : 'La classe est requise';
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
    if (!qsList || qsList.length === 0) return <div className="min-h-screen flex items-center justify-center text-on-surface">No questions</div>;
    const q = qsList[state.currentIndex];
    const question = { id: q.id, text: lang === 'ar' ? q.question.ar : q.question.fr, options: q.options.map((o: any) => ({ id: o.id, text: lang === 'ar' ? o.text.ar : o.text.fr })) };
    const progress = ((state.currentIndex + 1) / qsList.length) * 100;
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, rgba(9,20,36,0.8) 0%, rgba(17,40,74,0.9) 100%), url(/bg/quiz-bg.jpeg) center/cover no-repeat' }}>
        <div className="max-w-3xl mx-auto px-margin-mobile lg:px-margin py-space-xl">
          <div className="mb-2 text-on-surface font-body-sm">{lang === 'ar' ? 'السؤال' : 'Question'} {state.currentIndex + 1} / {qsList.length}</div>
          <div className="w-full h-2 bg-surface-container-high rounded mb-space-lg overflow-hidden"><div className="h-2 bg-gold-metallic rounded transition-all duration-300" style={{ width: `${progress}%` }} /></div>
          <div className="flex justify-center mb-space-lg"><TimerRing duration={20} onExpire={() => timeExpired(qsList)} key={state.currentIndex} lang={lang} /></div>
          <div className="card-moroccan p-space-lg">
            <QuizQuestion question={question} selected={state.selectedOption} locked={state.isLocked} onSelect={selectOption} />
            <button disabled={!state.isLocked || state.isSubmitting} onClick={() => advanceOrFinish(qsList)} className="mt-space-lg btn-primary disabled:opacity-50 disabled:cursor-not-allowed">{lang === 'ar' ? 'التالي' : 'Suivant'}</button>
          </div>
        </div>
      </div>
    );
  }

  if (state.screen === 'register') {
    return (
      <div className="min-h-screen flex items-center justify-center px-margin-mobile" style={{ background: 'linear-gradient(180deg, rgba(9,20,36,0.85) 0%, rgba(17,40,74,0.9) 100%), url(/bg/quiz-bg.jpeg) center/cover no-repeat' }}>
        <form onSubmit={onRegister} className="card-moroccan p-space-lg md:p-space-xl max-w-md w-full space-y-space-md">
          {isUsingMock && (
            <div className="bg-error-container text-on-error-container text-xs rounded p-space-xs">
              {lang === 'ar' ? '⚠️ وضع عدم الاتصال - لن يتم حفظ البيانات' : '⚠️ Mode hors-ligne (Supabase non configuré) — les données ne seront pas sauvegardées.'}
            </div>
          )}
          <h1 className="font-serif text-3xl font-semibold text-text-on-dark-primary">{lang === 'ar' ? 'التسجيل' : 'Inscription'}</h1>
          <div>
            <label className="block text-on-surface-variant text-sm mb-1">{lang === 'ar' ? 'الاسم الكامل' : 'Nom complet'}</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={lang === 'ar' ? 'الاسم الكامل' : 'Nom complet'} className="w-full p-2 rounded bg-surface-container-high text-on-surface border border-outline-variant focus:border-gold-metallic focus:outline-none" maxLength={60} />
            {errors.fullName && <div className="text-error text-xs mt-1">{errors.fullName}</div>}
          </div>
          <div>
            <label className="block text-on-surface-variant text-sm mb-1">{lang === 'ar' ? 'القسم / الصف' : 'Classe'}</label>
            <input value={className} onChange={(e) => setClassName(e.target.value)} placeholder={lang === 'ar' ? 'القسم' : 'Classe'} className="w-full p-2 rounded bg-surface-container-high text-on-surface border border-outline-variant focus:border-gold-metallic focus:outline-none" maxLength={40} />
            {errors.className && <div className="text-error text-xs mt-1">{errors.className}</div>}
          </div>
          <div>
            <label className="block text-on-surface-variant text-sm mb-2">{lang === 'ar' ? 'السنة الدراسية' : "Année d'études"}</label>
            <div className="flex flex-wrap gap-space-md text-on-surface">
              {['1ère année','2ème année','3ème année'].map(y => (
                <label key={y} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={yearOfStudy === y} onChange={() => setYearOfStudy(y)} className="accent-gold-metallic" />
                  <span>
                    {lang === 'ar'
                      ? { '1ère année': 'السنة الأولى', '2ème année': 'السنة الثانية', '3ème année': 'السنة الثالثة' }[y]
                      : y}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <button type="submit" disabled={state.isSubmitting} className="w-full btn-primary disabled:opacity-50">{lang === 'ar' ? 'بدء الاختبار' : 'Commencer le quiz'}</button>
          {(localError || state.error) && <div className="text-error text-sm">{localError || state.error}</div>}
        </form>
      </div>
    );
  }

  if (state.screen === 'result' && state.result) {
    return (
      <div className="min-h-screen flex items-center justify-center px-margin-mobile" style={{ background: 'linear-gradient(180deg, rgba(9,20,36,0.85) 0%, rgba(17,40,74,0.9) 100%), url(/bg/quiz-bg.jpeg) center/cover no-repeat' }}>
        <div className="card-moroccan p-space-xl text-center space-y-space-md max-w-md w-full">
          <div className="text-gold-metallic text-6xl font-bold font-serif">{state.result.score}</div>
          <div className="text-text-on-dark-primary text-lg">{state.result.correct_count}/10 {lang === 'ar' ? 'إجابة صحيحة' : 'correctes'}</div>
          <div className="text-on-surface-variant">{lang === 'ar' ? 'الوقت' : 'Temps'}: {Math.round(state.result.total_time_seconds * 10) / 10}s</div>
          <div className="text-on-surface-variant">{lang === 'ar' ? 'الترتيب' : 'Rang'}: #{state.result.rank}</div>
          <div className="flex flex-wrap gap-space-md justify-center">
            <Link to="/leaderboard" className="btn-primary">{lang === 'ar' ? 'عرض الترتيب' : 'Voir le classement'}</Link>
            <button onClick={restart} className="btn-secondary">{lang === 'ar' ? 'إعادة اللعب' : 'Rejouer'}</button>
          </div>
        </div>
      </div>
    );
  }

  return <div className="min-h-screen flex items-center justify-center text-on-surface">{lang === 'ar' ? 'جاري التحميل...' : 'Chargement...'}</div>;
}
