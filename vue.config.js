const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        devServer: {
            headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' },
            compress: true,
            disableHostCheck: true
        }
    },
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static'
});
