"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, Globe, ShieldCheck, Menu, Bell, User, ChevronLeft, Database, TrendingUp, AlertTriangle, Globe2, Sun, Moon 
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from "recharts";

// --- DADOS SIMULADOS ---
const dataProjecao = [
  { mes: "Jan", atual: 65, projetado: 60, alerta: 80 },
  { mes: "Fev", atual: 72, projetado: 68, alerta: 80 },
  { mes: "Mar", atual: 85, projetado: 82, alerta: 80 },
  { mes: "Abr", atual: 78, projetado: 85, alerta: 80 },
  { mes: "Mai", atual: null, projetado: 88, alerta: 80 },
  { mes: "Jun", atual: null, projetado: 75, alerta: 80 },
];

const dataEficiencia = [
  { metrica: "Prev. Primária", Maranhao: 75, OCDE: 85, SinoBrasileiro: 90 },
  { metrica: "Tempo Resp.", Maranhao: 60, OCDE: 90, SinoBrasileiro: 85 },
  { metrica: "Dig. de Dados", Maranhao: 45, OCDE: 95, SinoBrasileiro: 98 },
  { metrica: "Cobertura", Maranhao: 80, OCDE: 98, SinoBrasileiro: 95 },
  { metrica: "Aloc. Recursos", Maranhao: 65, OCDE: 88, SinoBrasileiro: 80 },
];

const menuItems = [
  { icon: Activity, label: "Cenários e Estatística", color: "text-[#0033A0]", darkColor: "text-blue-400", active: true },
  { icon: ShieldCheck, label: "Governança (TCU)", color: "text-[#EF3340]", darkColor: "text-red-400", active: false },
  { icon: Globe, label: "Geopolítica da Saúde", color: "text-[#FFD100]", darkColor: "text-yellow-400", active: false },
  { icon: Database, label: "Repositório ENAP", color: "text-[#009B3A]", darkColor: "text-emerald-400", active: false },
];

export default function HubGovernanca() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);

  // Removi as classes de "transition" pesadas dos fundos para o clique ser instantâneo
  const KpiCard = ({ title, value, icon: Icon, trend, gradient, delay }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl border group ${isLightMode ? 'bg-white/90 border-slate-200 shadow-sm' : 'bg-slate-900/50 border-slate-700/50 shadow-lg'}`}
    >
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 blur transition-opacity duration-500`} />
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className={`text-sm font-medium mb-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{title}</p>
          <h3 className={`text-3xl font-bold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{value}</h3>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp size={14} className="text-[#009B3A]" />
            <span className="text-xs text-[#009B3A] font-medium">{trend} vs mês anterior</span>
          </div>
        </div>
        <div className={`p-3 rounded-xl border ${isLightMode ? 'bg-slate-50 border-slate-100' : 'bg-slate-800 border-slate-700'}`}>
          <Icon size={24} className={isLightMode ? 'text-slate-600' : 'text-slate-300'} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className={`flex h-screen w-full overflow-hidden font-sans ${isLightMode ? "bg-slate-50 text-slate-800" : "bg-[#0B1120] text-slate-200"}`}>
      
      {/* BACKGROUND ANIMADO DE VOLTA (Luxo e Movimento) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: isLightMode ? [0.03, 0.08, 0.03] : [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#0033A0] blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: isLightMode ? [0.02, 0.06, 0.02] : [0.05, 0.15, 0.05] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-[#EF3340] blur-[150px]" 
        />
      </div>

      {/* SIDEBAR COM ANIMAÇÃO */}
      <motion.aside
        initial={false} animate={{ width: isSidebarOpen ? 280 : 80 }}
        className={`relative z-20 flex flex-col h-full border-r backdrop-blur-xl ${isLightMode ? 'bg-white/80 border-slate-200' : 'bg-slate-900/50 border-slate-800'}`}
      >
        <div className={`flex items-center justify-between h-20 px-4 border-b ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0033A0] to-[#EF3340] p-[2px] shadow-[0_0_15px_rgba(239,51,64,0.3)]">
                  <div className={`w-full h-full rounded-md flex items-center justify-center ${isLightMode ? 'bg-white' : 'bg-[#0B1120]'}`}>
                    <Activity size={20} className={isLightMode ? "text-[#0033A0]" : "text-[#FFD100]"} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className={`font-bold text-sm tracking-wide ${isLightMode ? 'text-slate-900' : 'text-white'}`}>HUB SAÚDE</span>
                  <span className={`text-[10px] uppercase tracking-widest ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Maranhão</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className={`p-2 rounded-lg ${isLightMode ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-slate-800 text-slate-400'}`}>
            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-3">
          {menuItems.map((item, index) => (
            <motion.div
              key={index} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer relative overflow-hidden ${
                item.active 
                  ? (isLightMode ? 'bg-slate-100 border-slate-200 border' : 'bg-slate-800 border-slate-700 border') 
                  : (isLightMode ? 'hover:bg-slate-100' : 'hover:bg-slate-800/50')
              }`}
            >
              {item.active && <div className={`absolute inset-0 opacity-10 bg-gradient-to-r from-transparent to-current ${isLightMode ? item.color : item.darkColor}`} />}
              <item.icon size={22} className={`${item.active ? (isLightMode ? item.color : item.darkColor) : (isLightMode ? 'text-slate-500' : 'text-slate-500')} drop-shadow-sm z-10`} />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }}
                    className={`text-sm font-medium whitespace-nowrap z-10 ${item.active ? (isLightMode ? 'text-slate-900' : 'text-white') : (isLightMode ? 'text-slate-500' : 'text-slate-400')}`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </nav>
      </motion.aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col relative z-10 h-screen overflow-hidden">
        
        {/* TOPBAR */}
        <header className={`h-20 border-b backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30 ${isLightMode ? 'bg-white/70 border-slate-200' : 'bg-slate-900/40 border-slate-800'}`}>
          <div>
            <h1 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${isLightMode ? 'from-[#0033A0] to-slate-600' : 'from-white to-slate-400'}`}>
              Painel de Inteligência e Evidências
            </h1>
            <p className={`text-xs ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Secretaria Adjunta de Assistência à Saúde</p>
          </div>
          <div className="flex items-center gap-6">
            
            {/* BOTÃO TEMA INSTANTÂNEO */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLightMode(!isLightMode)} 
              className={`p-2 rounded-full border shadow-sm ${isLightMode ? 'bg-amber-50 border-amber-200 text-amber-500' : 'bg-slate-800 border-slate-700 text-blue-400'}`}
            >
              {isLightMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            <motion.button whileHover={{ rotate: 15 }} className={`relative ${isLightMode ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}>
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF3340] opacity-75"></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 bg-[#EF3340] border-2 ${isLightMode ? 'border-white' : 'border-[#0B1120]'}`}></span>
              </span>
            </motion.button>
            <div className={`flex items-center gap-3 pl-6 border-l ${isLightMode ? 'border-slate-200' : 'border-slate-700'}`}>
              <div className="text-right hidden md:block">
                <p className={`text-sm font-semibold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Gestor de Dados</p>
                <p className={`text-[11px] font-bold ${isLightMode ? 'text-[#0033A0]' : 'text-blue-400'}`}>Trainee Gov.MA</p>
              </div>
              <div className={`h-10 w-10 rounded-full border-2 border-[#0033A0] flex items-center justify-center shadow-[0_0_10px_rgba(0,51,160,0.3)] ${isLightMode ? 'bg-slate-100' : 'bg-slate-800'}`}>
                <User size={18} className={isLightMode ? 'text-slate-500' : 'text-slate-400'} />
              </div>
            </div>
          </div>
        </header>

        {/* CONTEÚDO */}
        <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className={`text-3xl font-extrabold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Análise de Cenários e Predição</h2>
                <p className={`text-sm mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Comparativo de performance e modelagem preditiva de assistência</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#0033A0] to-[#002277] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all">
                Atualizar Modelos
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <KpiCard title="Índice de Cobertura" value="82.4%" icon={Activity} trend="+2.1%" gradient="from-[#0033A0] to-[#0055ff]" delay={0.1} />
              <KpiCard title="Risco Epidemiológico" value="Moderado" icon={AlertTriangle} trend="-1.5%" gradient="from-[#FFD100] to-[#ffaa00]" delay={0.2} />
              <KpiCard title="Eficiência Alocativa" value="0.78" icon={TrendingUp} trend="+0.05" gradient="from-[#009B3A] to-[#00cc4c]" delay={0.3} />
              <KpiCard title="Aderência Global" value="68%" icon={Globe2} trend="+4.2%" gradient="from-[#EF3340] to-[#ff5566]" delay={0.4} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Gráfico 1 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                className={`lg:col-span-2 p-6 rounded-2xl backdrop-blur-xl border relative overflow-hidden ${isLightMode ? 'bg-white/90 border-slate-200 shadow-sm' : 'bg-slate-900/50 border-slate-700/50 shadow-xl'}`}
              >
                <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  <span className="w-2 h-6 bg-[#0033A0] rounded-full"></span>
                  Projeção Estatística: Demanda vs. Capacidade
                </h3>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dataProjecao} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                      <CartesianGrid strokeDasharray="3 3" stroke={isLightMode ? "#e2e8f0" : "#1e293b"} vertical={false} />
                      <XAxis dataKey="mes" stroke={isLightMode ? "#64748b" : "#94a3b8"} axisLine={false} />
                      <YAxis stroke={isLightMode ? "#64748b" : "#94a3b8"} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: isLightMode ? '#fff' : '#0f172a', borderColor: isLightMode ? '#e2e8f0' : '#334155', borderRadius: '12px', color: isLightMode ? '#0f172a' : '#fff' }} />
                      <Area type="monotone" dataKey="alerta" stroke="#EF3340" strokeWidth={2} strokeDasharray="5 5" fill="none" name="Limite Crítico" />
                      <Area type="monotone" dataKey="projetado" stroke="#FFD100" strokeWidth={3} fillOpacity={1} fill="url(#colorProjetado)" name="Modelo Preditivo" />
                      <Area type="monotone" dataKey="atual" stroke="#0033A0" strokeWidth={3} fillOpacity={1} fill="url(#colorAtual)" name="Dado Consolidado" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Gráfico 2 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}
                className={`p-6 rounded-2xl backdrop-blur-xl border flex flex-col relative overflow-hidden ${isLightMode ? 'bg-white/90 border-slate-200 shadow-sm' : 'bg-slate-900/50 border-slate-700/50 shadow-xl'}`}
              >
                <h3 className={`text-lg font-bold mb-2 flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  <span className="w-2 h-6 bg-[#EF3340] rounded-full"></span>
                  Matriz Global
                </h3>
                <p className={`text-xs mb-4 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Análise comparada de administração pública</p>
                <div className="flex-1 w-full min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dataEficiencia}>
                      <PolarGrid stroke={isLightMode ? "#e2e8f0" : "#334155"} />
                      <PolarAngleAxis dataKey="metrica" tick={{ fill: isLightMode ? "#64748b" : "#94a3b8", fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Maranhão" dataKey="Maranhao" stroke="#FFD100" strokeWidth={2} fill="#FFD100" fillOpacity={0.3} />
                      <Radar name="Mod. Sino-Brasileiro" dataKey="SinoBrasileiro" stroke="#009B3A" strokeWidth={2} fill="#009B3A" fillOpacity={0.1} />
                      <Radar name="Padrão OCDE" dataKey="OCDE" stroke="#0033A0" strokeWidth={2} fill="#0033A0" fillOpacity={0.1} />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '20px', color: isLightMode ? '#64748b' : '#94a3b8' }} />
                      <Tooltip contentStyle={{ backgroundColor: isLightMode ? '#fff' : '#0f172a', borderColor: isLightMode ? '#e2e8f0' : '#334155', borderRadius: '8px', color: isLightMode ? '#0f172a' : '#fff' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}