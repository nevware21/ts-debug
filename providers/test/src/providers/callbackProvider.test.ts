/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { assert } from "@nevware21/tripwire";
import { createDbg, DbgLevel, eDbgLevel } from "@nevware21/ts-debug";
import { isFunction } from "@nevware21/ts-utils";
import { EMPTY } from "../../../src/internal/constants";
import { createCallbackProvider } from "../../../src/providers/callbackProvider";
import { IDbgMemoryLog } from "../../../src/interfaces/IDbgMemoryLog";

describe("callbackProvider", () => {
    it("null config", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider(null as any);
        let testData = {
            test: 1
        };

        assert.notEqual(provider, undefined, "A provider was returned");
        assert.ok(isFunction(provider.log), "We have a log function");

        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Verbose
        }, "Verbose Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Trace
        }, "Trace Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Debug
        }, "Debug Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Information
        }, "Information Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Warning
        }, "Warning Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Error
        }, "Error Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Critical
        }, "Critical Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Terminal
        }, "Terminal Message", testData);
        assert.equal(results, null, "No message");
    });

    it("undefined config", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider(undefined as any);
        let testData = {
            test: 1
        };

        assert.notEqual(provider, undefined, "A provider was returned");
        assert.ok(isFunction(provider.log), "We have a log function");

        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Verbose
        }, "Verbose Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Trace
        }, "Trace Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Debug
        }, "Debug Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Information
        }, "Information Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Warning
        }, "Warning Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Error
        }, "Error Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Critical
        }, "Critical Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Terminal
        }, "Terminal Message", testData);
        assert.equal(results, null, "No message");
    });

    it("default config", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider({
            cb: (logDetails: IDbgMemoryLog) => {
                results = logDetails;
            }
        });
        let testData = {
            test: 1
        };

        assert.notEqual(provider, undefined, "A provider was returned");
        assert.ok(isFunction(provider.log), "We have a log function");

        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Verbose
        }, "Verbose Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Trace
        }, "Trace Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Debug
        }, "Debug Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Information
        }, "Information Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Warning
        }, "Warning Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Error
        }, "Error Message", testData);
        assert.equal(results!.lvl, DbgLevel.Error);
        assert.equal(results!.message, "Error Message", "Error message");
        assert.deepEqual(results!.data, testData, "test data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Critical
        }, "Critical Message", testData);
        assert.equal(results!.lvl, DbgLevel.Critical);
        assert.equal(results!.message, "Critical Message", "Critical message");
        assert.deepEqual(results!.data, testData, "test data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Terminal
        }, "Terminal Message", testData);
        assert.equal(results!.lvl, DbgLevel.Terminal);
        assert.equal(results!.message, "Terminal Message", "Terminal message");
        assert.deepEqual(results!.data, testData, "test data");
    });

    it("Level set to Critical", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider({
            lvl: eDbgLevel.Critical,
            cb: (logDetails: IDbgMemoryLog) => {
                results = logDetails;
            }
        });
        let testData = {
            test: 1
        };
            
        assert.notEqual(provider, undefined, "A provider was returned");
        assert.ok(isFunction(provider.log), "We have a log function");

        assert.equal(results, null, "No message");
        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Verbose
        }, "Verbose Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Trace
        }, "Trace Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Debug
        }, "Debug Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Information
        }, "Information Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Warning
        }, "Warning Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Error
        }, "Error Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Critical
        }, "Critical Message", testData);
        assert.equal(results!.lvl, DbgLevel.Critical);
        assert.equal(results!.message, "Critical Message", "Critical message");
        assert.deepEqual(results!.data, testData, "test data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Terminal
        }, "Terminal Message", testData);
        assert.equal(results!.lvl, DbgLevel.Terminal);
        assert.equal(results!.message, "Terminal Message", "Terminal message");
        assert.deepEqual(results!.data, testData, "test data");
    });
    
    it("Level set to None", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider({
            lvl: eDbgLevel.None,
            cb: (logDetails: IDbgMemoryLog) => {
                results = logDetails;
            }
        });
    
        let testData = {
            test: 1
        };

        assert.notEqual(provider, undefined, "A provider was returned");
        assert.ok(isFunction(provider.log), "We have a log function");

        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Verbose
        }, "Verbose Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Trace
        }, "Trace Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Debug
        }, "Debug Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Information
        }, "Information Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Warning
        }, "Warning Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Error
        }, "Error Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Critical
        }, "Critical Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Terminal
        }, "Terminal Message", testData);
        assert.equal(results, null, "No message");

        for (let lp = 0; lp < 9999; lp++) {
            provider.log({
                usr: null as any,
                name: EMPTY,
                lvl: lp
            }, `Level ${lp} Message`, testData);
            assert.equal(results, null, "No message");
        }
    });
    
    it("Level set to Terminal", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider({
            lvl: eDbgLevel.Terminal,
            cb: (logDetails: IDbgMemoryLog) => {
                results = logDetails;
            }
        });
        let testData = {
            test: 1
        };

        assert.notEqual(provider, undefined, "A provider was returned");
        assert.ok(isFunction(provider.log), "We have a log function");

        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Verbose
        }, "Verbose Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Trace
        }, "Trace Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Debug
        }, "Debug Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Information
        }, "Information Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Warning
        }, "Warning Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Error
        }, "Error Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Critical
        }, "Critical Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Terminal
        }, "Terminal Message", testData);
        assert.equal(results!.lvl, DbgLevel.Terminal);
        assert.equal(results!.message, "Terminal Message", "Terminal message");
        assert.deepEqual(results!.data, testData, "test data");
    });

    it("Level set to Error", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider({
            lvl: eDbgLevel.Error,
            cb: (logDetails: IDbgMemoryLog) => {
                results = logDetails;
            }
        });

        let testData = {
            test: 1
        };

        assert.notEqual(provider, undefined, "A provider was returned");
        assert.ok(isFunction(provider.log), "We have a log function");

        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Verbose
        }, "Verbose Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Trace
        }, "Trace Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Debug
        }, "Debug Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Information
        }, "Information Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Warning
        }, "Warning Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Error
        }, "Error Message", testData);
        assert.equal(results!.lvl, DbgLevel.Error);
        assert.equal(results!.message, "Error Message", "Error message");
        assert.deepEqual(results!.data, testData, "test data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Critical
        }, "Critical Message", testData);
        assert.equal(results!.lvl, DbgLevel.Critical);
        assert.equal(results!.message, "Critical Message", "Critical message");
        assert.deepEqual(results!.data, testData, "test data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Terminal
        }, "Terminal Message", testData);
        assert.equal(results!.lvl, DbgLevel.Terminal);
        assert.equal(results!.message, "Terminal Message", "Terminal message");
        assert.deepEqual(results!.data, testData, "test data");
    });

    it("Level set to warning", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider({
            lvl: eDbgLevel.Warning,
            cb: (logDetails: IDbgMemoryLog) => {
                results = logDetails;
            }
        });

        let testData = {
            test: 1
        };

        assert.notEqual(provider, undefined, "A provider was returned");
        assert.ok(isFunction(provider.log), "We have a log function");

        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Verbose
        }, "Verbose Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Trace
        }, "Trace Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Debug
        }, "Debug Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Information
        }, "Information Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Warning
        }, "Warning Message", testData);
        assert.equal(results!.lvl, DbgLevel.Warning);
        assert.equal(results!.message, "Warning Message", "Warning message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Error
        }, "Error Message", testData);
        assert.equal(results!.lvl, DbgLevel.Error);
        assert.equal(results!.message, "Error Message", "Error message");
        assert.deepEqual(results!.data, testData, "test data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Critical
        }, "Critical Message", testData);
        assert.equal(results!.lvl, DbgLevel.Critical);
        assert.equal(results!.message, "Critical Message", "Critical message");
        assert.deepEqual(results!.data, testData, "test data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Terminal
        }, "Terminal Message", testData);
        assert.equal(results!.lvl, DbgLevel.Terminal);
        assert.equal(results!.message, "Terminal Message", "Terminal message");
        assert.deepEqual(results!.data, testData, "test data");

    });

    it("Level set to information", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider({
            lvl: eDbgLevel.Information,
            cb: (logDetails: IDbgMemoryLog) => {
                results = logDetails;
            }
        });

        let testData = {
            test: 1
        };

        assert.notEqual(provider, undefined, "A provider was returned");
        assert.ok(isFunction(provider.log), "We have a log function");

        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Verbose
        }, "Verbose Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Trace
        }, "Trace Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Debug
        }, "Debug Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Information
        }, "Information Message", testData);
        assert.equal(results!.lvl, DbgLevel.Information);
        assert.equal(results!.message, "Information Message", "Information message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Warning
        }, "Warning Message", testData);
        assert.equal(results!.lvl, DbgLevel.Warning);
        assert.equal(results!.message, "Warning Message", "Warning message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Error
        }, "Error Message", testData);
        assert.equal(results!.lvl, DbgLevel.Error);
        assert.equal(results!.message, "Error Message", "Error message");
        assert.deepEqual(results!.data, testData, "test data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Critical
        }, "Critical Message", testData);
        assert.equal(results!.lvl, DbgLevel.Critical);
        assert.equal(results!.message, "Critical Message", "Critical message");
        assert.deepEqual(results!.data, testData, "test data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Terminal
        }, "Terminal Message", testData);
        assert.equal(results!.lvl, DbgLevel.Terminal);
        assert.equal(results!.message, "Terminal Message", "Terminal message");
        assert.deepEqual(results!.data, testData, "test data");
    });

    it("Level set to debug", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider({
            lvl: eDbgLevel.Debug,
            cb: (logDetails: IDbgMemoryLog) => {
                results = logDetails;
            }
        });

        let testData = {
            test: 1
        };

        assert.notEqual(provider, undefined, "A provider was returned");
        assert.ok(isFunction(provider.log), "We have a log function");

        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Verbose
        }, "Verbose Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Trace
        }, "Trace Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Debug
        }, "Debug Message", testData);
        assert.equal(results!.lvl, DbgLevel.Debug);
        assert.equal(results!.message, "Debug Message", "Debug message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Information
        }, "Information Message", testData);
        assert.equal(results!.lvl, DbgLevel.Information);
        assert.equal(results!.message, "Information Message", "Information message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Warning
        }, "Warning Message", testData);
        assert.equal(results!.lvl, DbgLevel.Warning);
        assert.equal(results!.message, "Warning Message", "Warning message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Error
        }, "Error Message", testData);
        assert.equal(results!.lvl, DbgLevel.Error);
        assert.equal(results!.message, "Error Message", "Error message");
        assert.deepEqual(results!.data, testData, "test data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Critical
        }, "Critical Message", testData);
        assert.equal(results!.lvl, DbgLevel.Critical);
        assert.equal(results!.message, "Critical Message", "Critical message");
        assert.deepEqual(results!.data, testData, "test data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Terminal
        }, "Terminal Message", testData);
        assert.equal(results!.lvl, DbgLevel.Terminal);
        assert.equal(results!.message, "Terminal Message", "Terminal message");
        assert.deepEqual(results!.data, testData, "test data");
    });

    it("Level set to trace", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider({
            lvl: eDbgLevel.Trace,
            cb: (logDetails: IDbgMemoryLog) => {
                results = logDetails;
            }
        });

        let testData = {
            test: 1
        };

        assert.notEqual(provider, undefined, "A provider was returned");
        assert.ok(isFunction(provider.log), "We have a log function");

        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Verbose
        }, "Verbose Message", testData);
        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Trace
        }, "Trace Message", testData);
        assert.equal(results!.lvl, DbgLevel.Trace);
        assert.equal(results!.message, "Trace Message", "Trace message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Debug
        }, "Debug Message", testData);
        assert.equal(results!.lvl, DbgLevel.Debug);
        assert.equal(results!.message, "Debug Message", "Debug message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Information
        }, "Information Message", testData);
        assert.equal(results!.lvl, DbgLevel.Information);
        assert.equal(results!.message, "Information Message", "Information message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Warning
        }, "Warning Message", testData);
        assert.equal(results!.lvl, DbgLevel.Warning);
        assert.equal(results!.message, "Warning Message", "Warning message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Error
        }, "Error Message", testData);
        assert.equal(results!.lvl, DbgLevel.Error);
        assert.equal(results!.message, "Error Message", "Error message");
        assert.deepEqual(results!.data, testData, "test data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Critical
        }, "Critical Message", testData);
        assert.equal(results!.lvl, DbgLevel.Critical);
        assert.equal(results!.message, "Critical Message", "Critical message");
        assert.deepEqual(results!.data, testData, "test data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Terminal
        }, "Terminal Message", testData);
        assert.equal(results!.lvl, DbgLevel.Terminal);
        assert.equal(results!.message, "Terminal Message", "Terminal message");
        assert.deepEqual(results!.data, testData, "test data");
    });

    it("Level set to verbose", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider({
            lvl: eDbgLevel.Verbose,
            cb: (logDetails: IDbgMemoryLog) => {
                results = logDetails;
            }
        });

        let testData = {
            test: 1
        };

        assert.notEqual(provider, undefined, "A provider was returned");
        assert.ok(isFunction(provider.log), "We have a log function");

        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Verbose
        }, "Verbose Message", testData);
        assert.equal(results!.lvl, DbgLevel.Verbose);
        assert.equal(results!.message, "Verbose Message", "Verbose message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Trace
        }, "Trace Message", testData);
        assert.equal(results!.lvl, DbgLevel.Trace);
        assert.equal(results!.message, "Trace Message", "Trace message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Debug
        }, "Debug Message", testData);
        assert.equal(results!.lvl, DbgLevel.Debug);
        assert.equal(results!.message, "Debug Message", "Debug message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Information
        }, "Information Message", testData);
        assert.equal(results!.lvl, DbgLevel.Information);
        assert.equal(results!.message, "Information Message", "Information message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Warning
        }, "Warning Message", testData);
        assert.equal(results!.lvl, DbgLevel.Warning);
        assert.equal(results!.message, "Warning Message", "Warning message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Error
        }, "Error Message", testData);
        assert.equal(results!.lvl, DbgLevel.Error);
        assert.equal(results!.message, "Error Message", "Error message");
        assert.deepEqual(results!.data, testData, "test data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Critical
        }, "Critical Message", testData);
        assert.equal(results!.lvl, DbgLevel.Critical);
        assert.equal(results!.message, "Critical Message", "Critical message");
        assert.deepEqual(results!.data, testData, "test data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Terminal
        }, "Terminal Message", testData);
        assert.equal(results!.lvl, DbgLevel.Terminal);
        assert.equal(results!.message, "Terminal Message", "Terminal message");
        assert.deepEqual(results!.data, testData, "test data");
    });

    it("Level set to all", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider({
            lvl: eDbgLevel.All,
            cb: (logDetails: IDbgMemoryLog) => {
                results = logDetails;
            }
        });

        let testData = {
            test: 1
        };

        assert.notEqual(provider, undefined, "A provider was returned");
        assert.ok(isFunction(provider.log), "We have a log function");

        assert.equal(results, null, "No message");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Verbose
        }, "Verbose Message", testData);
        assert.equal(results!.lvl, DbgLevel.Verbose);
        assert.equal(results!.message, "Verbose Message", "Verbose message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Trace
        }, "Trace Message", testData);
        assert.equal(results!.lvl, DbgLevel.Trace);
        assert.equal(results!.message, "Trace Message", "Trace message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Debug
        }, "Debug Message", testData);
        assert.equal(results!.lvl, DbgLevel.Debug);
        assert.equal(results!.message, "Debug Message", "Debug message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Information
        }, "Information Message", testData);
        assert.equal(results!.lvl, DbgLevel.Information);
        assert.equal(results!.message, "Information Message", "Information message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Warning
        }, "Warning Message", testData);
        assert.equal(results!.lvl, DbgLevel.Warning);
        assert.equal(results!.message, "Warning Message", "Warning message");
        assert.deepEqual(results!.data, testData, "No data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Error
        }, "Error Message", testData);
        assert.equal(results!.lvl, DbgLevel.Error);
        assert.equal(results!.message, "Error Message", "Error message");
        assert.deepEqual(results!.data, testData, "test data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Critical
        }, "Critical Message", testData);
        assert.equal(results!.lvl, DbgLevel.Critical);
        assert.equal(results!.message, "Critical Message", "Critical message");
        assert.deepEqual(results!.data, testData, "test data");

        results = null;
        provider.log({
            usr: null as any,
            name: EMPTY,
            lvl: eDbgLevel.Terminal
        }, "Terminal Message", testData);
        assert.equal(results!.lvl, DbgLevel.Terminal);
        assert.equal(results!.message, "Terminal Message", "Terminal message");
        assert.deepEqual(results!.data, testData, "test data");
    });

    it("Check named log", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider({
            lvl: eDbgLevel.All,
            cb: (logDetails: IDbgMemoryLog) => {
                results = logDetails;
            }
        });

        provider.log({
            usr: null as any,
            name: "Hello",
            lvl: eDbgLevel.Trace
        }, "Darkness", 1);
        assert.equal(results!.name, "[Hello]");
        assert.equal(results!.lvl, DbgLevel.Trace);
        assert.equal(results!.message, "Darkness");

        provider.log({
            usr: null as any,
            name: "my",
            lvl: eDbgLevel.Trace
        }, "old friend", 1);

        assert.equal(results!.name, "[my]");
        assert.equal(results!.lvl, DbgLevel.Trace);
        assert.equal(results!.message, "old friend");
    });

    it("Check Range levels", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider({
            lvl: eDbgLevel.All,
            cb: (logDetails: IDbgMemoryLog) => {
                results = logDetails;
            }
        });

        provider.log({
            usr: null as any,
            name: "Hello",
            lvl: 71
        }, "Darkness", 1);
        assert.equal(results!.name, "[Hello]");
        assert.equal(results!.lvl, 71);
        assert.equal(results!.message, "Darkness");

        provider.log({
            usr: null as any,
            name: "my",
            lvl: 1
        }, "old friend", 1);

        assert.equal(results!.name, "[my]");
        assert.equal(results!.lvl, 1);
        assert.equal(results!.message, "old friend");
    });

    it("Check Invalid levels", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider({
            lvl: eDbgLevel.All,
            cb: (logDetails: IDbgMemoryLog) => {
                results = logDetails;
            }
        });

        results = { } as IDbgMemoryLog;
        provider.log({
            usr: null as any,
            name: "Hello",
            lvl: 0
        }, "Darkness", 1);
        assert.equal(results!.message, undefined);

        results = { } as IDbgMemoryLog;
        provider.log({
            usr: null as any,
            name: "my",
            lvl: undefined as any
        }, "old friend", 1);

        assert.equal(results!.message, undefined);

        results = { } as IDbgMemoryLog;
        provider.log(null as any, "Darkness", 1);
        assert.equal(results!.message, undefined);
    });

    it("log from dbg", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider({
            lvl: eDbgLevel.All,
            cb: (logDetails: IDbgMemoryLog) => {
                results = logDetails;
            }
        });

        let usrData = {};
        let dbg = createDbg();
        dbg.addProvider(provider);
        
        results = { } as any;
        dbg.log.error("Darkness", usrData);

        assert.equal(results!.lvl, DbgLevel.Error);
        assert.equal(results!.message, "Darkness");
        assert.deepEqual(results!.data, usrData);
        assert.deepEqual(results!.usr, {});
    });

    it("log from dbg with user context", () => {
        let results: IDbgMemoryLog | null = null;
        let provider = createCallbackProvider({
            lvl: eDbgLevel.All,
            cb: (logDetails: IDbgMemoryLog) => {
                results = logDetails;
            }
        });

        let usrData = {};
        let usrCtx = {
            Hello: "Darkness"
        };

        let dbg = createDbg({
            usr: usrCtx
        });

        dbg.addProvider(provider);
        
        results = { } as any;
        dbg.log.error("Darkness", usrData);

        assert.equal(results!.lvl, DbgLevel.Error);
        assert.equal(results!.message, "Darkness");
        assert.deepEqual(results!.data, usrData);
        assert.deepEqual(results!.usr, usrCtx);
    });
});