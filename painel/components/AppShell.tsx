"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, User, ShieldCheck } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { usePathname } from "next/navigation";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);
  const pathname = usePathname(); // Para saber em qual tela estamos

  const theme = useMemo(() => ({
    bg: isLightMode ? "bg-slate-50 text-slate-900" : "bg-[#030610] text-slate-100",
    header: isLightMode ? "bg-white/80 border-b border-slate-200" : "bg-[#0A0F1C]/80 border-b border-white/5 backdrop-blur-3xl",
  }), [isLightMode]);

  return (
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-700 ${theme.bg}`}>
      
      {/* 🌌 GLOWS CINEMÁTICOS (Elegantes e contidos) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 15, repeat: Infinity }} className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#0033A0] blur-[150px]" />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }} transition={{ duration: 20, repeat: Infinity }} className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-[#EF3340] blur-[150px]" />
      </div>

      <Sidebar isOpen={isSidebarOpen} setOpen={setSidebarOpen} isLight={isLightMode} pathname={pathname} />

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className={`h-24 px-10 flex items-center justify-between sticky top-0 z-30 ${theme.header}`}>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter uppercase flex items-center gap-3">
              Inteligência de Estado <ShieldCheck size={24} className="text-[#009B3A]" />
            </h1>
            <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mt-1 text-[#FFD100]">SES/MA • Maranhão</p>
          </div>
          
          <div className="flex items-center gap-6">
            <button onClick={() => setIsLightMode(!isLightMode)} className={`p-3 rounded-2xl border transition-all active:scale-90 ${isLightMode ? 'bg-amber-50 border-amber-200 text-amber-500' : 'bg-white/5 border-white/10 text-[#FFD100] hover:bg-white/10'}`}>
              {isLightMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-inherit">
              <div className="text-right uppercase">
                <p className="text-xs font-black">Jean Batista</p>
                <p className="text-[9px] font-bold text-[#0033A0] tracking-widest">Trainee Gestão Pública</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0033A0] to-[#001a55] border border-white/20 shadow-xl flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Onde a tela atual será injetada */}
        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar relative z-10">
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { isLightMode } as any);
            }
            return child;
          })}
        </main>
      </div>
    </div>
  );
};