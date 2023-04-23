/*
 * @nevware21/ts-debug-providers
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { DbgLevel, eDbgLevel, IDbgProvider, IDbgLogCtx } from "@nevware21/ts-debug";
import { isUndefined } from "@nevware21/ts-utils";
import { noOpFunc } from "../internal/noOp";
import { _chkLevel } from "../internal/checkLevel";
import { IDbgCallbackProviderConfig } from "../interfaces/IDbgCallbackProviderConfig";
import { _createMemoryLog } from "../internal/memoryLog";

/**
 * Create and return an IDbgProvider which will call the provided
 * callback function when the level is less than the maximum defined.
 * Which defaults to DbgLevel.Error, so all Critical, Terminal and Error.
 * @param config - The configuration to apply for the console provider
 * @returns A new IDbgProvider instance
 * @example
 * ```ts
 * import { $Dbg } from "@nevware21/ts-debug";
 * import { createDebuggerProvider } from "@nevware21/ts-debug-provider";
 *
 * // Add the debugger provider to the default $Dbg instance, this will
 * // cause any message which is received up to the maximum error level
 * // to call the callback function.
 * $Dbg.addProvider(createCallbackProvider({
 *     cb: (log: IDbgMemoryLog) => {
 *     }
 * }));
 *
 * // throws an exception with "Error Message"
 * $dbgError("Error Message");
 * ```
 */
export function createCallbackProvider(config: IDbgCallbackProviderConfig): IDbgProvider {
    let cfg = config || {} as IDbgCallbackProviderConfig;
    let maxLevel = isUndefined(cfg.lvl) ? DbgLevel.Error : cfg.lvl;
    
    const _isEnabled = (level: DbgLevel) => {
        return _chkLevel(level, maxLevel);
    };
    
    function _log(ctx: IDbgLogCtx, message: string, data?: any) {
        if (ctx && _isEnabled(ctx.lvl)) {
            cfg.cb && cfg.cb(_createMemoryLog(ctx, message, data));
        }
    }

    return {
        log: maxLevel > eDbgLevel.None ? _log : noOpFunc,
        chkLvl: _isEnabled
    }
}
