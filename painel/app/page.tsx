"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion"; // 🛡️ Importamos o Variants aqui
import { Activity, Hospital, Zap, AlertTriangle, Filter, Calendar, MapPin, Download } from "lucide-react";
import dynamic from "next/dynamic";

import { KpiCard } from "../components/Cards";
import { useHealthData } from "../hooks/useHealthData";
import { AppShell } from "../components/AppShell";

// 🚀 O SEGREDO DA VELOCIDADE: Lazy Loading
const AreaVisual = dynamic(() => import("../components/Charts").then(mod => mod.AreaVisual), { 
  ssr: false, 
  loading: () => <div className="w-full h-full flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0033A0]" /></div>
});

const RadarVisual = dynamic(() => import("../components/Charts").then(mod => mod.RadarVisual), { 
  ssr: false, 
  loading: () => <div className="w-full h-full flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EF3340]" /></div>
});

// 🛡️ CORREÇÃO: Constante tipada perfeitamente
const fadeUp: Variants = { 
  hidden: { opacity: 0, y: 15 }, 
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } 
};

export default function DashboardMetrics({ isLightMode }: any) {
  const { projecao, eficiencia, loading } = useHealthData();
  const [filtroAtivo, setFiltroAtivo] = useState("30D");

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* BARRA DE FILTROS BENTO GRID */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className={`flex flex-col xl:flex-row justify-between items-center gap-4 p-3 rounded-2xl border ${isLightMode ? 'bg-white border-slate-200' : 'glass-panel'}`}>
          <div className="flex gap-1 bg-black/5 dark:bg-black/20 p-1 rounded-xl w-full xl:w-auto overflow-x-auto custom-scrollbar">
            {["7D", "30D", "90D", "YTD", "2026"].map((periodo) => (
              <button 
                key={periodo} 
                onClick={() => setFiltroAtivo(periodo)}
                className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filtroAtivo === periodo ? 'bg-[#0033A0] text-white shadow-md' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}`}
              >
                {periodo}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2 w-full xl:w-auto">
            <button className={`flex-1 xl:flex-none flex justify-center items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-colors ${isLightMode ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}>
              <MapPin size={14} className="text-[#FFD100]" /> Todas as Regiões
            </button>
            <button className={`flex-1 xl:flex-none flex justify-center items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-colors ${isLightMode ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}>
              <Filter size={14} className="text-[#009B3A]" /> Filtrar
            </button>
            <button className={`hidden sm:flex justify-center items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-colors ${isLightMode ? 'bg-[#0033A0] text-white border-transparent shadow-md' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}>
              <Download size={14} /> Relatório
            </button>
          </div>
        </motion.div>

        {/* KPIs MACRO */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Cobertura SES" value="84.2%" icon={Activity} trend="+1.2%" delay={0.1} isLight={isLightMode} isLoading={loading} />
          <KpiCard title="Leitos MA" value="2.450" icon={Hospital} trend="+12" delay={0.2} isLight={isLightMode} isLoading={loading} />
          <KpiCard title="Eficácia Alocativa" value="0.78" icon={Zap} trend="+0.05" delay={0.3} isLight={isLightMode} isLoading={loading} />
          <KpiCard title="Risco Estimado" value="Baixo" icon={AlertTriangle} trend="-2%" delay={0.4} isLight={isLightMode} isLoading={loading} />
        </motion.div>

        {/* BENTO GRID DE INSIGHTS E GRÁFICOS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <motion.div variants={fadeUp} initial="hidden" animate="show" className={`lg:col-span-2 p-6 rounded-3xl border relative overflow-hidden flex flex-col ${isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'glass-panel'} h-[450px]`}>
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0033A0]" />
            <div className="flex justify-between items-center mb-6 pl-2">
              <h3 className="font-black text-sm md:text-base uppercase flex items-center gap-2">Demanda vs. Capacidade 📊</h3>
              <button className="text-[9px] uppercase font-bold text-slate-400 hover:text-[#0033A0] transition-colors flex items-center gap-1 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg"><Calendar size={12}/> Histórico</button>
            </div>
            <div className="flex-1 w-full min-h-0">
              <AreaVisual data={projecao} isLight={isLightMode} />
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp} initial="hidden" animate="show" className={`p-6 rounded-3xl border relative overflow-hidden flex flex-col ${isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'glass-panel'} h-[450px]`}>
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#EF3340]" />
            <div className="mb-6 pl-2">
              <h3 className="font-black text-sm md:text-base uppercase flex items-center gap-2">Benchmark Global 🌍</h3>
              <p className="text-[9px] opacity-50 uppercase tracking-widest mt-1 font-bold">Maranhão vs Padrão OCDE</p>
            </div>
            <div className="flex-1 w-full min-h-0">
              <RadarVisual data={eficiencia} isLight={isLightMode} />
            </div>
          </motion.div>

        </div>

      </div>
    </AppShell>
  );
}