"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Activity, User, Sun, Moon, Search, CheckCircle, Database, 
  Hospital, Users, Zap, AlertTriangle, ShieldCheck, MapPin
} from "lucide-react";

import { Sidebar } from "../components/Sidebar";
import { AreaVisual, RadarVisual } from "../components/Charts"; 
import { KpiCard, DocumentCard } from "../components/Cards";
import { useHealthData } from "../hooks/useHealthData";

// Animações Premium
const fadeUpContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};
const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
};

export default function HubGovernanca() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);
  
  const { projecao, eficiencia, evidencias, loading } = useHealthData();
  
  const [buscaCnpj, setBuscaCnpj] = useState("");
  const [unidadeReal, setUnidadeReal] = useState<any>(null);
  const [searchingApi, setSearchingApi] = useState(false);

  const theme = useMemo(() => ({
    bg: isLightMode ? "bg-slate-50 text-slate-900" : "bg-[#030610] text-slate-100",
    card: isLightMode ? "bg-white/90 border-slate-200 shadow-xl" : "bg-[#0A0F1C]/80 border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl",
    header: isLightMode ? "bg-white/80 border-b border-slate-200" : "bg-[#070B14]/80 border-b border-white/5 backdrop-blur-3xl",
    accent: isLightMode ? "bg-[#0033A0] text-white shadow-blue-500/40" : "bg-gradient-to-r from-[#FFD100] to-[#FFaa00] text-[#0B1120] shadow-[#FFD100]/20"
  }), [isLightMode]);

  const handleSearchCnpj = async () => {
    if (!buscaCnpj) return;
    setSearchingApi(true);
    try {
      const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${buscaCnpj.replace(/\D/g, '')}`);
      const apiData = await res.json();
      setUnidadeReal(apiData);
    } catch (e) { 
      console.error("Erro na busca:", e); 
    } finally { 
      setSearchingApi(false); 
    }
  };

  const safeEvidencias = Array.isArray(evidencias) ? evidencias : [];

  return (
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-700 ${theme.bg}`}>
      
      {/* 🌌 GLOWS CINEMÁTICOS DE FUNDO */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 12, repeat: Infinity }} className="absolute -top-[25%] -left-[10%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#0033A0] to-[#001144] blur-[180px] will-change-transform" />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 18, repeat: Infinity }} className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tl from-[#EF3340] to-transparent blur-[180px] will-change-transform" />
      </div>

      {/* SIDEBAR COM MENU INJETADO */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setOpen={setSidebarOpen} 
        isLight={isLightMode} 
        menuItems={[
          { icon: Activity, label: "Cenários", active: true },
          { icon: Hospital, label: "Rede Física", active: false },
          { icon: Users, label: "Gestores", active: false },
          { icon: ShieldCheck, label: "Auditoria TCU", active: false }
        ]} 
      />

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className={`h-24 px-10 flex items-center justify-between sticky top-0 z-30 ${theme.header}`}>
          <div className="flex flex-col">
            <h1 className="text-3xl font-black tracking-tighter uppercase flex items-center gap-3 drop-shadow-md">
              Inteligência de Estado <ShieldCheck size={28} className="text-[#009B3A]" />
            </h1>
            <p className="text-[11px] font-bold opacity-70 uppercase tracking-[0.2em] mt-1 text-[#FFD100]">Centro de Comando • SES/MA 🚀</p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsLightMode(!isLightMode)} className={`p-4 rounded-2xl border transition-all active:scale-90 ${isLightMode ? 'bg-amber-50 border-amber-200 text-amber-500' : 'bg-white/5 border-white/10 text-[#FFD100] hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,209,0,0.3)]'}`}>
              {isLightMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-inherit">
              <div className="text-right uppercase">
                <p className="text-sm font-black">Jean Batista</p>
                <p className="text-[10px] font-bold text-[#0033A0] tracking-wider">Trainee Gov.MA 🎯</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0033A0] to-[#001a55] border-2 border-white/20 shadow-2xl flex items-center justify-center relative hover:scale-105 transition-transform cursor-pointer">
                <span className="absolute -top-1 -right-1 flex h-4 w-4"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#030610]"></span></span>
                <User size={24} className="text-white" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <motion.div variants={fadeUpContainer} initial="hidden" animate="show" className="space-y-12">
            
            {/* 🔍 MÓDULO RASTREIO (RADAR) */}
            <motion.section variants={fadeUpItem} className={`p-10 rounded-[40px] border relative overflow-hidden group ${theme.card}`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0033A0] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
                <div className="flex-1 space-y-5">
                  <h3 className="font-black text-xl uppercase flex items-center gap-3"><Search size={24} className="text-[#0033A0] drop-shadow-[0_0_10px_rgba(0,51,160,0.8)]"/> Rastreamento Tático (CNES) 🛰️</h3>
                  <div className="flex gap-3">
                    <input 
                      type="text" placeholder="Insira o CNPJ do Alvo..." 
                      className={`flex-1 px-6 py-5 rounded-2xl text-sm font-bold border-2 outline-none transition-all ${isLightMode ? 'bg-white border-slate-200 shadow-inner' : 'bg-black/50 border-white/10 focus:border-[#FFD100] shadow-inner'}`}
                      value={buscaCnpj} onChange={(e) => setBuscaCnpj(e.target.value)} 
                    />
                    <button onClick={handleSearchCnpj} disabled={searchingApi} className={`px-10 py-5 rounded-2xl font-black text-sm uppercase shadow-2xl transition-all active:scale-95 ${theme.accent}`}>
                      {searchingApi ? "Buscando..." : "Localizar ⚡"}
                    </button>
                  </div>
                </div>
                <AnimatePresence>
                  {unidadeReal && (
                    <motion.div initial={{ opacity: 0, scale: 0.8, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} className="flex-1 p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/30 flex gap-6 items-center shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden">
                      <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full" />
                      <div className="p-4 rounded-2xl bg-emerald-500/20 backdrop-blur-md relative z-10"><CheckCircle size={36} className="text-emerald-400" /></div>
                      <div className="relative z-10">
                        <p className="text-[10px] font-black opacity-60 uppercase mb-1 tracking-widest text-emerald-300">Alvo Confirmado</p>
                        <h4 className="font-black text-sm uppercase leading-tight text-white mb-2">{unidadeReal.nome_fantasia || unidadeReal.razao_social}</h4>
                        <p className="text-[11px] opacity-80 font-bold uppercase flex items-center gap-2"><MapPin size={12} className="text-emerald-400" /> {unidadeReal.municipio} - {unidadeReal.uf}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>

            {/* 📈 KPI GRID */}
            <motion.div variants={fadeUpContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <KpiCard title="Cobertura Macro" value="84.2%" icon={Activity} trend="+1.2%" isLight={isLightMode} isLoading={loading} delay={0.1} />
              <KpiCard title="Leitos Operacionais" value="2.450" icon={Hospital} trend="+12" isLight={isLightMode} isLoading={loading} delay={0.2} />
              <KpiCard title="Eficiência Tática" value="0.78" icon={Zap} trend="+0.05" isLight={isLightMode} isLoading={loading} delay={0.3} />
              <KpiCard title="Nível de Risco" value="Baixo" icon={AlertTriangle} trend="-2%" isLight={isLightMode} isLoading={loading} delay={0.4} />
            </motion.div>

            {/* 📊 GRÁFICOS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <motion.div variants={fadeUpItem} className={`lg:col-span-2 p-10 rounded-[40px] border relative overflow-hidden ${theme.card} h-[500px]`}>
                <div className="absolute top-0 left-0 w-2 h-full bg-[#0033A0]" />
                <h3 className="font-black text-xl uppercase mb-10 flex items-center gap-3">Projeção Assistencial 📊</h3>
                <AreaVisual data={projecao} isLight={isLightMode} />
              </motion.div>
              <motion.div variants={fadeUpItem} className={`p-10 rounded-[40px] border relative overflow-hidden ${theme.card} h-[500px]`}>
                <div className="absolute top-0 left-0 w-2 h-full bg-[#EF3340]" />
                <h3 className="font-black text-xl uppercase mb-10 flex items-center gap-3">Benchmark Global 🌍</h3>
                <RadarVisual data={eficiencia} isLight={isLightMode} />
              </motion.div>
            </div>

            {/* 📚 EVIDÊNCIAS */}
            <motion.section variants={fadeUpItem} className="space-y-10 pb-16">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
                  <Database size={28} className="text-[#009B3A]" /> Arcabouço de Evidências 🏛️
                </h3>
                <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${isLightMode ? 'bg-[#0033A0]/10 text-[#0033A0]' : 'bg-[#FFD100]/10 text-[#FFD100]'}`}>
                  {safeEvidencias.length} Ações Catalisadas
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {safeEvidencias.length > 0 ? (
                  safeEvidencias.map((doc: any, idx: number) => (
                    <DocumentCard key={doc.id || idx} doc={doc} index={idx} isLight={isLightMode} />
                  ))
                ) : (
                  !loading && <p className="text-sm font-bold opacity-40 italic">Aguardando inserção de dados estratégicos...</p>
                )}
              </div>
            </motion.section>

          </motion.div>
        </main>
      </div>
    </div>
  );
}