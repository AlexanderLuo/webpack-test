require('./app1.css');

require.ensure(['./chunk1.js'], function(require) {
    console.log("chunk1 ensure");
});

document.getElementById("container").textContent = "APP";