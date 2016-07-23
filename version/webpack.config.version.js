/**
 * webpack打包配置文件
 * 文件打版本，线上发布，自定义插件方式
 */

var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');

module.exports = {
    entry : './app.js',
    output : {
        path : './assets/',
        filename : '[name].[hash].bundle.js',
        publicPath : 'http://rynxiao.com/assets/'
    },
    module : {
        loaders : [
            { test : /\.js$/, loader : 'babel' },
            { test : /\.css$/, loader : 'style!css' }
        ]
    },
    plugins : [
        function() {
            this.plugin("done", function(stats) {
                fs.writeFileSync(
                    path.join(__dirname, "stats.json"),
                    JSON.stringify(stats.toJson())
                );
                fs.readFile('./index.html', function(err, data) {
                    var $ = cheerio.load(data.toString());
                    $('script[src*=assets]').attr('src', 'http://rynxiao.com/assets/main.' + stats.hash +'.bundle.js');
                    fs.writeFile('./index.html', $.html(), function(err) {
                        !err && console.log('Set has success: '+ stats.hash)
                    })
                })
            });
        }
    ]
};