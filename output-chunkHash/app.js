require('./app.css');

require.ensure('./main.js', function(require) {
    require('./chunk.js');
});

document.getElementById("container").textContent = "APP";