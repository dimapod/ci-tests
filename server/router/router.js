var debug = require('debug')('router')
    , URL_PREFIX = "/rest";

// Two dependencies, an Express HTTP server and a handler
module.exports = function (app, handler) {
    debug('setting up routes...');

    // Systems
    app.get(URL_PREFIX + '/systems', handler.systems);

    // Cats
    app.get(URL_PREFIX + '/cats', handler.getCats);
    app.get(URL_PREFIX + '/cats/:name', handler.getACat);
    app.post(URL_PREFIX + '/cats', handler.addACat);

    // Drop the base
    app.post(URL_PREFIX + '/reinit', handler.reinitBase);
};
