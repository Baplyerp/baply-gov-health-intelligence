import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useHealthData() {
  const [data, setData] = useState<any>({ projecao: [], eficiencia: [], evidencias: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [ind, mat, ev] = await Promise.all([
          supabase.from('indicadores_capacidade').select('*').order('mes_referencia'),
          supabase.from('matriz_benchmark_global').select('*'),
          supabase.from('repositorio_evidencias').select('*')
        ]);

        setData({
          projecao: ind.data?.map(i => ({ 
            mes: new Date(i.mes_referencia).toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase(), 
            atual: i.taxa_ocupacao_atual, 
            projetado: i.demanda_projetada, 
            alerta: i.limite_critico 
          })) || [],
          eficiencia: mat.data?.map(m => ({ 
            metrica: m.eixo_analise, 
            Maranhao: m.score_maranhao, 
            OCDE: m.score_ocde, 
            SinoBrasileiro: m.score_sino_brasileiro 
          })) || [],
          evidencias: ev.data || []
        });
      } catch (error) {
        console.error("Erro na Sala de Situação:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { ...data, loading };
}