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
                cssDir: '<%= b.app %>/styles',
                //cssDir: '<%= b.app %>/css',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= b.app %>/img',
                javascriptsDir: '<%= b.app %>/js',
                fontsDir: '<%= b.app %>/styles/fonts',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
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
                    module: "b",
                    usemin: 'scripts/scripts.js'
                },
                cwd: 'app',
                src: "scripts/**/*.html",
                dest: ".tmp/templates.js"
            }
        },

        // Empties folders to start fresh
        clean: {
            dev: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= b.dist %>/*',
                        '!<%= b.dist %>/.git*'
                    ]
                }]
            },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= b.dist %>/*',
                        '!<%= b.dist %>/.git*'
                    ]
                }]
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= b.dist %>/scripts/{,*/}*.js',
                        '<%= b.dist %>/styles/{,*/}*.css',
                        '<%= b.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= b.dist %>/styles/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= b.app %>/index.html',
            options: {
                dest: '<%= b.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= b.dist %>/{,*/}*.html'],
            css: ['<%= b.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= b.dist %>']
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= b.app %>/img',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= b.dist %>/img'
                }]
            }
        },

        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= b.app %>',
                    dest: '<%= b.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        //'.htaccess',
                        '*.html',
                        //'views/{,*/}*.html',
                        //'bower_components/**/*',
                        'img/{,*/}*.{webp}',
                        'fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/img',
                    dest: '<%= b.dist %>/img',
                    src: ['generated/*']
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= b.app %>/styles',
                dest: '.tmp/css/',
                src: '{,*/}*.css'
            }
        }

    });

    // Start express server
    grunt.registerTask('express', 'Start a custom web server', function () {
        //grunt.file.write( "app/scripts/templates.js", "" ); // create empty file (for dev mode)
        require('./server/server.js');
    });

    // Used by the CLI build servers
    grunt.registerTask('test', ['karma:default']);
    grunt.registerTask('drone', ['express', 'compass:server', 'karma:drone', 'protractor:drone']);
    grunt.registerTask('serve', ['env:dev', 'clean:dev', 'express', 'watch']);
    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'compass:dist',
        'imagemin',
        'ngtemplates',
        'concat',
        'ngmin',
        'copy:dist',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [/* TODO 'jshint', */ 'build']);

};