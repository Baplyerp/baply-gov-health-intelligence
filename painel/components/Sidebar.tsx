"use client";

import { motion } from "framer-motion";
import { Activity, Hospital, Users, ShieldCheck, Menu, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = ({ isOpen, setOpen, isLight }: any) => {
  // Isso diz ao menu exatamente em qual URL o usuário está agora
  const pathname = usePathname();

  // Nossas rotas oficiais do sistema
  const menuItems = [
    { icon: Activity, label: "Cenários", href: "/" },
    { icon: Hospital, label: "Rede Física", href: "/rastreio" },
    { icon: ShieldCheck, label: "Governança", href: "/evidencias" },
    { icon: Users, label: "Gestores", href: "#" }
  ];

  return (
    <motion.aside 
      animate={{ width: isOpen ? 280 : 90 }} 
      className={`relative z-40 flex flex-col h-full backdrop-blur-3xl transition-all ${
        isLight ? 'bg-white border-r border-slate-200' : 'bg-[#0D1425] border-r border-white/5'
      }`}
    >
      <div className="h-24 flex items-center px-6 border-b border-inherit justify-between">
        {isOpen && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0033A0] flex items-center justify-center shadow-lg">
              <Activity size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm uppercase">Hub Saúde</span>
              <span className="text-[9px] font-bold opacity-50 uppercase">Maranhão</span>
            </div>
          </div>
        )}
        <button onClick={() => setOpen(!isOpen)} className="p-3 hover:bg-black/5 rounded-2xl">
          {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      <nav className="p-4 space-y-2">
        {menuItems.map((item, i) => {
          // Verifica se a rota do botão é a mesma da página atual
          const isActive = pathname === item.href;

          return (
            <Link href={item.href} key={i}>
              <div className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
                isActive 
                  ? 'bg-[#0033A0] text-white shadow-lg' 
                  : 'opacity-40 hover:opacity-100 hover:bg-white/5'
              }`}>
                <item.icon size={22} />
                {isOpen && <span className="text-xs font-black uppercase tracking-tight">{item.label}</span>}
              </div>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
};