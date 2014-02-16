'use strict';


module.exports = function (grunt) {
    // Debug conf
    process.env.DEBUG = process.env.DEBUG || "app.* express:router";

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        // Project settings
        b: {
            app: 'app',
            dist: 'dist'
        },
        pkg: grunt.file.readJSON('package.json'),

        env: {
            options: {
                //Shared Options Hash
            },
            dev: {
                NODE_ENV: 'development',
                //DEBUG: '*'
            },
            prod: {
                NODE_ENV: 'production',
                DEBUG: 'app.*'
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            jsTest: {
                files: ['test/unit/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            compass: {
                files: ['<%= b.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server']
            }
        },

        // Unit tests
        karma: {
            options: {
                configFile: 'config/karma.conf.js',
                singleRun: true,
                autoWatch: false
            },
            default: {
                browsers: ['Chrome'],
                singleRun: false,
                autoWatch: true
            },
            continuous: {
                browsers: ['Chrome']
            },
            drone: {
                browsers: [/*'Firefox', 'Chrome', */'PhantomJS']
            },
            travis: {
                browsers: ['Firefox', 'PhantomJS']
            }
        },

        // Integration tests
        protractor: {
            options: {
                configFile: "node_modules/protractor/referenceConf.js", // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            drone: {
                options: {
                    configFile: "config/protractor-conf.js",
                    args: {
                        browser: "firefox"
                    }
                }
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= b.app %>/styles',
                cssDir: '<%= b.app %>/css',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= b.app %>/img',
                javascriptsDir: '<%= b.app %>/js',
                fontsDir: '<%= b.app %>/fonts',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= b.dist %>/img/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        }

    });

    // Start express server
    grunt.registerTask('express', 'Start a custom web server', function () {
        require('./server/server.js');
    });

    // Used by the CLI build servers
    grunt.registerTask('test', ['karma:continuous']);
    grunt.registerTask('drone', ['express', 'compass:server', 'karma:drone', 'protractor:drone']);
    grunt.registerTask('serve', ['env:dev', 'express', 'watch']);
    grunt.registerTask('build', [
        'compass:server' // TODO : clean, imagemin, autoprefixer, concat, ngmin, copy:dist, cssmin, uglify, rev, usemin, htmlmin
    ]);

    grunt.registerTask('default', [/* TODO 'jshint', */ 'build']);

};