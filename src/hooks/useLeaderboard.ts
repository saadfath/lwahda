import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useLeaderboard() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    const { data } = await supabase.rpc('get_leaderboard');
    if (data) setRows(data as any[]);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
    const channel = supabase.channel('leaderboard').on('postgres_changes', { event: '*', schema: 'public', table: 'attempts' }, fetch).subscribe();
    const t = setTimeout(fetch, 5000);
    return () => { supabase.removeChannel(channel); clearTimeout(t); };
  }, []);

  return { rows, loading, refetch: fetch };
}
