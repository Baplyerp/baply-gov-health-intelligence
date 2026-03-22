"use client";

import { motion } from "framer-motion";
import { TrendingUp, FileText, ExternalLink, Database } from "lucide-react";

// KPI CARD: Os indicadores com Emojis e Vidro Premium
export const KpiCard = ({ title, value, icon: Icon, trend, delay, isLight, isLoading }: any) => {
  // Lógica simples para escolher o emoji baseado no título
  const getEmoji = (t: string) => {
    if (t.includes('Cobertura')) return '🎯';
    if (t.includes('Leitos')) return '🛏️';
    if (t.includes('Eficácia')) return '⚡';
    if (t.includes('Risco')) return '🚨';
    return '📊';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-2xl ${
        isLight ? "bg-white border-slate-200 shadow-xl" : "glass-premium border-white/10"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border animate-float ${
            isLight ? 'bg-slate-50 border-slate-100 shadow-sm' : 'bg-black/40 border-white/5 shadow-inner'
          }`}>
            <Icon size={26} className={isLight ? 'text-slate-700' : 'text-[#FFD100] drop-shadow-[0_0_8px_rgba(255,209,0,0.6)]'} />
          </div>
          <span className="text-2xl filter drop-shadow-md">{getEmoji(title)}</span>
        </div>
        
        <div className="mt-2">
          <p className={`text-[11px] font-black uppercase tracking-widest mb-1 ${isLight ? 'text-slate-400' : 'text-slate-400'}`}>
            {title}
          </p>
          <div className="flex items-baseline gap-3">
            <h3 className={`text-4xl font-black tracking-tighter ${isLight ? 'text-slate-800' : 'text-white drop-shadow-sm'}`}>
              {isLoading ? "---" : value}
            </h3>
            <span className="text-[11px] font-bold text-[#009B3A] bg-[#009B3A]/10 px-2 py-1 rounded-md flex items-center gap-1 border border-[#009B3A]/20">
              <TrendingUp size={12} /> {trend}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// DOCUMENT CARD: Evidências com Design Imponente
export const DocumentCard = ({ doc, index, isLight }: any) => {
  const isTCU = doc.categoria === 'Governança TCU';
  const isGestao = doc.categoria === 'Admin Gerencial';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className={`p-7 rounded-3xl border group transition-all cursor-pointer hover:shadow-2xl ${
        isLight ? 'bg-white border-slate-200 shadow-lg hover:border-[#0033A0]' : 'glass-premium border-white/5 hover:border-[#FFD100]/50'
      }`}
    >
      <div className="flex items-start justify-between mb-5">
        <div className={`p-3 rounded-2xl animate-float ${isLight ? 'bg-slate-100 shadow-sm' : 'bg-black/30 shadow-inner text-[#FFD100]'}`}>
          <FileText size={24} />
        </div>
        <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider border ${
          isTCU ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
          isGestao ? 'bg-[#0033A0]/10 text-[#0033A0] border-[#0033A0]/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
        }`}>
          {isTCU ? '⚖️ TCU' : isGestao ? '💼 Gestão' : '✅ Sucesso'}
        </span>
      </div>
      
      <h4 className={`font-black text-sm mb-3 uppercase leading-tight line-clamp-2 ${isLight ? 'text-slate-800' : 'text-white'}`}>
        {doc.titulo_documento}
      </h4>
      <p className={`text-[12px] line-clamp-3 leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
        {doc.aplicabilidade_pratica}
      </p>
      
      <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center group-hover:border-white/20 transition-colors">
        <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest flex items-center gap-1">
          <Database size={10}/> Base ENAP
        </span>
        <ExternalLink size={16} className={`opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 ${isLight ? 'text-[#0033A0]' : 'text-[#FFD100]'}`} />
      </div>
    </motion.div>
  );
};