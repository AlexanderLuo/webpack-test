/**
 * webpack打包配置文件
 * 抽取公共部分js
 */

var webpack = require('webpack');

module.exports = {
    entry : {
        app1 : './app1.js',
        app2 : './app1.js'
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
        new webpack.optimize.CommonsChunkPlugin("common.js")
    ]
};