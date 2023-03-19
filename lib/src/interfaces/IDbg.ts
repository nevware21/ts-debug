/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { IDbgLog } from "./IDbgLog";
import { IDbgProvider } from "./IDbgProvider";

/**
 * A basic debug interface for logging debug information from you application
 * or library
 */
export interface IDbg {
    /**
     * Get or Set the {@link IDbgProvider} to use for this debug instance
     */
    provider?: IDbgProvider | null;
    
    /**
     * Return the logging interface to be used for logging debug messages
     */
    log: IDbgLog;

    // console?: IDebugConsole;
    // submitException?(ex: Error | any): void;

    
}