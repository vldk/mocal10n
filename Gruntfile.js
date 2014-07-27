module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: true,
                ignores: ['public/js/main.min.js']
            },
            public: {
                src: ['public/js/*.js']

            }
        },
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: "public/js/main.js",
                    paths: {
                        socketIO:'../../node_modules/socket.io/node_modules/socket.io-client/socket.io'
                    },
                    name: "main", // assumes a production build using almond
                    out: "public/js/main.min.js",
                    optimizeCss: 'standard',
                    findNestedDependencies: true,
                    removeCombined: true,
                    optimize: 'uglify2',
                    preserveLicenseComments: false,
                    generateSourceMaps: true
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['jshint','requirejs']);

};
