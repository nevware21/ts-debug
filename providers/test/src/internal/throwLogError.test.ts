/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { arrForEach } from "@nevware21/ts-utils";
import { assert } from "chai";
import { EMPTY } from "../../../src/internal/constants";
import { DbgLogError, throwLogError } from "../../../src/internal/throwLogError";


function _expectThrow(cb: () => void): DbgLogError {
    try {
        cb();
    } catch (e) {
        assert.ok(true, "Expected an exception to be thrown");
        return e as DbgLogError;
    }

    return null as any;
}

describe("throwLogError", () => {
    it("With no args", () => {
        let error = _expectThrow(() => {
            throwLogError();
        });
        
        assert.equal(error.name, "DbgLogError");
        assert.equal(error.type, "Log");
        assert.equal(error.message, EMPTY);
        assert.equal(error.component, EMPTY);
    });

    it("With wrong log type", () => {
        let error = _expectThrow(() => {
            throwLogError("tracer", "Test error");
        });
        
        assert.equal(error.name, "DbgLogError");
        assert.equal(error.type, "Log");
        assert.equal(error.message, "Test error");
        assert.equal(error.component, EMPTY);
    });

    it("With Log Types", () => {
        const testTypes = [ "Critical", "Terminal", "Error", "Warn", "Info", "Debug", "Trace", "Verbose" ];

        arrForEach(testTypes, (theType) => {
            let error = _expectThrow(() => {
                throwLogError(theType, "Test error - " + theType);
            });
            
            assert.equal(error.name, `Dbg${theType}Error`);
            assert.equal(error.type, theType);
            assert.equal(error.message, "Test error - " + theType);
            assert.equal(error.component, EMPTY);
        });
    });

    it("With Component", () => {
        const testTypes = [ "Critical", "Terminal", "Error", "Warn", "Info", "Debug", "Trace", "Verbose" ];

        arrForEach(testTypes, (theType) => {
            let error = _expectThrow(() => {
                throwLogError(theType, "Test error - " + theType, "Component " + theType);
            });
            
            assert.equal(error.name, `Dbg${theType}Error`);
            assert.equal(error.type, theType);
            assert.equal(error.message, "Test error - " + theType);
            assert.equal(error.component, "Component " + theType);
        });
    });
});