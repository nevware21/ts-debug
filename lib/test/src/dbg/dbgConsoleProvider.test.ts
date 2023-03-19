/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { encodeAsJson } from "@nevware21/ts-utils";
import { isFunction } from "@nevware21/ts-utils";
import { assert } from "chai";
import { dbgConsoleProvider } from "../../../src/dbg/dbgConsoleProvider";
import { eDbgLevel } from "../../../src/dbg/dbgLevel";

describe("dbgConsoleProvider", () => {
    it("default config", () => {
        let orgConsole = console;
        try {
            let dbgMessage: string | null = null;
            let dbgData: any = null;

            // eslint-disable-next-line no-global-assign
            console = {
                log: function(message: string, data: any) {
                    dbgMessage = message;
                    dbgData = data;
                }
            } as any;

            let testData = {
                test: 1
            };

            let dbgDataTxt = encodeAsJson(testData);

            let provider = dbgConsoleProvider();

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Trace, "Trace Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Debug, "Debug Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Information, "Information Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Warning, "Warning Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Error, "Error Message", testData);
            assert.equal(dbgMessage, "Error Message", "Error message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Critical, "Critical Message", testData);
            assert.equal(dbgMessage, "Critical Message", "Critical message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Terminal, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal Message", "Terminal message");
            assert.equal(dbgData, dbgDataTxt, "test data");

        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }

    });

    it("Level set to Critical", () => {
        let orgConsole = console;
        try {
            let dbgMessage: string | null = null;
            let dbgData: any = null;

            // eslint-disable-next-line no-global-assign
            console = {
                log: function(message: string, data: any) {
                    dbgMessage = message;
                    dbgData = data;
                }
            } as any;

            let testData = {
                test: 1
            };

            let dbgDataTxt = encodeAsJson(testData);
            
            let provider = dbgConsoleProvider({
                lvl: eDbgLevel.Critical
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Trace, "Trace Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Debug, "Debug Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Information, "Information Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Warning, "Warning Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Error, "Error Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Critical, "Critical Message", testData);
            assert.equal(dbgMessage, "Critical Message", "Critical message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Terminal, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal Message", "Terminal message");
            assert.equal(dbgData, dbgDataTxt, "test data");

        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });
    
    it("Level set to None", () => {
        let orgConsole = console;
        try {
            let dbgMessage: string | null = null;
            let dbgData: any = null;

            // eslint-disable-next-line no-global-assign
            console = {
                log: function(message: string, data: any) {
                    dbgMessage = message;
                    dbgData = data;
                }
            } as any;

            let testData = {
                test: 1
            };

            let provider = dbgConsoleProvider({
                lvl: eDbgLevel.None
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Trace, "Trace Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Debug, "Debug Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Information, "Information Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Warning, "Warning Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Error, "Error Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Critical, "Critical Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Terminal, "Terminal Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "test data");

        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });
    
    it("Level set to Terminal", () => {
        let orgConsole = console;
        try {
            let dbgMessage: string | null = null;
            let dbgData: any = null;

            // eslint-disable-next-line no-global-assign
            console = {
                log: function(message: string, data: any) {
                    dbgMessage = message;
                    dbgData = data;
                }
            } as any;

            let testData = {
                test: 1
            };

            let dbgDataTxt = encodeAsJson(testData);

            let provider = dbgConsoleProvider({
                lvl: eDbgLevel.Terminal
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Trace, "Trace Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Debug, "Debug Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Information, "Information Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Warning, "Warning Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Error, "Error Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Critical, "Critical Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Terminal, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal Message", "Terminal message");
            assert.equal(dbgData, dbgDataTxt, "test data");

        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });

    it("Level set to Error", () => {
        let orgConsole = console;
        try {
            let dbgMessage: string | null = null;
            let dbgData: any = null;

            // eslint-disable-next-line no-global-assign
            console = {
                log: function(message: string, data: any) {
                    dbgMessage = message;
                    dbgData = data;
                }
            } as any;

            let testData = {
                test: 1
            };

            let dbgDataTxt = encodeAsJson(testData);

            let provider = dbgConsoleProvider({
                lvl: eDbgLevel.Error
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Trace, "Trace Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Debug, "Debug Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Information, "Information Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Warning, "Warning Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Error, "Error Message", testData);
            assert.equal(dbgMessage, "Error Message", "Error message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Critical, "Critical Message", testData);
            assert.equal(dbgMessage, "Critical Message", "Critical message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Terminal, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal Message", "Terminal message");
            assert.equal(dbgData, dbgDataTxt, "test data");

        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }

    });

    it("Level set to warning", () => {
        let orgConsole = console;
        try {
            let dbgMessage: string | null = null;
            let dbgData: any = null;

            // eslint-disable-next-line no-global-assign
            console = {
                log: function(message: string, data: any) {
                    dbgMessage = message;
                    dbgData = data;
                }
            } as any;

            let testData = {
                test: 1
            };

            let dbgDataTxt = encodeAsJson(testData);

            let provider = dbgConsoleProvider({
                lvl: eDbgLevel.Warning
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Trace, "Trace Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Debug, "Debug Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Information, "Information Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Warning, "Warning Message", testData);
            assert.equal(dbgMessage, "Warning Message", "Warning message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Error, "Error Message", testData);
            assert.equal(dbgMessage, "Error Message", "Error message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Critical, "Critical Message", testData);
            assert.equal(dbgMessage, "Critical Message", "Critical message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Terminal, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal Message", "Terminal message");
            assert.equal(dbgData, dbgDataTxt, "test data");

        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }

    });

    it("Level set to information", () => {
        let orgConsole = console;
        try {
            let dbgMessage: string | null = null;
            let dbgData: any = null;

            // eslint-disable-next-line no-global-assign
            console = {
                log: function(message: string, data: any) {
                    dbgMessage = message;
                    dbgData = data;
                }
            } as any;

            let testData = {
                test: 1
            };

            let dbgDataTxt = encodeAsJson(testData);

            let provider = dbgConsoleProvider({
                lvl: eDbgLevel.Information
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Trace, "Trace Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Debug, "Debug Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Information, "Information Message", testData);
            assert.equal(dbgMessage, "Information Message", "Information message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Warning, "Warning Message", testData);
            assert.equal(dbgMessage, "Warning Message", "Warning message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Error, "Error Message", testData);
            assert.equal(dbgMessage, "Error Message", "Error message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Critical, "Critical Message", testData);
            assert.equal(dbgMessage, "Critical Message", "Critical message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Terminal, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal Message", "Terminal message");
            assert.equal(dbgData, dbgDataTxt, "test data");

        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });

    it("Level set to debug", () => {
        let orgConsole = console;
        try {
            let dbgMessage: string | null = null;
            let dbgData: any = null;

            // eslint-disable-next-line no-global-assign
            console = {
                log: function(message: string, data: any) {
                    dbgMessage = message;
                    dbgData = data;
                }
            } as any;

            let testData = {
                test: 1
            };

            let dbgDataTxt = encodeAsJson(testData);

            let provider = dbgConsoleProvider({
                lvl: eDbgLevel.Debug
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Trace, "Trace Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Debug, "Debug Message", testData);
            assert.equal(dbgMessage, "Debug Message", "Debug message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Information, "Information Message", testData);
            assert.equal(dbgMessage, "Information Message", "Information message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Warning, "Warning Message", testData);
            assert.equal(dbgMessage, "Warning Message", "Warning message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Error, "Error Message", testData);
            assert.equal(dbgMessage, "Error Message", "Error message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Critical, "Critical Message", testData);
            assert.equal(dbgMessage, "Critical Message", "Critical message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Terminal, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal Message", "Terminal message");
            assert.equal(dbgData, dbgDataTxt, "test data");

        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });

    it("Level set to trace", () => {
        let orgConsole = console;
        try {
            let dbgMessage: string | null = null;
            let dbgData: any = null;

            // eslint-disable-next-line no-global-assign
            console = {
                log: function(message: string, data: any) {
                    dbgMessage = message;
                    dbgData = data;
                }
            } as any;

            let testData = {
                test: 1
            };

            let dbgDataTxt = encodeAsJson(testData);

            let provider = dbgConsoleProvider({
                lvl: eDbgLevel.Trace
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Trace, "Trace Message", testData);
            assert.equal(dbgMessage, "Trace Message", "Trace message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Debug, "Debug Message", testData);
            assert.equal(dbgMessage, "Debug Message", "Debug message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Information, "Information Message", testData);
            assert.equal(dbgMessage, "Information Message", "Information message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Warning, "Warning Message", testData);
            assert.equal(dbgMessage, "Warning Message", "Warning message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Error, "Error Message", testData);
            assert.equal(dbgMessage, "Error Message", "Error message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Critical, "Critical Message", testData);
            assert.equal(dbgMessage, "Critical Message", "Critical message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Terminal, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal Message", "Terminal message");
            assert.equal(dbgData, dbgDataTxt, "test data");

        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });

    it("Level set to all", () => {
        let orgConsole = console;
        try {
            let dbgMessage: string | null = null;
            let dbgData: any = null;

            // eslint-disable-next-line no-global-assign
            console = {
                log: function(message: string, data: any) {
                    dbgMessage = message;
                    dbgData = data;
                }
            } as any;

            let testData = {
                test: 1
            };

            let dbgDataTxt = encodeAsJson(testData);

            let provider = dbgConsoleProvider({
                lvl: eDbgLevel.All
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Trace, "Trace Message", testData);
            assert.equal(dbgMessage, "Trace Message", "Trace message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Debug, "Debug Message", testData);
            assert.equal(dbgMessage, "Debug Message", "Debug message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Information, "Information Message", testData);
            assert.equal(dbgMessage, "Information Message", "Information message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Warning, "Warning Message", testData);
            assert.equal(dbgMessage, "Warning Message", "Warning message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Error, "Error Message", testData);
            assert.equal(dbgMessage, "Error Message", "Error message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Critical, "Critical Message", testData);
            assert.equal(dbgMessage, "Critical Message", "Critical message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log(eDbgLevel.Terminal, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal Message", "Terminal message");
            assert.equal(dbgData, dbgDataTxt, "test data");

        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });

    it("Check all functions", () => {
        let orgConsole = console;
        try {
            let results = { };

            // eslint-disable-next-line no-global-assign
            console = {
                log: function(message: string, data: any) {
                    results["log"] = {
                        message,
                        data
                    };
                },
                warn: function(message: string, data: any) {
                    results["warn"] = {
                        message,
                        data
                    };
                },
                error: function(message: string, data: any) {
                    results["error"] = {
                        message,
                        data
                    };
                },
                debug: function(message: string, data: any) {
                    results["debug"] = {
                        message,
                        data
                    };
                },
                info: function(message: string, data: any) {
                    results["info"] = {
                        message,
                        data
                    };
                },
                trace: function(message: string, data: any) {
                    results["trace"] = {
                        message,
                        data
                    };
                }
            } as any;

            let provider = dbgConsoleProvider({
                lvl: eDbgLevel.All
            });

            provider.log(eDbgLevel.Trace, "Hello", 1);
            assert.equal(results["trace"].message, "Hello");
            assert.equal(results["trace"].data, 1);

            provider.log(eDbgLevel.Debug, "Darkness", 2);
            assert.equal(results["debug"].message, "Darkness");
            assert.equal(results["debug"].data, 2);

            provider.log(eDbgLevel.Information, "my", 3);
            assert.equal(results["info"].message, "my");
            assert.equal(results["info"].data, 3);

            provider.log(eDbgLevel.Warning, "old", 4);
            assert.equal(results["warn"].message, "old");
            assert.equal(results["warn"].data, 4);

            provider.log(eDbgLevel.Error, "friend", 5);
            assert.equal(results["error"].message, "friend");
            assert.equal(results["error"].data, 5);

            provider.log(eDbgLevel.Critical, "I've", 6);
            assert.equal(results["error"].message, "I've");
            assert.equal(results["error"].data, 6);

            provider.log(eDbgLevel.Terminal, "come", 7);
            assert.equal(results["error"].message, "come");
            assert.equal(results["error"].data, 7);
    
            assert.equal(results["log"], undefined);
            
        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });

    it("Check missing functions", () => {
        let orgConsole = console;
        try {
            let results = { };

            // eslint-disable-next-line no-global-assign
            console = {
                log: function(message: string, data: any) {
                    results["log"] = {
                        message,
                        data
                    };
                },
                warn: function(message: string, data: any) {
                    results["warn"] = {
                        message,
                        data
                    };
                },
                error: function(message: string, data: any) {
                    results["error"] = {
                        message,
                        data
                    };
                }
            } as any;

            let provider = dbgConsoleProvider({
                lvl: eDbgLevel.All
            });

            provider.log(eDbgLevel.Trace, "Hello", 1);
            assert.equal(results["log"].message, "Hello");
            assert.equal(results["log"].data, 1);

            provider.log(eDbgLevel.Debug, "Darkness", 2);
            assert.equal(results["log"].message, "Darkness");
            assert.equal(results["log"].data, 2);

            provider.log(eDbgLevel.Information, "my", 3);
            assert.equal(results["log"].message, "my");
            assert.equal(results["log"].data, 3);

            provider.log(eDbgLevel.Warning, "old", 4);
            assert.equal(results["warn"].message, "old");
            assert.equal(results["warn"].data, 4);
            assert.equal(results["log"].message, "my");
            assert.equal(results["log"].data, 3);

            provider.log(eDbgLevel.Error, "friend", 5);
            assert.equal(results["error"].message, "friend");
            assert.equal(results["error"].data, 5);

            provider.log(eDbgLevel.Critical, "I've", 6);
            assert.equal(results["error"].message, "I've");
            assert.equal(results["error"].data, 6);

            provider.log(eDbgLevel.Terminal, "come", 7);
            assert.equal(results["error"].message, "come");
            assert.equal(results["error"].data, 7);
    
            assert.equal(results["log"].message, "my");
            assert.equal(results["log"].data, 3);
            
        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });

    it("Check missing functions and no log", () => {
        let orgConsole = console;
        try {
            let results = { };

            // eslint-disable-next-line no-global-assign
            console = {
                warn: function(message: string, data: any) {
                    results["warn"] = {
                        message,
                        data
                    };
                },
                error: function(message: string, data: any) {
                    results["error"] = {
                        message,
                        data
                    };
                }
            } as any;

            let provider = dbgConsoleProvider({
                lvl: eDbgLevel.All
            });

            provider.log(eDbgLevel.Trace, "Hello", 1);
            assert.equal(results["log"], undefined);

            provider.log(eDbgLevel.Debug, "Darkness", 2);
            assert.equal(results["log"], undefined);

            provider.log(eDbgLevel.Information, "my", 3);
            assert.equal(results["log"], undefined);

            provider.log(eDbgLevel.Warning, "old", 4);
            assert.equal(results["warn"].message, "old");
            assert.equal(results["warn"].data, 4);
            assert.equal(results["log"], undefined);

            provider.log(eDbgLevel.Error, "friend", 5);
            assert.equal(results["error"].message, "friend");
            assert.equal(results["error"].data, 5);

            provider.log(eDbgLevel.Critical, "I've", 6);
            assert.equal(results["error"].message, "I've");
            assert.equal(results["error"].data, 6);

            provider.log(eDbgLevel.Terminal, "come", 7);
            assert.equal(results["error"].message, "come");
            assert.equal(results["error"].data, 7);
    
            assert.equal(results["log"], undefined);

            provider.log(eDbgLevel.Error, "friend", 5);
            assert.equal(results["error"].message, "friend");
            assert.equal(results["error"].data, 5);
            
        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });
});