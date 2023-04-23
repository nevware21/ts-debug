/*
 * @nevware21/ts-debug-providers
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { IDbgProviderConfig } from "./IDbgProviderConfig";

/**
 * Defines the configuration options for the console debug provider.
 * @example
 * ```ts
 * import { $Dbg } from "@nevware21/ts-debug";
 * import { createMemoryProvider } from "@nevware21/ts-debug-provider";
 *
 * // Set the config to enable debug messages to be displayed
 * // to the console
 * let dbgConfig = {
 *     lvl: DblLevel.Debug
 * };
 *
 * let provider = createMemoryProvider(dbgConfig);
 * $Dbg.addProvider(provider);
 * ```
 */
export interface IDbgMemoryProviderConfig extends IDbgProviderConfig {
    /**
     * The maximum number of log message to retain in-memory.
     * @example
     * ```ts
     * // Set the config to enable debug messages to be displayed
     * // to the console
     * let dbgConfig = {
     *     count: 100
     * };
     * ```
     */
    count?: number
}