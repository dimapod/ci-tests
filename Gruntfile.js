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
            dist: 'dist',
            templates: 'app/scripts/templates.js'
        },
        pkg: grunt.file.readJSON('package.json'),

        env: {
            options: {
                //Shared Options Hash
            },
            dev: {
                NODE_ENV: 'development'
            },
            prod: {
                NODE_ENV: 'production'
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            jsTest: {
                files: ['test/unit/{,*/}*.js'],
                tasks: ['karma']
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
        },

        // Compile templates
        ngtemplates: {
            app: {
                options: {
                    module: "b"
                },
                cwd: 'app',
                src: "scripts/**/*.html",
                dest: "<%= b.templates %>"
            }
        },

        // Empties folders to start fresh
        clean: {
            dev: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= b.templates %>'
                    ]
                }]
            },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= b.templates %>'
                    ]
                }]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        }

    });

    // Start express server
    grunt.registerTask('express', 'Start a custom web server', function () {
        grunt.file.write( "app/scripts/templates.js", "" ); // create empty file (for dev mode)
        require('./server/server.js');
    });

    // Used by the CLI build servers
    grunt.registerTask('test', ['karma:default']);
    grunt.registerTask('drone', ['express', 'compass:server', 'karma:drone', 'protractor:drone']);
    grunt.registerTask('serve', ['env:dev', 'clean:dev', 'express', 'watch']);
    grunt.registerTask('build', [
        'clean:dist', 'ngtemplates' // TODO : clean, imagemin, autoprefixer, concat, ngmin, copy:dist, cssmin, uglify, rev, usemin, htmlmin
    ]);

    grunt.registerTask('default', [/* TODO 'jshint', */ 'build']);

};