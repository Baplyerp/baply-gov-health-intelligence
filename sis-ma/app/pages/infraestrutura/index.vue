<script setup>
import { MapPin, Layers, Crosshair, Network, Search, Zap } from 'lucide-vue-next'

const metricasEspaciais = [
  { nome: 'Densidade Atendida', valor: '42.8 hab/km²', icone: Layers, cor: 'text-[#D81A21]' },
  { nome: 'Índice de Moran', valor: '0.68', icone: Network, cor: 'text-[#006394]' },
  { nome: 'Raio de Cobertura', valor: '35 km', icone: Crosshair, cor: 'text-[#F68F1E]' }
]
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-8 font-['Plus_Jakarta_Sans'] pb-12">
    
    <div class="flex justify-between items-end border-b border-slate-200 pb-6 shrink-0">
      <div>
        <h2 class="text-3xl font-black uppercase tracking-tighter text-slate-800 flex items-center gap-3">
          Infraestrutura <MapPin class="w-6 h-6 text-[#D81A21]" />
        </h2>
        <p class="text-xs font-bold text-[#D81A21] uppercase tracking-[0.3em] mt-1">Geoprocessamento • Engenharia de Saúde</p>
      </div>
      <div class="px-4 py-2 bg-slate-100 rounded-xl border border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest">
        Filtro: <span class="text-[#006394]">Macrorregiões</span>
      </div>
    </div>

    <div class="relative rounded-[40px] border border-slate-200 overflow-hidden bg-white shadow-sm min-h-[600px] group">
      
      <div class="absolute inset-0 bg-slate-50 opacity-40 pointer-events-none" style="background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 30px 30px;"></div>
      
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center">
          <Zap class="w-12 h-12 text-slate-300 mx-auto mb-4 animate-pulse" />
          <p class="text-slate-400 font-black tracking-widest uppercase text-[10px]">Aguardando coordenadas do Supabase...</p>
        </div>
      </div>

      <div class="absolute left-8 top-8 bottom-8 w-72 glass border border-white/50 rounded-[32px] p-8 flex flex-col shadow-2xl z-10">
        <h3 class="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 mb-6">Camadas do Território</h3>
        
        <div class="space-y-4 flex-1">
          <div v-for="camada in ['Rede Física SES', 'Vazios Assistenciais', 'Densidade Populacional']" :key="camada"
            class="flex items-center justify-between p-3 rounded-2xl hover:bg-white/50 cursor-pointer transition-all border border-transparent hover:border-slate-200 group/item">
            <span class="text-xs font-bold text-slate-600 group-hover/item:text-[#006394]">{{ camada }}</span>
            <div class="w-4 h-4 rounded border-2 border-slate-300 group-hover/item:border-[#006394]"></div>
          </div>
        </div>

        <button class="w-full py-4 bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#D81A21] transition-all">
          Rodar Modelo Espacial
        </button>
      </div>

      <div class="absolute right-8 top-8 w-64 space-y-4 z-10">
        <div v-for="m in metricasEspaciais" :key="m.nome" class="glass p-5 rounded-3xl border border-white/50 shadow-xl">
          <component :is="m.icone" class="w-4 h-4 mb-3" :class="m.cor" />
          <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ m.nome }}</p>
          <p class="text-xl font-black text-slate-800 tracking-tighter mt-1">{{ m.valor }}</p>
        </div>
      </div>
    </div>
  </div>
</template>