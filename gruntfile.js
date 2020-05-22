module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
       pkg: grunt.file.readJSON('package.json'),
       ts: {
            build: {
                src: ["src/**/*.ts","!node_modules/**/*.ts"],
                tsconfig: './tsconfig.json',
                // Avoid compiling TypeScript files in node_modules
                options: {
                    module: 'commonjs',
                    // To compile TypeScript using external modules like NodeJS
                    fast: 'never',
                    esModuleInterop: true,
                    resolveJsonModule: true
                    // You'll need to recompile all the files each time for NodeJS
                },
                outDir: "dist"
            },
            // default : {
            //     tsconfig: true
            // }
        },
        tslint: {
            options: {
                configuration: "tslint.json"
            },
            all: {
                src: ['src/**/*.ts', "!node_modules/**/*.ts", "!obj/**/*.ts", "!typings/**/*.ts"]
                // avoid linting typings files and node_modules files
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.ts', '!node_modules/**/*.ts'], // the watched files
                tasks: ["newer:tslint:all", "ts:build"], // the task to run
                options: {
                    spawn: false // makes the watch task faster
                }
            }
        },
        nodemon: {
            dev: {
                script: 'dist/src/server.js'
            },
            options: {
                ignore: ['node_modules/**', 'Gruntfile.js'],
                env: {
                    PORT: '9096'
                }
            }
        },
        concurrent: {
            watchers: {
                tasks: ['tslint','nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-tslint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-newer");
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-concurrent");
 
    // Default tasks.
    grunt.registerTask('default', ["tslint:all", "ts"]);
    grunt.registerTask("serve", ["concurrent:watchers"]);
 };
