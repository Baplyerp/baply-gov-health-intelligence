<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import "tailwindcss";

:root {
  /* 🏛️ PALETA GOVERNO DO MARANHÃO (VIBRANTE) */
  --gov-blue: #0033A0;
  --gov-red: #EF3340;
  --gov-yellow: #FFD100;
  --gov-green: #009B3A;
  
  /* 🌌 BACKGROUND "PREMIUM DARK" (Não é preto puro) */
  --bg-deep: #050A18;
  --bg-card: rgba(255, 255, 255, 0.03);
  --text-main: #F8FAFC;
}

body {
  margin: 0;
  background-color: var(--bg-deep);
  /* 🛰️ EFEITO DE LUZ DE FUNDO */
  background-image: 
    radial-gradient(circle at 0% 0%, rgba(0, 51, 160, 0.15) 0%, transparent 35%),
    radial-gradient(circle at 100% 100%, rgba(239, 51, 64, 0.1) 0%, transparent 35%);
  color: var(--text-main);
  font-family: 'Inter', system-ui, sans-serif;
  overflow-x: hidden;
}

/* ✨ EFEITO GLASSMORPHISM (VIDRO FOSCO) */
.glass {
  background: var(--bg-card);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

/* ⚡ NEON BORDER */
.neon-blue { border-left: 4px solid var(--gov-blue); box-shadow: -10px 0 20px -10px var(--gov-blue); }
.neon-yellow { border-left: 4px solid var(--gov-yellow); box-shadow: -10px 0 20px -10px var(--gov-yellow); }

/* 🚀 ANIMAÇÃO DE ENTRADA SUAVE */
.page-enter-active, .page-leave-active { transition: all 0.3s ease; }
.page-enter-from, .page-leave-to { opacity: 0; transform: translateY(10px); }
</style>