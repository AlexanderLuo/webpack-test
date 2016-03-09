var a = require('./a');
require.ensure(['./b'], function(require) {
    var c = require('./c');
});
