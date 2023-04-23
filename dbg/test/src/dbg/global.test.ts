/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { assert } from "chai";
import { eDbgLevel } from "../../../src/dbg/dbgLevel";
import { $Dbg } from "../../../src/dbg/global";
import { IDbgLogCtx } from "../../../src/interfaces/log/IDbgLogCtx";

describe("dbgProvider", () => {

    it("Check log with no provider", () => {

        $Dbg.log.trace("Message");
        $Dbg.log.debug("Message");
        $Dbg.log.info("Message");
        $Dbg.log.warn("Message");
        $Dbg.log.error("Message");
        $Dbg.log.critical("Message");
        $Dbg.log.terminal("Message");
        $Dbg.log.verbose("Message");

        assert.ok(true, "No exceptions thrown");
    });

    it("Check log with provider", () => {
        let results = {};
        let ctx = $Dbg.addProvider({
            log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                results[ctx.lvl] = {
                    message,
                    data
                }
            }
        });
        
        try {
            $Dbg.log.trace("Hello", 1);
            $Dbg.log.debug("Darkness", 2);
            $Dbg.log.info("my", 3);
            $Dbg.log.warn("old", 4);
            $Dbg.log.error("friend", 5);
            $Dbg.log.critical("I've", 6);
            $Dbg.log.terminal("come", 7);
            $Dbg.log.verbose("to", 8);
    
            assert.equal(results[eDbgLevel.Trace].message, "Hello");
            assert.equal(results[eDbgLevel.Debug].message, "Darkness");
            assert.equal(results[eDbgLevel.Information].message, "my");
            assert.equal(results[eDbgLevel.Warning].message, "old");
            assert.equal(results[eDbgLevel.Error].message, "friend");
            assert.equal(results[eDbgLevel.Critical].message, "I've");
            assert.equal(results[eDbgLevel.Terminal].message, "come");
            assert.equal(results[eDbgLevel.Verbose].message, "to");
    
            assert.equal(results[eDbgLevel.Trace].data, 1);
            assert.equal(results[eDbgLevel.Debug].data, 2);
            assert.equal(results[eDbgLevel.Information].data, 3);
            assert.equal(results[eDbgLevel.Warning].data, 4);
            assert.equal(results[eDbgLevel.Error].data, 5);
            assert.equal(results[eDbgLevel.Critical].data, 6);
            assert.equal(results[eDbgLevel.Terminal].data, 7);
            assert.equal(results[eDbgLevel.Verbose].data, 8);
        } finally {
            ctx.rm();
        }
    });
});