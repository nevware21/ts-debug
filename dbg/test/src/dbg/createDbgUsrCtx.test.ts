/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { assert } from "chai";
import { createDbg } from "../../../src/dbg/createDbg";

describe("createDbg user context", () => {
    describe("default config", () => {
        it("Check no context", () => {
            let dbg = createDbg();
            
            let usrCnt = 0;
            dbg.usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 0, "Check user context values");
        });

        it("Manual add a context", () => {
            let dbg = createDbg();
            
            dbg.usr.set("Hello", "Darkness");

            let usrCnt = 0;
            dbg.usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 1, "Check user context values");
            assert.equal(dbg.usr.get("Hello"), "Darkness");

            dbg.usr.set("my", "old");
            dbg.usr.set("friend", "I've");

            usrCnt = 0;
            dbg.usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 3, "Check user context values");
            assert.equal(dbg.usr.get("Hello"), "Darkness");
            assert.equal(dbg.usr.get("Darkness"), undefined);
            assert.equal(dbg.usr.get("my"), "old");
            assert.equal(dbg.usr.get("friend"), "I've");

            dbg.usr.set("Darkness", undefined);
            assert.equal(dbg.usr.get("Darkness"), undefined);
        });
    });

    describe("config containing usr", () => {
        it("Check null context", () => {
            let dbg = createDbg({
                usr: null as any
            });
            
            let usrCnt = 0;
            dbg.usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 0, "Check user context values");
        });

        it("Check empty context", () => {
            let dbg = createDbg({
                usr: { }
            });
            
            let usrCnt = 0;
            dbg.usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 0, "Check user context values");
        });

        it("Manual add a context", () => {
            let dbg = createDbg({
                usr: {
                    come: "to",
                    talk: "with",
                    you: "again"
                }
            });
            
            dbg.usr.set("Hello", "Darkness");

            let usrCnt = 0;
            dbg.usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 4, "Check user context values");
            assert.equal(dbg.usr.get("Hello"), "Darkness");

            dbg.usr.set("my", "old");
            dbg.usr.set("friend", "I've");

            usrCnt = 0;
            dbg.usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 6, "Check user context values");
            assert.equal(dbg.usr.get("Hello"), "Darkness");
            assert.equal(dbg.usr.get("Darkness"), undefined);
            assert.equal(dbg.usr.get("my"), "old");
            assert.equal(dbg.usr.get("friend"), "I've");
            assert.equal(dbg.usr.get("come"), "to");
            assert.equal(dbg.usr.get("talk"), "with");
            assert.equal(dbg.usr.get("you"), "again");

            dbg.usr.set("Darkness", undefined);
            assert.equal(dbg.usr.get("Darkness"), undefined);
        });
    });

    describe("config with parent usr context", () => {
        it("Check null context", () => {
            let parent = createDbg({
                usr: null as any
            });
            let dbg = parent.create();
            
            let usrCnt = 0;
            dbg.usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 0, "Check user context values");
        });

        it("Check empty context", () => {
            let parent = createDbg({
                usr: { }
            });
            let dbg = parent.create();
            
            let usrCnt = 0;
            dbg.usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 0, "Check user context values");
        });

        it("Manual add a context", () => {
            let parent = createDbg({
                usr: {
                    come: "to",
                    talk: "with",
                    you: "again"
                }
            });
            let dbg = parent.create();
                
            dbg.usr.set("Hello", "Darkness");

            let usrCnt = 0;
            dbg.usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 4, "Check user context values");
            assert.equal(dbg.usr.get("Hello"), "Darkness");
            
            dbg.usr.set("my", "old");
            dbg.usr.set("friend", "I've");

            usrCnt = 0;
            dbg.usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 6, "Check user context values");
            assert.equal(dbg.usr.get("Hello"), "Darkness");
            assert.equal(dbg.usr.get("Darkness"), undefined);
            assert.equal(dbg.usr.get("my"), "old");
            assert.equal(dbg.usr.get("friend"), "I've");
            assert.equal(dbg.usr.get("come"), "to");
            assert.equal(dbg.usr.get("talk"), "with");
            assert.equal(dbg.usr.get("you"), "again");

            let parentUsrCnt = 0;
            parent.usr.each((name, value) => {
                parentUsrCnt++;
            });

            assert.equal(parentUsrCnt, 3, "Check user context values");
            assert.equal(parent.usr.get("Hello"), undefined);
            assert.equal(parent.usr.get("Darkness"), undefined);
            assert.equal(parent.usr.get("my"), undefined);
            assert.equal(parent.usr.get("friend"), undefined);
            assert.equal(parent.usr.get("come"), "to");
            assert.equal(parent.usr.get("talk"), "with");
            assert.equal(parent.usr.get("you"), "again");

            dbg.usr.set("Darkness", undefined);
            assert.equal(dbg.usr.get("Darkness"), undefined);
        });

        it("Duplicate context", () => {
            let parent = createDbg({
                usr: {
                    Hello: "Darkness",
                    my: "old",
                    friend: "..."
                }
            });
            let dbg = parent.create();
                
            dbg.usr.set("Hello", "Darkness");

            let usrCnt = 0;
            dbg.usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 3, "Check user context values");
            assert.equal(dbg.usr.get("Hello"), "Darkness");
            
            dbg.usr.set("friend", "I've");

            usrCnt = 0;
            dbg.usr.each((name, value) => {
                usrCnt++;
            });

            assert.equal(usrCnt, 3, "Check user context values");
            assert.equal(dbg.usr.get("Hello"), "Darkness");
            assert.equal(dbg.usr.get("Darkness"), undefined);
            assert.equal(dbg.usr.get("my"), "old");
            assert.equal(dbg.usr.get("friend"), "I've");

            let parentUsrCnt = 0;
            parent.usr.each((name, value) => {
                parentUsrCnt++;
            });

            assert.equal(parentUsrCnt, 3, "Check user context values");
            assert.equal(parent.usr.get("Hello"), "Darkness");
            assert.equal(parent.usr.get("Darkness"), undefined);
            assert.equal(parent.usr.get("my"), "old");
            assert.equal(parent.usr.get("friend"), "...");

            dbg.usr.set("friend", undefined);
            assert.equal(dbg.usr.get("friend"), undefined);
            assert.equal(dbg.usr.get("friend", 42), 42);

            dbg.usr.rm("friend");
            assert.equal(dbg.usr.get("friend"), "...");
            assert.equal(dbg.usr.get("friend", 42 as any), "...");
        });
    });
});