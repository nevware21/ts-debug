/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { assert } from "chai";
import { eDbgLevel } from "../../../src/dbg/dbgLevel";
import { createDbg } from "../../../src/dbg/global";

describe("createDbg", () => {
    it("Check log with no provider", () => {
        let dbg = createDbg();

        dbg.log.trace("Message");
        dbg.log.debug("Message");
        dbg.log.info("Message");
        dbg.log.warn("Message");
        dbg.log.error("Message");
        dbg.log.critical("Message");
        dbg.log.terminal("Message");

        assert.ok(true, "No exceptions thrown");
    });

    it("Check log with provider", () => {
        let results = {};
        let dbg = createDbg();
        dbg.provider = {
            log: (level: eDbgLevel, message: string, data?: any) => {
                results[level] = {
                    message,
                    data
                }
            }
        }

        dbg.log.trace("Hello", 1);
        dbg.log.debug("Darkness", 2);
        dbg.log.info("my", 3);
        dbg.log.warn("old", 4);
        dbg.log.error("friend", 5);
        dbg.log.critical("I've", 6);
        dbg.log.terminal("come", 7);

        assert.equal(results[eDbgLevel.Trace].message, "Hello");
        assert.equal(results[eDbgLevel.Debug].message, "Darkness");
        assert.equal(results[eDbgLevel.Information].message, "my");
        assert.equal(results[eDbgLevel.Warning].message, "old");
        assert.equal(results[eDbgLevel.Error].message, "friend");
        assert.equal(results[eDbgLevel.Critical].message, "I've");
        assert.equal(results[eDbgLevel.Terminal].message, "come");

        assert.equal(results[eDbgLevel.Trace].data, 1);
        assert.equal(results[eDbgLevel.Debug].data, 2);
        assert.equal(results[eDbgLevel.Information].data, 3);
        assert.equal(results[eDbgLevel.Warning].data, 4);
        assert.equal(results[eDbgLevel.Error].data, 5);
        assert.equal(results[eDbgLevel.Critical].data, 6);
        assert.equal(results[eDbgLevel.Terminal].data, 7);
    });
});