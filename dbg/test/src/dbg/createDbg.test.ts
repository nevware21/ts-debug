/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { objKeys, encodeAsJson } from "@nevware21/ts-utils";
import { assert } from "@nevware21/tripwire";
import { IDbg } from "../../../src/interfaces/IDbg";
import { IDbgProvider } from "../../../src/interfaces/provider/IDbgProvider";
import { IDbgLogCtx } from "../../../src/interfaces/log/IDbgLogCtx";
import { DbgLevel, eDbgLevel } from "../../../src/dbg/dbgLevel";
import { createDbg } from "../../../src/dbg/createDbg";
import { EMPTY } from "../../../src/internal/constants";
import { _chkLevel } from "../../../src/internal/checkLevel";

function _expectThrow(cb: () => void): Error {
    try {
        cb();
    } catch (e) {
        assert.ok(true, "Expected an exception to be thrown");
        return e;
    }

    return null as any;
}

describe("createDbg", () => {
    describe("default config", () => {
        it("Check log with no provider", () => {
            let dbg = createDbg();
    
            dbg.log.trace("Message");
            dbg.log.debug("Message");
            dbg.log.info("Message");
            dbg.log.warn("Message");
            dbg.log.error("Message");
            dbg.log.critical("Message");
            dbg.log.terminal("Message");
            dbg.log.verbose("Message");
    
            assert.equal(dbg.name, EMPTY, "Expect no name");
            assert.ok(true, "No exceptions thrown");
        });

        it("Check log with no provider and a name", () => {
            let dbg = createDbg("TestDbg");
    
            dbg.log.trace("Message");
            dbg.log.debug("Message");
            dbg.log.info("Message");
            dbg.log.warn("Message");
            dbg.log.error("Message");
            dbg.log.critical("Message");
            dbg.log.terminal("Message");
            dbg.log.verbose("Message");
    
            assert.equal(dbg.name, "TestDbg", "Expect TestDbg name");
            assert.ok(true, "No exceptions thrown");
        });

        it("Check dbg names", () => {
            let dbg1 = createDbg("dbg1");

            let dbg2 = createDbg({
                name: "dbg2"
            });

            assert.equal(dbg1.name, "dbg1");
            assert.equal(dbg2.name, "dbg2");
        });
    
        it("Check log with addProvider", () => {
            let results: any = {};
            let dbg = createDbg();
            let ctx = dbg.addProvider({
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    results[ctx.lvl] = {
                        message,
                        data
                    }
                }
            });
    
            assert.notEqual(ctx, null, "A context was returned");
            
            dbg.log.verbose("Hello", 0);
            dbg.log.trace("Darkness", 1);
            dbg.log.debug("my", 2);
            dbg.log.info("old", 3);
            dbg.log.warn("friend", 4);
            dbg.log.error("I've", 5);
            dbg.log.critical("come", 6);
            dbg.log.terminal("to", 7);
            
    
            assert.equal(results[eDbgLevel.Verbose].message, "Hello");
            assert.equal(results[eDbgLevel.Trace].message, "Darkness");
            assert.equal(results[eDbgLevel.Debug].message, "my");
            assert.equal(results[eDbgLevel.Information].message, "old");
            assert.equal(results[eDbgLevel.Warning].message, "friend");
            assert.equal(results[eDbgLevel.Error].message, "I've");
            assert.equal(results[eDbgLevel.Critical].message, "come");
            assert.equal(results[eDbgLevel.Terminal].message, "to");

            assert.equal(results[eDbgLevel.Verbose].data, 0);
            assert.equal(results[eDbgLevel.Trace].data, 1);
            assert.equal(results[eDbgLevel.Debug].data, 2);
            assert.equal(results[eDbgLevel.Information].data, 3);
            assert.equal(results[eDbgLevel.Warning].data, 4);
            assert.equal(results[eDbgLevel.Error].data, 5);
            assert.equal(results[eDbgLevel.Critical].data, 6);
            assert.equal(results[eDbgLevel.Terminal].data, 7);
        });
    
        it("Check log with addProvider", () => {
            let results: any = {};
            let dbg = createDbg();
            
            let ctx = dbg.addProvider({
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    results[ctx.lvl] = {
                        message,
                        data
                    }
                }
            });
    
            assert.notEqual(ctx, null, "A context was returned");
            assert.equal(objKeys(results).length, 0, "No results are present");
    
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(objKeys(results).length, 8, "No results are present");
    
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
    
            results = { };
            ctx.rm();
    
            assert.equal(objKeys(results).length, 0, "No results are present");
    
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(objKeys(results).length, 0, "No results are present");
        });
    
        it("Check log with provider", () => {
            let results: any = {};
            let dbg = createDbg();
            
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    results[ctx.lvl] = {
                        message,
                        data
                    }
                }
            };
            
            // Use the provider
            dbg.use(provider, () => {
                dbg.log.trace("Hello", 1);
                dbg.log.debug("Darkness", 2);
                dbg.log.info("my", 3);
                dbg.log.warn("old", 4);
                dbg.log.error("friend", 5);
                dbg.log.critical("I've", 6);
                dbg.log.terminal("come", 7);
                dbg.log.verbose("to", 8);
        
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
            });
    
            assert.equal(objKeys(results).length, 8);
    
            results = {};
            assert.equal(objKeys(results).length, 0);
    
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);

            assert.equal(objKeys(results).length, 0);
        });
    
        it("Try and add the same provider more than once and remove the 2nd attempt", () => {
            let callCount = 0;
            let dbg = createDbg();
            
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    callCount++;
                }
            };
            
            dbg.addProvider(provider);
    
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(callCount, 8);
    
            let ctx2 = dbg.addProvider(provider);
    
            callCount = 0;
    
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(callCount, 8);
    
            ctx2.rm();
    
            callCount = 0;
    
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(callCount, 8);
        });
    
        it("Try and remove the same provider more than once", () => {
            let callCount = 0;
            let dbg = createDbg();
            
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    callCount++;
                }
            };
            
            let ctx1 = dbg.addProvider(provider);
    
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(callCount, 8);
    
            ctx1.rm();
    
            callCount = 0;
            
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(callCount, 0);
    
            // remove again
            ctx1.rm();
    
            callCount = 0;
            
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(callCount, 0);
        });
    
        it("Force attempting to remove the same provider more than once", () => {
            let callCount = 0;
            let dbg = createDbg();
            
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    callCount++;
                }
            };
            
            let ctx1 = dbg.addProvider(provider);
            let rmFn = ctx1.rm;
    
            // Call the remove function again
            rmFn.call(ctx1);
            rmFn.call(ctx1);
            ctx1.rm();
    
            callCount = 0;
            
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(callCount, 0);
        });

        it("Check log with provider and parent", () => {
            let results: any = {};
            let parent = createDbg();
            let dbg = parent.create();
            
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    results[ctx.lvl] = {
                        message,
                        data
                    }
                }
            };
            
            // Use the provider
            parent.use(provider, () => {
                dbg.log.trace("Hello", 1);
                dbg.log.debug("Darkness", 2);
                dbg.log.info("my", 3);
                dbg.log.warn("old", 4);
                dbg.log.error("friend", 5);
                dbg.log.critical("I've", 6);
                dbg.log.terminal("come", 7);
                dbg.log.verbose("to", 8);
        
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
            });
    
            assert.equal(objKeys(results).length, 8);
    
            results = {};
            assert.equal(objKeys(results).length, 0);
    
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);

            assert.equal(objKeys(results).length, 0);
        });
    });

    describe("config level set to error", () => {
        it("Check log with no provider", () => {
            let dbg = createDbg({ lvl: eDbgLevel.Error });
    
            dbg.log.trace("Message");
            dbg.log.debug("Message");
            dbg.log.info("Message");
            dbg.log.warn("Message");
            dbg.log.error("Message");
            dbg.log.critical("Message");
            dbg.log.terminal("Message");
            dbg.log.verbose("Message");
    
            assert.equal(dbg.name, EMPTY, "Expect no name");
            assert.ok(true, "No exceptions thrown");
        });

        it("Check log with addProvider", () => {
            let results: any = {};
            let dbg = createDbg({ lvl: eDbgLevel.Error });
            let ctx = dbg.addProvider({
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    results[ctx.lvl] = {
                        message,
                        data
                    }
                }
            });
    
            assert.notEqual(ctx, null, "A context was returned");
            
            dbg.log.verbose("Hello", 0);
            dbg.log.trace("Darkness", 1);
            dbg.log.debug("my", 2);
            dbg.log.info("old", 3);
            dbg.log.warn("friend", 4);
            dbg.log.error("I've", 5);
            dbg.log.critical("come", 6);
            dbg.log.terminal("to", 7);
                
            assert.equal(results[eDbgLevel.Verbose], undefined);
            assert.equal(results[eDbgLevel.Trace], undefined);
            assert.equal(results[eDbgLevel.Debug], undefined);
            assert.equal(results[eDbgLevel.Information], undefined);
            assert.equal(results[eDbgLevel.Warning], undefined);
            assert.equal(results[eDbgLevel.Error].message, "I've");
            assert.equal(results[eDbgLevel.Critical].message, "come");
            assert.equal(results[eDbgLevel.Terminal].message, "to");

            assert.equal(results[eDbgLevel.Error].data, 5);
            assert.equal(results[eDbgLevel.Critical].data, 6);
            assert.equal(results[eDbgLevel.Terminal].data, 7);
        });
    
        it("Check log with addProvider", () => {
            let results: any = {};
            let dbg = createDbg({ lvl: eDbgLevel.Error });
            
            let ctx = dbg.addProvider({
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    results[ctx.lvl] = {
                        message,
                        data
                    }
                }
            });
    
            assert.notEqual(ctx, null, "A context was returned");
            assert.equal(objKeys(results).length, 0, "No results are present");
    
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(objKeys(results).length, 3, "No results are present");
    
            assert.equal(results[eDbgLevel.Trace], undefined);
            assert.equal(results[eDbgLevel.Debug], undefined);
            assert.equal(results[eDbgLevel.Information], undefined);
            assert.equal(results[eDbgLevel.Warning], undefined);
            assert.equal(results[eDbgLevel.Error].message, "friend");
            assert.equal(results[eDbgLevel.Critical].message, "I've");
            assert.equal(results[eDbgLevel.Terminal].message, "come");
            assert.equal(results[eDbgLevel.Verbose], undefined);
    
            assert.equal(results[eDbgLevel.Error].data, 5);
            assert.equal(results[eDbgLevel.Critical].data, 6);
            assert.equal(results[eDbgLevel.Terminal].data, 7);
    
            results = { };
            ctx.rm();
    
            assert.equal(objKeys(results).length, 0, "No results are present");
    
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(objKeys(results).length, 0, "No results are present");
        });
    
        it("Check log with provider", () => {
            let results: any = {};
            let dbg = createDbg({ lvl: eDbgLevel.Error });
            
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    results[ctx.lvl] = {
                        message,
                        data
                    }
                }
            };
            
            // Use the provider
            dbg.use(provider, () => {
                dbg.log.trace("Hello", 1);
                dbg.log.debug("Darkness", 2);
                dbg.log.info("my", 3);
                dbg.log.warn("old", 4);
                dbg.log.error("friend", 5);
                dbg.log.critical("I've", 6);
                dbg.log.terminal("come", 7);
                dbg.log.verbose("to", 8);
        
                assert.equal(results[eDbgLevel.Trace], undefined);
                assert.equal(results[eDbgLevel.Debug], undefined);
                assert.equal(results[eDbgLevel.Information], undefined);
                assert.equal(results[eDbgLevel.Warning], undefined);
                assert.equal(results[eDbgLevel.Error].message, "friend");
                assert.equal(results[eDbgLevel.Critical].message, "I've");
                assert.equal(results[eDbgLevel.Terminal].message, "come");
                assert.equal(results[eDbgLevel.Verbose], undefined);
        
                assert.equal(results[eDbgLevel.Error].data, 5);
                assert.equal(results[eDbgLevel.Critical].data, 6);
                assert.equal(results[eDbgLevel.Terminal].data, 7);
            });
    
            assert.equal(objKeys(results).length, 3);
    
            results = {};
            assert.equal(objKeys(results).length, 0);
    
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);

            assert.equal(objKeys(results).length, 0);
        });
    
        it("Try and add the same provider more than once and remove the 2nd attempt", () => {
            let callCount = 0;
            let dbg = createDbg({ lvl: eDbgLevel.Error });
            
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    callCount++;
                }
            };
            
            dbg.addProvider(provider);
    
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(callCount, 3);
    
            let ctx2 = dbg.addProvider(provider);
    
            callCount = 0;
    
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(callCount, 3);
    
            ctx2.rm();
    
            callCount = 0;
    
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(callCount, 3);
        });
    
        it("Try and remove the same provider more than once", () => {
            let callCount = 0;
            let dbg = createDbg({ lvl: eDbgLevel.Error });
            
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    callCount++;
                }
            };
            
            let ctx1 = dbg.addProvider(provider);
    
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(callCount, 3);
    
            ctx1.rm();
    
            callCount = 0;
            
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(callCount, 0);
    
            // remove again
            ctx1.rm();
    
            callCount = 0;
            
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(callCount, 0);
        });
    
        it("Force attempting to remove the same provider more than once", () => {
            let callCount = 0;
            let dbg = createDbg({ lvl: eDbgLevel.Error });
            
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    callCount++;
                }
            };
            
            let ctx1 = dbg.addProvider(provider);
            let rmFn = ctx1.rm;
    
            // Call the remove function again
            rmFn.call(ctx1);
            rmFn.call(ctx1);
            ctx1.rm();
    
            callCount = 0;
            
            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);
    
            assert.equal(callCount, 0);
        });
    });
    
    describe("With parent", () => {
        it("Check dbg names", () => {
            let parentDbg = createDbg("Parent1");
            
            let dbg1 = parentDbg.create({
                lvl: eDbgLevel.Critical
            });

            let dbg2 = parentDbg.create({
                name: "dbg2",
                lvl: eDbgLevel.Critical
            });

            assert.equal(dbg1.name, "Parent1");
            assert.equal(dbg2.name, "Parent1:dbg2");
        });

        it("With multiple debug instances not setting the parent", () => {
            let callCount = 0;
            let parentDbg = createDbg();
            
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    callCount++;
                }
            };
            
            parentDbg.addProvider(provider);

            let dbg = createDbg();

            dbg.log.trace("Hello", 1);
            dbg.log.debug("Darkness", 2);
            dbg.log.info("my", 3);
            dbg.log.warn("old", 4);
            dbg.log.error("friend", 5);
            dbg.log.critical("I've", 6);
            dbg.log.terminal("come", 7);
            dbg.log.verbose("to", 8);

            assert.equal(callCount, 0);
        });
    });

    describe("Check recursion blocking", () => {
        it("Check recursion with same function", () => {
            let messages: string[] = [];
            let dbg = createDbg();

            let dbg2 = createDbg();

            let callCount = 0;
            let provider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    messages.push(`${callCount}: ${message}`);
                    callCount++;
                    dbg2.log.critical("Really bad thing to do - " + message);
                }
            };

            dbg.addProvider(provider);
            dbg2.addProvider(provider);

            dbg2.log.critical("Critical Message");
            assert.equal(callCount, 2, encodeAsJson(messages));
            assert.equal(messages[0], "0: Critical Message");
            assert.equal(messages[1], "1: [Log Recursion]: Really bad thing to do - Critical Message");
        });

        it("Check recursion with different function", () => {
            let messages: string[] = [];
            let dbg = createDbg();

            let callCount = 0;
            let provider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    messages.push(`${callCount}: ${message}`);
                    callCount++;
                    dbg.log.error("Really bad thing to do");
                }
            };

            dbg.addProvider(provider);

            dbg.log.critical("Critical Message");
            assert.equal(callCount, 2, encodeAsJson(messages));
        });
    });

    describe("error handling", () => {
        it("each with no error handling with error in parent", () => {
            let callCount = 0;
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    callCount++;
                }
            };

            let dbg = createDbg();
            dbg.addProvider(provider);

            _expectThrow(() => {
                dbg.each((provider) => {
                    provider.log(null as any, "");
                    throw new Error("Simulated Error");
                });
            });

            assert.equal(callCount, 1);
        });

        it("Check provider error handling with error first", () => {
            let callCount = 0;
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    callCount++;
                }
            };

            let errorProvider: IDbgProvider = {
                log: () => {
                    throw new Error("Simulated Error");
                }
            }

            let dbg = createDbg();
            dbg.addProvider(errorProvider);
            dbg.addProvider(provider);

            _expectThrow(() => {
                dbg.log.critical("Critical Message");
            });

            assert.equal(callCount, 1);
        });

        it("Check provider error handling with error last", () => {
            let callCount = 0;
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    callCount++;
                }
            };

            let errorProvider: IDbgProvider = {
                log: () => {
                    throw new Error("Simulated Error");
                }
            }

            let dbg = createDbg();
            dbg.addProvider(provider);
            dbg.addProvider(errorProvider);

            _expectThrow(() => {
                dbg.log.critical("Critical Message");
            });

            assert.equal(callCount, 1);
        });

        it("Check provider error handling with error thrown in the parent", () => {
            let callCount = 0;
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    callCount++;
                }
            };

            let errorProvider: IDbgProvider = {
                log: () => {
                    throw new Error("Simulated Error");
                }
            }

            let parent = createDbg();
            let dbg = parent.create();
            parent.addProvider(errorProvider);
            dbg.addProvider(provider);

            _expectThrow(() => {
                dbg.log.critical("Critical Message");
            });

            assert.equal(callCount, 1);
        });

        it("Check provider error handling with error in the child", () => {
            let callCount = 0;
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    callCount++;
                }
            };

            let errorProvider: IDbgProvider = {
                log: () => {
                    throw new Error("Simulated Error");
                }
            }

            let parent = createDbg();
            let dbg = parent.create();
            parent.addProvider(provider);
            dbg.addProvider(errorProvider);

            _expectThrow(() => {
                dbg.log.critical("Critical Message");
            });

            assert.equal(callCount, 1);
        });

        it("Check provider error handling with multiple errors in the child", () => {
            let callCount = 0;
            let errorCount = 0;
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    callCount++;
                }
            };

            let errorProvider1: IDbgProvider = {
                log: () => {
                    errorCount++;
                    throw new Error("Simulated Error 1");
                }
            }

            let errorProvider2: IDbgProvider = {
                log: () => {
                    errorCount++;
                    throw new Error("Simulated Error 2");
                }
            }

            let parent = createDbg();
            let dbg = parent.create();
            parent.addProvider(provider);
            dbg.addProvider(errorProvider1);
            dbg.addProvider(errorProvider2);

            _expectThrow(() => {
                dbg.log.critical("Critical Message");
            });

            assert.equal(callCount, 1);
            assert.equal(errorCount, 2);
        });
    });

    describe("chkLvl", () => {
        it("default config with no providers", () => {
            let dbg = createDbg();

            assert.equal(dbg.chkLvl(eDbgLevel.None), false, "None");
            for (let lp = 1; lp < 9999; lp++) {
                assert.equal(dbg.chkLvl(lp), false, `Level: ${lp}`);
            }
        });

        it("default config with provider with no level", () => {
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    assert.ok(false, "Should not get called");
                }
            };

            let dbg = createDbg();
            dbg.addProvider(provider);

            assert.equal(dbg.chkLvl(eDbgLevel.None), false, "None");
            for (let lp = 1; lp < 9999; lp++) {
                assert.equal(dbg.chkLvl(lp), true, `Level: ${lp}`);
            }
        });

        it("default config with provider with all level", () => {
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    assert.ok(false, "Should not get called");
                },
                chkLvl: (theLevel: DbgLevel) => {
                    return true;
                }
            };

            let dbg = createDbg();
            dbg.addProvider(provider);

            assert.equal(dbg.chkLvl(eDbgLevel.None), false, "None");
            for (let lp = 1; lp < 9999; lp++) {
                assert.equal(dbg.chkLvl(lp), true, `Level: ${lp}`);
            }
        });

        it("default config with provider with all warning", () => {
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    assert.ok(false, "Should not get called");
                },
                chkLvl: (theLevel: DbgLevel) => {
                    return _chkLevel(theLevel, eDbgLevel.Warning);
                }
            };

            let dbg = createDbg();
            dbg.addProvider(provider);

            assert.equal(dbg.chkLvl(eDbgLevel.None), false, "None");
            for (let lp = 1; lp <= 40; lp++) {
                assert.equal(dbg.chkLvl(lp), true, `Level: ${lp}`);
            }

            for (let lp = 41; lp <= 9999; lp++) {
                assert.equal(dbg.chkLvl(lp), false, `Level: ${lp}`);
            }
        });
    });

    describe("chkLvl with parent", () => {
        it("default config with no providers", () => {
            let parent = createDbg();
            let dbg = parent.create();

            assert.equal(dbg.chkLvl(eDbgLevel.None), false, "None");
            for (let lp = 1; lp < 9999; lp++) {
                assert.equal(dbg.chkLvl(lp), false, `Level: ${lp}`);
            }
        });

        it("default config with provider with no level", () => {
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    assert.ok(false, "Should not get called");
                }
            };

            let parent = createDbg();
            let dbg = parent.create();
            dbg.addProvider(provider);

            assert.equal(dbg.chkLvl(eDbgLevel.None), false, "None");
            for (let lp = 1; lp < 9999; lp++) {
                assert.equal(dbg.chkLvl(lp), true, `Level: ${lp}`);
            }
        });

        it("default config with parent provider with no level", () => {
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    assert.ok(false, "Should not get called");
                }
            };

            let parent = createDbg();
            let dbg = parent.create();
            parent.addProvider(provider);

            assert.equal(dbg.chkLvl(eDbgLevel.None), false, "None");
            for (let lp = 1; lp < 9999; lp++) {
                assert.equal(dbg.chkLvl(lp), true, `Level: ${lp}`);
            }
        });

        it("default config with provider with all level", () => {
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    assert.ok(false, "Should not get called");
                },
                chkLvl: (theLevel: DbgLevel) => {
                    return true;
                }
            };

            let parent = createDbg();
            let dbg = parent.create();
            dbg.addProvider(provider);

            assert.equal(dbg.chkLvl(eDbgLevel.None), false, "None");
            for (let lp = 1; lp < 9999; lp++) {
                assert.equal(dbg.chkLvl(lp), true, `Level: ${lp}`);
            }
        });

        it("default config with parent provider with all level", () => {
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    assert.ok(false, "Should not get called");
                },
                chkLvl: (theLevel: DbgLevel) => {
                    return true;
                }
            };

            let parent = createDbg();
            let dbg = parent.create();
            parent.addProvider(provider);

            assert.equal(dbg.chkLvl(eDbgLevel.None), false, "None");
            for (let lp = 1; lp < 9999; lp++) {
                assert.equal(dbg.chkLvl(lp), true, `Level: ${lp}`);
            }
        });

        it("default config with provider with all warning", () => {
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    assert.ok(false, "Should not get called");
                },
                chkLvl: (theLevel: DbgLevel) => {
                    return _chkLevel(theLevel, eDbgLevel.Warning);
                }
            };

            let parent = createDbg();
            let dbg = parent.create();
            dbg.addProvider(provider);

            assert.equal(dbg.chkLvl(eDbgLevel.None), false, "None");
            for (let lp = 1; lp <= 40; lp++) {
                assert.equal(dbg.chkLvl(lp), true, `Level: ${lp}`);
            }

            for (let lp = 41; lp <= 9999; lp++) {
                assert.equal(dbg.chkLvl(lp), false, `Level: ${lp}`);
            }
        });

        it("default config with parent provider with all warning", () => {
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    assert.ok(false, "Should not get called");
                },
                chkLvl: (theLevel: DbgLevel) => {
                    return _chkLevel(theLevel, eDbgLevel.Warning);
                }
            };

            let parent = createDbg();
            let dbg = parent.create();
            parent.addProvider(provider);

            assert.equal(dbg.chkLvl(eDbgLevel.None), false, "None");
            for (let lp = 1; lp <= 40; lp++) {
                assert.equal(dbg.chkLvl(lp), true, `Level: ${lp}`);
            }

            for (let lp = 41; lp <= 9999; lp++) {
                assert.equal(dbg.chkLvl(lp), false, `Level: ${lp}`);
            }
        });
    });

    describe("ceck provider add/remove callback", () => {
        
        it("callback with add and remove", () => {
            let dbg = createDbg({
                lvl: DbgLevel.All
            });
            let addDbg: IDbg | null = null;
            let rmDbg: IDbg | null = null;
            let callCount = 0;
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    callCount++;
                },
                _dbgCbAdd(dbg) {
                    addDbg = dbg;
                },
                _dbgCbRm(dbg) {
                    rmDbg = dbg;
                }
            };

            let providerCtx = dbg.addProvider(provider);
            assert.equal(addDbg, dbg);
            assert.equal(rmDbg, null);

            dbg.log.error("Error 1");
            assert.equal(callCount, 1);

            providerCtx.rm();
            assert.equal(addDbg, dbg);
            assert.equal(rmDbg, dbg);

            dbg.log.error("Error 2");
            assert.equal(callCount, 1);
        });

        it("callback with no remove", () => {
            let dbg = createDbg({
                lvl: DbgLevel.All
            });
            let addDbg: IDbg | null = null;
            let callCount = 0;
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    callCount++;
                },
                _dbgCbAdd(dbg) {
                    addDbg = dbg;
                }
            };

            let providerCtx = dbg.addProvider(provider);
            assert.equal(addDbg, dbg);

            dbg.log.error("Error 1");
            assert.equal(callCount, 1);

            providerCtx.rm();

            dbg.log.error("Error 2");
            assert.equal(callCount, 1);
        });

        it("callback with no add", () => {
            let dbg = createDbg({
                lvl: DbgLevel.All
            });
            let rmDbg: IDbg | null = null;
            let callCount = 0;
            let provider: IDbgProvider = {
                log: (ctx: IDbgLogCtx, message: string, data?: any) => {
                    callCount++;
                },
                _dbgCbRm(dbg) {
                    rmDbg = dbg;
                }
            };

            let providerCtx = dbg.addProvider(provider);
            assert.equal(rmDbg, null);

            dbg.log.error("Error 1");
            assert.equal(callCount, 1);

            providerCtx.rm();
            assert.equal(rmDbg, rmDbg);

            dbg.log.error("Error 2");
            assert.equal(callCount, 1);
        });

    });
});