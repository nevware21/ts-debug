/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { assert } from "chai";
import { eDbgLevel } from "@nevware21/ts-debug";
import { EMPTY } from "../../../src/internal/constants";
import { createDebuggerProvider } from "../../../src/providers/debuggerProvider";

function _expectThrow(cb: () => void): Error {
    try {
        cb();
    } catch (e) {
        assert.ok(true, "Expected an exception to be thrown");
        return e;
    }
}

describe("debuggerProvider", () => {
    let dbgName = EMPTY;
    
    it("default config", () => {
        let provider = createDebuggerProvider();

        _expectThrow(() => {
            provider.log({
                name: dbgName,
                lvl: eDbgLevel.Terminal,
                usr: null as any
            }, "Terminal Error");
        });
        
        _expectThrow(() => {
            provider.log({
                name: dbgName,
                lvl: eDbgLevel.Critical,
                usr: null as any
            }, "Critical Error");
        });
        
        _expectThrow(() => {
            provider.log({
                name: dbgName,
                lvl: eDbgLevel.Error,
                usr: null as any
            }, " Error");
        });

        // Not expecting an exception
        provider.log({
            name: dbgName,
            lvl: eDbgLevel.Warning,
            usr: null as any
        }, "Warning Error");

        _expectThrow(() => {
            provider.log({
                name: dbgName,
                lvl: eDbgLevel.Error,
                usr: null as any
            }, " Error");
        });
        
        assert.ok(true, "Done");
    });

    it("Throw with config set to None", () => {
        let provider = createDebuggerProvider({
            lvl: eDbgLevel.None
        });

        provider.log({
            name: dbgName,
            lvl: 1,
            usr: null as any
        }, "Terminal Error");

        provider.log({
            name: dbgName,
            lvl: eDbgLevel.Warning,
            usr: null as any
        }, "Warning Error");

        provider.log({
            name: dbgName,
            lvl: eDbgLevel.Trace,
            usr: null as any
        }, "Warning Error");

        assert.ok(true, "Done");
    });
});
