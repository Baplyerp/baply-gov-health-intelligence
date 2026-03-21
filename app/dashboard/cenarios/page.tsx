"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from "recharts";
import { TrendingUp, AlertTriangle, Activity, Globe2 } from "lucide-react";

// --- DADOS SIMULADOS (Para inspirar nosso futuro Banco de Dados) ---

// Projeção Estatística de Ocupação vs Capacidade
const dataProjecao = [
  { mes: "Jan", atual: 65, projetado: 60, alerta: 80 },
  { mes: "Fev", atual: 72, projetado: 68, alerta: 80 },
  { mes: "Mar", atual: 85, projetado: 82, alerta: 80 },
  { mes: "Abr", atual: 78, projetado: 85, alerta: 80 },
  { mes: "Mai", atual: 0, projetado: 88, alerta: 80 },
  { mes: "Jun", atual: 0, projetado: 75, alerta: 80 },
];

// Benchmark de Governança e Eficiência (Visão Internacionalista)
// Comparando Maranhão com Padrões OCDE e o Modelo de Saúde Pública Sino-Brasileiro
const dataEficiencia = [
  { metrica: "Prev. Primária", Maranhao: 75, OCDE: 85, SinoBrasileiro: 90, fullMark: 100 },
  { metrica: "Tempo Resp.", Maranhao: 60, OCDE: 90, SinoBrasileiro: 85, fullMark: 100 },
  { metrica: "Dig. de Dados", Maranhao: 45, OCDE: 95, SinoBrasileiro: 98, fullMark: 100 },
  { metrica: "Cobertura", Maranhao: 80, OCDE: 98, SinoBrasileiro: 95, fullMark: 100 },
  { metrica: "Aloc. Recursos", Maranhao: 65, OCDE: 88, SinoBrasileiro: 80, fullMark: 100 },
];

// Componente de Card Reutilizável com Glassmorphism
const KpiCard = ({ title, value, icon: Icon, trend, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`relative overflow-hidden rounded-2xl p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group`}
  >
    {/* Efeito de luz interna no hover */}
    <div className={`absolute -inset-1 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 blur transition-opacity duration-500`} />
    
    <div className="relative z-10 flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
        <div className="flex items-center gap-1 mt-2">
          <TrendingUp size={14} className="text-emerald-400" />
          <span className="text-xs text-emerald-400 font-medium">{trend} vs mês anterior</span>
        </div>
      </div>
      <div className={`p-3 rounded-xl bg-slate-800 border border-slate-700`}>
        <Icon size={24} className="text-slate-300" />
      </div>
    </div>
  </motion.div>
);

export default function CenariosEstatistica() {
  return (
    <div className="space-y-8 pb-12">
      
      {/* Cabeçalho da Página */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500 tracking-tight">
            Análise de Cenários e Predição
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Inteligência de dados aplicada à Secretaria Adjunta de Assistência à Saúde
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-slate-800 text-sm font-medium border border-slate-700 hover:border-blue-500 hover:text-blue-400 transition-all shadow-lg">
            Exportar Relatório
          </button>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#0033A0] to-[#002277] text-white text-sm font-bold shadow-[0_0_20px_rgba(0,51,160,0.4)] hover:shadow-[0_0_30px_rgba(0,51,160,0.6)] transition-all">
            Atualizar Modelos
          </button>
        </div>
      </div>

      {/* Cards de KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Índice de Cobertura" value="82.4%" icon={Activity} trend="+2.1%" color="from-blue-500 to-cyan-500" delay={0.1} />
        <KpiCard title="Risco Epidemiológico" value="Moderado" icon={AlertTriangle} trend="-1.5%" color="from-yellow-500 to-orange-500" delay={0.2} />
        <KpiCard title="Eficiência Alocativa" value="0.78" icon={TrendingUp} trend="+0.05" color="from-green-500 to-emerald-500" delay={0.3} />
        <KpiCard title="Aderência Padrão Global" value="68%" icon={Globe2} trend="+4.2%" color="from-red-500 to-rose-500" delay={0.4} />
      </div>

      {/* Área de Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gráfico Principal: Predição (Ocupa 2/3 da tela) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
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
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="mes" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="alerta" stroke="#EF3340" strokeWidth={2} strokeDasharray="5 5" fill="none" name="Limite Crítico" />
                <Area type="monotone" dataKey="projetado" stroke="#FFD100" strokeWidth={3} fillOpacity={1} fill="url(#colorProjetado)" name="Modelo Preditivo" />
                <Area type="monotone" dataKey="atual" stroke="#0033A0" strokeWidth={3} fillOpacity={1} fill="url(#colorAtual)" name="Dado Consolidado" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Gráfico Secundário: Radar Internacionalista (Ocupa 1/3) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl relative overflow-hidden flex flex-col"
        >
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl" />
          
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#EF3340] rounded-full"></span>
            Matriz de Benchmark Global
          </h3>
          <p className="text-xs text-slate-400 mb-4">Análise comparada de administração pública</p>
          
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dataEficiencia}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="metrica" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Maranhão (Atual)" dataKey="Maranhao" stroke="#FFD100" strokeWidth={2} fill="#FFD100" fillOpacity={0.3} />
                <Radar name="Mod. Sino-Brasileiro" dataKey="SinoBrasileiro" stroke="#009B3A" strokeWidth={2} fill="#009B3A" fillOpacity={0.1} />
                <Radar name="Padrão OCDE" dataKey="OCDE" stroke="#0033A0" strokeWidth={2} fill="#0033A0" fillOpacity={0.1} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '20px' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    </div>
  );
}