module.exports = function (config) {
    config.set({
        basePath: '../',

        files: [
            'app/lib/jquery/jquery-1.11.0.min.js',
            'app/lib/lodash/lodash.underscore-2.4.1.min.js',
            'app/lib/angular/angular.js',
            'app/lib/angular/angular-*.js',
            'test/lib/angular/angular-mocks.js',
            'app/scripts/**/*.js',
            'test/unit/**/*.js',
            'test/unit/**/*.coffee'
        ],

        exclude: [
            'app/lib/angular/angular-loader.js',
            'app/lib/angular/*.min.js',
            'app/lib/angular/angular-scenario.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coffee-preprocessor'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    })
}
