"use client";

import { motion } from "framer-motion";
import { TrendingUp, FileText, ExternalLink, LucideIcon } from "lucide-react";

// KPI CARD: Os indicadores do topo
export const KpiCard = ({ title, value, icon: Icon, trend, delay, isLight, isLoading }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={`p-6 rounded-3xl border transform-gpu transition-all ${
      isLight ? "bg-white border-slate-200 shadow-xl" : "bg-slate-900/60 border-white/5 shadow-2xl"
    }`}
  >
    <div className="flex flex-col gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
        isLight ? 'bg-slate-50 border-slate-100' : 'bg-slate-800 border-white/5'
      }`}>
        <Icon size={22} className={isLight ? 'text-slate-600' : 'text-[#FFD100]'} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-black">{isLoading ? "---" : value}</h3>
          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
            <TrendingUp size={10} /> {trend}
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);

// DOCUMENT CARD: As evidências da ENAP/TCU
export const DocumentCard = ({ doc, index, isLight }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.1 * index }}
    className={`p-6 rounded-2xl border group hover:scale-[1.02] transition-all cursor-pointer transform-gpu ${
      isLight ? 'bg-white border-slate-200 shadow-lg' : 'bg-slate-800/40 border-white/5 hover:border-[#FFD100]'
    }`}
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`p-2 rounded-lg ${isLight ? 'bg-slate-100' : 'bg-slate-700 text-[#FFD100]'}`}>
        <FileText size={20} />
      </div>
      <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase ${
        doc.categoria === 'Governança TCU' ? 'bg-red-500/10 text-red-500' : 
        doc.categoria === 'Admin Gerencial' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'
      }`}>
        {doc.categoria}
      </span>
    </div>
    <h4 className="font-black text-xs mb-2 uppercase line-clamp-2 leading-tight">{doc.titulo_documento}</h4>
    <p className="text-[11px] opacity-60 line-clamp-2 leading-relaxed">{doc.aplicabilidade_pratica}</p>
    <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
      <span className="text-[9px] font-bold opacity-40 uppercase">FONTE: ENAP</span>
      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#0033A0]" />
    </div>
  </motion.div>
);