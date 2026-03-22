"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database } from "lucide-react";
import { AppShell } from "../../components/AppShell";
import { DocumentCard } from "../../components/Cards";
import { useHealthData } from "../../hooks/useHealthData";

export default function EvidenciasPage() {
  const { evidencias, loading } = useHealthData();
  const safeEvidencias = Array.isArray(evidencias) ? evidencias : [];

  return (
    <AppShell>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4 drop-shadow-md">
            <Database size={32} className="text-[#009B3A]" /> Arcabouço Normativo e Evidências 🏛️
          </h2>
          <span className="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#0033A0]/20 text-blue-400 border border-blue-500/30">
            {safeEvidencias.length} Documentos Ativos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
          {safeEvidencias.length > 0 ? (
            safeEvidencias.map((doc: any, idx: number) => (
              <DocumentCard key={doc.id || idx} doc={doc} index={idx} isLight={false} />
            ))
          ) : (
            !loading && <p className="text-sm font-bold opacity-40 italic">Aguardando inserção de dados estratégicos no Supabase...</p>
          )}
        </div>
        
      </motion.div>
    </AppShell>
  );
}