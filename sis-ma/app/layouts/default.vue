<template>
  <div class="flex h-screen w-full overflow-hidden">
    <aside class="w-72 h-full glass border-r border-white/5 flex flex-col z-50">
      <div class="p-8">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-[#0033A0] flex items-center justify-center shadow-[0_0_20px_rgba(0,51,160,0.5)]">
            <span class="font-black text-white italic">MA</span>
          </div>
          <div>
            <h1 class="font-black text-sm uppercase tracking-tighter leading-tight">Hub Saúde</h1>
            <p class="text-[9px] font-bold text-[#FFD100] uppercase tracking-widest">Governo do Estado</p>
          </div>
        </div>
      </div>

      <nav class="flex-1 px-4 space-y-2">
        <div class="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 group cursor-pointer hover:bg-[#0033A0]/20 transition-all">
          <div class="w-2 h-2 rounded-full bg-[#0033A0] group-hover:animate-ping"></div>
          <span class="text-xs font-black uppercase tracking-widest">Painel Realtime</span>
        </div>
        </nav>

      <div class="p-6 border-t border-white/5">
        <div class="flex items-center gap-3 p-3 rounded-2xl bg-white/5">
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#EF3340] to-[#0033A0]"></div>
          <div class="overflow-hidden">
            <p class="text-[10px] font-black truncate">JEAN BATISTA</p>
            <p class="text-[8px] opacity-50 uppercase">Gestor de Inteligência</p>
          </div>
        </div>
      </div>
    </aside>

    <main class="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
      <slot />
    </main>
  </div>
</template>