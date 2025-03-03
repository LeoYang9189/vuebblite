const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '/',
  devServer: {
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    }
  }
})
