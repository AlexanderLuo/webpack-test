/**
 * webpack打包配置文件
 */

var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './app1.js',
    output : {
        path : './assets/',
        filename : '[name].bundle.js',
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