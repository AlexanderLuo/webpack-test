/**
 * webpack打包配置文件
 */

module.exports = {
    entry : './app1.js',
    output : {
        path : './assets/',
        filename : '[name].[hash].bundle.js',
        chunkFilename: "chunk/[chunkhash].chunk.js"
    },
    module : {
        loaders : [
            { test : /\.js$/, loader : 'babel' },
            { test : /\.css$/, loader : 'style!css' }
        ]
    }
};