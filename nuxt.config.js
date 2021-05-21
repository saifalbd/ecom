export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "server",
  ssr: true,
  generate: {
    minify: false
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "ecom",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    // http://ginnibazar.lara
    script: [
      {
        src: `${
          process.env.NODE_ENV == "production"
            ? "https://ghorerbazar.shop"
            : "http://ginnibazar.lara"
        }/assets-media/1/content/confignew.js`
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~assets/scss/main.scss",
    "~assets/splide/themes/splide-skyblue.min.css"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/proxy",
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/auth-next",
    "@nuxtjs/axios",

    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa"
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // all is function
    { src: "~/plugins/is.js" },
    { src: "~/plugins/persistedState.client.js", mode: "client" },
    // { src: '~/plugins/axios/plugin.js', mode: 'client' },
    "~/plugins/axios/index.js",
    "~/plugins/ziggy/apiUrl.js",
    // { src: '~/plugins/axios/index.js', mode: 'client' },
    // { src: '~/plugins/axios/index.js', mode: 'server' },
    { src: "~/plugins/vue-plugins.js", mode: "client" },
    { src: "~/plugins/validate/formVError.client.js", mode: "client" }
  ],
  // 'http://ginnibazar.lara/json'
  proxy: {
    "/json": {
      target:
        process.env.NODE_ENV == "production"
          ? "https://ghorerbazar.shop"
          : "http://ginnibazar.lara",
      pathRewrite: { "^/json": "/json" }
    },
    "/laravel": {
      target:
        process.env.NODE_ENV == "production"
          ? "https://ghorerbazar.shop"
          : "http://ginnibazar.lara",
      pathRewrite: { "^/laravel": "/" }
    }
  },
  // Global CSS: https://medium.com/@wearethreebears/globally-accessible-css-and-scss-sass-in-your-nuxt-component-files-7c1c012d31bd
  // styleResources: {
  //   scss: ['~/assets/scss/main.scss']
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    credentials: true
    // headers: {
    //   common: {
    //     token:
    //       'f584c1f8a6e4fc4352fd973cfb3a9e437c44d20b1314acb4ee96a7a53c3783e2'
    //   }
    // }
  },
  auth: {
    // token: {
    //   prefix: '_token.'
    // },
    strategies: {
      laravelSanctum: {
        provider: "laravel/sanctum",
        url: "json",
        endpoints: {
          login: {
            url: "/login",
            method: "post",
            propertyName: "data.token"
          },
          user: false,
          logout: false
        }
      }
    }
    // redirect: {
    //   login: '/login',
    //   logout: '/',
    //   callback: '/login',
    //   home: '/'
    // }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en"
    }
  },

  globalName: "myCustomName",
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vue-plugins"],
    cssSourceMap: true,
    extractCSS: true,
    html: {
      minify: {
        collapseWhitespace: false,
        collapseInlineTagWhitespace: false,
        collapseBooleanAttributes: true,
        decodeEntities: false,
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: false,
        useShortDoctype: false
      }
    }
  }
};
