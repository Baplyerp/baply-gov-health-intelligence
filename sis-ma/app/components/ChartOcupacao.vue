<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { ref, provide } from 'vue'

use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, GridComponent])

// ☀️ AQUI ESTÁ A MÁGICA: Mudamos para o tema Claro
provide('THEME_KEY', 'light')

const option = ref({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e2e8f0',
    textStyle: { color: '#1e293b', fontWeight: 'bold' } // Tooltip agora tem texto escuro
  },
  grid: {
    left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Imperatriz', 'Caxias', 'Balsas', 'Pinheiro', 'S. Inês'],
    axisLine: { lineStyle: { color: '#cbd5e1' } }, // Linha do eixo cinza clara
    axisLabel: { color: '#64748b', fontWeight: 'bold', fontFamily: 'Plus Jakarta Sans' } // Texto cinza chumbo
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: '#f1f5f9' } },
    axisLabel: { color: '#64748b', fontFamily: 'Plus Jakarta Sans' }
  },
  series: [
    {
      name: 'Ocupação (%)',
      type: 'bar',
      barWidth: '40%',
      data: [92, 78, 65, 88, 54],
      itemStyle: {
        // 🔵 Degradê vibrante do Governo (Azul Oficial)
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#006394' },
            { offset: 1, color: 'rgba(0, 99, 148, 0.2)' }
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
        <div class="w-full h-full flex items-center justify-center text-[#006394] font-black text-xs uppercase animate-pulse">
          Motor Gráfico Inicializando...
        </div>
      </template>
    </ClientOnly>
  </div>
</template>