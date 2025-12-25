/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { assert } from "@nevware21/tripwire";
import { createDbg } from "../../../src/dbg/createDbg";
import { _createUsrCtx } from "../../../src/internal/usrCtx";
import { _parseCmdLine } from "../../../src/internal/parseCmdLine";
import { IDbg } from "../../../src/interfaces/IDbg";
import { arrSlice } from "@nevware21/ts-utils";
import { arrContains } from "@nevware21/ts-utils";
import { setDfEvalCmd, setEvalCmd } from "../../../src/dbg/exec";

describe("exec", () => {
    let dbg: IDbg;

    beforeEach(() => {
        dbg = createDbg();
    });
        
    describe("no commands", () => {
        
        it("null/undefined", () => {
            assert.deepEqual(dbg.cmds.exec(null as any), undefined);
            assert.deepEqual(dbg.cmds.exec(undefined as any), undefined);
        });

        it("empty", () => {
            assert.deepEqual(dbg.cmds.exec(""), undefined);
            assert.deepEqual(dbg.cmds.exec(" "), undefined);
            assert.deepEqual(dbg.cmds.exec("  "), undefined);
            assert.deepEqual(dbg.cmds.exec("      "), undefined);
        });

        it("command only", () => {
            assert.deepEqual(dbg.cmds.exec("a").message, "Unknown command [a]");
            assert.deepEqual(dbg.cmds.exec(" a").message, "Unknown command [a]");
            assert.deepEqual(dbg.cmds.exec(" a ").message, "Unknown command [a]");

            assert.deepEqual(dbg.cmds.exec(":abcdefg").message, "Unknown command [:abcdefg]");
            assert.deepEqual(dbg.cmds.exec(" :abcdefg").message, "Unknown command [:abcdefg]");
            assert.deepEqual(dbg.cmds.exec(" :abcdefg ").message, "Unknown command [:abcdefg]");
            assert.deepEqual(dbg.cmds.exec("  :abcdefg    ").message, "Unknown command [:abcdefg]");
        
            assert.deepEqual(dbg.cmds.exec("a()").message, "Unknown command [a]");
            assert.deepEqual(dbg.cmds.exec(" a()").message, "Unknown command [a]");
            assert.deepEqual(dbg.cmds.exec(" a() ").message, "Unknown command [a]");
            assert.deepEqual(dbg.cmds.exec("  a()     ").message, "Unknown command [a]");
        });

        it("single argument", () => {
            assert.deepEqual(dbg.cmds.exec("a b").message, "Unknown command [a]");
            assert.deepEqual(dbg.cmds.exec(" a b").message, "Unknown command [a]");
            assert.deepEqual(dbg.cmds.exec(" a   b  ").message, "Unknown command [a]");
            assert.deepEqual(dbg.cmds.exec(" a   \"b\"  ").message, "Unknown command [a]");

            assert.deepEqual(dbg.cmds.exec(":abcdefg b").message, "Unknown command [:abcdefg]");
            assert.deepEqual(dbg.cmds.exec(" :abcdefg b").message, "Unknown command [:abcdefg]");
            assert.deepEqual(dbg.cmds.exec(" :abcdefg   b  ").message, "Unknown command [:abcdefg]");
            assert.deepEqual(dbg.cmds.exec(" :abcdefg   \"b\"  ").message, "Unknown command [:abcdefg]");

            assert.deepEqual(dbg.cmds.exec("a(b)").message, "Unknown command [a]");
            assert.deepEqual(dbg.cmds.exec(" a(b)").message, "Unknown command [a]");
            assert.deepEqual(dbg.cmds.exec(" a (  b )  ").message, "Unknown command [a]");
            assert.deepEqual(dbg.cmds.exec(" a   (\"b\")  ").message, "Unknown command [a]");

            assert.deepEqual(dbg.cmds.exec(" \"Hello Darkness\"").message, "Unknown command [Hello Darkness]");
        });

        it("Escaped string", () => {
            assert.deepEqual(dbg.cmds.exec(" \"Hello \\\"Darkness\\\"\"").message, "Unknown command [Hello \\\"Darkness\\\"]");
        });

        it("Nested Brackets", () => {
            assert.deepEqual(dbg.cmds.exec(" a(\"b\", (1+1))").message, "Unknown command [a]");
        });

        it("multiple commands", () => {
            let results = dbg.cmds.exec("a(\"b\",,); b()");
            assert.deepEqual(results[0].message, "Unknown command [a]");
            assert.deepEqual(results[1].message, "Unknown command [b]");
        });

        it("Check commands", () => {
            let cmds: string[] = [];

            dbg.cmds.each((name) => {
                cmds.push(name);
            });

            assert.equal(0, cmds.length);
        });
    });

    describe("With some commands", () => {
        let theArgs: any[];
        let theResult: any;
        beforeEach(() => {
            theArgs = [];
            dbg.cmds.add(":abc", {
                desc: "abc1",
                exec: function (ctx, cmd) {
                    theArgs.push({
                        args: arrSlice(arguments, 1)
                    });

                    if (cmd === "\"Hello\"") {
                        return ctx.exec("hello");
                    }

                    return theResult;
                }
            });

            dbg.cmds.add("hello", {
                desc: "abc1",
                exec: function (ctx, args) {
                    return "Darkness";
                }
            });
        });

        it("Check commands", () => {
            let cmds: string[] = [];

            dbg.cmds.each((name) => {
                cmds.push(name);
            });

            assert.equal(2, cmds.length);
            assert.ok(arrContains(cmds, "hello"), "contains hello");
            assert.ok(arrContains(cmds, ":abc"), "contains :abc");

            let theCmd = dbg.cmds.get("hello");
            theCmd.rm();

            cmds = [];

            dbg.cmds.each((name) => {
                cmds.push(name);
            });

            assert.equal(1, cmds.length);
            assert.ok(!arrContains(cmds, "hello"), "contains hello");
            assert.ok(arrContains(cmds, ":abc"), "contains :abc");

            // Try to remove again
            theCmd.rm();

            cmds = [];

            dbg.cmds.each((name) => {
                cmds.push(name);
            });

            assert.equal(1, cmds.length);
            assert.ok(!arrContains(cmds, "hello"), "contains hello");
            assert.ok(arrContains(cmds, ":abc"), "contains :abc");
        });

        it("no args", () => {
            theResult = "Hello";
            let results = dbg.cmds.exec(":abc");
            assert.equal(results, "Hello");
            assert.equal(theArgs.length, 1);
            assert.deepEqual(theArgs[0], { args: [ ]  });
        });

        it("multiple args", () => {
            theResult = "Hello";
            let results = dbg.cmds.exec(":abc(\"b\",,);");
            assert.equal(results, "Hello");
            assert.equal(theArgs.length, 1);
            assert.deepEqual(theArgs[0], { args: [ "\"b\"", undefined, undefined]  });

            results = dbg.cmds.exec(":abc(\"Hello\");");
            assert.equal(results, "Darkness");
            assert.equal(theArgs.length, 2);
            assert.deepEqual(theArgs[1], { args: [ "\"Hello\"" ]  });
        });
    });

    describe("With some parent commands", () => {
        let theArgs: any[];
        let theResult: any;
        let parent: IDbg;

        beforeEach(() => {
            parent = dbg;
           
            theArgs = [];
            parent.cmds.add(":abc", {
                desc: "abc1",
                exec: function (ctx, cmd) {
                    theArgs.push({
                        args: arrSlice(arguments, 1)
                    });

                    if (cmd === "\"Hello\"") {
                        return ctx.exec("hello");
                    }

                    return theResult;
                }
            });

            parent.cmds.add("my", {
                desc: "child cmd",
                exec: function (ctx, args) {
                    return "old friend";
                }
            });

            dbg = parent.create("child");

            dbg.cmds.add("hello", {
                desc: "abc1",
                exec: function (ctx, args) {
                    return "Darkness";
                }
            });
        });

        it("Check commands", () => {
            let cmds: string[] = [];

            dbg.cmds.each((name) => {
                cmds.push(name);
            });

            assert.equal(3, cmds.length);
            assert.ok(arrContains(cmds, "hello"), "contains hello");
            assert.ok(arrContains(cmds, ":abc"), "contains :abc");
            assert.ok(arrContains(cmds, "my"), "contains my");

            let theCmd = dbg.cmds.get("my");
            theCmd.rm();

            cmds = [];

            dbg.cmds.each((name) => {
                cmds.push(name);
            });

            assert.equal(2, cmds.length);
            assert.ok(arrContains(cmds, "hello"), "contains hello");
            assert.ok(arrContains(cmds, ":abc"), "contains :abc");
            assert.ok(!arrContains(cmds, "my"), "contains my");

            // Try to remove again
            theCmd.rm();

            cmds = [];

            dbg.cmds.each((name) => {
                cmds.push(name);
            });

            assert.equal(2, cmds.length);
            assert.ok(arrContains(cmds, "hello"), "contains hello");
            assert.ok(arrContains(cmds, ":abc"), "contains :abc");
            assert.ok(!arrContains(cmds, "my"), "contains my");
        });

        it("no args", () => {
            theResult = "Hello";
            let results = dbg.cmds.exec(":abc");
            assert.equal(results, "Hello");
            assert.equal(theArgs.length, 1);
            assert.deepEqual(theArgs[0], { args: [ ]  });
        });

        it("multiple args", () => {
            theResult = "Hello";
            let results = dbg.cmds.exec(":abc(\"b\",,);");
            assert.equal(results, "Hello");
            assert.equal(theArgs.length, 1);
            assert.deepEqual(theArgs[0], { args: [ "\"b\"", undefined, undefined]  });

            results = dbg.cmds.exec(":abc(\"Hello\");");
            assert.equal(results, "Darkness");
            assert.equal(theArgs.length, 2);
            assert.deepEqual(theArgs[1], { args: [ "\"Hello\"" ]  });
        });
    });

    describe("with context", () => {
        let theArgs: any[];
        let theResult: any;

        beforeEach(() => {
            theArgs = [];
            dbg.cmds.add(":abc", {
                desc: "abc1",
                exec: function (ctx, cmd) {
                    theArgs.push({
                        args: arrSlice(arguments, 1)
                    });

                    if (cmd === "\"Hello\"") {
                        return ctx.exec("hello");
                    }

                    return theResult;
                }
            });

            dbg.cmds.add("hello", {
                desc: "hello func",
                exec: function (ctx, args) {
                    return "Darkness";
                }
            });
        });

        it("Check passing user context", () => {
            dbg.usr.set("$status", 42);

            let execResult = dbg.cmds.exec(":abc $status");

            assert.equal(execResult, theResult);
            assert.equal(theArgs.length, 1, "Check length");
            assert.equal(theArgs[0].args.length, 1);
            assert.equal(theArgs[0].args[0], 42);

            execResult = dbg.cmds.exec(":abc hello");

            assert.equal(execResult, theResult);
            assert.equal(theArgs.length, 2, "Check length");
            assert.equal(theArgs[1].args.length, 1);
            assert.equal(theArgs[1].args[0], "Darkness");
        });
    });

    describe("setEvalCmd", () => {
        let theArgs: any[];
        let theResult: any;

        beforeEach(() => {
            theArgs = [];

            setEvalCmd(dbg, {
                desc: "abc1",
                exec: function (ctx, cmd) {
                    theArgs.push({
                        args: arrSlice(arguments, 1)
                    });

                    return theResult;
                }
            });
        });

        it("Check eval command", () => {
            dbg.usr.set("$status", 42);

            let execResult = dbg.cmds.exec(":abc $status");

            assert.equal(execResult, theResult);
            assert.equal(theArgs.length, 1, "Check length");
            assert.equal(theArgs[0].args.length, 1);
            assert.equal(theArgs[0].args[0], ":abc $status");

            execResult = dbg.cmds.exec(":abc hello");

            assert.equal(execResult, theResult);
            assert.equal(theArgs.length, 2, "Check length");
            assert.equal(theArgs[1].args.length, 1);
            assert.equal(theArgs[1].args[0], ":abc hello");
        });
    });

    describe("setDfEvalCmd", () => {
        let theArgs: any[];
        let theResult: any;

        beforeEach(() => {
            theArgs = [];

            setEvalCmd(dbg, {
                desc: "abc1",
                exec: function (ctx, cmd) {
                    theArgs.push({
                        args: arrSlice(arguments, 1)
                    });

                    return theResult;
                }
            });

            dbg.cmds.add(":abc", {
                desc: "abc1",
                exec: function (ctx, cmd) {
                    theArgs.push({
                        args: arrSlice(arguments, 1)
                    });

                    if (cmd === "\"Hello\"") {
                        return ctx.exec("hello");
                    }

                    return theResult;
                }
            });

            dbg.cmds.add("hello", {
                desc: "hello func",
                exec: function (ctx, args) {
                    return "Darkness";
                }
            });
        });

        it("Check eval command", () => {
            dbg.usr.set("$status", 42);

            let execResult = dbg.cmds.exec(":abc $status");

            assert.equal(execResult, theResult);
            assert.equal(theArgs.length, 1, "Check length");
            assert.equal(theArgs[0].args.length, 1);
            assert.equal(theArgs[0].args[0], ":abc $status");

            setDfEvalCmd(dbg);
            execResult = dbg.cmds.exec(":abc hello");

            assert.equal(execResult, theResult);
            assert.equal(theArgs.length, 2, "Check length");
            assert.equal(theArgs[1].args.length, 1);
            assert.equal(theArgs[1].args[0], "Darkness");
        });
    });
});
