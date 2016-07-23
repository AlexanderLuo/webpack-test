/**
 * webpack打包配置文件
 */

module.exports = {
    entry : './app1.js',
    output : {
        path : './assets/',
        filename : '[name].bundle.js'
    },
    module : {
        loaders : [
            { test : /\.js$/, loader : 'babel' },
            { test : /\.css$/, loader : 'style!css' }
        ],
        noParse: [/moment-with-locales/]
    },
    resolve : {
        alias : {
            moment : 'moment/min/moment-with-locales.min.js'
        }
    },
    externals : {
        moment : true
    }
};