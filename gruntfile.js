/*
 * ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2022 Nevware21
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                "Gruntfile.js",
                "<%= nodeunit.tests %>"
            ],
            options: {
                jshintrc: ".jshintrc"
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ["tmp"]
        },

        // Unit tests.
        nodeunit: {
            tests: ["test/*_test.js"]
        },
        ts: {
            options: {
                debug: true,
                logOutput: true
            },
            "ts_debug": {
                // Default ES5
                tsconfig: "./lib/tsconfig.json",
                outDir: "./lib/build/es5"
            },
            "ts_debug_es6": {
                tsconfig: "./lib/tsconfig.es6.json",
                outDir: "./lib/build/es6"
            },
            "ts_debug-test": {
                tsconfig: "./lib/test/tsconfig.test.json",
                outDir: "./lib/test-esm"
            }
        },
        "lint": {
            options: {
                format: "codeframe",
                suppressWarnings: false
            },
            "ts_debug": {
                tsconfig: "./lib/tsconfig.json",
                ignoreFailures: true
            },
            "ts_debug-test": {
                tsconfig: "./lib/test/tsconfig.test.json",
                ignoreFailures: true
            },
            "ts_debug-fix": {
                options: {
                    tsconfig: "./lib/tsconfig.json",
                    fix: true
                }
            },
            "ts_debug-test-fix": {
                options: {
                    tsconfig: "./lib/test/tsconfig.test.json",
                    fix: true
                }
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadNpmTasks("@nevware21/grunt-ts-plugin");
    grunt.loadNpmTasks("@nevware21/grunt-eslint-ts");

    grunt.registerTask("rollupuglify", ["ts:rollupuglify" ]);
    grunt.registerTask("ts_debug", [ "lint:ts_debug-fix", "lint:ts_debug-test-fix", "ts:ts_debug", "ts:ts_debug_es6", "ts:ts_debug-test" ]);
    grunt.registerTask("ts_debug-test", [ "lint:ts_debug-test-fix", "ts:ts_debug-test" ]);
    grunt.registerTask("ts_debug-lint", [ "lint:ts_debug-fix", "lint:ts_debug-test-fix" ]);
    grunt.registerTask("dolint", [ "lint:ts_debug", "lint:ts_debug-test" ]);
    grunt.registerTask("lint-fix", [ "lint:ts_debug-fix", "lint:ts_debug-test-fix" ]);

    // By default, lint and run all tests.
    grunt.registerTask("default", ["jshint" ]);
};
