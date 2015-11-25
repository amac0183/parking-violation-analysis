var bodyParser = require('body-parser');
var express    = require('express');
var http       = require('http');
var sqlite3    = require('sqlite3');
var queries    = require('./queries.js');

var db = new sqlite3.Database('parking_violations_oct.db');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.get('/daily', function(req, res) {
    db.all(queries.sql.daily, function(err, row) {
        if(err !== null) {
            res.status(500).send('An error has occured: ' + err);
        }
        else {
            res.status(200).json(row);
        }
    });
});

app.get('/state_rank_10', function(req, res) {
    db.all(queries.sql.stateRank10, function(err, row) {
        if(err !== null) {
            res.status(500).send('An error has occured: ' + err);
        }
        else {
            res.status(200).json(row);
        }
    });
});

app.get('/make_rank_10', function(req, res) {
    db.all(queries.sql.makeRank10, function(err, row) {
        if(err !== null) {
            res.status(500).send('An error has occured: ' + err);
        }
        else {
            res.status(200).json(row);
        }
    });
});

var server = app.listen(3000, function() {
    var address = server.address();
    console.log("Server listening to %s:%d within %s environment",
                address.address, address.port, app.get('env'));
});