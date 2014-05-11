var debug = require('debug')('app.server')
    , express = require('express')
    , path = require('path')
    , config = require('./config')
    , db = require('./db/db')
    , handler = require('./handler/handler')(db);

var auth = require('http-auth');
var basic = auth.basic({
        realm: "B Area."
    }, function (username, password, callback) {
        callback(username === "projetb" && password === "!mercenaires");
    }
);

debug('Creating Express server...');
var app = express();

if (process.env.NODE_ENV === "production") {
    app.use(auth.connect(basic));
}

// Apply the configuration
config.applyConfiguration(app);

// Setup routes
require('./router/router')(app, handler);

app.listen(app.get('port'), function () {
    debug("Express server listening on port %d in %s mode", app.get('port'), process.env.NODE_ENV);
});

// Export the server
module.exports = app;