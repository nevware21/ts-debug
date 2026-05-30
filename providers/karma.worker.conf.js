const childProcess = require('child_process');

function _resolvePuppeteerExecutablePathSync() {
    return childProcess.execFileSync(process.execPath, [
        "-e",
        "require('puppeteer').executablePath().then((path) => process.stdout.write(path || ''))"
    ], {
        encoding: "utf8"
    }).trim();
}

module.exports = function (config) {
    // Puppeteer v25+ resolves executablePath asynchronously, so resolve it in a subprocess
    // to keep this Karma config synchronous.
    try {
        const chromePath = _resolvePuppeteerExecutablePathSync();
        if (chromePath) {
            process.env.CHROME_BIN = chromePath;
            process.env.CHROMIUM_BIN = chromePath;
        }
    } catch (error) {
        console.warn("Puppeteer executable path could not be resolved. Chrome/Chromium tests may be skipped.");
        process.exit(0);
    }
     
    const typescript = require("@rollup/plugin-typescript");
    const plugin = require("@rollup/plugin-node-resolve");
    const commonjs = require("@rollup/plugin-commonjs");
    const istanbul = require("rollup-plugin-istanbul");
    config.set({
        browsers: [ "ChromeHeadlessNoSandbox" ],
        listenAddress: 'localhost',
        hostname: 'localhost',
        frameworks: [ "mocha-webworker" ],
        files: [
            { pattern: "src/**/*.ts", included: false },
            { pattern: "test/src/**/*.ts", included: false }
        ],
        preprocessors: {
            "**/*.ts": [ "rollup" ]
        },
        rollupPreprocessor: {
            plugins: [
                typescript({
                    tsconfig: "./test/tsconfig.worker.karma.json"
                }),
                plugin.nodeResolve({
                    browser: true
                }),
                commonjs(),
                istanbul({
                    exclude: [ 
                        "**/test/**", 
                        "**/node_modules/**",
                        "**/dist-es5/**"
                    ]
                })
            ],
            output: {
                format: "iife",
                dir: "../test-dist",
                sourcemap: true
            }
        },
        client: {
            mochaWebWorker: {
                pattern: [
                    "test/src/**/*.js",
                ]
            }
        },
        coverageReporter: {
            dir: "../coverage/providers/worker",
            includeAllSources: true,
            reporters: [
                { type: "text" },
                { type: "html", subdir: "html" },
                { type: "json", subdir: "./", file: "coverage-final.json" }
            ],
        },
        reporters: ["spec", "coverage" ],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox', '--disable-gpu']
            }
        },
        logLevel: config.LOG_DEBUG
    })
};
