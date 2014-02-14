module.exports = function (grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
						browser:"firefox"
					}
				}
		    }
		  }
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-protractor-runner');

	grunt.registerTask('test', ['karma:continuous']);


	grunt.registerTask('express', 'Start a custom web server', function() {
		require('./server/server.js');
	});

	// Used by the CLI build servers
	grunt.registerTask('drone', ['express', 'karma:drone', 'protractor:drone']);
	grunt.registerTask('travis', ['karma:travis']);
};