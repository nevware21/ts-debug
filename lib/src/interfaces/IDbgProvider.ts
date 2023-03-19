/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { eDbgLevel } from "../dbg/dbgLevel";

/**
 * Specifies the interface for debug provider
 */
export interface IDbgProvider {
    /**
     * Log a message at the provided Debug Level to the debug provider with an optional
     * data details to be associated with the message.
     * @param message - The message to display to the log
     * @param data - An optional data element to be associated with the message.
     */
    log(level: eDbgLevel, message: string, data?: any) : void;
}
