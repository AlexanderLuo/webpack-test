/**
 * webpack打包配置文件
 * 将公共库分离
 */

var webpack = require('webpack');

module.exports = {
    entry : {
        app : './app1.js',
        vendor : ['jquery', 'underscore']
    },
    output : {
        path : './assets/',
        filename : '[name].bundle.js'
    },
    module : {
        loaders : [
            { test : /\.js$/, loader : 'babel' },
            { test : /\.css$/, loader : 'style!css' }
        ]
    },
    plugins : [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ]
};