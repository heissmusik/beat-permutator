module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: "0.0.0.0",
                    keepalive: true,
                    bases: ['srv'],
                    livereload: true
                }
            }
        },

        open: {
            all: {
                path: 'http://localhost:<%= express.all.options.port%>'
            }
        },

        watch: {
            all: {
                options: {
                    spawn: false,
                    livereload: true
                    // debounceDelay: 2000,
                },
                files: ['src/**/*.html', 'src/**/*.js', 'src/**/*.scss']
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['index.html', 'js/**', 'css/**', 'vendor/**', 'favicon.ico', 'Octocat.png'],
                        dest: 'srv/'
                    },
                ]
            }
        },

        compass: {
            dev: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'src/css'
                }
            }
        }    

    });


    grunt.registerTask('server', 'Run grunt-express server, open broswer and then watch files', ['express', 'open', 'watch']);
    grunt.registerTask('default', '', ['compass', 'copy', 'server']);

    grunt.event.on('watch', function (action, filepath) {
        grunt.task.run('compass');
        grunt.task.run('copy');
    });

};
