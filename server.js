var express    = require('express');

var app = express();

var server = app.listen(3000, function() {
    var address = server.address();
    console.log("Server listening to %s:%d within %s environment",
                address.address, address.port, app.get('env'));
});

