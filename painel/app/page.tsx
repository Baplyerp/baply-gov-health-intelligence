"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Hospital, Zap, AlertTriangle, Filter, Calendar, MapPin } from "lucide-react";

import { AreaVisual, RadarVisual } from "../components/Charts"; 
import { KpiCard } from "../components/Cards";
import { useHealthData } from "../hooks/useHealthData";
import { AppShell } from "../components/AppShell";

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } } };

export default function DashboardMetrics() {
  const { projecao, eficiencia, loading } = useHealthData();
  const [filtroAtivo, setFiltroAtivo] = useState("30D");

  return (
    <AppShell>
      <div className="space-y-8">
        
        {/* BARRA DE FILTROS INTELIGENTES */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-md">
          <div className="flex gap-2 w-full md:w-auto">
            {["7D", "30D", "90D", "YTD", "2026"].map((periodo) => (
              <button 
                key={periodo} 
                onClick={() => setFiltroAtivo(periodo)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filtroAtivo === periodo ? 'bg-[#0033A0] text-white shadow-lg shadow-blue-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
              >
                {periodo}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors text-slate-300">
              <MapPin size={14} className="text-[#FFD100]" /> Todas as Regionais
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors text-slate-300">
              <Filter size={14} className="text-emerald-500" /> Filtros Avançados
            </button>
          </div>
        </motion.div>

        {/* KPIs MACRO */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard title="Cobertura SES" value="84.2%" icon={Activity} trend="+1.2%" delay={0.1} isLoading={loading} />
          <KpiCard title="Leitos MA" value="2.450" icon={Hospital} trend="+12" delay={0.2} isLoading={loading} />
          <KpiCard title="Eficácia Alocativa" value="0.78" icon={Zap} trend="+0.05" delay={0.3} isLoading={loading} />
          <KpiCard title="Risco Estimado" value="Baixo" icon={AlertTriangle} trend="-2%" delay={0.4} isLoading={loading} />
        </motion.div>

        {/* PAINÉIS DE GRÁFICO (Com mais respiro) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="lg:col-span-2 p-8 rounded-[32px] border bg-slate-900/40 border-white/10 shadow-2xl h-[500px] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#0033A0]" />
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-black text-lg uppercase flex items-center gap-3">Demanda vs. Capacidade 📊</h3>
              <button className="text-[10px] uppercase font-bold text-blue-400 flex items-center gap-1 hover:text-blue-300"><Calendar size={12}/> Histórico</button>
            </div>
            <AreaVisual data={projecao} isLight={false} />
          </motion.div>
          
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="p-8 rounded-[32px] border bg-slate-900/40 border-white/10 shadow-2xl h-[500px] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#EF3340]" />
            <h3 className="font-black text-lg uppercase mb-8 flex items-center gap-3">Benchmarking 🌐</h3>
            <RadarVisual data={eficiencia} isLight={false} />
          </motion.div>
        </div>

      </div>
    </AppShell>
  );
}