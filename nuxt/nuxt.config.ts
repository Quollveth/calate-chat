const path = require("path");

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  app: {
    head: {},
  },

  nitro: {
    output: {
      publicDir: process.env.IS_DOCKER
        ? ".output/"
        : path.join(__dirname, "../build/generated"),
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],

  css: ["@/assets/base.css"],

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
});
