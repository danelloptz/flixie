const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  pwa: {
    name: 'Vue PWA App',
    themeColor: '#42b983',
    backgroundColor: '#ffffff',
    display: 'standalone',
    start_url: '.',
    manifestOptions: {
      short_name: 'VuePWA',
      icons: [
        {
          src: 'src/assets/images/flixie_nobg.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'src/assets/images/flixie_nobg.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workboxPluginMode: 'GenerateSW',  // автоматическая генерация service worker
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
});
