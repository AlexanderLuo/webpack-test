var path = require("path");
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
                require("fs").writeFileSync(
                    path.join(__dirname, "stats.json"),
                    JSON.stringify(stats.toJson())
                );
            });
        }
    ]
};
