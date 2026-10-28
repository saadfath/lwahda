import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useLeaderboard() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    try {
      const { data, error: rpcError } = await supabase.rpc('get_leaderboard');
      if (rpcError) throw rpcError;
      if (data) setRows(data as any[]);
      setError(null);
    } catch (e: any) {
      setError(e?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
    let fallbackTimer: any = null;
    try {
      const channel = supabase.channel('leaderboard')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'attempts' } as any, fetch as any)
        .subscribe((status: any) => {
          if (status !== 'SUBSCRIBED') {
            if (!fallbackTimer) {
              fallbackTimer = setInterval(fetch, 10000);
            }
          } else if (fallbackTimer) {
            clearInterval(fallbackTimer);
            fallbackTimer = null;
          }
        });
      const timeout = setTimeout(() => {
        if (!fallbackTimer) {
          fallbackTimer = setInterval(fetch, 10000);
        }
      }, 5000);
      return () => {
        try { supabase.removeChannel(channel); } catch(e) {}
        clearTimeout(timeout);
        if (fallbackTimer) clearInterval(fallbackTimer);
      };
    } catch (e) {
      const interval = setInterval(fetch, 10000);
      return () => clearInterval(interval);
    }
  }, []);

  return { rows, loading, error, refetch: fetch };
}
