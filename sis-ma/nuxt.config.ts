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

  modules: [
    '@nuxt/image',
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    families: {
      'Plus Jakarta Sans': [300, 400, 600, 800, 900],
    },
    display: 'swap',
  },

  image: {
    format: ['webp'],
    quality: 100,
  }
})