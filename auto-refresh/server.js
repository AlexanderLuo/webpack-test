var webpack = require('webpack');
var config = require('./webpack.config.js');
var WebpackDevServer = require("webpack-dev-server");

var compiler = webpack(config);
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: false,
    historyApiFallback: true
}).listen(8080, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:3000');
});
