/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { DbgLevel } from "../../dbg/dbgLevel";
import { IDbg } from "../IDbg";
import { IDbgLogCtx } from "../log/IDbgLogCtx";

/**
 * Specifies the interface for debug provider
 */
export interface IDbgProvider {
    /**
     * Log a message at the provided Debug Level to the debug provider with an optional
     * data details to be associated with the message.
     * @param ctx - The context for the log message
     * @param message - The message to display to the log
     * @param data - An optional data element to be associated with the message.
     */
    log: (ctx: IDbgLogCtx, message: string, data?: any) => void;

    /**
     * Checks and returns whether any logging will be performed at the specified level
     * by this provider instance.
     * @param theLevel - The level to check
     * @returns `true` if at least one log entry would be recorded otherwise false
     */
    chkLvl?: (theLevel: DbgLevel) => boolean;

    /**
     * Optional function called when the provider is added to an {@link IDbg} instance
     * @param dbg - The dbg instance
     */
    _dbgCbAdd?: (dbg: IDbg) => void;
    
    /**
     * Optional function called when the provider is removed from a {@link IDbg} instance
     * @param dbg - The dbg instance
     */
    _dbgCbRm?: (dbg: IDbg) => void;
}
