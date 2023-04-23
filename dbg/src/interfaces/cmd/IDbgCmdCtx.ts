/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { IDbgCmd, IDbgCmdContext } from "./IDbgCmd";

/**
 * Context returned from adding a command to allow removal
 */
export interface IDbgCmdCtx {
    /**
     * The command associated with this context
     */
    c: IDbgCmd;

    /**
     * Remove the command from the instance
     */
    rm: () => void;

    /**
     * Execute the command providing the context and arguments
     * @param ctx - The current execution context
     * @param theArgs - The arguments
     * @returns The resut from the command
     */
    exec: (ctx: IDbgCmdContext, theArgs: any[]) => any;
}