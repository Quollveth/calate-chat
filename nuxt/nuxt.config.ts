const path = require("path");

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  nitro: {
    output: {
      publicDir: path.join(__dirname, "../build/generated"),
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
});
