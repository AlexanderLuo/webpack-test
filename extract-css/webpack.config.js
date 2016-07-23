/**
 * webpack打包配置文件
 * 抽取公共样式(没有chunk)
 */

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry : {
        app1 : './app1.js',
        app2 : './app2.js'
    },
    output : {
        path : './assets/',
        filename : '[name].bundle.js',
        chunkFileName : 'chunk/[chunkhash].chunk.js'
    },
    module : {
        loaders : [
            { test : /\.js$/, loader : 'babel' },
            { test : /\.css$/, loader : ExtractTextPlugin.extract("style-loader", "css-loader") }
        ]
    },
    plugins : [
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.CommonsChunkPlugin("commons", "commons.js"),
        // new ExtractTextPlugin("style.css", {
        //     allChunks : true
        // })
    ]
};