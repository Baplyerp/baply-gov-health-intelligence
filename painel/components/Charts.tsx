"use client";
import { memo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from "recharts";

export const AreaVisual = memo(({ data = [], isLight }: any) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data}>
      <defs>
        <linearGradient id="colorAtual" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#0033A0" stopOpacity={0.6}/><stop offset="95%" stopColor="#0033A0" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke={isLight ? "#e2e8f0" : "#ffffff10"} vertical={false} />
      <XAxis dataKey="mes" stroke={isLight ? "#64748b" : "#94a3b8"} axisLine={false} fontSize={10} fontWeight="bold" />
      <YAxis stroke={isLight ? "#64748b" : "#94a3b8"} axisLine={false} tickLine={false} fontSize={10} />
      <Tooltip contentStyle={{ backgroundColor: isLight ? '#fff' : '#0f172a', borderColor: '#FFD100', borderRadius: '12px' }} />
      <Area type="monotone" dataKey="projetado" stroke="#FFD100" strokeWidth={2} fill="transparent" strokeDasharray="5 5" name="Preditivo" />
      <Area type="monotone" dataKey="atual" stroke="#0033A0" strokeWidth={4} fillOpacity={1} fill="url(#colorAtual)" name="Dado Real" />
    </AreaChart>
  </ResponsiveContainer>
));

export const RadarVisual = memo(({ data = [], isLight }: any) => (
  <ResponsiveContainer width="100%" height="100%">
    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
      <PolarGrid stroke={isLight ? "#e2e8f0" : "#ffffff15"} />
      <PolarAngleAxis dataKey="metrica" tick={{ fill: isLight ? "#64748b" : "#94a3b8", fontSize: 10, fontWeight: 'bold' }} />
      <Radar name="MA" dataKey="Maranhao" stroke="#FFD100" strokeWidth={3} fill="#FFD100" fillOpacity={0.4} />
      <Radar name="OCDE" dataKey="OCDE" stroke="#0033A0" strokeWidth={2} fill="#0033A0" fillOpacity={0.1} />
      <Legend />
    </RadarChart>
  </ResponsiveContainer>
));

AreaVisual.displayName = "AreaVisual";
RadarVisual.displayName = "RadarVisual";