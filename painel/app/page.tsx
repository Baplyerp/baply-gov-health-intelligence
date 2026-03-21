"use client";

import React, { useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, Globe, ShieldCheck, Menu, Bell, User, ChevronLeft, Database, 
  TrendingUp, AlertTriangle, Globe2, Sun, Moon, ExternalLink, Search, 
  Hospital, MapPin, Users, Zap, CheckCircle
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from "recharts";
import { createClient } from "@supabase/supabase-js";

// --- CONFIGURAÇÃO SUPABASE ---
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// --- COMPONENTES OTIMIZADOS ---
const AreaVisual = memo(({ data, isLight }: { data: any[], isLight: boolean }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorAtual" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#0033A0" stopOpacity={0.6}/>
          <stop offset="95%" stopColor="#0033A0" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="colorProjetado" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#FFD100" stopOpacity={0.4}/>
          <stop offset="95%" stopColor="#FFD100" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke={isLight ? "#e2e8f0" : "#1e293b"} vertical={false} />
      <XAxis dataKey="mes" stroke={isLight ? "#64748b" : "#94a3b8"} axisLine={false} fontSize={10} fontWeight="bold" />
      <YAxis stroke={isLight ? "#64748b" : "#94a3b8"} axisLine={false} tickLine={false} fontSize={10} />
      <Tooltip contentStyle={{ backgroundColor: isLight ? '#fff' : '#0f172a', borderColor: isLight ? '#e2e8f0' : '#334155', borderRadius: '12px', fontWeight: 'bold' }} />
      <Area type="monotone" dataKey="alerta" stroke="#EF3340" strokeWidth={2} strokeDasharray="5 5" fill="none" name="Crítico" />
      <Area type="monotone" dataKey="projetado" stroke="#FFD100" strokeWidth={3} fillOpacity={1} fill="url(#colorProjetado)" name="Modelo Preditivo" animationDuration={2000} />
      <Area type="monotone" dataKey="atual" stroke="#0033A0" strokeWidth={4} fillOpacity={1} fill="url(#colorAtual)" name="Dado Real" animationDuration={1500} />
    </AreaChart>
  </ResponsiveContainer>
));

const RadarVisual = memo(({ data, isLight }: { data: any[], isLight: boolean }) => (
  <ResponsiveContainer width="100%" height="100%">
    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
      <PolarGrid stroke={isLight ? "#e2e8f0" : "#334155"} />
      <PolarAngleAxis dataKey="metrica" tick={{ fill: isLight ? "#64748b" : "#94a3b8", fontSize: 10, fontWeight: 'bold' }} />
      <Radar name="MA" dataKey="Maranhao" stroke="#FFD100" strokeWidth={3} fill="#FFD100" fillOpacity={0.4} />
      <Radar name="OCDE" dataKey="OCDE" stroke="#0033A0" strokeWidth={2} fill="#0033A0" fillOpacity={0.1} />
      <Legend wrapperStyle={{ fontSize: '11px', color: isLight ? '#64748b' : '#94a3b8' }} />
    </RadarChart>
  </ResponsiveContainer>
));

AreaVisual.displayName = "AreaVisual";
RadarVisual.displayName = "RadarVisual";

export default function HubGovernanca() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataProjecao, setDataProjecao] = useState<any[]>([]);
  const [dataEficiencia, setDataEficiencia] = useState<any[]>([]);
  const [evidencias, setEvidencias] = useState<any[]>([]);
  
  // --- ESTADOS DA BRAZIL API ---
  const [buscaCnpj, setBuscaCnpj] = useState("");
  const [unidadeReal, setUnidadeReal] = useState<any>(null);
  const [searchingApi, setSearchingApi] = useState(false);

  const theme = useMemo(() => ({
    bg: isLightMode ? "bg-slate-50 text-slate-900" : "bg-[#070B14] text-slate-100",
    card: isLightMode ? "bg-white/80 border-slate-200 shadow-xl shadow-slate-200/50" : "bg-slate-900/60 border-white/5 shadow-2xl shadow-black/50",
    sidebar: isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0D1425] border-r border-white/5",
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
      if (ind.data) setDataProjecao(ind.data.map(i => ({ mes: new Date(i.mes_referencia).toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase(), atual: i.taxa_ocupacao_atual, projetado: i.demanda_projetada, alerta: i.limite_critico })));
      if (mat.data) setDataEficiencia(mat.data.map(m => ({ metrica: m.eixo_analise, Maranhao: m.score_maranhao, OCDE: m.score_ocde, SinoBrasileiro: m.score_sino_brasileiro })));
      if (ev.data) setEvidencias(ev.data);
      setIsLoading(false);
    }
    carregar();
  }, []);

  const handleSearchCnpj = async () => {
    if (!buscaCnpj) return;
    setSearchingApi(true);
    try {
      const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${buscaCnpj.replace(/\D/g, '')}`);
      const data = await res.json();
      setUnidadeReal(data);
    } catch (e) { console.error(e); }
    finally { setSearchingApi(false); }
  };

  const KpiCard = ({ title, value, icon: Icon, trend, color, delay }: any) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay }}
      className={`relative overflow-hidden rounded-3xl p-6 border backdrop-blur-2xl transition-all hover:border-blue-500/50 ${theme.card} group`}
    >
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-10 bg-${color}-500 group-hover:opacity-30 transition-opacity`} />
      <div className="relative z-10 flex flex-col gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform group-hover:scale-110 ${isLightMode ? 'bg-slate-50 border-slate-100' : 'bg-slate-800 border-white/5'}`}>
          <Icon size={22} className={isLightMode ? 'text-slate-600' : 'text-[#FFD100]'} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black tracking-tighter">{isLoading ? "---" : value}</h3>
            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
              <TrendingUp size={10} /> {trend}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-500 ${theme.bg}`}>
      
      {/* BACKGROUND GLOWS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#0033A0]/20 blur-[160px]" />
        <motion.div animate={{ opacity: [0.05, 0.15, 0.05] }} transition={{ duration: 15, repeat: Infinity }} className="absolute bottom-0 right-0 w-[50%] h-[50%] rounded-full bg-[#EF3340]/10 blur-[160px]" />
      </div>

      {/* SIDEBAR */}
      <motion.aside animate={{ width: isSidebarOpen ? 280 : 90 }} className={`relative z-40 flex flex-col h-full backdrop-blur-3xl transition-all ${theme.sidebar}`}>
        <div className="h-24 flex items-center px-6 border-b border-inherit justify-between">
          {isSidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0033A0] via-[#EF3340] to-[#FFD100] p-[2px] shadow-lg">
                <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isLightMode ? 'bg-white' : 'bg-[#070B14]'}`}>
                  <Activity size={20} className="text-[#FFD100]" />
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-sm tracking-tighter uppercase">Hub Saúde</span>
                <span className="text-[9px] font-bold opacity-50 tracking-widest">MA - BRASIL</span>
              </div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-3 hover:bg-white/5 rounded-2xl transition-colors">
            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="p-4 space-y-3">
          {[
            { icon: Activity, label: "Cenários", active: true },
            { icon: Hospital, label: "Unidades", active: false },
            { icon: Users, label: "Gestão RH", active: false },
            { icon: ShieldCheck, label: "TCU / Auditoria", active: false }
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer ${item.active ? (isLightMode ? 'bg-slate-100 shadow-inner' : 'bg-white/5 border border-white/5 shadow-lg') : 'opacity-40 hover:opacity-100'}`}>
              <item.icon size={22} className={item.active ? 'text-[#0033A0]' : ''} />
              {isSidebarOpen && <span className={`text-sm font-black uppercase tracking-tight ${item.active ? 'text-inherit' : 'text-slate-500'}`}>{item.label}</span>}
            </div>
          ))}
        </nav>
      </motion.aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        
        {/* HEADER */}
        <header className={`h-24 px-10 flex items-center justify-between backdrop-blur-md sticky top-0 z-30 ${theme.header}`}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={14} className="text-[#FFD100] fill-[#FFD100]" />
              <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">Painel de Inteligência Estratégica</h1>
            </div>
            <p className="text-[10px] font-bold opacity-60 uppercase tracking-[0.2em]">Monitoramento de Evidências e Capacidade Assistencial</p>
          </div>
          
          <div className="flex items-center gap-6">
            <button onClick={() => setIsLightMode(!isLightMode)} className={`p-3 rounded-2xl border transition-all hover:rotate-12 ${isLightMode ? 'bg-amber-50 border-amber-200 text-amber-500' : 'bg-white/5 border-white/10 text-[#FFD100]'}`}>
              {isLightMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-inherit">
              <div className="text-right">
                <p className="text-xs font-black uppercase">Jean Batista</p>
                <p className={`text-[10px] font-bold ${isLightMode ? 'text-[#0033A0]' : 'text-blue-400'}`}>Trainee Gestão Pública</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#0033A0] flex items-center justify-center border-2 border-white/20 shadow-xl shadow-blue-500/20">
                <User size={22} className="text-white" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
          
          {/* PESQUISA REAL - BRAZIL API */}
          <section className={`p-8 rounded-[32px] border transition-all ${theme.card}`}>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500"><Search size={20}/></div>
                  <h3 className="font-black text-lg uppercase tracking-tight">Busca Unificada de Unidades (CNES/SIH)</h3>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" placeholder="CNPJ da Unidade Hospitalar..."
                    className={`flex-1 px-5 py-4 rounded-2xl text-sm font-bold border outline-none transition-all ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-black/20 border-white/5 focus:border-blue-500'}`}
                    value={buscaCnpj} onChange={(e) => setBuscaCnpj(e.target.value)}
                  />
                  <button onClick={handleSearchCnpj} disabled={searchingApi} className={`px-8 py-4 rounded-2xl font-black text-xs uppercase transition-all active:scale-95 ${theme.accent}`}>
                    {searchingApi ? "Consultando..." : "Rastrear"}
                  </button>
                </div>
              </div>
              <AnimatePresence>
                {unidadeReal && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`flex-1 p-6 rounded-3xl border border-inherit bg-white/5 flex gap-4 items-center`}>
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500"><CheckCircle size={28}/></div>
                    <div>
                      <p className="text-[9px] font-bold opacity-50 uppercase mb-1">Resultado Localizado</p>
                      <h4 className="font-black text-sm uppercase leading-tight">{unidadeReal.nome_fantasia || unidadeReal.razao_social}</h4>
                      <p className="text-xs opacity-70">{unidadeReal.municipio} - {unidadeReal.uf}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* KPIs EXPANDIDOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard title="Cobertura Populacional" value="84.2%" icon={Activity} trend="+1.2%" color="blue" delay={0.1} />
            <KpiCard title="Leitos / 1000 Hab" value="2.4" icon={Hospital} trend="+0.4" color="emerald" delay={0.2} />
            <KpiCard title="Médicos Especialistas" value="1.850" icon={Users} trend="+84" color="purple" delay={0.3} />
            <KpiCard title="Tempo Médio Fila" value="14d" icon={Zap} trend="-2d" color="amber" delay={0.4} />
          </div>

          {/* DASHBOARD GRÁFICOS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className={`lg:col-span-2 p-8 rounded-[32px] border ${theme.card} h-[450px]`}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-lg uppercase flex items-center gap-3"><div className="w-1.5 h-6 bg-[#0033A0] rounded-full" /> Projeção de Demanda Assistencial</h3>
                <div className="flex gap-2"><span className="w-3 h-3 rounded-full bg-[#0033A0]" /><span className="w-3 h-3 rounded-full bg-[#FFD100]" /></div>
              </div>
              <AreaVisual data={dataProjecao} isLight={isLightMode} />
            </div>
            <div className={`p-8 rounded-[32px] border ${theme.card} h-[450px]`}>
              <h3 className="font-black text-lg uppercase flex items-center gap-3 mb-8"><div className="w-1.5 h-6 bg-[#EF3340] rounded-full" /> Matriz Comparada</h3>
              <RadarVisual data={dataEficiencia} isLight={isLightMode} />
            </div>
          </div>

          {/* EVIDÊNCIAS PREMIUM */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                <Database size={24} className="text-[#009B3A]" /> Repositório de Evidências (ENAP / TCU)
              </h3>
              <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Base de Dados Atualizada 2026</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {evidencias.map((doc, idx) => (
                <DocumentCard key={doc.id} doc={doc} index={idx} />
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}