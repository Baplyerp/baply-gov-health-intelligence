"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Bell, User, Sun, Moon, Search, CheckCircle, Database, Hospital, Users, Zap, AlertTriangle } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Importações dos novos módulos
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
  const [data, setData] = useState<any>({ projecao: [], eficiencia: [], evidencias: [] });
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
      setIsLoading(true);
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

  const handleSearchCnpj = async () => {
    if (!buscaCnpj) return;
    setSearchingApi(true);
    try {
      const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${buscaCnpj.replace(/\D/g, '')}`);
      const apiData = await res.json();
      setUnidadeReal(apiData);
    } catch (e) { console.error(e); }
    finally { setSearchingApi(false); }
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-500 ${theme.bg}`}>
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        setOpen={setSidebarOpen} 
        isLight={isLightMode} 
        menuItems={[
          { icon: Activity, label: "Cenários", active: true },
          { icon: Hospital, label: "Unidades", active: false },
          { icon: Users, label: "Gestão", active: false },
          { icon: ShieldCheck, label: "Governança", active: false }
        ]} 
      />

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className={`h-24 px-10 flex items-center justify-between backdrop-blur-md sticky top-0 z-30 ${theme.header}`}>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">Inteligência Estratégica</h1>
            <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mt-1">SES/MA - Monitoramento em Tempo Real</p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsLightMode(!isLightMode)} className={`p-3 rounded-2xl border ${isLightMode ? 'bg-amber-50 border-amber-200 text-amber-500' : 'bg-white/5 border-white/10 text-[#FFD100]'}`}>
              {isLightMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-inherit">
              <div className="text-right">
                <p className="text-xs font-black uppercase tracking-tight">Jean Batista</p>
                <p className="text-[10px] font-bold text-[#0033A0] uppercase">Trainee Gestão Pública</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#0033A0] border-2 border-white/20 shadow-xl flex items-center justify-center"><User size={22} className="text-white" /></div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
          
          {/* BUSCA BRAZIL API */}
          <section className={`p-8 rounded-[32px] border ${theme.card}`}>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <h3 className="font-black text-lg uppercase flex items-center gap-3"><Search size={20} className="text-blue-500"/> Rastreio de Unidade (CNES)</h3>
                <div className="flex gap-2">
                  <input 
                    type="text" placeholder="Digite o CNPJ..." 
                    className={`flex-1 px-5 py-4 rounded-2xl text-sm font-bold border outline-none ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-black/20 border-white/5 focus:border-blue-500'}`}
                    value={buscaCnpj} onChange={(e) => setBuscaCnpj(e.target.value)}
                  />
                  <button onClick={handleSearchCnpj} disabled={searchingApi} className={`px-8 py-4 rounded-2xl font-black text-xs uppercase ${theme.accent}`}>
                    {searchingApi ? "Processando..." : "Consultar"}
                  </button>
                </div>
              </div>
              <AnimatePresence>
                {unidadeReal && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 p-6 rounded-3xl bg-blue-500/5 border border-blue-500/20 flex gap-4 items-center">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500"><CheckCircle size={28}/></div>
                    <div>
                      <p className="text-[9px] font-black opacity-50 uppercase mb-1">Localizado</p>
                      <h4 className="font-black text-xs uppercase leading-tight">{unidadeReal.nome_fantasia || unidadeReal.razao_social}</h4>
                      <p className="text-[10px] opacity-70 font-bold uppercase">{unidadeReal.municipio} - {unidadeReal.uf}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* KPI GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard title="Cobertura SES" value="84.2%" icon={Activity} trend="+1.2%" color="blue" delay={0.1} isLight={isLightMode} isLoading={isLoading} />
            <KpiCard title="Leitos MA" value="2.450" icon={Hospital} trend="+12" color="emerald" delay={0.2} isLight={isLightMode} isLoading={isLoading} />
            <KpiCard title="Eficácia Alocativa" value="0.78" icon={Zap} trend="+0.05" color="purple" delay={0.3} isLight={isLightMode} isLoading={isLoading} />
            <KpiCard title="Risco Estimado" value="Baixo" icon={AlertTriangle} trend="-2%" color="amber" delay={0.4} isLight={isLightMode} isLoading={isLoading} />
          </div>

          {/* DASHBOARD GRÁFICOS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className={`lg:col-span-2 p-8 rounded-[32px] border ${theme.card} h-[450px]`}>
              <h3 className="font-black text-lg uppercase flex items-center gap-3 mb-8"><div className="w-1.5 h-6 bg-[#0033A0] rounded-full" /> Demanda Hospitalar</h3>
              <AreaVisual data={data.projecao} isLight={isLightMode} />
            </div>
            <div className={`p-8 rounded-[32px] border ${theme.card} h-[450px]`}>
              <h3 className="font-black text-lg uppercase flex items-center gap-3 mb-8"><div className="w-1.5 h-6 bg-[#EF3340] rounded-full" /> Matriz Global</h3>
              <RadarVisual data={data.eficiencia} isLight={isLightMode} />
            </div>
          </div>

          {/* EVIDÊNCIAS */}
          <section className="space-y-8">
            <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3"><Database size={24} className="text-[#009B3A]" /> Repositório de Evidências</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.evidencias.map((doc: any, idx: number) => (
                <DocumentCard key={doc.id || idx} doc={doc} index={idx} isLight={isLightMode} />
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}