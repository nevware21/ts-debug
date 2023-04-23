/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { DbgLevel } from "../../dbg/dbgLevel";
import { IDbgUsrCtx } from "../IDbgUsrCtx";

/**
 * Identifies the log message context which is passed to the
 * {@link IDbgProvider} instance.
 */
export interface IDbgLogCtx {
    /**
     * The name of the current logger, based on the names of the current debug
     * instance and any parent.
     */
    readonly name: string;

    /**
     * Identifies the logging level of this log message
     */
    lvl: DbgLevel;

    /**
     * Optional user context values that are passed along to the provider
     */
    usr: IDbgUsrCtx;
}
