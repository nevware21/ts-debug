/*
 * @nevware21/ts-debug-providers
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { IDbgMemoryLog } from "./IDbgMemoryLog";
import { IDbgProviderConfig } from "./IDbgProviderConfig";

/**
 * Defines the configuration options for the callback debug provider.
 * @example
 * ```ts
 * import { $Dbg } from "@nevware21/ts-debug";
 * import { createCallbackProvider } from "@nevware21/ts-debug-provider";
 *
 * // Set the config to enable debug messages to be displayed
 * // to the console
 * let dbgConfig = {
 *     lvl: DblLevel.Debug,
 *     cb: () => {
 *     }
 * };
 *
 * let provider = createCallbackProvider(dbgConfig);
 * $Dbg.addProvider(provider);
 * ```
 */
export interface IDbgCallbackProviderConfig extends IDbgProviderConfig {
    /**
     * The callback function to call when logging a message
     */
    cb: (logDetails: IDbgMemoryLog) => void;
}