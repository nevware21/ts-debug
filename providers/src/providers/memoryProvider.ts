/*
 * @nevware21/ts-debug-providers
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { arrAppend, arrSlice, getLength, isUndefined } from "@nevware21/ts-utils";
import { DbgLevel, IDbg, IDbgCmd, IDbgCmdCtx } from "@nevware21/ts-debug";
import { IDbgMemoryProviderConfig } from "../interfaces/IDbgMemoryProviderConfig";
import { IDbgMemoryLog } from "../interfaces/IDbgMemoryLog";
import { IDbgMemoryProvider } from "../interfaces/IDbgMemoryProvider";
import { createCallbackProvider } from "./callbackProvider";
import { IDbgCallbackProviderConfig } from "../interfaces/IDbgCallbackProviderConfig";
import { addGetLogsCmd } from "../cmds/getLogsCmd";

/**
 * Create and return a IDbgProvider which will log the messages to the system
 * runtimes console if available.
 * @param config - The configuration to apply for the console provider
 * @returns A new IDbgProvider instance
 * @example
 * ```ts
 * import { $Dbg } from "@nevware21/ts-debug";
 * import { createMemoryProvider } from "@nevware21/ts-debug-provider";
 *
 * // Add the memory provider to the default $Dbg instance, this will
 * // use the default debug level of error. So on Error, Critical and Terminal
 * // log message all other messages Trace, Debug, Information and Warning will
 * // be not displayed.
 * $Dbg.addProvider(createMemoryProvider());
 *
 * $dbgError("Error Message"); // "Error Message" as an error on the console
 * ```
 */
export function createMemoryProvider(config?: IDbgMemoryProviderConfig): IDbgMemoryProvider {
    let cfg = config || {} as IDbgMemoryProviderConfig;
    let maxLevel = isUndefined(cfg.lvl) ? DbgLevel.Error : cfg.lvl;
    let maxCount = isUndefined(cfg.count) ? 50 : cfg.count;
    let entries: IDbgMemoryLog[] = [];
    let getLogCmdCtx: IDbgCmdCtx;
    let cmdDbg: IDbg;

    let cbCfg: IDbgCallbackProviderConfig = {
        lvl: maxLevel,
        cb: (logDetails) => {
            arrAppend(entries, logDetails);

            if (getLength(entries) > maxCount) {
                entries = arrSlice(entries, 1);
            }
        }
    }

    let provider = createCallbackProvider(cbCfg) as IDbgMemoryProvider;
    provider.getLogs = () => entries;
    provider._dbgCbAdd = (dbg: IDbg) => {
        if (!getLogCmdCtx) {
            getLogCmdCtx = addGetLogsCmd(dbg);
            cmdDbg = dbg;
        }
    };
  
    provider._dbgCbRm = (dbg: IDbg) => {
        if (getLogCmdCtx && cmdDbg === dbg) {
            getLogCmdCtx.rm();
            getLogCmdCtx = null;
            cmdDbg = null;
        }
    };
    
    return provider;
}
