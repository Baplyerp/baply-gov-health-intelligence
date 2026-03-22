"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, Bell, User, Sun, Moon, Search, CheckCircle, 
  Database, Hospital, Zap, AlertTriangle, ShieldCheck, MapPin
} from "lucide-react";

import { Sidebar } from "../components/Sidebar";
import { AreaVisual, RadarVisual } from "../components/Charts"; 
import { KpiCard, DocumentCard } from "../components/Cards";
import { useHealthData } from "../hooks/useHealthData";

// Animações para carregar a página com efeito cascata
const fadeUpContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function HubGovernanca() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);
  
  // Pegando os dados blindados
  const { projecao, eficiencia, evidencias, loading } = useHealthData();
  
  const [buscaCnpj, setBuscaCnpj] = useState("");
  const [unidadeReal, setUnidadeReal] = useState<any>(null);
  const [searchingApi, setSearchingApi] = useState(false);

  const theme = useMemo(() => ({
    bg: isLightMode ? "bg-slate-50 text-slate-900" : "bg-[#050810] text-slate-100",
    card: isLightMode ? "bg-white/90 border-slate-200 shadow-xl" : "bg-slate-900/40 border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl",
    header: isLightMode ? "bg-white/80 border-b border-slate-200" : "bg-[#0A0F1C]/80 border-b border-white/5",
    accent: isLightMode ? "bg-[#0033A0] text-white shadow-blue-500/30" : "bg-gradient-to-r from-[#FFD100] to-[#FFaa00] text-[#0B1120] shadow-[#FFD100]/20"
  }), [isLightMode]);

  const handleSearchCnpj = async () => {
    if (!buscaCnpj) return;
    setSearchingApi(true);
    try {
      const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${buscaCnpj.replace(/\D/g, '')}`);
      const apiData = await res.json();
      setUnidadeReal(apiData);
    } catch (e) { 
      console.error("Erro na busca CNPJ:", e); 
    } finally { 
      setSearchingApi(false); 
    }
  };

  // Garante que é array antes de rodar o .map() - Segurança de Build Vercel
  const safeEvidencias = Array.isArray(evidencias) ? evidencias : [];

  return (
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-500 ${theme.bg}`}>
      
      {/* 🔮 EFEITOS DE FUNDO PREMIUM */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 15, repeat: Infinity }} className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-[#0033A0] to-transparent blur-[160px] will-change-transform" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }} transition={{ duration: 20, repeat: Infinity }} className="absolute bottom-0 right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-[#EF3340] to-transparent blur-[160px] will-change-transform" />
      </div>

      <Sidebar isOpen={isSidebarOpen} setOpen={setSidebarOpen} isLight={isLightMode} />

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className={`h-24 px-10 flex items-center justify-between backdrop-blur-md sticky top-0 z-30 ${theme.header}`}>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter uppercase flex items-center gap-3">
              Inteligência Estratégica <ShieldCheck size={24} className="text-[#009B3A]" />
            </h1>
            <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mt-1">SES/MA - Centro de Controle Operacional 🚀</p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsLightMode(!isLightMode)} className={`p-3 rounded-2xl border transition-all active:scale-90 ${isLightMode ? 'bg-amber-50 border-amber-200 text-amber-500' : 'bg-white/5 border-white/10 text-[#FFD100] hover:bg-white/10'}`}>
              {isLightMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-inherit">
              <div className="text-right uppercase">
                <p className="text-xs font-black">Jean Batista</p>
                <p className="text-[10px] font-bold text-[#0033A0]">Trainee Gestão Pública 💼</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0033A0] to-[#001a55] border border-white/20 shadow-xl flex items-center justify-center relative">
                <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-[#070B14]"></span></span>
                <User size={20} className="text-white" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <motion.div variants={fadeUpContainer} initial="hidden" animate="show" className="space-y-10">
            
            {/* 🔍 MÓDULO DE RASTREIO */}
            <motion.section variants={fadeUpItem} className={`p-8 rounded-[32px] border relative overflow-hidden ${theme.card}`}>
              <div className="absolute top-0 left-0 w-2 h-full bg-[#0033A0]" />
              <div className="flex flex-col md:flex-row gap-8 items-center pl-4">
                <div className="flex-1 space-y-4">
                  <h3 className="font-black text-lg uppercase flex items-center gap-3"><Search size={20} className="text-blue-500"/> Rastreio Nacional (CNES) 🕵️‍♂️</h3>
                  <div className="flex gap-2">
                    <input 
                      type="text" placeholder="Digite o CNPJ..." 
                      className={`flex-1 px-5 py-4 rounded-2xl text-sm font-bold border outline-none transition-all ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/10 focus:border-[#FFD100]'}`}
                      value={buscaCnpj} onChange={(e) => setBuscaCnpj(e.target.value)} 
                    />
                    <button onClick={handleSearchCnpj} disabled={searchingApi} className={`px-8 py-4 rounded-2xl font-black text-xs uppercase shadow-xl transition-all active:scale-95 ${theme.accent}`}>
                      {searchingApi ? "Processando..." : "Localizar 🎯"}
                    </button>
                  </div>
                </div>
                <AnimatePresence>
                  {unidadeReal && (
                    <motion.div initial={{ opacity: 0, scale: 0.9, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} className="flex-1 p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex gap-4 items-center">
                      <div className="p-3 rounded-2xl bg-emerald-500/20"><CheckCircle size={32} className="text-emerald-500" /></div>
                      <div>
                        <h4 className="font-black text-xs uppercase leading-tight text-emerald-400">{unidadeReal.nome_fantasia || unidadeReal.razao_social}</h4>
                        <p className="text-[10px] opacity-70 font-bold uppercase mt-1 flex items-center gap-1"><MapPin size={10} /> {unidadeReal.municipio} - {unidadeReal.uf}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>

            {/* 📈 KPI GRID */}
            <motion.div variants={fadeUpContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KpiCard title="Cobertura SES" value="84.2%" icon={Activity} trend="+1.2%" isLight={isLightMode} isLoading={loading} />
              <KpiCard title="Leitos MA" value="2.450" icon={Hospital} trend="+12" isLight={isLightMode} isLoading={loading} />
              <KpiCard title="Eficácia Alocativa" value="0.78" icon={Zap} trend="+0.05" isLight={isLightMode} isLoading={loading} />
              <KpiCard title="Risco Estimado" value="Baixo" icon={AlertTriangle} trend="-2%" isLight={isLightMode} isLoading={loading} />
            </motion.div>

            {/* 📊 GRÁFICOS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div variants={fadeUpItem} className={`lg:col-span-2 p-8 rounded-[32px] border ${theme.card} h-[450px]`}>
                <h3 className="font-black text-lg uppercase mb-8 flex items-center gap-2">Demanda Hospitalar 📉</h3>
                <AreaVisual data={projecao} isLight={isLightMode} />
              </motion.div>
              <motion.div variants={fadeUpItem} className={`p-8 rounded-[32px] border ${theme.card} h-[450px]`}>
                <h3 className="font-black text-lg uppercase mb-8 flex items-center gap-2">Matriz Global 🌐</h3>
                <RadarVisual data={eficiencia} isLight={isLightMode} />
              </motion.div>
            </div>

            {/* 📚 EVIDÊNCIAS */}
            <motion.section variants={fadeUpItem} className="space-y-8 pb-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                  <Database size={24} className="text-[#009B3A]" /> Repositório de Evidências 📖
                </h3>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${isLightMode ? 'bg-slate-200 text-slate-600' : 'bg-white/10 text-slate-300'}`}>
                  {safeEvidencias.length} Documentos Ativos
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {safeEvidencias.length > 0 ? (
                  safeEvidencias.map((doc: any, idx: number) => (
                    <DocumentCard key={doc.id || idx} doc={doc} index={idx} isLight={isLightMode} />
                  ))
                ) : (
                  !loading && <p className="text-xs opacity-50 italic">Nenhuma evidência carregada.</p>
                )}
              </div>
            </motion.section>

          </motion.div>
        </main>
      </div>
    </div>
  );
}