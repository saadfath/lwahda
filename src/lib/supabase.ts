import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

function createMockClient() {
  const store: any = { players: [], attempts: [], question_answers: [] };
  let attemptCounter = 0;
  return {
    rpc: async (name: string, params: any) => {
      try {
        if (name === 'start_attempt') {
          const id = 'mock-' + (++attemptCounter) + '-' + Math.random().toString(36).slice(2);
          store.players.push({ id: 'p'+id, full_name: params?.p_full_name, class_name: params?.p_class_name, year_of_study: params?.p_year_of_study });
          store.attempts.push({ id, player_id: 'p'+id, status: 'in_progress', started_at: new Date().toISOString() });
          try { localStorage.setItem('tawhda_attempt_id', id); } catch(e) {}
          return { data: { attempt_id: id }, error: null };
        }
        if (name === 'submit_answer') {
          const att = store.attempts.find((a:any)=>a.id===params?.p_attempt_id);
          if (!att) return { data: null, error: { message: 'attempt_not_found' } };
          if (att.status !== 'in_progress') return { data: null, error: { message: 'attempt_not_in_progress' } };
          const exists = store.question_answers.find((qa:any)=>qa.attempt_id===params?.p_attempt_id && qa.question_id===params?.p_question_id);
          if (exists) return { data: null, error: { message: 'already_answered' } };
          store.question_answers.push({ attempt_id: params?.p_attempt_id, question_id: params?.p_question_id, option_id: params?.p_option_id, is_correct: !!params?.p_option_id, submitted_at: new Date().toISOString() });
          return { data: { is_correct: !!params?.p_option_id }, error: null };
        }
        if (name === 'finish_attempt') {
          const att = store.attempts.find((a:any)=>a.id===params?.p_attempt_id);
          if (!att) return { data: null, error: { message: 'attempt_not_found' } };
          if (att.status !== 'in_progress') return { data: null, error: { message: 'attempt_not_in_progress' } };
          const answers = store.question_answers.filter((qa:any)=>qa.attempt_id===params?.p_attempt_id);
          const correct = answers.filter((a:any)=>a.is_correct).length;
          const score = correct * 150;
          att.status = 'finished';
          att.score = score;
          att.correct_count = correct;
          att.total_time_seconds = Math.floor(Math.random()*120)+60;
          att.finished_at = new Date().toISOString();
          try { localStorage.removeItem('tawhda_attempt_id'); } catch(e) {}
          return { data: { score, correct_count: correct, total_time_seconds: att.total_time_seconds, rank: 1 }, error: null };
        }
        if (name === 'get_attempt_status') {
          const att = store.attempts.find((a:any)=>a.id===params?.p_attempt_id);
          if (!att) return { data: { status: 'not_found' }, error: null };
          if (att.status === 'finished') return { data: { status: 'finished', score: att.score, correct_count: att.correct_count, total_time_seconds: att.total_time_seconds }, error: null };
          const answered = store.question_answers.filter((qa:any)=>qa.attempt_id===params?.p_attempt_id).length;
          return { data: { status: 'in_progress', next_q_index: answered }, error: null };
        }
        if (name === 'get_leaderboard') {
          return { data: [], error: null };
        }
        return { data: null, error: { message: 'Unknown RPC' } };
      } catch (e: any) {
        return { data: null, error: { message: e?.message || 'Error' } };
      }
    },
    from: () => ({ select: async () => ({ data: [], error: null }), insert: async () => ({ data: null, error: null }), update: async () => ({ data: null, error: null }), delete: async () => ({ data: null, error: null }) }),
    channel: () => ({ on: () => ({ subscribe: () => ({}) }), subscribe: () => ({}) }),
    removeChannel: () => {},
  } as any;
}

// Detect if the anon key is a placeholder/demo key
function isRealKey(key: string): boolean {
  try {
    const payload = JSON.parse(atob(key.split('.')[1]));
    // Demo keys have "supabase-demo" as issuer — reject them
    return payload?.iss !== 'supabase-demo' && payload?.role === 'anon';
  } catch {
    return false;
  }
}

let supabaseClient: any;
const hasRealConfig = url && anonKey && url.includes('supabase.co') && isRealKey(anonKey);

if (hasRealConfig) {
  try {
    supabaseClient = createClient(url!, anonKey!);
    console.log('[supabase] Connected to:', url);
  } catch (e) {
    console.error('[supabase] Failed to create client, falling back to mock:', e);
    supabaseClient = createMockClient();
  }
} else {
  console.warn(
    '[supabase] Missing or invalid config — using mock client.\n' +
    'Set VITE_SUPABASE_URL and a real VITE_SUPABASE_ANON_KEY in .env.local'
  );
  supabaseClient = createMockClient();
}

export const supabase = supabaseClient;
export const isUsingMock = !hasRealConfig;
