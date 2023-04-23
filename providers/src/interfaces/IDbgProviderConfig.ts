/*
 * @nevware21/ts-debug-providers
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { DbgLevel } from "@nevware21/ts-debug";

/**
 * Defines the configuration options for the console debug provider.
 * @example
 * ```ts
 * import { $Dbg } from "@nevware21/ts-debug";
 * import { createConsoleProvider } from "@nevware21/ts-debug-provider";
 *
 * // Set the config to enable debug messages to be displayed
 * // to the console
 * let dbgConfig = {
 *     lvl: DblLevel.Debug
 * };
 *
 * let provider = createConsoleProvider(dbgConfig);
 * $Dbg.addProvider(provider);
 * ```
 */
export interface IDbgProviderConfig {
    /**
     * The maximum log message level each provider will have its own
     * default value.
     * @example
     * ```ts
     * // Set the config to enable debug messages to be displayed
     * // to the console
     * let dbgConfig = {
     *     lvl: DblLevel.Debug
     * };
     * ```
     */
    lvl?: DbgLevel
}