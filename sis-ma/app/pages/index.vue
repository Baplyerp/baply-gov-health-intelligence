<template>
  <div class="max-w-6xl mx-auto space-y-8">
    
    <div class="flex justify-between items-end border-b border-white/5 pb-6">
      <div>
        <h2 class="text-3xl font-black uppercase tracking-tighter text-white">Panorama de Saúde</h2>
        <p class="text-xs font-bold text-[#0033A0] uppercase tracking-[0.3em]">Secretaria de Estado da Saúde • MA</p>
      </div>
      <div class="text-right hidden sm:block">
        <p class="text-[10px] font-black opacity-40 uppercase tracking-widest">Motor Gráfico</p>
        <p class="text-sm font-black text-[#009B3A]">ECHARTS ONLINE</p>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
      
      <div class="col-span-12 lg:col-span-8 glass rounded-[40px] p-8 neon-blue relative flex flex-col min-h-[420px]">
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-[#0033A0]/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div class="mb-6 relative z-10">
          <h3 class="text-xl font-black uppercase mb-1 text-white">Ocupação de Leitos Hospitalares</h3>
          <p class="text-xs opacity-50 font-bold uppercase tracking-widest">Monitoramento Regional em Tempo Real</p>
        </div>
        
        <div class="flex-1 w-full relative z-10">
          <ChartOcupacao />
        </div>
      </div>

      <div class="col-span-12 lg:col-span-4 glass rounded-[40px] p-8 neon-yellow flex flex-col justify-between min-h-[420px]">
        <div>
          <div class="flex justify-between items-start mb-6">
            <span class="px-3 py-1.5 bg-[#FFD100]/20 text-[#FFD100] border border-[#FFD100]/30 rounded-full text-[9px] font-black uppercase tracking-widest">
              Atenção Requerida
            </span>
            <div class="w-2 h-2 rounded-full bg-[#FFD100] animate-pulse"></div>
          </div>
          
          <h3 class="text-6xl font-black tracking-tighter text-[#FFD100]">92<span class="text-2xl text-white/50">%</span></h3>
          <p class="text-sm font-black uppercase mt-2 text-white">Regional Sul / Imperatriz</p>
          <p class="text-[10px] opacity-60 mt-4 leading-relaxed font-medium">
            A capacidade da rede física na macrorregião sul atingiu nível crítico de operação nas últimas 12 horas.
          </p>
        </div>
        
        <button class="w-full py-4 mt-8 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#EF3340] hover:border-[#EF3340] hover:text-white hover:shadow-[0_0_20px_rgba(239,51,64,0.4)] transition-all duration-300">
          Acionar Protocolo 🚨
        </button>
      </div>

    </div>
  </div>
</template>