"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  Globe, 
  ShieldCheck, 
  Menu, 
  Bell, 
  User, 
  ChevronLeft,
  Database
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Paleta extraída do Manual de Marca adaptada para UI Dark Premium
const brandColors = {
  blue: "#0033A0",
  red: "#EF3340",
  yellow: "#FFD100",
  dark: "#0B1120", // Fundo profundo para contraste
  glass: "rgba(11, 17, 32, 0.7)",
};

const menuItems = [
  { icon: Activity, label: "Cenários e Estatística", href: "/dashboard/cenarios", color: "text-blue-400", shadow: "shadow-blue-500/50" },
  { icon: ShieldCheck, label: "Governança (TCU)", href: "/dashboard/governanca", color: "text-red-400", shadow: "shadow-red-500/50" },
  { icon: Globe, label: "Geopolítica da Saúde", href: "/dashboard/geopolitica", color: "text-yellow-400", shadow: "shadow-yellow-500/50" },
  { icon: Database, label: "Repositório ENAP", href: "/dashboard/evidencias", color: "text-emerald-400", shadow: "shadow-emerald-500/50" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B1120] text-slate-200 selection:bg-red-500 selection:text-white font-sans">
      {/* Background animado com gradientes da marca */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/30 blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-red-900/20 blur-[150px]" 
        />
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="relative z-20 flex flex-col h-full border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between h-20 px-4 border-b border-slate-800">
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3"
              >
                {/* Aqui entrará a Logo Vertical que você enviou, renderizada via tag <img> ou <Image> do Next */}
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-red-600 p-[2px] shadow-[0_0_15px_rgba(239,51,64,0.4)]">
                  <div className="w-full h-full bg-[#0B1120] rounded-md flex items-center justify-center">
                    <Activity size={20} className="text-yellow-400" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm tracking-wide text-white">HUB SAÚDE</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">Maranhão</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-3 overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link key={index} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                    isActive ? "bg-slate-800 border border-slate-700" : "hover:bg-slate-800/50"
                  }`}
                >
                  {/* Efeito Glow no botão ativo */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className={`absolute inset-0 opacity-10 bg-gradient-to-r from-transparent to-current ${item.color}`}
                    />
                  )}
                  
                  <item.icon size={22} className={`${isActive ? item.color : "text-slate-500"} drop-shadow-lg ${isActive ? item.shadow : ""}`} />
                  
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className={`text-sm font-medium whitespace-nowrap ${isActive ? "text-white" : "text-slate-400"}`}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10 h-screen overflow-hidden">
        {/* Topbar Glassmorphism */}
        <header className="h-20 border-b border-slate-800 bg-slate-900/40 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Painel de Inteligência e Evidências
            </h1>
            <p className="text-xs text-slate-500">Secretaria Adjunta de Administração e Engenharia</p>
          </div>

          <div className="flex items-center gap-6">
            <motion.button 
              whileHover={{ rotate: 15 }}
              className="relative text-slate-400 hover:text-white transition-colors"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-[#0B1120]"></span>
              </span>
            </motion.button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-slate-700">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-white">Gestor de Dados</p>
                <p className="text-[11px] text-blue-400">Trainee Gov.MA</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-800 border-2 border-blue-500 flex items-center justify-center shadow-[0_0_10px_rgba(0,51,160,0.5)]">
                <User size={18} className="text-slate-300" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}