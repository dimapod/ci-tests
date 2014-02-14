var express = require('express')
    , path = require('path')
    , http = require('http')
    , mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/ciIntegration');
mongoose.connect('mongodb://ds033559.mongolab.com:33559/ciintegration', {user: 'test', pass: 'supertest'});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("Connected to mongodb !")
});

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 8000);
    app.use(express.static(path.join(__dirname, '../')));
    app.use(express.bodyParser());
});

// REST API
require('./rest')(app, mongoose);

var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

module.exports = server;