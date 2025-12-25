/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { objKeys } from "@nevware21/ts-utils";
import { assert } from "@nevware21/tripwire";
import { _createUsrCtx } from "../../../src/internal/usrCtx";

describe("usrCtx", () => {
    describe("empty", () => {
        it("null/undefined no parent", () => {
            let ctx = _createUsrCtx(null as any);

            ctx.each((name, value) => {
                assert.fail("Should not get called");
            });

            assert.ok(true, "Done");

            ctx = _createUsrCtx(undefined as any);

            ctx.each((name, value) => {
                assert.fail("Should not get called");
            });

            assert.ok(true, "Done");
        });

        it("no content no parent", () => {
            let ctx = _createUsrCtx({});

            ctx.each((name, value) => {
                assert.fail("Should not get called");
            });

            assert.ok(true, "Done");
        });
    });

    describe("Populate context", () => {
        it("Manual add a context", () => {
            let usr = _createUsrCtx({});
    
            usr.set("Hello", "Darkness");
    
            let usrCnt = 0;
            usr.each((name, value) => {
                usrCnt++;
            });
    
            assert.equal(usrCnt, 1, "Check user context values");
            assert.equal(usr.get("Hello"), "Darkness");
    
            usr.set("my", "old");
            usr.set("friend", "I've");
    
            usrCnt = 0;
            usr.each((name, value) => {
                usrCnt++;
            });
    
            assert.equal(usrCnt, 3, "Check user context values");
            assert.equal(usr.get("Hello"), "Darkness");
            assert.equal(usr.get("Darkness"), undefined);
            assert.equal(usr.get("my"), "old");
            assert.equal(usr.get("friend"), "I've");
    
            usr.set("Darkness", undefined);
            assert.equal(usr.get("Darkness"), undefined);
        });
    });

    describe("Populate context with parent", () => {
        it("Check null context", () => {
            let parent = _createUsrCtx(null as any);
            let usr = _createUsrCtx(null as any, parent);
            
            let usrCnt = 0;
            usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 0, "Check user context values");
        });

        it("Check empty context", () => {
            let parent = _createUsrCtx({});
            let usr = _createUsrCtx({}, parent);
           
            let usrCnt = 0;
            usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 0, "Check user context values");
        });

        it("Manual add a context", () => {
            let parent = _createUsrCtx({
                come: "to",
                talk: "with",
                you: "again"
            });
            let usr = _createUsrCtx({}, parent);
                
            assert.equal(usr.has("Hello"), false);
            usr.set("Hello", "Darkness");
            assert.equal(usr.has("Hello"), true);

            let usrCnt = 0;
            usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 4, "Check user context values");
            assert.equal(usr.get("Hello"), "Darkness");
            
            
            usr.set("my", "old");
            usr.set("friend", "I've");

            usrCnt = 0;
            usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 6, "Check user context values");
            assert.equal(usr.get("Hello"), "Darkness");
            assert.equal(usr.get("Darkness"), undefined);
            assert.equal(usr.get("my"), "old");
            assert.equal(usr.get("friend"), "I've");
            assert.equal(usr.get("come"), "to");
            assert.equal(usr.get("talk"), "with");
            assert.equal(usr.get("you"), "again");

            assert.equal(usr.has("Hello"), true);
            assert.equal(usr.has("Darkness"), false);
            assert.equal(usr.has("my"), true);
            assert.equal(usr.has("friend"), true);
            assert.equal(usr.has("come"), true);
            assert.equal(usr.has("talk"), true);
            assert.equal(usr.has("you"), true);

            let parentUsrCnt = 0;
            parent.each((name, value) => {
                parentUsrCnt++;
            });

            assert.equal(parentUsrCnt, 3, "Check user context values");
            assert.equal(parent.get("Hello"), undefined);
            assert.equal(parent.get("Darkness"), undefined);
            assert.equal(parent.get("my"), undefined);
            assert.equal(parent.get("friend"), undefined);
            assert.equal(parent.get("come"), "to");
            assert.equal(parent.get("talk"), "with");
            assert.equal(parent.get("you"), "again");

            assert.equal(parent.has("Hello"), false);
            assert.equal(parent.has("Darkness"), false);
            assert.equal(parent.has("my"), false);
            assert.equal(parent.has("friend"), false);
            assert.equal(parent.has("come"), true);
            assert.equal(parent.has("talk"), true);
            assert.equal(parent.has("you"), true);

            usr.set("Darkness", undefined);
            assert.equal(usr.get("Darkness"), undefined);
        });

        it("Duplicate context", () => {
            let parent = _createUsrCtx({
                Hello: "Darkness",
                my: "old",
                friend: "..."
            });
            let usr = _createUsrCtx({}, parent);
                
            usr.set("Hello", "Darkness");

            let usrCnt = 0;
            usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 3, "Check user context values");
            assert.equal(usr.get("Hello"), "Darkness");
            
            usr.set("friend", "I've");

            usrCnt = 0;
            usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 3, "Check user context values");
            assert.equal(usr.get("Hello"), "Darkness");
            assert.equal(usr.get("Darkness"), undefined);
            assert.equal(usr.get("my"), "old");
            assert.equal(usr.get("friend"), "I've");

            let parentUsrCnt = 0;
            parent.each((name, value) => {
                parentUsrCnt++;
            });

            assert.equal(parentUsrCnt, 3, "Check user context values");
            assert.equal(parent.get("Hello"), "Darkness");
            assert.equal(parent.get("Darkness"), undefined);
            assert.equal(parent.get("my"), "old");
            assert.equal(parent.get("friend"), "...");

            usr.set("friend", undefined);
            assert.equal(usr.get("friend"), undefined);
            assert.equal(usr.get("friend", 42), 42);

            usr.rm("friend");
            assert.equal(usr.get("friend"), "...");
            assert.equal(usr.get("friend", 42 as any), "...");
        });
    });

    describe("Check references", () => {
        it("remove context key", () => {
            let usrCtx = {};

            let ctx = _createUsrCtx(usrCtx);
            assert.equal(objKeys(usrCtx).length, 0);
    
            ctx.set("Hello", "Darkness");
    
            let usrCnt = 0;
            ctx.each((name, value) => {
                usrCnt++;
            });
    
            assert.equal(usrCnt, 1);
            assert.equal(objKeys(usrCtx).length, 0, "Original context unchanged");
    
            let cpy = ctx.cpy();
            usrCnt = 0;
            ctx.each((name, value) => {
                usrCnt++;
            });
    
            let cpyCnt = 0;
            cpy.each((name, value) => {
                cpyCnt++;
            });
    
            assert.equal(usrCnt, 1);
            assert.equal(cpyCnt, 1);
            assert.equal(objKeys(usrCtx).length, 0, "Original context unchanged");
            
            ctx.rm("Hello");
    
            usrCnt = 0;
            ctx.each((name, value) => {
                usrCnt++;
            });
    
            cpyCnt = 0;
            cpy.each((name, value) => {
                cpyCnt++;
            });
    
            assert.equal(usrCnt, 0);
            assert.equal(cpyCnt, 1);
            assert.equal(objKeys(usrCtx).length, 0, "Original context unchanged");
        });
        
        it("remove child key", () => {
            let usrCtx = {};

            let ctx = _createUsrCtx(usrCtx);
            assert.equal(objKeys(usrCtx).length, 0);
    
            ctx.set("Hello", "Darkness");
    
            let usrCnt = 0;
            ctx.each((name, value) => {
                usrCnt++;
            });
    
            assert.equal(usrCnt, 1);
            assert.equal(objKeys(usrCtx).length, 0, "Original context unchanged");
    
            let cpy = ctx.cpy();
            usrCnt = 0;
            ctx.each((name, value) => {
                usrCnt++;
            });
    
            let cpyCnt = 0;
            cpy.each((name, value) => {
                cpyCnt++;
            });
    
            assert.equal(usrCnt, 1);
            assert.equal(cpyCnt, 1);
            assert.equal(objKeys(usrCtx).length, 0, "Original context unchanged");
            
            cpy.rm("Hello");
    
            usrCnt = 0;
            ctx.each((name, value) => {
                usrCnt++;
            });
    
            cpyCnt = 0;
            cpy.each((name, value) => {
                cpyCnt++;
            });
    
            assert.equal(usrCnt, 1);
            assert.equal(cpyCnt, 0);
            assert.equal(objKeys(usrCtx).length, 0, "Original context unchanged");
        });

        it("remove key with a parent and a child", () => {
            let usrCtx = {
                "Hello": "..."
            };

            let parent = _createUsrCtx(usrCtx);

            let ctx = _createUsrCtx({}, parent);
            assert.equal(objKeys(usrCtx).length, 1);
    
            assert.equal(ctx.get("Hello"), "...");
            ctx.set("Hello", "Darkness");
            assert.equal(ctx.get("Hello"), "Darkness");

            let usrCnt = 0;
            ctx.each((name, value) => {
                usrCnt++;
            });
    
            assert.equal(usrCnt, 1);
            assert.equal(objKeys(usrCtx).length, 1, "Original context unchanged");
    
            let cpy = ctx.cpy();
            usrCnt = 0;
            ctx.each((name, value) => {
                usrCnt++;
            });
    
            let cpyCnt = 0;
            cpy.each((name, value) => {
                cpyCnt++;
            });
    
            assert.equal(usrCnt, 1);
            assert.equal(cpyCnt, 1);
            assert.equal(objKeys(usrCtx).length, 1, "Original context unchanged");
            
            ctx.rm("Hello");
            assert.equal(ctx.get("Hello"), "...");
            assert.equal(cpy.get("Hello"), "Darkness");

            usrCnt = 0;
            ctx.each((name, value) => {
                usrCnt++;
            });
    
            cpyCnt = 0;
            cpy.each((name, value) => {
                cpyCnt++;
            });
    
            assert.equal(usrCnt, 1);
            assert.equal(cpyCnt, 1);
            assert.equal(objKeys(usrCtx).length, 1, "Original context unchanged");
        });
    });
});