var debug = require('debug')('app.db')
    , mongoose = require('mongoose')
    , modelCat = require('./models/modelCat')
    //, connString = 'mongodb://' + process.env.MY_USER + ':' + process.env.MY_PWD + '@somehost.com:9999/DbName';
    ;

// Connect to db
mongoose.connect('mongodb://ds033559.mongolab.com:33559/ciintegration', {user: 'test', pass: 'supertest'});

var db = mongoose.connection;
db.once('open', function callback () {
    debug("Connected to mongodb !")
});
db.on('close', function () {
    debug('Mongo closed.');
});
db.on('error', console.error.bind(console, 'connection error:'));

module.exports.mongoose = mongoose;
module.exports.Cat = modelCat;