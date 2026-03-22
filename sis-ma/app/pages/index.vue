<script setup>
import { TrendingUp, TrendingDown, Minus, AlertCircle, Activity } from 'lucide-vue-next'

const { data: panorama, pending } = await useFetch('/api/panorama')

const getStatusColor = (status) => {
  if (status === 'success') return 'text-[#009B3A] bg-[#009B3A]/10 border-[#009B3A]/20'
  if (status === 'warning') return 'text-[#F68F1E] bg-[#F68F1E]/10 border-[#F68F1E]/20'
  if (status === 'danger') return 'text-[#D81A21] bg-[#D81A21]/10 border-[#D81A21]/20'
  return 'text-slate-500 bg-slate-100 border-slate-200'
}

const getStatusIcon = (status, tendencia) => {
  if (tendencia.includes('+') && status === 'warning') return TrendingUp
  if (tendencia.includes('-') && status === 'success') return TrendingDown
  return Minus
}
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-8 font-['Plus_Jakarta_Sans']">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-200 pb-6 gap-4 text-slate-800">
      <div>
        <h2 class="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
          Visão Geral <Activity class="w-6 h-6 text-[#006394]" />
        </h2>
        <p class="text-xs font-bold text-[#006394] uppercase tracking-[0.3em] mt-1">Sala de Situação • Governo do Maranhão</p>
      </div>
      <div class="text-left md:text-right">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Motor Preditivo</p>
        <div class="flex items-center gap-2 mt-1">
          <div class="w-2 h-2 rounded-full" :class="pending ? 'bg-amber-400 animate-pulse' : 'bg-[#009B3A]'"></div>
          <p class="text-sm font-black text-slate-700">{{ pending ? 'PROCESSANDO...' : 'SISTEMA ONLINE' }}</p>
        </div>
      </div>
    </div>

    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
      <div v-for="i in 4" :key="i" class="bg-white rounded-[24px] p-6 border border-slate-100 h-32"></div>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="kpi in panorama.kpis" :key="kpi.id" class="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
        <div>
          <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{{ kpi.titulo }}</h3>
          <p class="text-3xl font-black tracking-tighter text-slate-800">{{ kpi.valor }}</p>
        </div>
        <div class="flex justify-between items-center mt-4">
          <p class="text-[10px] font-bold text-slate-400">{{ kpi.descricao }}</p>
          <div class="px-2 py-1 rounded-lg border text-[10px] font-black" :class="getStatusColor(kpi.status)">
            {{ kpi.tendencia }}
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6 pt-4">
      <div class="col-span-12 lg:col-span-8 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm min-h-[450px] flex flex-col">
        <div class="mb-6">
          <h3 class="text-lg font-black uppercase text-slate-800">Pressão sobre a Rede Física</h3>
          <p class="text-xs text-slate-500 font-bold uppercase tracking-widest">Correlação Regional de Ocupação</p>
        </div>
        <div class="flex-1">
          <ChartOcupacao 
            v-if="panorama?.pressaoRegional"
            :categorias="panorama.pressaoRegional.regioes" 
            :valores="panorama.pressaoRegional.taxas" 
          />
        </div>
      </div> <div class="col-span-12 lg:col-span-4 bg-[#006394] rounded-[32px] p-8 text-white flex flex-col justify-between shadow-xl">
        <div>
          <span class="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-widest mb-6 inline-block italic">IA Intelligence</span>
          <h3 class="text-2xl font-black tracking-tight mb-4">Otimização de Custos</h3>
          <p class="text-sm text-white/70 leading-relaxed">
            O modelo sugere que a redução de 0.5 dias no giro de leitos pode libertar R$ 2.4M trimestralmente.
          </p>
        </div>
        <button class="w-full py-4 bg-white text-[#006394] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#F68F1E] hover:text-white transition-all">
          Ver Modelo Estatístico
        </button>
      </div>
    </div>
  </div>
</template>