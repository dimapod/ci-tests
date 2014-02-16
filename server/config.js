var debug = require('debug')('app.config'),
	path = require('path'),
	express = require('express');

// Export method to be compliant with Express 3.0
var applyConfiguration = function (app) {
    app.configure(function () {
		debug('setting up common configuration...');

        app.set('port', process.env.PORT || 8000);
        app.use(express.static(path.join(__dirname, '../')));
        // app.use(express.bodyParser());  // => see http://andrewkelley.me/post/do-not-use-bodyparser-with-express-js.html
        app.use(express.json());
    });

	app.configure('dev', function () {
		debug('setting up "dev" configuration...');
		app.use(express.logger('tiny'));
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
	});

	app.configure('production', function () {
		debug('setting up "production" configuration...');
		app.use(express.errorHandler()); 
	});
}

exports.applyConfiguration = applyConfiguration;
