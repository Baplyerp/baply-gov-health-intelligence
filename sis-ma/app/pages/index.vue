<template>
  <div class="max-w-6xl mx-auto space-y-8 font-['Plus_Jakarta_Sans']">
    
    <div class="flex justify-between items-end border-b border-slate-200 pb-6">
      <div>
        <h2 class="text-3xl font-black uppercase tracking-tighter text-slate-800">Panorama de Saúde</h2>
        <p class="text-xs font-bold text-[#006394] uppercase tracking-[0.3em]">Secretaria de Estado da Saúde • MA</p>
      </div>
      <div class="text-right hidden sm:block">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Motor Gráfico</p>
        <p class="text-sm font-black text-[#009B3A]">ECHARTS ONLINE</p>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
      
      <div class="col-span-12 lg:col-span-8 bg-white rounded-[40px] p-8 relative flex flex-col min-h-[420px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-[#006394]/5 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div class="mb-6 relative z-10">
          <h3 class="text-xl font-black uppercase mb-1 text-slate-800">Ocupação de Leitos Hospitalares</h3>
          <p class="text-xs text-slate-500 font-bold uppercase tracking-widest">Monitoramento Regional em Tempo Real</p>
        </div>
        
        <div class="flex-1 w-full relative z-10">
          <ChartOcupacao />
        </div>
      </div>

      <div class="col-span-12 lg:col-span-4 bg-white rounded-[40px] p-8 flex flex-col justify-between min-h-[420px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] border-t-4 border-t-[#D81A21]">
        <div>
          <div class="flex justify-between items-start mb-6">
            <span class="px-3 py-1.5 bg-[#D81A21]/10 text-[#D81A21] border border-[#D81A21]/20 rounded-full text-[9px] font-black uppercase tracking-widest">
              Atenção Requerida
            </span>
            <div class="w-2 h-2 rounded-full bg-[#D81A21] animate-pulse shadow-[0_0_8px_rgba(216,26,33,0.6)]"></div>
          </div>
          
          <h3 class="text-6xl font-black tracking-tighter text-[#D81A21]">92<span class="text-2xl text-slate-400">%</span></h3>
          <p class="text-sm font-black uppercase mt-2 text-slate-800">Regional Sul / Imperatriz</p>
          <p class="text-[10px] text-slate-500 mt-4 leading-relaxed font-medium">
            A capacidade da rede física na macrorregião sul atingiu nível crítico de operação nas últimas 12 horas. Cruza com os dados de densidade da malha do IBGE.
          </p>
        </div>
        
        <button class="w-full py-4 mt-8 bg-[#D81A21] rounded-2xl text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-[#D81A21]/30 hover:bg-[#b0151b] hover:shadow-[#D81A21]/50 transition-all duration-300">
          Acionar Protocolo 🚨
        </button>
      </div>

    </div>
  </div>
</template>