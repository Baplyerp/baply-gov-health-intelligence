<script setup>
import { ref } from 'vue'
import { 
  LayoutDashboard, 
  Building2, 
  Activity, 
  LibraryBig, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'

const isExpanded = ref(true)

const menuItems = [
  { name: 'Visão Geral', icon: LayoutDashboard, path: '/', iconColor: 'text-[#006394]', bgHover: 'hover:bg-[#006394]/5', textHover: 'group-hover:text-[#006394]', activeClass: 'bg-[#006394]/10 text-[#006394] border-l-4 border-[#006394]' },
  { name: 'Infraestrutura', icon: Building2, path: '/infraestrutura', iconColor: 'text-[#D81A21]', bgHover: 'hover:bg-[#D81A21]/5', textHover: 'group-hover:text-[#D81A21]', activeClass: 'border-l-4 border-transparent text-slate-500' },
  { name: 'Monitoramento', icon: Activity, path: '/epidemiologia', iconColor: 'text-[#F68F1E]', bgHover: 'hover:bg-[#F68F1E]/5', textHover: 'group-hover:text-[#F68F1E]', activeClass: 'border-l-4 border-transparent text-slate-500' },
  { name: 'Base de Conhecimento', icon: LibraryBig, path: '/evidencias', iconColor: 'text-[#009B3A]', bgHover: 'hover:bg-[#009B3A]/5', textHover: 'group-hover:text-[#009B3A]', activeClass: 'border-l-4 border-transparent text-slate-500' },
  { name: 'Configurações', icon: Settings, path: '/config', iconColor: 'text-slate-400', bgHover: 'hover:bg-slate-100', textHover: 'group-hover:text-slate-800', activeClass: 'border-l-4 border-transparent text-slate-500' },
]
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden font-['Plus_Jakarta_Sans'] bg-slate-50">
    
    <aside 
      :class="isExpanded ? 'w-72' : 'w-20'"
      class="h-full glass border-r border-slate-200 flex flex-col z-50 bg-white/80 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) relative shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
    >
      
      <button 
        @click="isExpanded = !isExpanded"
        class="absolute -right-3.5 top-10 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md hover:scale-110 hover:border-[#006394] hover:text-[#006394] transition-all z-50 text-slate-400 group"
      >
        <ChevronLeft v-if="isExpanded" class="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        <ChevronRight v-else class="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </button>

      <div class="h-28 border-b border-slate-100 flex items-center justify-center p-0 transition-all overflow-hidden relative">
        <NuxtImg 
          src="/logo-ma-cor.png" 
          alt="Logomarca Governo do Maranhão" 
          width="180"
          quality="100"
          :class="isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-90 absolute'"
          class="drop-shadow-sm transition-all duration-500 ease-out px-4"
        />
        <NuxtImg 
          src="/brasao-ma.png" 
          alt="Brasão do Maranhão" 
          width="60"
          quality="100"
          :class="!isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-90 absolute pointer-events-none'"
          class="transition-all duration-500 ease-out hover:scale-110 cursor-pointer object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
        />
      </div>

      <nav class="flex-1 px-3 py-8 space-y-2 overflow-y-auto custom-scrollbar">
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path"
          class="relative flex items-center p-3 rounded-xl group cursor-pointer transition-all duration-300 ease-out"
          :class="[item.activeClass, item.bgHover, item.textHover]"
        >
          <div 
            class="flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" 
            :class="[isExpanded ? 'w-8' : 'w-full', item.iconColor]"
          >
            <component :is="item.icon" class="w-5 h-5 transition-colors duration-300" stroke-width="2.5" />
          </div>
          
          <span 
            class="ml-3 text-[11px] font-extrabold uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap"
            :class="isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute pointer-events-none'"
          >
            {{ item.name }}
          </span>

          <div 
            v-if="!isExpanded"
            class="absolute left-14 px-3 py-2 bg-slate-800/95 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl border border-white/10 z-50"
          >
            {{ item.name }}
          </div>
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-slate-100 bg-slate-50/50">
        <div class="flex items-center justify-center p-2 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group">
          <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-[#006394] to-[#D81A21] flex-shrink-0 shadow-inner group-hover:ring-2 ring-offset-2 ring-[#006394]/30 transition-all duration-300"></div>
          
          <div class="ml-3 overflow-hidden flex-1 transition-all duration-300" :class="isExpanded ? 'opacity-100 w-full' : 'opacity-0 w-0 absolute'">
            <p class="text-[10px] font-black truncate text-slate-800 group-hover:text-[#006394] transition-colors">JEAN BATISTA</p>
            <p class="text-[8px] uppercase text-slate-400 font-bold tracking-wider group-hover:text-[#D81A21] transition-colors">Analista de Gestão</p>
          </div>
        </div>
      </div>
    </aside>

    <main class="flex-1 overflow-y-auto p-10 relative">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
.custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #cbd5e1; }
</style>