<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { ref, provide } from 'vue'

// 🚀 Registrando apenas os módulos necessários para máxima velocidade
use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, GridComponent])

// 🎨 Tema Escuro Otimizado (Sem fundo para herdar o Glassmorphism)
provide('THEME_KEY', 'dark')

const option = ref({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: 'rgba(3, 6, 16, 0.9)',
    borderColor: '#0033A0',
    textStyle: { color: '#F8FAFC' }
  },
  grid: {
    left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Imperatriz', 'Caxias', 'Balsas', 'Pinheiro', 'S. Inês'],
    axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
    axisLabel: { color: '#94a3b8', fontWeight: 'bold' }
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    axisLabel: { color: '#94a3b8' }
  },
  series: [
    {
      name: 'Ocupação (%)',
      type: 'bar',
      barWidth: '40%',
      data: [92, 78, 65, 88, 54],
      itemStyle: {
        // 🔵 Degradê vibrante do Governo
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#0033A0' }, // Azul Gov MA
            { offset: 1, color: 'rgba(0, 51, 160, 0.2)' }
          ]
        },
        borderRadius: [6, 6, 0, 0]
      }
    }
  ]
})
</script>

<template>
  <div class="w-full h-full min-h-[300px]">
    <ClientOnly>
      <VChart :option="option" autoresize />
      <template #fallback>
        <div class="w-full h-full flex items-center justify-center text-[#FFD100] font-black text-xs uppercase animate-pulse">
          Renderizando Motor Gráfico...
        </div>
      </template>
    </ClientOnly>
  </div>
</template>