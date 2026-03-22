import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // 🚀 Força o motor a se comportar como Nuxt 4
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-11-01",
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})