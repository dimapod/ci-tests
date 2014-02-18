# CI

## Front
* AngularJS ([seed](https://github.com/angular/angular-seed))
* Sass with Compass
* Karma: for unit tests
* Protractor: for integration tests

## Server
* node.js
* express
* mongoose (mongo from [mongolab.com](https://mongolab.com/welcome/)
* [debug](https://github.com/visionmedia/debug) for node
* promises (todo)
* express-jwt (todo)

## Build & deployment
* grunt
* live compilation scss/compass
* build with [drone.io](https://drone.io/github.com/dimapod/ci-tests): [![Build Status](https://drone.io/github.com/dimapod/ci-tests/status.png)](https://drone.io/github.com/dimapod/ci-tests/latest)
** unit tests
** integration tests
** deployment
* automatically deployed to [heroku](http://ci-tests.herokuapp.com/app)
* dist (todo)
** clean, imagemin, autoprefixer, concat, ngmin, copy:dist, cssmin, uglify, rev, usemin, htmlmin (todo)
** commit to github/dist brunch (todo)
