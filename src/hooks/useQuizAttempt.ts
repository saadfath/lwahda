import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface QuizAttemptState {
  screen: 'register' | 'playing' | 'result';
  attemptId: string | null;
  currentIndex: number;
  selectedOption: string | null;
  isLocked: boolean;
  isSubmitting: boolean;
  result: { score: number; correct_count: number; total_time_seconds: number; rank: number } | null;
  error: string | null;
}

export function useQuizAttempt() {
  const [state, setState] = useState<QuizAttemptState>({
    screen: 'register',
    attemptId: null,
    currentIndex: 0,
    selectedOption: null,
    isLocked: false,
    isSubmitting: false,
    result: null,
    error: null,
  });

  useEffect(() => {
    try {
      const id = localStorage.getItem('tawhda_attempt_id');
      if (!id) return;
      (async () => {
        try {
          const { data, error } = await supabase.rpc('get_attempt_status', { p_attempt_id: id });
          if (error) throw error;
          const res = data as any;
          if (res?.status === 'in_progress') {
            setState(s => ({ ...s, screen: 'playing', attemptId: id, currentIndex: res.next_q_index || 0, selectedOption: null, isLocked: false }));
          } else if (res?.status === 'finished') {
            try { localStorage.removeItem('tawhda_attempt_id'); } catch(e) {}
            setState(s => ({ ...s, screen: 'result', result: { score: res.score, correct_count: res.correct_count, total_time_seconds: res.total_time_seconds, rank: res.rank || 0 } }));
          } else {
            try { localStorage.removeItem('tawhda_attempt_id'); } catch(e) {}
          }
        } catch {
          try { localStorage.removeItem('tawhda_attempt_id'); } catch(e) {}
        }
      })();
    } catch(e) {}
  }, []);

  const register = async (fullName: string, className: string, yearOfStudy: string) => {
    setState(s => ({ ...s, isSubmitting: true, error: null }));
    try {
      const { data, error } = await supabase.rpc('start_attempt', { p_full_name: String(fullName).trim(), p_class_name: String(className).trim(), p_year_of_study: yearOfStudy });
      if (error) throw error;
      const res = data as any;
      const aid = res?.attempt_id;
      if (!aid) throw new Error('No attempt id');
      try { localStorage.setItem('tawhda_attempt_id', aid); } catch(e) {}
      setState(s => ({ ...s, screen: 'playing', attemptId: aid, currentIndex: 0, isSubmitting: false, selectedOption: null, isLocked: false }));
      return { attempt_id: aid };
    } catch (e: any) {
      setState(s => ({ ...s, isSubmitting: false, error: e?.message || 'Error' }));
      throw e;
    }
  };

  const selectOption = (optionId: string) => {
    setState(s => ({ ...s, selectedOption: optionId, isLocked: true }));
  };

  const advanceOrFinish = async (questions: any[]) => {
    const { attemptId, currentIndex, selectedOption } = state;
    if (!attemptId) return;
    setState(s => ({ ...s, isSubmitting: true }));
    try {
      const q = questions[currentIndex];
      await supabase.rpc('submit_answer', { p_attempt_id: attemptId, p_question_id: q.id, p_option_id: selectedOption });
      if (currentIndex + 1 >= questions.length) {
        const { data, error } = await supabase.rpc('finish_attempt', { p_attempt_id: attemptId });
        if (error) throw error;
        try { localStorage.removeItem('tawhda_attempt_id'); } catch(e) {}
        setState(s => ({ ...s, screen: 'result', result: data as any, isSubmitting: false }));
      } else {
        setState(s => ({ ...s, currentIndex: currentIndex + 1, selectedOption: null, isLocked: false, isSubmitting: false }));
      }
    } catch (e: any) {
      setState(s => ({ ...s, isSubmitting: false, error: e?.message || 'Error' }));
    }
  };

  const timeExpired = async (questions: any[]) => {
    const { attemptId, currentIndex } = state;
    if (!attemptId || state.isLocked) return;
    setState(s => ({ ...s, isLocked: true, selectedOption: null, isSubmitting: true }));
    try {
      const q = questions[currentIndex];
      await supabase.rpc('submit_answer', { p_attempt_id: attemptId, p_question_id: q.id, p_option_id: null });
      if (currentIndex + 1 >= questions.length) {
        const { data, error } = await supabase.rpc('finish_attempt', { p_attempt_id: attemptId });
        if (error) throw error;
        try { localStorage.removeItem('tawhda_attempt_id'); } catch(e) {}
        setState(s => ({ ...s, screen: 'result', result: data as any, isSubmitting: false }));
      } else {
        setState(s => ({ ...s, currentIndex: currentIndex + 1, selectedOption: null, isLocked: false, isSubmitting: false }));
      }
    } catch (e: any) {
      setState(s => ({ ...s, isSubmitting: false, error: e?.message || 'Error' }));
    }
  };

  const restart = () => {
    try { localStorage.removeItem('tawhda_attempt_id'); } catch(e) {}
    setState({ screen: 'register', attemptId: null, currentIndex: 0, selectedOption: null, isLocked: false, isSubmitting: false, result: null, error: null });
  };

  return { state, register, selectOption, advanceOrFinish, timeExpired, restart };
}
