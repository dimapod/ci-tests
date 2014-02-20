# CI

## Front
- AngularJS ([seed](https://github.com/angular/angular-seed))
  - feature oriented organisation
- Sass with Compass
- Tests
  - karma: for unit tests (coffeescript)
  - protractor: for integration tests (coffeescript)

## Server
- node.js (modul organisation inspired by [express-boilerplate](https://github.com/PuerkitoBio/express-boilerplate/tree/master/lib))
- express
- mongoose (mongo from [mongolab.com](https://mongolab.com/welcome/))
- [debug](https://github.com/visionmedia/debug) for node
- promises (todo)
- express-jwt (todo)

## Build & deployment
- grunt.js
- live compilation scss/compass
- CI with [drone.io](https://drone.io/github.com/dimapod/ci-tests) [![Build Status](https://drone.io/github.com/dimapod/ci-tests/status.png)](https://drone.io/github.com/dimapod/ci-tests/latest) and [TravisCI](https://travis-ci.org/dimapod/ci-tests) [![Build Status](https://travis-ci.org/dimapod/ci-tests.png?branch=master)](https://travis-ci.org/dimapod/ci-tests)
  - runs unit tests
  - runs integration tests
  - automatic deploy to [heroku](http://ci-tests.herokuapp.com/app)
- dist (todo)
  - clean, imagemin, autoprefixer, concat, ngmin, copy:dist, cssmin, uglify, rev, usemin, htmlmin (todo)
  - commit to github/dist brunch (todo)
