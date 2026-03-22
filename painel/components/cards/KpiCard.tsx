import { motion } from "framer-motion";
import { TrendingUp, LucideIcon } from "lucide-react";

interface KpiProps {
  title: string; value: string; icon: LucideIcon; trend: string; 
  color: string; delay: number; isLight: boolean;
}

export const KpiCard = ({ title, value, icon: Icon, trend, color, delay, isLight }: KpiProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
    className={`p-6 rounded-3xl border backdrop-blur-xl transition-all ${
      isLight ? 'bg-white/80 border-slate-200 shadow-xl' : 'bg-slate-900/60 border-white/5 shadow-2xl'
    }`}
  >
    <div className="flex flex-col gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${isLight ? 'bg-slate-50' : 'bg-slate-800'}`}>
        <Icon size={22} className={isLight ? 'text-slate-600' : 'text-[#FFD100]'} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-black tracking-tighter">{value}</h3>
          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1"><TrendingUp size={10} /> {trend}</span>
        </div>
      </div>
    </div>
  </motion.div>
);