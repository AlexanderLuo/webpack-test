require('./app2.css');

require.ensure(['./chunk2.js'], function(require) {
    console.log("chunk2 ensure");
});

document.getElementById("container").textContent = "APP1 APP2";