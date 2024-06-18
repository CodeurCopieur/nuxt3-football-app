// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    'nuxt-swiper',
  ],
  unocss: {
    // options d'UnoCSS
  },
  css: [
    '@unocss/reset/tailwind.css' // ou un autre reset CSS si tu préfères
  ],
  build: {
    transpile: ['@unocss/nuxt']
  },
  axios: {
    proxy: true,
  },
  runtimeConfig: {
    public: {
      rapidApiKey: process.env.RAPIDAPI_KEY || process.env.API_KEY,
    }
  },
  devtools: { enabled: true }
})
