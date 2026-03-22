"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Bell, User, Sun, Moon, Search, CheckCircle, Database } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Importando seus novos componentes (você vai criar os outros abaixo)
import { Sidebar } from "@/components/Sidebar";
import { AreaVisual, RadarVisual } from "@/components/Charts"; 
import { KpiCard, DocumentCard } from "@/components/Cards";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function HubGovernanca() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({ projecao: [], eficiencia: [], evidencias: [] });
  const [buscaCnpj, setBuscaCnpj] = useState("");
  const [unidadeReal, setUnidadeReal] = useState<any>(null);
  const [searchingApi, setSearchingApi] = useState(false);

  const theme = useMemo(() => ({
    bg: isLightMode ? "bg-slate-50 text-slate-900" : "bg-[#070B14] text-slate-100",
    card: isLightMode ? "bg-white/80 border-slate-200 shadow-xl" : "bg-slate-900/60 border-white/5 shadow-2xl",
    header: isLightMode ? "bg-white/70 border-b border-slate-200" : "bg-[#0D1425]/70 border-b border-white/5",
    accent: isLightMode ? "bg-[#0033A0] text-white" : "bg-[#FFD100] text-[#0B1120]"
  }), [isLightMode]);

  useEffect(() => {
    async function carregar() {
      const [ind, mat, ev] = await Promise.all([
        supabase.from('indicadores_capacidade').select('*').order('mes_referencia'),
        supabase.from('matriz_benchmark_global').select('*'),
        supabase.from('repositorio_evidencias').select('*')
      ]);
      setData({
        projecao: ind.data?.map(i => ({ mes: new Date(i.mes_referencia).toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase(), atual: i.taxa_ocupacao_atual, projetado: i.demanda_projetada, alerta: i.limite_critico })) || [],
        eficiencia: mat.data?.map(m => ({ metrica: m.eixo_analise, Maranhao: m.score_maranhao, OCDE: m.score_ocde, SinoBrasileiro: m.score_sino_brasileiro })) || [],
        evidencias: ev.data || []
      });
      setIsLoading(false);
    }
    carregar();
  }, []);

  return (
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-500 ${theme.bg}`}>
      
      <Sidebar isOpen={isSidebarOpen} setOpen={setSidebarOpen} isLight={isLightMode} menuItems={[]} />

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* HEADER */}
        <header className={`h-24 px-10 flex items-center justify-between backdrop-blur-md sticky top-0 z-30 ${theme.header}`}>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">Inteligência Estratégica</h1>
            <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mt-1">Jean Batista | Trainee Gestão Pública</p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsLightMode(!isLightMode)} className="p-3 rounded-2xl border border-inherit">
              {isLightMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#0033A0] flex items-center justify-center border-2 border-white/20 shadow-xl">
              <User size={22} className="text-white" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
           {/* CONTEÚDO DOS CARDS E GRÁFICOS VEM AQUI */}
           {/* Aqui você chamaria <KpiCard />, <AreaVisual />, etc */}
           <p className="text-center opacity-30 uppercase font-black tracking-[1em]">Sistema Operacional</p>
        </main>
      </div>
    </div>
  );
}