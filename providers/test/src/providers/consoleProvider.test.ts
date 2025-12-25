/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { assert } from "@nevware21/tripwire";
import { createDbg, eDbgLevel } from "@nevware21/ts-debug";
import { encodeAsJson, isFunction } from "@nevware21/ts-utils";
import { createConsoleProvider } from "../../../src/providers/consoleProvider";
import { EMPTY } from "../../../src/internal/constants";

describe("consoleProvider", () => {

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

            let provider = createConsoleProvider();

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Verbose
            }, "Verbose Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Trace
            }, "Trace Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Debug
            }, "Debug Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Information
            }, "Information Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Warning
            }, "Warning Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Error
            }, "Error Message", testData);
            assert.equal(dbgMessage, "Error:Error Message", "Error message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Critical
            }, "Critical Message", testData);
            assert.equal(dbgMessage, "Critical:Critical Message", "Critical message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Terminal
            }, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal:Terminal Message", "Terminal message");
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
            
            let provider = createConsoleProvider({
                lvl: eDbgLevel.Critical
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Verbose
            }, "Verbose Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Trace
            }, "Trace Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Debug
            }, "Debug Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Information
            }, "Information Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Warning
            }, "Warning Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Error
            }, "Error Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Critical
            }, "Critical Message", testData);
            assert.equal(dbgMessage, "Critical:Critical Message", "Critical message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Terminal
            }, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal:Terminal Message", "Terminal message");
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

            let provider = createConsoleProvider({
                lvl: eDbgLevel.None
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Verbose
            }, "Verbose Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Trace
            }, "Trace Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Debug
            }, "Debug Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Information
            }, "Information Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Warning
            }, "Warning Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Error
            }, "Error Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Critical
            }, "Critical Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Terminal
            }, "Terminal Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "test data");

            for (let lp = 0; lp < 9999; lp++) {
                provider.log({
                    usr: null as any,
                    name: EMPTY,
                    lvl: lp
                }, `Level ${lp} Message`, testData);
                assert.equal(dbgMessage, null, "No message");
                assert.equal(dbgData, null, "test data");
            }
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

            let provider = createConsoleProvider({
                lvl: eDbgLevel.Terminal
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Verbose
            }, "Verbose Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Trace
            }, "Trace Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Debug
            }, "Debug Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Information
            }, "Information Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Warning
            }, "Warning Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Error
            }, "Error Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Critical
            }, "Critical Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Terminal
            }, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal:Terminal Message", "Terminal message");
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

            let provider = createConsoleProvider({
                lvl: eDbgLevel.Error
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Verbose
            }, "Verbose Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Trace
            }, "Trace Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Debug
            }, "Debug Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Information
            }, "Information Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Warning
            }, "Warning Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Error
            }, "Error Message", testData);
            assert.equal(dbgMessage, "Error:Error Message", "Error message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Critical
            }, "Critical Message", testData);
            assert.equal(dbgMessage, "Critical:Critical Message", "Critical message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Terminal
            }, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal:Terminal Message", "Terminal message");
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

            let provider = createConsoleProvider({
                lvl: eDbgLevel.Warning
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Verbose
            }, "Verbose Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Trace
            }, "Trace Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Debug
            }, "Debug Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Information
            }, "Information Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Warning
            }, "Warning Message", testData);
            assert.equal(dbgMessage, "Warn:Warning Message", "Warning message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Error
            }, "Error Message", testData);
            assert.equal(dbgMessage, "Error:Error Message", "Error message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Critical
            }, "Critical Message", testData);
            assert.equal(dbgMessage, "Critical:Critical Message", "Critical message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Terminal
            }, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal:Terminal Message", "Terminal message");
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

            let provider = createConsoleProvider({
                lvl: eDbgLevel.Information
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Verbose
            }, "Verbose Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Trace
            }, "Trace Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Debug
            }, "Debug Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Information
            }, "Information Message", testData);
            assert.equal(dbgMessage, "Info:Information Message", "Information message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Warning
            }, "Warning Message", testData);
            assert.equal(dbgMessage, "Warn:Warning Message", "Warning message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Error
            }, "Error Message", testData);
            assert.equal(dbgMessage, "Error:Error Message", "Error message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Critical
            }, "Critical Message", testData);
            assert.equal(dbgMessage, "Critical:Critical Message", "Critical message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Terminal
            }, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal:Terminal Message", "Terminal message");
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

            let provider = createConsoleProvider({
                lvl: eDbgLevel.Debug
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Verbose
            }, "Verbose Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Trace
            }, "Trace Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Debug
            }, "Debug Message", testData);
            assert.equal(dbgMessage, "Debug:Debug Message", "Debug message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Information
            }, "Information Message", testData);
            assert.equal(dbgMessage, "Info:Information Message", "Information message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Warning
            }, "Warning Message", testData);
            assert.equal(dbgMessage, "Warn:Warning Message", "Warning message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Error
            }, "Error Message", testData);
            assert.equal(dbgMessage, "Error:Error Message", "Error message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Critical
            }, "Critical Message", testData);
            assert.equal(dbgMessage, "Critical:Critical Message", "Critical message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Terminal
            }, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal:Terminal Message", "Terminal message");
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

            let provider = createConsoleProvider({
                lvl: eDbgLevel.Trace
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Verbose
            }, "Verbose Message", testData);
            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Trace
            }, "Trace Message", testData);
            assert.equal(dbgMessage, "Trace:Trace Message", "Trace message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Debug
            }, "Debug Message", testData);
            assert.equal(dbgMessage, "Debug:Debug Message", "Debug message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Information
            }, "Information Message", testData);
            assert.equal(dbgMessage, "Info:Information Message", "Information message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Warning
            }, "Warning Message", testData);
            assert.equal(dbgMessage, "Warn:Warning Message", "Warning message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Error
            }, "Error Message", testData);
            assert.equal(dbgMessage, "Error:Error Message", "Error message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Critical
            }, "Critical Message", testData);
            assert.equal(dbgMessage, "Critical:Critical Message", "Critical message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Terminal
            }, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal:Terminal Message", "Terminal message");
            assert.equal(dbgData, dbgDataTxt, "test data");

        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });

    it("Level set to verbose", () => {
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

            let provider = createConsoleProvider({
                lvl: eDbgLevel.Verbose
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Verbose
            }, "Verbose Message", testData);
            assert.equal(dbgMessage, "Verbose:Verbose Message", "Verbose message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Trace
            }, "Trace Message", testData);
            assert.equal(dbgMessage, "Trace:Trace Message", "Trace message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Debug
            }, "Debug Message", testData);
            assert.equal(dbgMessage, "Debug:Debug Message", "Debug message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Information
            }, "Information Message", testData);
            assert.equal(dbgMessage, "Info:Information Message", "Information message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Warning
            }, "Warning Message", testData);
            assert.equal(dbgMessage, "Warn:Warning Message", "Warning message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Error
            }, "Error Message", testData);
            assert.equal(dbgMessage, "Error:Error Message", "Error message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Critical
            }, "Critical Message", testData);
            assert.equal(dbgMessage, "Critical:Critical Message", "Critical message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Terminal
            }, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal:Terminal Message", "Terminal message");
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

            let provider = createConsoleProvider({
                lvl: eDbgLevel.All
            });

            assert.notEqual(provider, undefined, "A provider was returned");
            assert.ok(isFunction(provider.log), "We have a log function");

            assert.equal(dbgMessage, null, "No message");
            assert.equal(dbgData, null, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Verbose
            }, "Verbose Message", testData);
            assert.equal(dbgMessage, "Verbose:Verbose Message", "Verbose message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Trace
            }, "Trace Message", testData);
            assert.equal(dbgMessage, "Trace:Trace Message", "Trace message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Debug
            }, "Debug Message", testData);
            assert.equal(dbgMessage, "Debug:Debug Message", "Debug message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Information
            }, "Information Message", testData);
            assert.equal(dbgMessage, "Info:Information Message", "Information message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Warning
            }, "Warning Message", testData);
            assert.equal(dbgMessage, "Warn:Warning Message", "Warning message");
            assert.equal(dbgData, dbgDataTxt, "No data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Error
            }, "Error Message", testData);
            assert.equal(dbgMessage, "Error:Error Message", "Error message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Critical
            }, "Critical Message", testData);
            assert.equal(dbgMessage, "Critical:Critical Message", "Critical message");
            assert.equal(dbgData, dbgDataTxt, "test data");

            dbgMessage = null;
            dbgData = null;
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Terminal
            }, "Terminal Message", testData);
            assert.equal(dbgMessage, "Terminal:Terminal Message", "Terminal message");
            assert.equal(dbgData, dbgDataTxt, "test data");

        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });

    it("Check all functions", () => {
        let orgConsole = console;
        try {
            let results: any = { };

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

            let provider = createConsoleProvider({
                lvl: eDbgLevel.All
            });

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Verbose
            }, "Hello", 1);
            assert.equal(results["trace"].message, "Verbose:Hello");
            assert.equal(results["trace"].data, 1);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Trace
            }, "Darkness", 2);
            assert.equal(results["trace"].message, "Trace:Darkness");
            assert.equal(results["trace"].data, 2);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Debug
            }, "my", 3);
            assert.equal(results["debug"].message, "Debug:my");
            assert.equal(results["debug"].data, 3);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Information
            }, "old", 4);
            assert.equal(results["info"].message, "Info:old");
            assert.equal(results["info"].data, 4);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Warning
            }, "friend", 5);
            assert.equal(results["warn"].message, "Warn:friend");
            assert.equal(results["warn"].data, 5);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Error
            }, "I've", 6);
            assert.equal(results["error"].message, "Error:I've");
            assert.equal(results["error"].data, 6);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Critical
            }, "come", 7);
            assert.equal(results["error"].message, "Critical:come", encodeAsJson(results));
            assert.equal(results["error"].data, 7);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Terminal
            }, "to", 8);
            assert.equal(results["error"].message, "Terminal:to");
            assert.equal(results["error"].data, 8);
    
            assert.equal(results["log"], undefined);
            
        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });

    it("Check missing functions", () => {
        let orgConsole = console;
        try {
            let results: any = { };

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

            let provider = createConsoleProvider({
                lvl: eDbgLevel.All
            });

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Verbose
            }, "Hello", 1);
            assert.equal(results["log"].message, "Verbose:Hello");
            assert.equal(results["log"].data, 1);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Trace
            }, "Darkness", 1);
            assert.equal(results["log"].message, "Trace:Darkness");
            assert.equal(results["log"].data, 1);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Debug
            }, "my", 2);
            assert.equal(results["log"].message, "Debug:my");
            assert.equal(results["log"].data, 2);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Information
            }, "old", 3);
            assert.equal(results["log"].message, "Info:old");
            assert.equal(results["log"].data, 3);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Warning
            }, "friend", 4);
            assert.equal(results["warn"].message, "Warn:friend");
            assert.equal(results["warn"].data, 4);
            assert.equal(results["log"].message, "Info:old");
            assert.equal(results["log"].data, 3);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Error
            }, "I've", 5);
            assert.equal(results["error"].message, "Error:I've");
            assert.equal(results["error"].data, 5);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Critical
            }, "come", 6);
            assert.equal(results["error"].message, "Critical:come");
            assert.equal(results["error"].data, 6);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Terminal
            }, "to", 7);
            assert.equal(results["error"].message, "Terminal:to");
            assert.equal(results["error"].data, 7);
    
            assert.equal(results["log"].message, "Info:old");
            assert.equal(results["log"].data, 3);
            
        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });

    it("Check missing functions and no log", () => {
        let orgConsole = console;
        try {
            let results: any = { };

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

            let provider = createConsoleProvider({
                lvl: eDbgLevel.All
            });

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Verbose
            }, "Hello", 1);
            assert.equal(results["log"], undefined);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Trace
            }, "Darkness", 1);
            assert.equal(results["log"], undefined);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Debug
            }, "my", 2);
            assert.equal(results["log"], undefined);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Information
            }, "old", 3);
            assert.equal(results["log"], undefined);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Warning
            }, "friend", 4);
            assert.equal(results["warn"].message, "Warn:friend");
            assert.equal(results["warn"].data, 4);
            assert.equal(results["log"], undefined);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Error
            }, "I've", 5);
            assert.equal(results["error"].message, "Error:I've");
            assert.equal(results["error"].data, 5);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Critical
            }, "come", 6);
            assert.equal(results["error"].message, "Critical:come");
            assert.equal(results["error"].data, 6);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Terminal
            }, "come", 7);
            assert.equal(results["error"].message, "Terminal:come");
            assert.equal(results["error"].data, 7);
    
            assert.equal(results["log"], undefined);

            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: eDbgLevel.Error
            }, "I've", 5);
            assert.equal(results["error"].message, "Error:I've");
            assert.equal(results["error"].data, 5);
            
        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });

    it("Check named log", () => {
        let orgConsole = console;
        try {
            let results: any = { };

            // eslint-disable-next-line no-global-assign
            console = {
                log: function(message: string, data: any) {
                    results = {
                        message,
                        data
                    };
                }
            } as any;

            let provider = createConsoleProvider({
                lvl: eDbgLevel.All
            });

            provider.log({
                usr: null as any,
                name: "Hello",
                lvl: eDbgLevel.Trace
            }, "Darkness", 1);
            assert.equal(results.message, "[Hello]: Trace:Darkness");

            provider.log({
                usr: null as any,
                name: "my",
                lvl: eDbgLevel.Trace
            }, "old friend", 1);

            assert.equal(results.message, "[my]: Trace:old friend");
        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });

    it("Check Range levels", () => {
        let orgConsole = console;
        try {
            let results: any = { };

            // eslint-disable-next-line no-global-assign
            console = {
                log: function(message: string, data: any) {
                    results = {
                        message,
                        data
                    };
                }
            } as any;

            let provider = createConsoleProvider({
                lvl: eDbgLevel.All
            });

            provider.log({
                usr: null as any,
                name: "Hello",
                lvl: 71
            }, "Darkness", 1);
            assert.equal(results.message, "[Hello]: Verbose:Darkness");

            provider.log({
                usr: null as any,
                name: "my",
                lvl: 1
            }, "old friend", 1);

            assert.equal(results.message, "[my]: Terminal:old friend");
        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });

    it("Check Invalid levels", () => {
        let orgConsole = console;
        try {
            let results: any = { };

            // eslint-disable-next-line no-global-assign
            console = {
                log: function(message: string, data: any) {
                    results = {
                        message,
                        data
                    };
                }
            } as any;

            let provider = createConsoleProvider({
                lvl: eDbgLevel.All
            });

            results = { };
            provider.log({
                usr: null as any,
                name: "Hello",
                lvl: 0
            }, "Darkness", 1);
            assert.equal(results.message, undefined);

            results = { };
            provider.log({
                usr: null as any,
                name: "my",
                lvl: undefined as any
            }, "old friend", 1);

            assert.equal(results.message, undefined);

            results = { };
            provider.log(null as any, "Darkness", 1);
            assert.equal(results.message, undefined);
        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });

    it("log from dbg", () => {
        let orgConsole = console;
        try {
            let results: any = { };
            let usrData = {};
            let usrDataTxt = encodeAsJson(usrData);

            // eslint-disable-next-line no-global-assign
            console = {
                log: function(message: string, data: any, usr: any) {
                    results = {
                        message,
                        data,
                        usr
                    };
                }
            } as any;

            let provider = createConsoleProvider({
                lvl: eDbgLevel.All
            });
        
            let dbg = createDbg();
            dbg.addProvider(provider);
            
            results = { };
            dbg.log.error("Darkness", usrData);

            assert.equal(results.message, "Error:Darkness");
            assert.equal(results.data, usrDataTxt);
            assert.equal(results.usr, encodeAsJson({}));

        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });

    it("log from dbg with user context", () => {
        let orgConsole = console;
        try {
            let results: any = { };
            let usrData = {};
            let usrDataTxt = encodeAsJson(usrData);

            let usrCtx = {
                Hello: "Darkness"
            };
    
            let usrCtxTxt = encodeAsJson(usrCtx);

            // eslint-disable-next-line no-global-assign
            console = {
                log: function(message: string, data: any, usr: any) {
                    results = {
                        message,
                        data,
                        usr
                    };
                }
            } as any;

            let provider = createConsoleProvider({
                lvl: eDbgLevel.All
            });
        
            let dbg = createDbg({
                usr: usrCtx
            });

            dbg.addProvider(provider);
            
            results = { };
            dbg.log.error("Darkness", usrData);

            assert.equal(results.message, "Error:Darkness");
            assert.equal(results.data, usrDataTxt);
            assert.equal(results.usr, usrCtxTxt);

        } finally {
            // eslint-disable-next-line no-global-assign
            console = orgConsole;
        }
    });
});