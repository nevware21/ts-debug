/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { assert } from "@nevware21/tripwire";
import { _createUsrCtx } from "../../../src/internal/usrCtx";
import { _parseCmdLine } from "../../../src/internal/parseCmdLine";

describe("parseCmdLine", () => {
    describe("empty", () => {
        it("null/undefined", () => {
            assert.deepEqual(_parseCmdLine(null as any), []);
            assert.deepEqual(_parseCmdLine(undefined as any), []);
        });

        it("empty", () => {
            assert.deepEqual(_parseCmdLine(""), []);
            assert.deepEqual(_parseCmdLine(" "), []);
            assert.deepEqual(_parseCmdLine("  "), []);
            assert.deepEqual(_parseCmdLine("      "), []);
        });

        it("command only", () => {
            assert.deepEqual(_parseCmdLine("a"), [ { cmd: "a", args: [] } ]);
            assert.deepEqual(_parseCmdLine(" a"), [ { cmd: "a", args: [] } ]);
            assert.deepEqual(_parseCmdLine(" a "), [ { cmd: "a", args: [] } ]);
            assert.deepEqual(_parseCmdLine("  a    "), [ { cmd: "a", args: [] } ]);
            assert.deepEqual(_parseCmdLine(":abcdefg"), [ { cmd: ":abcdefg", args: [] } ]);
            assert.deepEqual(_parseCmdLine(" :abcdefg"), [ { cmd: ":abcdefg", args: [] } ]);
            assert.deepEqual(_parseCmdLine(" :abcdefg "), [ { cmd: ":abcdefg", args: [] } ]);
            assert.deepEqual(_parseCmdLine("  :abcdefg    "), [ { cmd: ":abcdefg", args: [] } ]);
            assert.deepEqual(_parseCmdLine("a()"), [ { cmd: "a", args: [] } ]);
            assert.deepEqual(_parseCmdLine(" a()"), [ { cmd: "a", args: [] } ]);
            assert.deepEqual(_parseCmdLine(" a() "), [ { cmd: "a", args: [] } ]);
            assert.deepEqual(_parseCmdLine("  a()    "), [ { cmd: "a", args: [] } ]);
        });

        it("single argument", () => {
            assert.deepEqual(_parseCmdLine("a b"), [ { cmd: "a", args: [ "b" ] } ]);
            assert.deepEqual(_parseCmdLine(" a b"), [ { cmd: "a", args: [ "b" ] } ]);
            assert.deepEqual(_parseCmdLine(" a b "), [ { cmd: "a", args: [ "b" ] } ]);
            assert.deepEqual(_parseCmdLine("  a  b  "), [ { cmd: "a", args: [ "b" ] } ]);
            assert.deepEqual(_parseCmdLine("  a  \"b\"  "), [ { cmd: "a", args: [ "\"b\"" ] } ]);
            assert.deepEqual(_parseCmdLine(":abcdefg b"), [ { cmd: ":abcdefg", args: [ "b" ] } ]);
            assert.deepEqual(_parseCmdLine(" :abcdefg b"), [ { cmd: ":abcdefg", args: [  "b" ] } ]);
            assert.deepEqual(_parseCmdLine(" :abcdefg b "), [ { cmd: ":abcdefg", args: [  "b" ] } ]);
            assert.deepEqual(_parseCmdLine("  :abcdefg  b  "), [ { cmd: ":abcdefg", args: [  "b" ] } ]);
            assert.deepEqual(_parseCmdLine("a(b)"), [ { cmd: "a", args: [ "b" ] } ]);
            assert.deepEqual(_parseCmdLine(" a(b)"), [ { cmd: "a", args: [ "b" ] } ]);
            assert.deepEqual(_parseCmdLine(" a(b) "), [ { cmd: "a", args: [ "b" ] } ]);
            assert.deepEqual(_parseCmdLine("  a(b)    "), [ { cmd: "a", args: [ "b" ] } ]);
            assert.deepEqual(_parseCmdLine("a(\"b\")"), [ { cmd: "a", args: [ "\"b\"" ] } ]);
            assert.deepEqual(_parseCmdLine(" a(\"b\")"), [ { cmd: "a", args: [ "\"b\"" ] } ]);
            assert.deepEqual(_parseCmdLine(" a(\"b\") "), [ { cmd: "a", args: [ "\"b\"" ] } ]);
            assert.deepEqual(_parseCmdLine("  a(\"b\")    "), [ { cmd: "a", args: [ "\"b\"" ] } ]);
            assert.deepEqual(_parseCmdLine("a \"b\""), [ { cmd: "a", args: [ "\"b\"" ] } ]);
            assert.deepEqual(_parseCmdLine(" a \"b\""), [ { cmd: "a", args: [ "\"b\"" ] } ]);
            assert.deepEqual(_parseCmdLine(" a \"b\" "), [ { cmd: "a", args: [ "\"b\"" ] } ]);
            assert.deepEqual(_parseCmdLine("  a  \"b\"  "), [ { cmd: "a", args: [ "\"b\"" ] } ]);
            assert.deepEqual(_parseCmdLine(" \"Hello Darkness\""), [ { cmd: "Hello Darkness", args: [ ] } ]);
        });

        it("Escaped string", () => {
            assert.deepEqual(_parseCmdLine(" \"Hello \\\"Darkness\\\"\""), [ { cmd: "Hello \\\"Darkness\\\"", args: [ ] } ]);
        });

        it("Nested Brackets", () => {
            assert.deepEqual(_parseCmdLine(" a(\"b\", (1+1))"), [ { cmd: "a", args: [ "\"b\"", "(1+1)" ] } ]);
        });

        it("multiple arguments", () => {
            assert.deepEqual(_parseCmdLine("a b c"), [ { cmd: "a", args: [ "b", "c" ] } ]);
            assert.deepEqual(_parseCmdLine(" a b  c"), [ { cmd: "a", args: [ "b", "c" ] } ]);
            assert.deepEqual(_parseCmdLine(" a b c  "), [ { cmd: "a", args: [ "b", "c" ] } ]);
            assert.deepEqual(_parseCmdLine("  a  b  c  "), [ { cmd: "a", args: [ "b", "c" ] } ]);
            assert.deepEqual(_parseCmdLine("  a  \"b\"   \"c\" "), [ { cmd: "a", args: [ "\"b\"", "\"c\"" ] } ]);
            assert.deepEqual(_parseCmdLine("  a  \"b\"   'c' "), [ { cmd: "a", args: [ "\"b\"", "'c'" ] } ]);
            assert.deepEqual(_parseCmdLine(":abcdefg b c"), [ { cmd: ":abcdefg", args: [ "b", "c" ] } ]);
            assert.deepEqual(_parseCmdLine(" :abcdefg b c "), [ { cmd: ":abcdefg", args: [ "b", "c" ] } ]);
            assert.deepEqual(_parseCmdLine(" :abcdefg b  c "), [ { cmd: ":abcdefg", args: [ "b", "c" ] } ]);
            assert.deepEqual(_parseCmdLine("  :abcdefg  b  c  "), [ { cmd: ":abcdefg", args: [ "b", "c" ] } ]);
            assert.deepEqual(_parseCmdLine("a(b, c)"), [ { cmd: "a", args: [ "b", "c" ] } ]);
            assert.deepEqual(_parseCmdLine(" a(b, c)"), [ { cmd: "a", args: [ "b", "c" ] } ]);
            assert.deepEqual(_parseCmdLine(" a(b, c) "), [ { cmd: "a", args: [ "b", "c" ] } ]);
            assert.deepEqual(_parseCmdLine("  a(b, c)    "), [ { cmd: "a", args: [ "b", "c" ] } ]);
            assert.deepEqual(_parseCmdLine("a(\"b\", \"c\")"), [ { cmd: "a", args: [ "\"b\"", "\"c\"" ] } ]);
            assert.deepEqual(_parseCmdLine(" a(\"b\", \"c\")"), [ { cmd: "a", args: [ "\"b\"", "\"c\"" ] } ]);
            assert.deepEqual(_parseCmdLine(" a(\"b\", \"c\") "), [ { cmd: "a", args: [ "\"b\"", "\"c\"" ] } ]);
            assert.deepEqual(_parseCmdLine("  a(\"b\", \"c\")    "), [ { cmd: "a", args: [ "\"b\"", "\"c\"" ] } ]);
            assert.deepEqual(_parseCmdLine("a \"b\" \"c\""), [ { cmd: "a", args: [ "\"b\"", "\"c\"" ] } ]);
            assert.deepEqual(_parseCmdLine(" a \"b\" c"), [ { cmd: "a", args: [ "\"b\"", "c" ] } ]);
            assert.deepEqual(_parseCmdLine(" a \"b\" \"c\"  "), [ { cmd: "a", args: [ "\"b\"", "\"c\"" ] } ]);
            assert.deepEqual(_parseCmdLine("  a  \"b\"  \"c\"  "), [ { cmd: "a", args: [ "\"b\"", "\"c\"" ] } ]);
            assert.deepEqual(_parseCmdLine(" \"Hello Darkness\" 'my old friend'"), [ { cmd: "Hello Darkness", args: [ "'my old friend'" ] } ]);
            assert.deepEqual(_parseCmdLine(" \"Hello Darkness\" my old friend"), [ { cmd: "Hello Darkness", args: [ "my", "old", "friend" ] } ]);
        });

        it("multiple commas", () => {
            assert.deepEqual(_parseCmdLine("a(\"b\",,)"), [ { cmd: "a", args: [ "\"b\"", undefined, undefined ] } ]);
        })

        it("multiple commands", () => {
            let result = _parseCmdLine("a(\"b\",,); b()");
            assert.deepEqual(result, [
                { cmd: "a", args: [ "\"b\"", undefined, undefined ] },
                { cmd: "b", args: [] }
            ], JSON.stringify(result));
        })
    });
});
