var bodyParser = require('body-parser');
var express    = require('express');
var http       = require('http');
var sqlite3    = require('sqlite3');

var db = new sqlite3.Database('parking_violations.db');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.get('/daily', function(req, res) {
    db.all('SELECT date, strftime(\'%m/%d\',date) AS dateFormatted, ticketCount\
            FROM TicketCountByDate\
            WHERE date > \'2015-09-30\'\
			ORDER BY date;', function(err, row) {
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