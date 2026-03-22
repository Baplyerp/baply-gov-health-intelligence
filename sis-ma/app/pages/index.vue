<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <div class="flex justify-between items-end">
      <div>
        <h2 class="text-3xl font-black uppercase tracking-tighter">Panorama de Saúde</h2>
        <p class="text-xs font-bold text-[#0033A0] uppercase tracking-[0.3em]">Secretaria de Estado da Saúde</p>
      </div>
      <div class="text-right">
        <p class="text-[10px] font-black opacity-40 uppercase">Última Atualização</p>
        <p class="text-sm font-black">22 MAR 2026 • 10:45</p>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
      
      <div class="col-span-12 lg:col-span-8 h-80 glass rounded-[40px] p-8 neon-blue relative group overflow-hidden">
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-[#0033A0]/10 rounded-full blur-[80px] group-hover:bg-[#0033A0]/20 transition-all"></div>
        <h3 class="text-lg font-black uppercase mb-2">Fluxo de Atendimento Estadual</h3>
        <p class="text-xs opacity-50 mb-10">Monitoramento em tempo real de todas as Regionais</p>
        
        <div class="w-full h-32 flex items-end gap-2">
          <div v-for="i in 12" :key="i" 
            :style="{ height: Math.random() * 100 + '%' }"
            class="flex-1 bg-gradient-to-t from-[#0033A0] to-blue-400 rounded-t-lg opacity-60 hover:opacity-100 transition-all cursor-pointer">
          </div>
        </div>
      </div>

      <div class="col-span-12 lg:col-span-4 h-80 glass rounded-[40px] p-8 neon-yellow flex flex-col justify-between">
        <div>
          <span class="px-3 py-1 bg-[#FFD100]/20 text-[#FFD100] rounded-full text-[9px] font-black uppercase tracking-widest">Alerta de Ocupação</span>
          <h3 class="text-4xl font-black mt-4 tracking-tighter text-[#FFD100]">92%</h3>
          <p class="text-xs font-bold uppercase mt-1">Regional Sul / Imperatriz</p>
        </div>
        <button class="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#EF3340] hover:text-white transition-all">
          Ver Detalhes 🚨
        </button>
      </div>

    </div>
  </div>
</template>