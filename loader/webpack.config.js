/**
 * webpack打包配置文件
 */

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
    }
};