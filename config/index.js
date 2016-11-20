// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
// var __webpack_public_path__ = "http://localhost:63342/mark/dist/"
var __webpack_public_path__ = "http://wx.ttj315.com:9090/"
module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        // assetsSubDirectory: 'static',
        assetsSubDirectory: 'htdocs/wx',
        assetsPublicPath: __webpack_public_path__,
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: require('./dev.env'),
        port: 80,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                // target: 'http://192.168.8.70:8080/',
                // target: 'http://192.168.8.123/',
                target: 'http://wx.ttj315.com/',
                changeOrigin: true
            },
            '/wechatpay': {
                target: 'http://wx.ttj315.com/',
                changeOrigin: true
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
