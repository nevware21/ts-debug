/*
 * @nevware21/ts-debug-providers
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { DbgLevel, getDbgLevelName, IDbgProvider } from "@nevware21/ts-debug";
import { isUndefined } from "@nevware21/ts-utils";
import { throwLogError } from "../internal/throwLogError";
import { IDbgProviderConfig } from "../interfaces/IDbgProviderConfig";
import { createCallbackProvider } from "./callbackProvider";
import { IDbgCallbackProviderConfig } from "../interfaces/IDbgCallbackProviderConfig";
import { IDbgMemoryLog } from "../interfaces/IDbgMemoryLog";

/**
 * Create and return an IDbgProvider which will throw an exception with the
 * log the message when the level is less than the maximum defined. Which
 * defaults to DbgLevel.Error, so all Critical, Terminal and Error.
 * @param config - The configuration to apply for the console provider
 * @returns A new IDbgProvider instance
 * @example
 * ```ts
 * import { $Dbg } from "@nevware21/ts-debug";
 * import { createThrowProvider } from "@nevware21/ts-debug-provider";
 *
 * // Add the throw provider to the default $Dbg instance, this will
 * // cause any message which is received up to the maximum error level
 * // to ca
 * $Dbg.addProvider(createThrowProvider());
 *
 * // throws an exception with "Error Message"
 * $dbgError("Error Message");
 * ```
 */
export function createThrowProvider(config?: IDbgProviderConfig): IDbgProvider {
    let cbCfg: IDbgCallbackProviderConfig = {
        lvl: isUndefined(config && config.lvl) ? DbgLevel.Error : config && config.lvl,
        cb: (logDetails: IDbgMemoryLog) => {
            throwLogError(getDbgLevelName(logDetails.lvl), logDetails.message, logDetails.name);
        }
    };

    return createCallbackProvider(cbCfg);
}
