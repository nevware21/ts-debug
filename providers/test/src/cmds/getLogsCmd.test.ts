/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { assert } from "@nevware21/tripwire";
import { DbgLevel, IDbg, IDbgLogCtx, createDbg } from "@nevware21/ts-debug";
import { createConsoleProvider } from "../../../src/providers/consoleProvider";
import { createMemoryProvider } from "../../../src/providers/memoryProvider";
import { IDbgMemoryLog } from "../../../src/interfaces/IDbgMemoryLog";
import { addGetLogsCmd } from "../../../src/cmds/getLogsCmd";

function _expectThrow(cb: () => void): Error {
    try {
        cb();
    } catch (e) {
        assert.ok(true, "Expected an exception to be thrown");
        return e;
    }

    return null as any;
}

describe("getLogsCmd", () => {
    let dbg: IDbg;

    beforeEach(() => {
        dbg = createDbg();

        dbg.log.error("First Log");
    });

    describe("no provider", () => {
        it("No logs", () => {
            dbg.log.error("Test Log");

            assert.equal(dbg.cmds.has(":getLogs"), false);

            _expectThrow(() => {
                dbg.cmds.exec(":getLogs");
            });

        });

        it("add command with no provider", () => {
            let ctx = addGetLogsCmd(dbg);

            assert.equal(dbg.cmds.has(":getLogs"), true);
            assert.equal(dbg.cmds.has(":getlogs"), true);
            assert.equal(dbg.cmds.has(":GetLogs"), true);
            let logs = dbg.cmds.exec(":getLogs");
            assert.equal(logs.length, 0);

            ctx.rm();
            assert.equal(dbg.cmds.has(":getLogs"), false);
            assert.equal(dbg.cmds.has(":getlogs"), false);
            assert.equal(dbg.cmds.has(":GetLogs"), false);
        });

        it("add command with console provider", () => {
            dbg.addProvider(createConsoleProvider());
            let ctx = addGetLogsCmd(dbg);

            assert.equal(dbg.cmds.has(":getLogs"), true);
            let logs = dbg.cmds.exec(":getLogs");
            assert.equal(logs.length, 0);

            ctx.rm();
            assert.equal(dbg.cmds.has(":getLogs"), false);
        });
    });

    describe("with memory provider", () => {

        beforeEach(() => {
            dbg.addProvider(createMemoryProvider());
        });

        it("No logs", () => {
            dbg.log.error("Test Log");

            assert.equal(dbg.cmds.has(":getLogs"), true);

            let logs: IDbgMemoryLog[] = dbg.cmds.exec(":getLogs");

            assert.equal(logs.length, 1);
            assert.equal(logs[0].message, "Test Log");
            assert.equal(logs[0].lvl, DbgLevel.Error);
        });
    });

    describe("with dummy provider", () => {

        beforeEach(() => {
            let dummyProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    assert.fail("Should not get called");
                },
                getLogs: () => {
                    return "Hello";
                }
            };

            dbg.addProvider(dummyProvider);
            addGetLogsCmd(dbg);
        });

        it("No logs", () => {
            assert.equal(dbg.cmds.has(":getLogs"), true);

            let logs: IDbgMemoryLog[] = dbg.cmds.exec(":getLogs");

            assert.equal(logs.length, 0);
        });
    });
});
