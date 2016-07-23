/**
 * webpack打包配置文件
 * 文件打版本，线上发布
 */

var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './app.js',
    output : {
        path : './assets/',
        filename : '[name].[hash].bundle.js',
        publicPath : 'http://rynxiao.com/assets/'
    },
    module : {
        loaders : [
            { test : /\.js$/, loader : 'babel' },
            { test : /\.css$/, loader : 'style!css' }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            filename: './index-release.html',
            template: path.resolve('index.template'),
            inject: 'body'
        })
    ]
};