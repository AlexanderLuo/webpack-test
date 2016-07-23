/**
 * webpack打包配置文件
 */

var webpack = require('webpack');

module.exports = {
    entry : [
        'webpack-dev-server/client?http://127.0.0.1:8080', // WebpackDevServer host and port
        'webpack/hot/only-dev-server',
        './app.js'
    ],
    output : {
        path : './assets/',
        filename : '[name].bundle.js',
        publicPath : './assets/'
    },
    module : {
        loaders : [
            { test : /\.js$/, loader : 'react-hot!babel' },
            { test : /\.css$/, loader : 'style!css' }
        ]
    },
    plugins : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
    ]
};