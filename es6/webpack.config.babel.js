/**
 * webpack打包配置文件
 * es6配置文件
 */

import fs from 'fs';
import path from 'path';

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
    }
};