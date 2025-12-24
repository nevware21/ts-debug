process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
    config.set({
        browsers: [ "ChromeHeadlessNoSandbox" ],
        listenAddress: 'localhost',
        hostname: 'localhost',
        frameworks: [ "mocha", "karma-typescript" ],
        files: [
            { pattern: "src/**/*.ts" },
            { pattern: "test/src/**/*.ts" }
        ],
        preprocessors: {
            "**/*.ts": [ "karma-typescript" ]
        },
        karmaTypescriptConfig: {
            tsconfig: "./test/tsconfig.test.karma.json",
            compilerOptions: {
                sourceMap: true
            },
            bundlerOptions: {
                sourceMap: true
            },
            coverageOptions: {
                instrumentation: true,
                sourceMap: true,
                exclude: [
                    /\.(d|spec|test)\.ts$/i,
                    /index.ts$/i,
                    /polyfills.ts$/i
                ]
            },
            reports: {
                "html-spa":  {
                    "directory": "../coverage/dbg",
                    "subdirectory": "browser"
                },
                "json": {
                    "directory": "../coverage/dbg",
                    "subdirectory": "browser",
                    "filename": "coverage-final.json"
                },
                "text": ""
            }
        },

        reporters: [ "spec", "karma-typescript" ],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox', '--disable-gpu']
            }
        },
        logLevel: config.LOG_INFO
    })
};