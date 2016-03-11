module.exports = {
    entry : {
        index : path.join(SRC_PATH, 'index.js'),
        vendor : ['react', 'react-router', 'react-dom', 'reflux', 'jquery'],
        // common style
        common : path.join(SRC_PATH, 'css/common.less')
    },
    plugins : [
        new webpack.optimize.CommonsChunkPlugin(
            'vendor',
            'vendor.v20160311.js',
            Infinity
        ),
        new HtmlWebpackPlug({
            inject : true,
            filename : 'index.html',
            template : path.join(SRC_PATH, 'index.html'),
            chunks : ['common', 'vendor', 'index']
        })
    ]
};
