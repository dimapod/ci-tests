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
				browsers: ['Firefox', 'Chrome', 'PhantomJS']
			},
			travis: {
				browsers: ['Firefox', 'PhantomJS']
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('test', ['karma:continuous']);

	// Used by the CLI build servers
	grunt.registerTask('drone', ['karma:drone']);
	grunt.registerTask('travis', ['karma:travis']);
};