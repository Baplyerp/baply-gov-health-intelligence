"use client";

import { memo } from "react";
import ReactECharts from "echarts-for-react";

export const AreaVisual = memo(({ data = [], isLight }: any) => {
  // Configuração do Gráfico de Área com Neon e Gradiente ECharts
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: isLight ? '#fff' : '#0f172a',
      borderColor: '#FFD100',
      textStyle: { color: isLight ? '#0f172a' : '#fff', fontWeight: 'bold' },
      borderRadius: 12
    },
    grid: { top: 30, right: 20, bottom: 30, left: 40, containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map((d: any) => d.mes),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: isLight ? '#64748b' : '#94a3b8', fontWeight: 'bold' },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: isLight ? '#64748b' : '#94a3b8' },
      splitLine: { lineStyle: { type: 'dashed', color: isLight ? '#e2e8f0' : '#ffffff10' } }
    },
    series: [
      {
        name: 'Dado Real',
        type: 'line',
        smooth: true,
        data: data.map((d: any) => d.atual),
        symbolSize: 8,
        itemStyle: { color: '#0033A0', borderColor: '#fff', borderWidth: 2 },
        lineStyle: { 
          width: 4, 
          color: '#0033A0',
          shadowColor: 'rgba(0, 51, 160, 0.5)', // Efeito Neon
          shadowBlur: 10
        },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 51, 160, 0.6)' },
              { offset: 1, color: 'rgba(0, 51, 160, 0)' }
            ]
          }
        }
      },
      {
        name: 'Preditivo',
        type: 'line',
        smooth: true,
        data: data.map((d: any) => d.projetado),
        symbol: 'none',
        lineStyle: { width: 3, type: 'dashed', color: '#FFD100' }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'canvas' }} />;
});

export const RadarVisual = memo(({ data = [], isLight }: any) => {
  const option = {
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, textStyle: { color: isLight ? '#64748b' : '#94a3b8', fontSize: 11 } },
    radar: {
      indicator: data.map((d: any) => ({ name: d.metrica, max: 100 })),
      splitNumber: 4,
      axisName: { color: isLight ? '#475569' : '#cbd5e1', fontWeight: 'bold', fontSize: 10 },
      splitLine: { lineStyle: { color: isLight ? '#e2e8f0' : '#ffffff15' } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: isLight ? '#e2e8f0' : '#ffffff15' } }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: data.map((d: any) => d.Maranhao),
            name: 'Maranhão',
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: { color: '#FFD100' },
            areaStyle: { color: 'rgba(255, 209, 0, 0.4)' },
            lineStyle: { width: 3, shadowColor: 'rgba(255, 209, 0, 0.5)', shadowBlur: 10 }
          },
          {
            value: data.map((d: any) => d.OCDE),
            name: 'OCDE',
            symbol: 'none',
            itemStyle: { color: '#0033A0' },
            areaStyle: { color: 'rgba(0, 51, 160, 0.1)' },
            lineStyle: { width: 2 }
          }
        ]
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'canvas' }} />;
});

AreaVisual.displayName = "AreaVisual";
RadarVisual.displayName = "RadarVisual";