import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useHealthData() {
  const [data, setData] = useState({ projecao: [], eficiencia: [], evidencias: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [ind, mat, ev] = await Promise.all([
        supabase.from('indicadores_capacidade').select('*').order('mes_referencia'),
        supabase.from('matriz_benchmark_global').select('*'),
        supabase.from('repositorio_evidencias').select('*')
      ]);
      // Lógica de formatação que estava no page.tsx vem para cá
      setData({ /* ... formatar dados ... */ });
      setLoading(false);
    }
    load();
  }, []);

  return { ...data, loading };
}