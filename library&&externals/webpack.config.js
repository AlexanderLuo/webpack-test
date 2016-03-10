var path = require("path");

module.exports = {
    entry : {
        entry : './src/entry.js'
    },
    output : {
        path : path.join(__dirname, 'dist'),
        filename : 'js/bundle.js',
        libraryTarget : 'umd',
        // library : 'AA'
    },
    resolve: {
        extensions: ['', '.js', '.es6']
    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "jquery": "jQuery"
    }
};
