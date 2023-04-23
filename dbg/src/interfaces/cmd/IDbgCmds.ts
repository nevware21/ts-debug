/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { DbgContextValues } from "../IDbgConfig";
import { IDbgContextItems } from "../IDbgContextItems";
import { IDbgCmd } from "./IDbgCmd";
import { IDbgCmdCtx } from "./IDbgCmdCtx";

/**
 * Context returned from adding a command to allow removal
 */
export interface IDbgCmds extends IDbgContextItems<IDbgCmdCtx> {

    /**
     * Add or Replace the command to the current commands for the context
     * @param name - The name to register this command as
     * @param theCmd - The debug command
     * @returns A debug context for the debug command
     */
    add: (name: string, theCmd: IDbgCmd) => IDbgCmdCtx;

    /**
     * Execute another function from the current function
     * @param cmdLine - The full command line to execute
     * @param cmdContext - Additional context variables to include in the
     * scope of executing the command.
     * @returns
     */
    exec: (cmdLine: string, cmdContext?: DbgContextValues) => any;
}
