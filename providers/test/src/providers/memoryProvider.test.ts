/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { assert } from "@nevware21/tripwire";
import { createDbg, DbgLevel, eDbgLevel } from "@nevware21/ts-debug";
import { EMPTY } from "../../../src/internal/constants";
import { createMemoryProvider } from "../../../src/providers/memoryProvider";
import { encodeAsJson, objKeys } from "@nevware21/ts-utils";

describe("memoryProvider", () => {
    let dbgName = EMPTY;
    
    it("default config", () => {
        let provider = createMemoryProvider();

        provider.log({
            name: dbgName,
            lvl: eDbgLevel.Terminal,
            usr: null as any
        }, "Terminal Error");
        let theLogs = provider.getLogs();
        assert.equal(theLogs.length, 1, encodeAsJson(theLogs));
        assert.equal(theLogs[0].lvl, DbgLevel.Terminal, encodeAsJson(theLogs));
        
        provider.log({
            name: dbgName,
            lvl: eDbgLevel.Critical,
            usr: null as any
        }, "Critical Error");
        theLogs = provider.getLogs();
        assert.equal(theLogs.length, 2, encodeAsJson(theLogs));
        assert.equal(theLogs[0].lvl, DbgLevel.Terminal, encodeAsJson(theLogs));
        assert.equal(theLogs[1].lvl, DbgLevel.Critical, encodeAsJson(theLogs));
        
        provider.log({
            name: dbgName,
            lvl: eDbgLevel.Error,
            usr: null as any
        }, " Error");
        theLogs = provider.getLogs();
        assert.equal(theLogs.length, 3, encodeAsJson(theLogs));
        assert.equal(theLogs[0].lvl, DbgLevel.Terminal, encodeAsJson(theLogs));
        assert.equal(theLogs[1].lvl, DbgLevel.Critical, encodeAsJson(theLogs));
        assert.equal(theLogs[2].lvl, DbgLevel.Error, encodeAsJson(theLogs));
        
        // Not expecting this to be tracked
        provider.log({
            name: dbgName,
            lvl: eDbgLevel.Warning,
            usr: null as any
        }, "Warning Error");
        theLogs = provider.getLogs();
        assert.equal(theLogs.length, 3, encodeAsJson(theLogs));
        assert.equal(theLogs[0].lvl, DbgLevel.Terminal, encodeAsJson(theLogs));
        assert.equal(theLogs[1].lvl, DbgLevel.Critical, encodeAsJson(theLogs));
        assert.equal(theLogs[2].lvl, DbgLevel.Error, encodeAsJson(theLogs));
        
        provider.log({
            name: dbgName,
            lvl: eDbgLevel.Error,
            usr: null as any
        }, " Error");
        theLogs = provider.getLogs();
        assert.equal(theLogs.length, 4, encodeAsJson(theLogs));
        assert.equal(theLogs[0].lvl, DbgLevel.Terminal, encodeAsJson(theLogs));
        assert.equal(theLogs[1].lvl, DbgLevel.Critical, encodeAsJson(theLogs));
        assert.equal(theLogs[2].lvl, DbgLevel.Error, encodeAsJson(theLogs));
        assert.equal(theLogs[3].lvl, DbgLevel.Error, encodeAsJson(theLogs));
    });

    it("Throw with config set to None", () => {
        let provider = createMemoryProvider({
            lvl: eDbgLevel.None
        });

        provider.log({
            name: dbgName,
            lvl: 1,
            usr: null as any
        }, "Terminal Error");
        let theLogs = provider.getLogs();
        assert.equal(theLogs.length, 0, encodeAsJson(theLogs));

        provider.log({
            name: dbgName,
            lvl: eDbgLevel.Warning,
            usr: null as any
        }, "Warning Error");
        theLogs = provider.getLogs();
        assert.equal(theLogs.length, 0, encodeAsJson(theLogs));

        provider.log({
            name: dbgName,
            lvl: eDbgLevel.Trace,
            usr: null as any
        }, "Warning Error");
        theLogs = provider.getLogs();
        assert.equal(theLogs.length, 0, encodeAsJson(theLogs));
    });

    it("default maximum log count", () => {
        let provider = createMemoryProvider();

        for (let lp = 0; lp < 50; lp++) {
            provider.log({
                name: dbgName,
                lvl: eDbgLevel.Error,
                usr: null as any
            }, "Error - " + lp);
            let theLogs = provider.getLogs();
            assert.equal(theLogs.length, lp + 1, encodeAsJson(theLogs));
            assert.equal(theLogs[0].message, "Error - 0", encodeAsJson(theLogs));
        }
        
        for (let lp = 0; lp < 50; lp++) {
            provider.log({
                name: dbgName,
                lvl: eDbgLevel.Error,
                usr: null as any
            }, "Error - " + (lp + 50));
            let theLogs = provider.getLogs();
            assert.equal(theLogs.length, 50, encodeAsJson(theLogs));
            assert.equal(theLogs[0].message, "Error - " + (lp + 1), encodeAsJson(theLogs));
        }
    });

    it("set maximum log count 10", () => {
        let provider = createMemoryProvider({
            count: 10
        });

        for (let lp = 0; lp < 10; lp++) {
            provider.log({
                name: dbgName,
                lvl: eDbgLevel.Error,
                usr: null as any
            }, "Error - " + lp);
            let theLogs = provider.getLogs();
            assert.equal(theLogs.length, lp + 1, encodeAsJson(theLogs));
            assert.equal(theLogs[0].message, "Error - 0", encodeAsJson(theLogs));
        }
        
        for (let lp = 0; lp < 10; lp++) {
            provider.log({
                name: dbgName,
                lvl: eDbgLevel.Error,
                usr: null as any
            }, "Error - " + (lp + 10));
            let theLogs = provider.getLogs();
            assert.equal(theLogs.length, 10, encodeAsJson(theLogs));
            assert.equal(theLogs[0].message, "Error - " + (lp + 1), encodeAsJson(theLogs));
        }
    });


    it("log details", () => {
        let provider = createMemoryProvider();
        
        let dateNow = (new Date()).getTime();
        provider.log({
            name: dbgName,
            lvl: eDbgLevel.Error,
            usr: null as any
        }, "Error Message");
        let theLogs = provider.getLogs();
        assert.equal(theLogs.length, 1, encodeAsJson(theLogs));

        let entry = theLogs[0];
        assert.equal(entry.lvl, DbgLevel.Error, "Level");
        assert.equal(entry.name, dbgName, "Name");
        assert.equal(entry.data, undefined, "Data");
        assert.equal(entry.message, "Error Message");

        let entryTime = entry.t.getTime();
        assert.ok(entryTime >= dateNow && entryTime <= (dateNow + 100), "Check time within 100ms");

        let entryCtx = entry.usr;
        assert.notEqual(entryCtx, null);
        assert.notEqual(entryCtx, undefined);
        assert.equal(objKeys(entryCtx).length, 0);
    });

    it("log from dbg", () => {
        let provider = createMemoryProvider();
        let dbg = createDbg();
        let providerCtx = dbg.addProvider(provider);
        
        assert.equal(dbg.cmds.has(":getLogs"), true);

        let dateNow = (new Date()).getTime();
        dbg.log.error("Error Message");
        
        let theLogs = provider.getLogs();
        assert.equal(theLogs.length, 1, encodeAsJson(theLogs));

        let entry = theLogs[0];
        assert.equal(entry.lvl, DbgLevel.Error, "Level");
        assert.equal(entry.name, dbgName, "Name");
        assert.equal(entry.data, undefined, "Data");
        assert.equal(entry.message, "Error Message");

        let entryTime = entry.t.getTime();
        assert.ok(entryTime >= dateNow && entryTime <= (dateNow + 100), "Check time within 100ms");

        let entryCtx = entry.usr;
        assert.notEqual(entryCtx, null);
        assert.notEqual(entryCtx, undefined);
        assert.equal(objKeys(entryCtx).length, 0);

        providerCtx.rm();
        assert.equal(dbg.cmds.has(":getLogs"), false);
    });

    it("log from dbg with user context", () => {
        let usrCtx = {
            Hello: "Darkness"
        };
        let provider = createMemoryProvider({
            lvl: DbgLevel.Warning
        });
        let dbg = createDbg({
            usr: usrCtx
        });
        dbg.addProvider(provider);
        assert.equal(dbg.cmds.has(":getLogs"), true);

        let dateNow = (new Date()).getTime();
        dbg.log.error("Error Message");
        
        let theLogs = provider.getLogs();
        assert.equal(theLogs.length, 1, encodeAsJson(theLogs));

        let entry = theLogs[0];
        assert.equal(entry.lvl, DbgLevel.Error, "Level");
        assert.equal(entry.name, dbgName, "Name");
        assert.equal(entry.data, undefined, "Data");
        assert.equal(entry.message, "Error Message");

        let entryTime = entry.t.getTime();
        assert.ok(entryTime >= dateNow && entryTime <= (dateNow + 100), "Check time within 100ms");

        let entryCtx = entry.usr;
        assert.notEqual(entryCtx, null);
        assert.notEqual(entryCtx, undefined);
        assert.equal(objKeys(entryCtx).length, 1);
        assert.equal(entryCtx["Hello"], "Darkness");

        dbg.usr.set("my", "old");

        let dateNow2 = (new Date()).getTime();
        dbg.log.warn("Warning Message");
        
        theLogs = provider.getLogs();
        assert.equal(theLogs.length, 2, encodeAsJson(theLogs));

        let entry0 = theLogs[0];
        assert.equal(entry0.lvl, DbgLevel.Error, "Level");
        assert.equal(entry0.name, dbgName, "Name");
        assert.equal(entry0.data, undefined, "Data");
        assert.equal(entry0.message, "Error Message");

        entryTime = entry0.t.getTime();
        assert.ok(entryTime >= dateNow && entryTime <= (dateNow + 100), "Check time within 100ms");

        entryCtx = entry0.usr;
        assert.notEqual(entryCtx, null);
        assert.notEqual(entryCtx, undefined);
        assert.equal(objKeys(entryCtx).length, 1);
        assert.equal(entryCtx["Hello"], "Darkness");

        let entry1 = theLogs[1];
        assert.equal(entry1.lvl, DbgLevel.Warning, "Level");
        assert.equal(entry1.name, dbgName, "Name");
        assert.equal(entry1.data, undefined, "Data");
        assert.equal(entry1.message, "Warning Message");

        entryTime = entry1.t.getTime();
        assert.ok(entryTime >= dateNow2 && entryTime <= (dateNow2 + 100), "Check time within 100ms");

        entryCtx = entry1.usr;
        assert.notEqual(entryCtx, null);
        assert.notEqual(entryCtx, undefined);
        assert.equal(objKeys(entryCtx).length, 2);
        assert.equal(entryCtx["Hello"], "Darkness");
        assert.equal(entryCtx["my"], "old");
    });

    it("log from dbg with user context", () => {
        let usrCtx = {
            Hello: "Darkness"
        };
        let provider = createMemoryProvider({
            lvl: DbgLevel.Warning
        });

        let parent = createDbg({
            usr: usrCtx
        });
        let providerCtx = parent.addProvider(provider);

        let dbg = parent.create();

        assert.equal(dbg.cmds.has(":getLogs"), true);
        
        let dateNow = (new Date()).getTime();
        dbg.log.error("Error Message");
        
        let theLogs = provider.getLogs();
        assert.equal(theLogs.length, 1, encodeAsJson(theLogs));

        let entry = theLogs[0];
        assert.equal(entry.lvl, DbgLevel.Error, "Level");
        assert.equal(entry.name, dbgName, "Name");
        assert.equal(entry.data, undefined, "Data");
        assert.equal(entry.message, "Error Message");

        let entryTime = entry.t.getTime();
        assert.ok(entryTime >= dateNow && entryTime <= (dateNow + 100), "Check time within 100ms");

        let entryCtx = entry.usr;
        assert.notEqual(entryCtx, null);
        assert.notEqual(entryCtx, undefined);
        assert.equal(objKeys(entryCtx).length, 1);
        assert.equal(entryCtx["Hello"], "Darkness");

        dbg.usr.set("my", "old");

        let dateNow2 = (new Date()).getTime();
        dbg.log.warn("Warning Message");
        
        theLogs = provider.getLogs();
        assert.equal(theLogs.length, 2, encodeAsJson(theLogs));

        let entry0 = theLogs[0];
        assert.equal(entry0.lvl, DbgLevel.Error, "Level");
        assert.equal(entry0.name, dbgName, "Name");
        assert.equal(entry0.data, undefined, "Data");
        assert.equal(entry0.message, "Error Message");

        entryTime = entry0.t.getTime();
        assert.ok(entryTime >= dateNow && entryTime <= (dateNow + 100), "Check time within 100ms");

        entryCtx = entry0.usr;
        assert.notEqual(entryCtx, null);
        assert.notEqual(entryCtx, undefined);
        assert.equal(objKeys(entryCtx).length, 1);
        assert.equal(entryCtx["Hello"], "Darkness");

        let entry1 = theLogs[1];
        assert.equal(entry1.lvl, DbgLevel.Warning, "Level");
        assert.equal(entry1.name, dbgName, "Name");
        assert.equal(entry1.data, undefined, "Data");
        assert.equal(entry1.message, "Warning Message");

        entryTime = entry1.t.getTime();
        assert.ok(entryTime >= dateNow2 && entryTime <= (dateNow2 + 100), "Check time within 100ms");

        entryCtx = entry1.usr;
        assert.notEqual(entryCtx, null);
        assert.notEqual(entryCtx, undefined);
        assert.equal(objKeys(entryCtx).length, 2);
        assert.equal(entryCtx["Hello"], "Darkness");
        assert.equal(entryCtx["my"], "old");

        providerCtx.rm();
        assert.equal(dbg.cmds.has(":getLogs"), false);
    });

    it("try add the provider twice", () => {
        let usrCtx = {
            Hello: "Darkness"
        };
        let provider = createMemoryProvider({
            lvl: DbgLevel.Warning
        });

        let parent = createDbg({
            usr: usrCtx
        });
        let providerCtx1 = parent.addProvider(provider);

        let dbg = parent.create();
        let providerCtx2 = dbg.addProvider(provider);

        assert.equal(dbg.cmds.has(":getLogs"), true);
        
        let dateNow = (new Date()).getTime();
        dbg.log.error("Error Message");
        
        let theLogs = provider.getLogs();
        assert.equal(theLogs.length, 2, encodeAsJson(theLogs));

        let entry = theLogs[0];
        assert.equal(entry.lvl, DbgLevel.Error, "Level");
        assert.equal(entry.name, dbgName, "Name");
        assert.equal(entry.data, undefined, "Data");
        assert.equal(entry.message, "Error Message");

        let entryTime = entry.t.getTime();
        assert.ok(entryTime >= dateNow && entryTime <= (dateNow + 100), "Check time within 100ms");

        let entryCtx = entry.usr;
        assert.notEqual(entryCtx, null);
        assert.notEqual(entryCtx, undefined);
        assert.equal(objKeys(entryCtx).length, 1);
        assert.equal(entryCtx["Hello"], "Darkness");

        dbg.usr.set("my", "old");

        let dateNow2 = (new Date()).getTime();
        dbg.log.warn("Warning Message");
        
        theLogs = provider.getLogs();
        assert.equal(theLogs.length, 4, encodeAsJson(theLogs));

        let entry0 = theLogs[0];
        assert.equal(entry0.lvl, DbgLevel.Error, "Level");
        assert.equal(entry0.name, dbgName, "Name");
        assert.equal(entry0.data, undefined, "Data");
        assert.equal(entry0.message, "Error Message");

        entryTime = entry0.t.getTime();
        assert.ok(entryTime >= dateNow && entryTime <= (dateNow + 100), "Check time within 100ms");

        entryCtx = entry0.usr;
        assert.notEqual(entryCtx, null);
        assert.notEqual(entryCtx, undefined);
        assert.equal(objKeys(entryCtx).length, 1);
        assert.equal(entryCtx["Hello"], "Darkness");

        let entry1 = theLogs[2];
        assert.equal(entry1.lvl, DbgLevel.Warning, "Level");
        assert.equal(entry1.name, dbgName, "Name");
        assert.equal(entry1.data, undefined, "Data");
        assert.equal(entry1.message, "Warning Message");

        entryTime = entry1.t.getTime();
        assert.ok(entryTime >= dateNow2 && entryTime <= (dateNow2 + 100), "Check time within 100ms");

        entryCtx = entry1.usr;
        assert.notEqual(entryCtx, null);
        assert.notEqual(entryCtx, undefined);
        assert.equal(objKeys(entryCtx).length, 2);
        assert.equal(entryCtx["Hello"], "Darkness");
        assert.equal(entryCtx["my"], "old");

        providerCtx2.rm();
        assert.equal(dbg.cmds.has(":getLogs"), true);
        providerCtx1.rm();
        assert.equal(dbg.cmds.has(":getLogs"), false);
    });
});
