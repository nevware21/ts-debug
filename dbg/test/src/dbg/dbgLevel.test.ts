/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { assert } from "@nevware21/tripwire";
import { DbgLevel, eDbgLevel } from "../../../src/dbg/dbgLevel";
import { getDbgLevelName, isDbgLevelName } from "../../../src/dbg/getDbgLevelName";

describe("getDbgLevelName", () => {
    it("Check Defined Names", () => {
        assert.equal(getDbgLevelName(eDbgLevel.Terminal), "Terminal");
        assert.equal(getDbgLevelName(eDbgLevel.Critical), "Critical");
        assert.equal(getDbgLevelName(eDbgLevel.Error), "Error");
        assert.equal(getDbgLevelName(eDbgLevel.Warning), "Warn");
        assert.equal(getDbgLevelName(eDbgLevel.Information), "Info");
        assert.equal(getDbgLevelName(eDbgLevel.Debug), "Debug");
        assert.equal(getDbgLevelName(eDbgLevel.Trace), "Trace");
        assert.equal(getDbgLevelName(eDbgLevel.Verbose), "Verbose");

        assert.equal(getDbgLevelName(DbgLevel.Terminal), "Terminal");
        assert.equal(getDbgLevelName(DbgLevel.Critical), "Critical");
        assert.equal(getDbgLevelName(DbgLevel.Error), "Error");
        assert.equal(getDbgLevelName(DbgLevel.Warning), "Warn");
        assert.equal(getDbgLevelName(DbgLevel.Information), "Info");
        assert.equal(getDbgLevelName(DbgLevel.Debug), "Debug");
        assert.equal(getDbgLevelName(DbgLevel.Trace), "Trace");
        assert.equal(getDbgLevelName(DbgLevel.Verbose), "Verbose");
    });

    it("Check Range Names", () => {
        assert.equal(getDbgLevelName(1), "Terminal");
        assert.equal(getDbgLevelName(15), "Critical");
        assert.equal(getDbgLevelName(21), "Error");
        assert.equal(getDbgLevelName(39), "Warn");
        assert.equal(getDbgLevelName(42), "Info");
        assert.equal(getDbgLevelName(53), "Debug");
        assert.equal(getDbgLevelName(69), "Trace");
        assert.equal(getDbgLevelName(71), "Verbose");
        assert.equal(getDbgLevelName(222), "Verbose");
    });

    it("Check Invalid values", () => {
        assert.equal(getDbgLevelName(-1), "None");
        assert.equal(getDbgLevelName(0), "None");
        assert.equal(getDbgLevelName(null as any), "None");
    });
});

describe("isDbgLevelName", () => {
    it("Check Defined Names", () => {
        assert.ok(isDbgLevelName("Terminal"), "Terminal");
        assert.ok(isDbgLevelName("Critical"), "Critical");
        assert.ok(isDbgLevelName("Error"), "Error");
        assert.ok(isDbgLevelName("Warn"), "Warn");
        assert.ok(isDbgLevelName("Info"), "Info");
        assert.ok(isDbgLevelName("Debug"), "Debug");
        assert.ok(isDbgLevelName("Trace"), "Trace");
        assert.ok(isDbgLevelName("Verbose"), "Verbose");

        assert.ok(isDbgLevelName("TERMINAL"), "TERMINAL");
        assert.ok(isDbgLevelName("CRITICAL"), "CRITICAL");
        assert.ok(isDbgLevelName("ERROR"), "ERROR");
        assert.ok(isDbgLevelName("WARN"), "WARN");
        assert.ok(isDbgLevelName("INFO"), "INFO");
        assert.ok(isDbgLevelName("DEBUG"), "DEBUG");
        assert.ok(isDbgLevelName("TRACE"), "TRACE");
        assert.ok(isDbgLevelName("VERBOSE"), "VERBOSE");
    });

    it("Check UnDefined Names", () => {
        assert.ok(!isDbgLevelName(""), "");
        assert.ok(!isDbgLevelName(null as any), "null");
        assert.ok(!isDbgLevelName(undefined as any), "undefined");

        assert.ok(!isDbgLevelName("Severe"), "Severe");
        assert.ok(!isDbgLevelName("Fatal"), "Fatal");
    });
});