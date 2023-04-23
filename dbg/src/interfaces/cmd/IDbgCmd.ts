/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { IDbg } from "../IDbg";
import { DbgContextValues } from "../IDbgConfig";
import { IDbgUsrCtx } from "../IDbgUsrCtx";
import { IDbgLog } from "../log/IDbgLog";
import { DbgCmdArgHelp } from "./IDbgCmdHelp";

export interface IDbgRegisteredCmd {
    init: boolean;
    cmd: IDbgCmd;
}

/**
 * The command context provided by the runtime when executed.
 */
export interface IDbgCmdContext {
    /**
     * The current {@link IDbg}
     */
    dbg: IDbg;

    /**
     * Access to the logging functions
     */
    log: IDbgLog;

    /**
     * Provides access to the current context variables
     */
    usr: IDbgUsrCtx;

    /**
     * Execute another function from the current function
     * @param cmdLine - The full command line to execute
     * @param cmdContext - Additional context variables to include in the
     * scope of executing the command.
     * @returns
     */
    exec: (cmdLine: string, cmdContext?: DbgContextValues) => any;
}

/**
 * Identifies a basic command definition. It provides for a command description
 * optional argument help details and the execute function.
 */
export interface IDbgCmd {

    /**
     * The description of the command
     */
    desc: string;

    /**
     * Optiona argument help
     */
    argHelp?: DbgCmdArgHelp;

    /**
     * This function executes the command with the command context and any optional
     * arguments to be passed to the command.
     * @param context - The command context provided by the runtime to the command so
     * that it can perform additional operations
     * @param extraArgs - Any additional optional arguments are passed as extra arguments
     * to the function, if more than 1 argument is passed then there will be additional
     * arguments.
     * @returns A result of the command that may be stored by the runtime
     */
    exec: (context: IDbgCmdContext, ...extraArgs: any[]) => any;
}
