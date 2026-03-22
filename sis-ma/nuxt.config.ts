// nuxt.config.ts
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  
  // 🚀 Dizemos para o motor Vite usar o plugin do Tailwind v4
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  
  // 🎨 Apontamos onde vai ficar o nosso arquivo mestre de CSS
  css: ['~/assets/css/main.css'],
})