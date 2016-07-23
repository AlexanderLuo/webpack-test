/**
 * webpack打包配置文件
 * 如何写一个简单的插件
 */

var HelloWorldPlugin = require('./hello-world-plugin.js');

module.exports = {
    entry : './app.js',
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
    resolve : {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".less"]
    },
    plugins : [
        new HelloWorldPlugin({options: true})
    ]
};