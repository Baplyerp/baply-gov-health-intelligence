import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // 🚀 Ativa o motor Nuxt 4 e a nova estrutura de diretórios
  future: {
    compatibilityVersion: 4,
  },
  
  // ⚡ Configurações de Compatibilidade e Build
  compatibilityDate: "2024-11-01",
  
  // 🛡️ Expondo as chaves de forma segura para o Frontend
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_KEY,
    }
  },

  vite: { plugins: [tailwindcss()] },
})
  
  // 🛠️ Ativa o Tailwind CSS v4 através do motor Vite
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  // 🧠 Otimizações Experimentais (Alta Performance)
  experimental: {
    // Permite que componentes assíncronos não travem a renderização
    asyncContext: true, 
    // Garante que o Vue e o Router sejam empacotados de forma otimizada
    externalVue: false, 
  },

  // 🔌 Preparação para o Supabase e Módulos de IA (Deixamos pronto)
  modules: [
    // Futuros módulos entrarão aqui (ex: @nuxtjs/supabase)
  ],
})