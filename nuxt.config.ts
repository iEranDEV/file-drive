// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    postcss: {
        plugins: {
            autoprefixer: {},
            tailwindcss: {}
        }
    },
    css: ['~/assets/css/index.css'],
})
