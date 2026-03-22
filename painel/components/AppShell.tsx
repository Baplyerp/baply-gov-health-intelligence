"use client";

import React, { useState, useMemo } from "react";
import { Sun, Moon, User, ShieldCheck } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { useTheme } from "../contexts/ThemeContext"; // ⚡ Puxando o Estado Global

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // ⚡ Agora a mágica acontece instantaneamente e não se perde entre as telas
  const { isLightMode, toggleTheme } = useTheme(); 

  const theme = useMemo(() => ({
    bg: isLightMode ? "bg-slate-50 text-slate-900" : "bg-[#030610] text-slate-100",
    header: isLightMode ? "bg-white/90 border-slate-200" : "bg-[#0A0F1C]/90 border-white/5",
  }), [isLightMode]);

  return (
    // 🚀 Reduzi a duração de 700ms para 200ms. O clique agora é "snappy" (imediato)!
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-200 ${theme.bg}`}>
      
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#0033A0]/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#EF3340]/10 blur-[120px]" />
      </div>

      <Sidebar isOpen={isSidebarOpen} setOpen={setSidebarOpen} isLight={isLightMode} />

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        
        <header className={`h-20 px-8 flex items-center justify-between border-b backdrop-blur-md z-30 ${theme.header}`}>
          <div className="flex items-center gap-4">
            <ShieldCheck size={28} className="text-[#009B3A]" />
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tighter uppercase leading-none">Inteligência Estratégica</h1>
              <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mt-1 text-[#FFD100]">SES/MA • Centro de Comando</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* ⚡ Botão que aciona a troca global */}
            <button onClick={toggleTheme} className={`p-2.5 rounded-xl border transition-all active:scale-90 ${isLightMode ? 'border-slate-200 hover:bg-slate-100 text-amber-500' : 'border-white/10 hover:bg-white/5 text-[#FFD100]'}`}>
              {isLightMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-slate-300 dark:border-slate-700">
              <div className="text-right hidden sm:block uppercase">
                <p className="text-sm font-black">Jean Batista</p>
                <p className="text-[9px] font-bold text-[#0033A0] tracking-widest">Trainee Gov.MA</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0033A0] to-[#001a55] shadow-lg flex items-center justify-center relative border border-white/10">
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#009B3A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#009B3A] border-2 border-[#030610]"></span>
                </span>
                <User size={18} className="text-white" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
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