/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { DbgLevel } from "../dbg/dbgLevel";

/**
 * Identifies a type to hold context values that can be passed to the configuration
 * which are then also included with the context passed to a provider.
 */
export type DbgContextValues = { [key: string]: any };

/**
 * The structure of the configuration that can be passed to the {@link IDbg} during
 * creation of a new instance
 */
export interface IDbgConfig {
    /**
     * Identifies the name to be included for all messages originating from the logger
     * that is passed this config.
     */
    readonly name?: string;

    /**
     * Identifies the maximum logging level supported by the logger, even if a provider
     * is configured to support a lower debugging level this debug instance will not
     * pass it on.
     */
    lvl?: DbgLevel;

    /**
     * Optional user context values that are passed along to the provider
     */
    usr?: DbgContextValues
}