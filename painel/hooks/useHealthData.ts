"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// 🛡️ AQUI ESTÁ A MÁGICA: Ensinamos ao TypeScript o que é esse dado
interface HealthData {
  projecao: any[];
  eficiencia: any[];
  evidencias: any[];
}

export function useHealthData() {
  // Inicialização blindada informando o tipo <HealthData>
  const [data, setData] = useState<HealthData>({ 
    projecao: [], 
    eficiencia: [], 
    evidencias: [] 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; 

    async function load() {
      try {
        const [ind, mat, ev] = await Promise.all([
          supabase.from('indicadores_capacidade').select('*').order('mes_referencia'),
          supabase.from('matriz_benchmark_global').select('*'),
          supabase.from('repositorio_evidencias').select('*')
        ]);

        if (isMounted) {
          setData({
            projecao: Array.isArray(ind.data) ? ind.data.map(i => ({ 
              mes: new Date(i.mes_referencia).toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase(), 
              atual: i.taxa_ocupacao_actual || i.taxa_ocupacao_atual || 0, 
              projetado: i.demanda_projetada || 0, 
              alerta: i.limite_critico || 0 
            })) : [],
            
            eficiencia: Array.isArray(mat.data) ? mat.data.map(m => ({ 
              metrica: m.eixo_analise || "N/A", 
              Maranhao: m.score_maranhao || 0, 
              OCDE: m.score_ocde || 0, 
              SinoBrasileiro: m.score_sino_brasileiro || 0 
            })) : [],
            
            evidencias: Array.isArray(ev.data) ? ev.data : []
          });
        }
      } catch (error) {
        console.error("🚨 Erro Crítico ao buscar dados no Supabase:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();

    return () => { isMounted = false; };
  }, []);

  return { 
    projecao: data.projecao || [], 
    eficiencia: data.eficiencia || [], 
    evidencias: data.evidencias || [], 
    loading 
  };
}