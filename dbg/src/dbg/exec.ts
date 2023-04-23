/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { arrForEach, arrSlice, isString, strIndexOf, strTrim } from "@nevware21/ts-utils";
import { IDbg } from "../interfaces/IDbg";
import { _parseCmdLine } from "../internal/parseCmdLine";
import { IDbgCmd, IDbgCmdContext } from "../interfaces/cmd/IDbgCmd";
import { _createUsrCtx } from "../internal/usrCtx";
import { DbgContextValues } from "../interfaces/IDbgConfig";
import { IDbgCmdCtx } from "../interfaces/cmd/IDbgCmdCtx";

const EVAL_CMD = "$$dbgEval$$";

const _translateArgs = (cmdExecContext: IDbgCmdContext, theArgs: any[]) => {
    theArgs = arrSlice(theArgs, 0);
    arrForEach(theArgs, (value, idx) => {
        if (value) {
            if (cmdExecContext.usr.has(value)) {
                theArgs[idx] = cmdExecContext.usr.get(value, value);
            } else {
                if (cmdExecContext.dbg.cmds.has(value) || (isString(value) && strIndexOf(value, "(") !== -1)) {
                    theArgs[idx] = cmdExecContext.exec(value);
                }
            }
        }
    });

    return theArgs;
}

const _evalCmd: IDbgCmd = {
    desc: "Internal Exec command",
    exec: (context: IDbgCmdContext, cmdLine: string) => {
        let dbg = context.dbg;
        let results: any[];
        let theArgs = _parseCmdLine(cmdLine);
    
        arrForEach(theArgs, (theArg) => {
            if (!results) {
                results = [];
            }
    
            let name = strTrim(theArg.cmd);
            let theCmd = dbg.cmds.get(name);
            if (theCmd) {
                results.push(theCmd.exec(context, _translateArgs(context, theArg.args)));
            } else {
                results.push(new Error(`Unknown command [${name}]`));
            }
        });
    
        return results && (results.length === 1 ? results[0] : results);
    }
};

export const _createCmdContext = (dbg: IDbg, ctxValues?: DbgContextValues): IDbgCmdContext => {
    return {
        dbg: dbg,
        log: dbg.log,
        usr: _createUsrCtx(ctxValues, dbg.usr),
        exec: (cmdLine: string, cmdContext?: DbgContextValues) => {
            let evalCmd = dbg.cmds.get(EVAL_CMD) || _evalCmd;
            return evalCmd.exec(_createCmdContext(dbg, cmdContext), [ cmdLine ]);
        }
    };
};

/**
 * Add the default eval command to the provided {@link IDbg} instance, this
 * will override any previous set value
 * @param dbg - The current {@link IDbg} instance
 */
export const setDfEvalCmd = (dbg: IDbg): IDbgCmdCtx => {
    return dbg.cmds.add(EVAL_CMD, _evalCmd);
};

/**
 * Set the eval {@link IDbgCmd} command to the provided value for the {@link IDbg}
 * instance overriding any current or default (parent) value for this or any child
 * instances
 * @param dbg - The current {@link IDbg} instance
 * @param cmd - The command that will be used to evaluate and execute any command line
 */
export const setEvalCmd = (dbg: IDbg, cmd: IDbgCmd): IDbgCmdCtx => {
    return dbg.cmds.add(EVAL_CMD, cmd);
}