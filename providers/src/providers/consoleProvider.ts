/*
 * @nevware21/ts-debug-providers
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import {
    DbgLevel, eDbgLevel, getDbgLevelName,
    IDbgProvider, IDbgLogCtx
} from "@nevware21/ts-debug";
import { asString, encodeAsJson, getInst, isFunction, isUndefined } from "@nevware21/ts-utils";
import { IDbgProviderConfig } from "../interfaces/IDbgProviderConfig";
import { _chkLevel } from "../internal/checkLevel";
import { _formatName } from "../internal/format";
import { noOpFunc } from "../internal/noOp";

/**
 * @internal
 * @ignore
 * Provides a lookup map for the logging levels to the console function
 */
const _levelFuncMap: Array<{ l: eDbgLevel, f: string, b?: string }> = [
    { l: eDbgLevel.Error, f: "error" },
    { l: eDbgLevel.Warning, f: "warn" },
    { l: eDbgLevel.Information, f: "info" },
    { l: eDbgLevel.Debug, f: "debug" },
    { l: eDbgLevel.Trace, f: "trace", b: "debug" }
];

/**
 * Create and return a IDbgProvider which will log the messages to the system
 * runtimes console if available.
 * @param config - The configuration to apply for the console provider, when not
 * specified or the lvl is not defined the default will be Error.
 * @returns A new IDbgProvider instance
 * @example
 * ```ts
 * import { $Dbg } from "@nevware21/ts-debug";
 * import { createConsoleProvider } from "@nevware21/ts-debug-provider";
 *
 * // Add the console provider to the default $Dbg instance, this will
 * // use the default debug level of error. So on Error, Critical and Terminal
 * // log message all other messages Trace, Debug, Information and Warning will
 * // be not displayed.
 * $Dbg.addProvider(createConsoleProvider());
 *
 * $dbgError("Error Message"); // "Error Message" as an error on the console
 * ```
 */
export function createConsoleProvider(config?: IDbgProviderConfig): IDbgProvider {
    let funcMap: { [key: number]: string } = {};
    let cfg = config || {} as IDbgProviderConfig;
    let maxLevel = isUndefined(cfg.lvl) ? DbgLevel.Error : cfg.lvl;

    const _isEnabled = (level: DbgLevel) => {
        return _chkLevel(level, maxLevel);
    };

    const _log = (ctx: IDbgLogCtx, message: string, data?: any) => {
        let console = getInst<Console>("console");
        let level = ctx && ctx.lvl;
        if (console && _isEnabled(level)) {
            let usr: any;
            let func = funcMap[level];
            if (!func) {
                func = "log";
                let idx = 0;

                do {
                    func = _levelFuncMap[idx].f;
                    if (!console[func] && _levelFuncMap[idx].b) {
                        func = _levelFuncMap[idx].b;
                    }
                } while (_levelFuncMap[idx++].l < level && idx < _levelFuncMap.length);
                
                func = funcMap[level] = (isFunction(console[func]) ? func : "log");
            }

            if (ctx && ctx.usr) {
                usr = {};
                ctx.usr.each((name, value) => {
                    usr[name] = value;
                });
            }
            
            console[func] && console[func](
                _formatName(ctx, true) + getDbgLevelName(level) + ":" + asString(message),
                data && encodeAsJson(data),
                usr && encodeAsJson(usr));
        }
    }

    return {
        log: (isUndefined(maxLevel) || maxLevel > eDbgLevel.None) ? _log : noOpFunc,
        chkLvl: _isEnabled
    }
}
