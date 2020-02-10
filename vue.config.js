const path = require('path')

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: process.env.API_URL,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                scss: path.resolve(__dirname, 'src/assets/scss')
            }
        }
    }
}