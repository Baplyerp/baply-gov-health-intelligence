"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, MapPin, Hospital } from "lucide-react";
import { AppShell } from "../../components/AppShell";

export default function RastreioPage() {
  const [buscaCnpj, setBuscaCnpj] = useState("");
  const [unidadeReal, setUnidadeReal] = useState<any>(null);
  const [searchingApi, setSearchingApi] = useState(false);

  const handleSearchCnpj = async () => {
    if (!buscaCnpj) return;
    setSearchingApi(true);
    try {
      const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${buscaCnpj.replace(/\D/g, '')}`);
      const apiData = await res.json();
      setUnidadeReal(apiData);
    } catch (e) { 
      console.error("Erro na busca CNPJ:", e); 
    } finally { 
      setSearchingApi(false); 
    }
  };

  return (
    <AppShell>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 h-full flex flex-col">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4 drop-shadow-md">
            <Hospital size={32} className="text-[#FFD100]" /> Malha Física e Rastreio (CNES) 🛰️
          </h2>
        </div>

        <section className="p-10 rounded-[40px] border relative overflow-hidden bg-slate-900/60 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#FFD100]" />
          
          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="flex-1 space-y-5">
              <h3 className="font-black text-xl uppercase flex items-center gap-3">
                <Search size={24} className="text-[#FFD100]"/> Busca Integrada Brazil API
              </h3>
              <p className="text-xs opacity-60 font-bold uppercase tracking-widest mb-4">Insira o CNPJ sem formatação para localizar o estabelecimento de saúde no território nacional.</p>
              
              <div className="flex gap-3">
                <input 
                  type="text" placeholder="CNPJ do Alvo (ex: 12115158000138)" 
                  className="flex-1 px-6 py-5 rounded-2xl text-sm font-bold border-2 outline-none transition-all bg-black/50 border-white/10 focus:border-[#FFD100] shadow-inner text-white placeholder:text-slate-600"
                  value={buscaCnpj} onChange={(e) => setBuscaCnpj(e.target.value)} 
                />
                <button 
                  onClick={handleSearchCnpj} 
                  disabled={searchingApi} 
                  className="px-10 py-5 rounded-2xl font-black text-sm uppercase shadow-2xl transition-all active:scale-95 bg-gradient-to-r from-[#FFD100] to-[#FFaa00] text-[#0B1120] hover:shadow-[#FFD100]/20"
                >
                  {searchingApi ? "Buscando..." : "Localizar ⚡"}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {unidadeReal && (
                <motion.div initial={{ opacity: 0, scale: 0.8, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} className="flex-1 w-full p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/30 flex gap-6 items-center shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full" />
                  <div className="p-4 rounded-2xl bg-emerald-500/20 backdrop-blur-md relative z-10"><CheckCircle size={36} className="text-emerald-400" /></div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-black opacity-60 uppercase mb-1 tracking-widest text-emerald-300">Alvo Confirmado</p>
                    <h4 className="font-black text-lg uppercase leading-tight text-white mb-2">{unidadeReal.nome_fantasia || unidadeReal.razao_social}</h4>
                    <p className="text-xs opacity-80 font-bold uppercase flex items-center gap-2"><MapPin size={14} className="text-emerald-400" /> {unidadeReal.municipio} - {unidadeReal.uf}</p>
                    <div className="mt-4 inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[9px] uppercase font-bold text-slate-300">Natureza: {unidadeReal.natureza_juridica}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

      </motion.div>
    </AppShell>
  );
}