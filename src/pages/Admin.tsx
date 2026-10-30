import { useState } from 'react';
import { supabase } from '../lib/supabase';

const ADMIN_USER = 'molxi';
const ADMIN_PASS = 'icebear/is/goat';

export default function Admin({ lang }: { lang: 'fr' | 'ar' }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [authed, setAuthed] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setAuthed(true);
    } else {
      setMsg(lang === 'ar' ? 'خطأ في بيانات الدخول' : 'Identifiants incorrects');
    }
  };

  const removeAllPlayers = async () => {
    setLoading(true);
    setMsg(null);
    try {
      // Try to delete from attempts, question_answers, players
      await supabase.from('question_answers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('attempts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('players').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      setMsg(lang === 'ar' ? 'تم حذف جميع اللاعبين' : 'Tous les joueurs supprimés');
    } catch (e: any) {
      setMsg(e?.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, rgba(11,31,75,0.6) 0%, rgba(74,36,24,0.75) 100%)' }}>
        <form onSubmit={login} className="bg-white/10 backdrop-blur p-6 rounded-lg max-w-md w-full space-y-4">
          <h1 className="text-cream text-2xl">Admin</h1>
          <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="username" className="w-full p-2 rounded bg-white/10 text-cream" />
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="password" className="w-full p-2 rounded bg-white/10 text-cream" />
          <button type="submit" className="w-full px-6 py-3 rounded-full bg-amber text-ink">Login</button>
          {msg && <div className="text-red-400 text-sm">{msg}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, rgba(11,31,75,0.6) 0%, rgba(74,36,24,0.75) 100%)' }}>
      <div className="bg-white/10 backdrop-blur p-6 rounded-lg max-w-md w-full space-y-4 text-center">
        <h1 className="text-cream text-2xl">Admin Panel</h1>
        <button disabled={loading} onClick={removeAllPlayers} className="px-6 py-3 rounded-full bg-red-600 text-white">Remove all players</button>
        {msg && <div className="text-cream text-sm">{msg}</div>}
      </div>
    </div>
  );
}
