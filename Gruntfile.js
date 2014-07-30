module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: true,
                ignores: ['public/js/main.min.js', 'public/js/lib/**/*.js']
            },
            public: {
                src: [
                    'routes/**/*.js',
                    'bin/www',
                    'server.js',
                    'public/js/**/*.js'
                ]

            }
        },
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: "public/js/main.js",
                    paths: {
                        socketIO:'../../node_modules/socket.io/node_modules/socket.io-client/socket.io'
                    },
                    name: "main",
                    out: "public/js/main.min.js",
                    optimizeCss: 'standard',
                    findNestedDependencies: true,
                    removeCombined: true,
                    optimize: 'uglify2',
                    preserveLicenseComments: false,
                    generateSourceMaps: true
                }
            }
        },
        stylus: {
            compile: {
                options: {
                    linenos: true,
                    compress: false
                },
                files: {
                    'public/css/style.css': ['public/css/*.styl']
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: ['public/css/*.styl'],
                tasks: ['stylus']
            },
            scripts: {
                files: ['**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['stylus','jshint','requirejs']);

};
