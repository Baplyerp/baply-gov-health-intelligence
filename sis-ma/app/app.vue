<script setup>
// 🧠 O Cérebro do Tema: Define qual governo está usando o sistema
useHead({
  htmlAttrs: {
    // 💡 Teste trocar 'theme-ma' por 'theme-neutro' depois para ver a mudança instantânea
    class: 'theme-ma' 
  }
})
</script>

<template>
  <div class="min-h-screen bg-background text-foreground font-sans transition-colors duration-500">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import "tailwindcss";

/* ☀️ TEMA 1: GOVERNO DO MARANHÃO (MODO POLICLÍNICA - CLARO E CLEAN) */
.theme-ma {
  /* Cores extraídas do Manual Oficial RGB */
  --primary: #D81A21;    /* Vermelho Oficial */
  --secondary: #006394;  /* Azul Oficial */
  --accent: #F68F1E;     /* Amarelo Oficial */
  --green-ma: #009B47;   /* Verde Bandeira */
  
  --background: #F8FAFC; /* Branco Gelo (Fundo principal) */
  --surface: rgba(255, 255, 255, 0.85); /* Cartões em Vidro Claro */
  --foreground: #0F172A; /* Texto Escuro para leitura perfeita */
}

@theme {
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  --color-accent: var(--accent);
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-foreground: var(--foreground);
}

body {
  margin: 0;
  background-color: var(--background);
  color: var(--foreground);
  overflow-x: hidden;
}

/* ✨ VIDRO CLARO (Glassmorphism Light) */
.glass {
  background: var(--surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.05); /* Borda sutil */
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08); /* Sombra elegante */
}
</style>