var bodyParser = require('body-parser');
var express    = require('express');
var sqlite3    = require('sqlite3');

var db = new sqlite3.Database('parking_violations.db');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var server = app.listen(3000, function() {
    var address = server.address();
    console.log("Server listening to %s:%d within %s environment",
                address.address, address.port, app.get('env'));
});