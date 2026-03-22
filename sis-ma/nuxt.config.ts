import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2024-11-01",
  
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseAnonKey: process.env.SUPABASE_KEY || '',
    }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  // 🚀 ATIVANDO OS MÓDULOS DE ALTA PERFORMANCE
  modules: [
    '@nuxt/image',
    '@nuxtjs/google-fonts'
  ],

  // 🎨 CONFIGURAÇÃO DA TIPOGRAFIA (Estilo Amsi Pro)
  googleFonts: {
    families: {
      'Plus Jakarta Sans': [300, 400, 600, 800, 900], // Fontes modernas e geométricas
    },
    display: 'swap',
  },

  // 🖼️ MOTOR DE IMAGENS
  image: {
    format: ['webp'], // Força carregamento ultrarrápido
    quality: 100,     // Mantém a logo nítida
  }
})