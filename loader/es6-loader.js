module.exports = function(source, map) {
    source = "console.log('I changed in loader');"
    console.log("param", this.query);
    this.callback(null, source, map);
};