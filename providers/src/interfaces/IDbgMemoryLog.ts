/*
 * @nevware21/ts-debug-providers
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { DbgLevel, DbgContextValues } from "@nevware21/ts-debug";

/**
 * Defines the in-memory log structure for the log messages.
 */
export interface IDbgMemoryLog {
    /**
     * The Date / time that the log entry was recorded
     */
    readonly t: Date;

    /**
     * Identifies the logging level of this log message
     */
    readonly lvl: DbgLevel;

    /**
     * The message reported as part of the log message
     */
    readonly message: string;

    /**
     * An Optional data component that should be reported with the message
     */
    readonly data?: any;

    /**
     * The name of the current logger, based on the names of the current debug
     * instance and any parent.
     */
    readonly name: string;

    /**
     * Optional user context values that are passed along to the provider
     */
    readonly usr: DbgContextValues;
}