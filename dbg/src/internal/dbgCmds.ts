/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { arrAppend, objHasOwn, strLower } from "@nevware21/ts-utils";
import { IDbgCmdCtx } from "../interfaces/cmd/IDbgCmdCtx";
import { IDbgCmds } from "../interfaces/cmd/IDbgCmds"
import { IDbgCmd, IDbgCmdContext } from "../interfaces/cmd/IDbgCmd";
import { _getValue } from "./get";
import { _doEach } from "./each";
import { DbgContextValues } from "../interfaces/IDbgConfig";
import { _createCmdContext } from "../dbg/exec";
import { IDbg } from "../interfaces/IDbg";

/**
 * Add the {@link IDbgCmd} to the collection of commands for this debug instance
 * @param cmds - The array of commands to add the command.
 * @param provider - The command to add if not already present
 * @returns A context object that can be used to remove this command from this instance
 */
const _addCmd = (values: { [name: string]: IDbgCmdCtx }, name: string, theCmd: IDbgCmd) => {
    let ctx: IDbgCmdCtx = {
        c: theCmd,
        rm: () => {
            if (objHasOwn(values, name)) {
                delete values[name];
            }
        },
        exec: (ctx: IDbgCmdContext, theArgs: any[]): any => {
            return theCmd.exec.apply(theCmd, arrAppend([ ctx ], theArgs))
        }
    };

    values[name] = ctx

    return ctx;
};

/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

export const _createDbgCmds = (dbg: IDbg): IDbgCmds => {
    let cmds: { [name: string]: IDbgCmdCtx } = {};

    return {
        add: (name: string, theCmd: IDbgCmd): IDbgCmdCtx => _addCmd(cmds, strLower(name), theCmd),
        get: (name: string): IDbgCmdCtx => _getValue<IDbgCmdCtx>(dbg.p && dbg.p.cmds, cmds, strLower(name), null),
        has: (name: string): boolean => objHasOwn(cmds, strLower(name)) || !!(dbg.p && dbg.p.cmds && dbg.p.cmds.has(name)),
        each: (cb: (name: string, dbgCtx: IDbgCmdCtx) => void) => _doEach(dbg.p && dbg.p.cmds, cmds, cb),
        exec: (cmdLine: string, cmdContext?: DbgContextValues): any => {
            return _createCmdContext(dbg, cmdContext).exec(cmdLine);
        }
    }
}


// const _createCmdContext = (dbg: IDbg, ctxValues?: DbgContextValues) => {
//     return {
//         dbg: dbg,
//         log: dbg.log,
//         usr: _createUsrCtx(ctxValues, dbg.usr),
//         exec: (cmdLine: string, cmdContext: DbgContextValues) => {
//             let evalCmd = dbg.cmds.get(EVAL_CMD);
//             if (evalCmd) {
//                 return evalCmd.exec(_createCmdContext(dbg, cmdContext), [ cmdLine ]);
//             }

//             return new Error("[" + EVAL_CMD + "] Missing");
//         }
//     };
// };