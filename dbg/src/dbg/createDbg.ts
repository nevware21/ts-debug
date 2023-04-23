/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { arrFindIndex, arrForEach, getLazy, isString, objDefineProps } from "@nevware21/ts-utils";
import { DbgProviderCallback, IDbg } from "../interfaces/IDbg";
import { IDbgConfig } from "../interfaces/IDbgConfig";
import { IDbgUsrCtx } from "../interfaces/IDbgUsrCtx";
import { IDbgLog } from "../interfaces/log/IDbgLog";
import { IDbgProvider } from "../interfaces/provider/IDbgProvider";
import { IDbgProviderCtx } from "../interfaces/provider/IDbgProviderCtx";
import { _chkLevel } from "../internal/checkLevel";
import { EMPTY } from "../internal/constants";
import { _createDbgLog } from "../internal/dbgLog";
import { noOpFunc } from "../internal/noOp";
import { _createUsrCtx } from "../internal/usrCtx";
import { DbgLevel } from "./dbgLevel";
import { IDbgCmds } from "../interfaces/cmd/IDbgCmds";
import { _createDbgCmds } from "../internal/dbgCmds";

/**
 * Add the {@link IDbgProvider} to the collection of providers for this debug instance
 * @param providers - The array of providers to add the provider too.
 * @param provider - The provider to add if not already present
 * @returns A context object that can be used to remove this provider from this instance
 */
const _addProvider = (dbg: IDbg, providers: IDbgProviderCtx[], provider: IDbgProvider) => {
    let ctx: IDbgProviderCtx = {
        p: provider,
        rm: noOpFunc
    };

    const matchProvider = (pCtx: IDbgProviderCtx) => {
        return pCtx.p === provider;
    };

    if (arrFindIndex(providers, matchProvider) === -1) {
        ctx.rm = () => {
            let idx = arrFindIndex(providers, matchProvider);
            if (idx !== -1) {
                providers.splice(idx, 1);
                provider._dbgCbRm && provider._dbgCbRm(dbg);
            }
            
            ctx.rm = noOpFunc;
        };

        // Add the new provider
        providers.push(ctx);
        provider._dbgCbAdd && provider._dbgCbAdd(dbg);
    }

    return ctx;
};

/**
 * @internal
 * @ignore
 * Check to see if any logging at this level would be reported.
 * @param dbg - The IDbg instance to check
 * @param providers - The providers from this instance
 * @param level - The logging level
 * @returns `true` if at least one provider would cause the logging at this level to be recorded.
 */
const _isEnabled = (dbg: IDbg, providers: IDbgProviderCtx[], theLevel: DbgLevel): boolean => {
    let result = _chkLevel(theLevel, dbg.lvl);
    
    if (result) {
        // This IDbg instance supports this level so now lets check the providers
        result = !!(dbg.p && dbg.p.chkLvl(theLevel));
        
        if (!result) {
            arrForEach(providers, (ctx) => {
                result = ctx && ctx.p && (!ctx.p.chkLvl || ctx.p.chkLvl(theLevel));
                if (result) {
                    return -1;
                }
            });
        }
    }

    return result;
};

/**
 * @internal
 * @ignore
 * Add the provider to the collection of providers while executing the
 * callback function, the requested provider will be removed after the
 * cb has finished executing.
 * @param providers - The array of IDbgProviders from this instance
 * @param provider - The provider to add while executing the callback
 * @param callback - The callback function to execute
 * @returns The response from the callback function
 */
const _use = <R>(dbg: IDbg, providers: IDbgProviderCtx[], provider: IDbgProvider, callback: () => R): R => {
    let ctx = _addProvider(dbg, providers, provider);
    try {
        return callback();
    } finally {
        ctx && ctx.rm();
    }
};

/**
 * @internal
 * @ignore
 * Call the provider for each registered provider.
 * @param parent - The parent IDbg instance
 * @param providers - The array of IDbgProviders from this instance
 * @param callback - The callback function to call with the provider
 * @param handleError - A callback function to call when an exception is thrown for a provider
 */
const _each = (parent: IDbg, providers: IDbgProviderCtx[], callback: DbgProviderCallback, handleError?: (provider: IDbgProvider, error: Error) => void) => {
    parent && parent.each(callback, handleError);
    arrForEach(providers, (ctx) => {
        try {
            callback(ctx.p);
        } catch (e) {
            if (handleError) {
                handleError(ctx.p, e);
            } else {
                throw e;
            }
        }
    });
};

/**
 * @internal
 * @ignore
 * Internal function to create a Dbg instance
 */
const _createDbg = (config: IDbgConfig | string, parent: IDbg) => {
    let dbgCfg = (!isString(config) ? config : { name: config }) || {};
    let providers: IDbgProviderCtx[] = [];
    let dbg: IDbg;

    const _dbgName = getLazy<string>(() => {
        let prntName = parent && parent.name;
        let theName = dbgCfg.name;

        return (prntName && theName) ? (prntName + ":" + theName) : (prntName || theName || EMPTY);
    });

    let level = dbgCfg.lvl;

    dbg = {
        addProvider: (provider: IDbgProvider) => _addProvider(dbg, providers, provider),
        use: <R>(provider: IDbgProvider, callback: () => R): R => _use(dbg, providers, provider, callback),
        each: (callback: DbgProviderCallback, handleError?: (provider: IDbgProvider, error: Error) => void) =>
            _each(dbg.p, providers, callback, handleError),
        create: (config: IDbgConfig | string): IDbg => _createDbg(config, dbg),
        chkLvl: (theLevel: DbgLevel) => _isEnabled(dbg, providers, theLevel)
    } as IDbg;

    objDefineProps(dbg, {
        lvl: { v: level, w: false },
        name: { l: _dbgName },
        p: { v: parent || null, w: false},
        log: {
            l: getLazy<IDbgLog>(() => _createDbgLog(dbg, _dbgName))
        },
        usr: {
            l: getLazy<IDbgUsrCtx>(() => _createUsrCtx(dbgCfg.usr, parent && parent.usr))
        },
        cmds: {
            l: getLazy<IDbgCmds>(() => _createDbgCmds(dbg))
        }
    });

    return dbg;
};

/**
 * Create a new {@link IDbg} instance with no providers, name and the default level is {@link eDbgLevel.All}
 * when no configuration is provided.
 * @param config - Can be either a string or an {@link IDbgConfig} instance, when a string value this
 * will be the name of the instance.
 * @returns A new {@link IDbg instance}
 * @example
 * ``` ts
 * import { createDbg, eDbgLevel, createConsoleProvider } from "@nevware21/ts-debug";
 *
 * // Create a new IDbg instance with the defaule values
 * let dbg = createDbg();
 *
 * dbg.log.debug("Debug Message"); // Nothing emitted to the provider(s)
 * dbg.log.error("Error Message"); // "Error Message" emitted to the provider(s)
 *
 * // Create a named IDbg instance enabling all debug logging levels
 * let dbgAll = createbg({
 *     name: "MyTest"
 * });
 *
 * // The logging context sent to the providers will include the name `MyTest`
 * dbgAll.log.debug("Debug Message"); // "Debug Message" emitted to the provider(s)
 * dbgAll.log.error("Error Message"); // "Error Message" emitted to the provider(s)
 *
 * // If the console provider is added to the instance, then the name will be included
 * // in the output.
 * dbgAll.addProvider(createConsoleProvider());
 *
 * // The logging context sent to the providers will include the name `MyTest`
 * // Nothing emitted to the console as the provide by default will only send Error and higher messages
 * dbgAll.log.debug("Debug Message");
 *
 * // "[MyTest]: Error Message" emitted to the console(s)
 * dbgAll.log.error("Error Message");
 * ```
 */
export function createDbg(config?: IDbgConfig | string): IDbg {
    return _createDbg(config, null);
}
