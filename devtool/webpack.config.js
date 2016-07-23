/**
 * webpack打包配置文件
 */

module.exports = {
    devtool: 'eval-source-map',
    entry : './app1.js',
    output : {
        path : './assets/',
        filename : '[name].bundle.js'
    },
    module : {
        loaders : [
            { test : /\.js$/, loader : 'babel' },
            { test : /\.css$/, loader : 'style!css' }
        ]
    }
};