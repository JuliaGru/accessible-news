export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    '~/assets/theme.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/components',
    '~/plugins/composition-api.js',
    '~/plugins/storyblok-rich-text-renderer.js',
    { src: "~/plugins/vue-announcer.js", mode: "client" }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/date-fns',
    'nuxt-purgecss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/storyblok/storyblok-nuxt
    [
      'storyblok-nuxt',
      {
        accessToken: 'AZg8k4iwgfML7XgBWjtsUQtt',
        cacheProvider: 'memory'
      }
    ],
    '@nuxtjs/axios'
  ],
  axios: {
    // proxy: true
  },
  purgeCSS: {
    whitelistPatterns: [
      /^theme-*/, // theme classes
      /^announcer/, // announcer
    ],
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
}
