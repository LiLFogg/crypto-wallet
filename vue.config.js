const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true
}), {
  configureWebpack: {
    resolve: {
      alias: {
        'vue': 'vue/dist/vue.esm-bundler.js'
      }
    },
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: process.env.NODE_ENV !== 'production'
    }
  }
}
