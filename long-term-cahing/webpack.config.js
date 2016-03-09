var path = require("path");
var cheerio = require("cheerio");
var fs = require("fs");

module.exports = {
    entry : './entry.js',
    output : {
        path : path.join(__dirname, "assert", "[hash]"),
        publicPath : "assert/[hash]/",
        filename : "output.[hash].bundle.js",
        chunkFilename : "[id].[hash].bundle.js"
    },
    plugins : [
        function() {
            this.plugin("done", function(stats) {
                // 生成json文件
                fs.writeFileSync(
                    path.join(__dirname, "stats.json"),
                    JSON.stringify(stats.toJson())
                );

                // 文件替换
                fs.readFile('./index.html', function(err, data) {
                   var $ = cheerio.load(data.toString());
                   $('script[src*=assert]').attr('src', './assert/'+ stats.hash +'/output.'+ stats.hash +'.bundle.js');
                   fs.writeFile('./index.html', $.html(), function(err) {
                       !err && console.log('Set has success: '+ stats.hash)
                   })
               })
            });
        }
    ]
};
