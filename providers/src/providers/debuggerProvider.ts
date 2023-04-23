/*
 * @nevware21/ts-debug-providers
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { DbgLevel, IDbgProvider } from "@nevware21/ts-debug";
import { IDbgProviderConfig } from "../interfaces/IDbgProviderConfig";
import { IDbgCallbackProviderConfig } from "../interfaces/IDbgCallbackProviderConfig";
import { createCallbackProvider } from "./callbackProvider";
import { IDbgMemoryLog } from "../interfaces/IDbgMemoryLog";
import { isUndefined } from "@nevware21/ts-utils";

/**
 * Create and return an IDbgProvider which will call the debugger (via
 * `debugger`) when the level is less than the maximum defined. Which
 * defaults to DbgLevel.Error, so all Critical, Terminal and Error.
 * @param config - The configuration to apply for the console provider
 * @returns A new IDbgProvider instance
 * @example
 * ```ts
 * import { $Dbg } from "@nevware21/ts-debug";
 * import { createDebuggerProvider } from "@nevware21/ts-debug-provider";
 *
 * // Add the debugger provider to the default $Dbg instance, this will
 * // cause any message which is received up to the maximum error level
 * // to attempt to break into the debugger.
 * $Dbg.addProvider(createDebuggerProvider());
 *
 * // throws an exception with "Error Message"
 * $dbgError("Error Message");
 * ```
 */
export function createDebuggerProvider(config?: IDbgProviderConfig): IDbgProvider {
    let cbCfg: IDbgCallbackProviderConfig = {
        lvl: isUndefined(config && config.lvl) ? DbgLevel.Error : config && config.lvl,
        cb: (logDetails: IDbgMemoryLog) => {
            // eslint-disable-next-line no-debugger
            debugger;
        }
    }

    return createCallbackProvider(cbCfg);
}
