var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

module.exports = {
    entry : {
        index : './src/js/index.js',
        app : './src/js/app1.js'
    },
    output : {
        path : path.join(__dirname, 'common'),
        filename : 'js/[name].js',
        chunkFilename: "js/[id].chunk.js"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.es6']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("commons", "commons.js"),
        new ExtractTextPlugin("[name].css")
    ]
};
