var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry : './src/entry.js',
    output : {
        path : __dirname,
        filename : 'bundle.js'
    }
};
