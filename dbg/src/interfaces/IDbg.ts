/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { DbgLevel } from "../dbg/dbgLevel";
import { IDbgCmds } from "./cmd/IDbgCmds";
import { IDbgConfig } from "./IDbgConfig";
import { IDbgUsrCtx } from "./IDbgUsrCtx";
import { IDbgLog } from "./log/IDbgLog";
import { IDbgProvider } from "./provider/IDbgProvider";
import { IDbgProviderCtx } from "./provider/IDbgProviderCtx";

/**
 * The definition of a callback function that is called for provider
 */
export type DbgProviderCallback = (provider: IDbgProvider) => void;

/**
 * A basic debug interface for logging debug information from you application
 * or library
 */
export interface IDbg {
    /**
     * The maximum logging level that will be reported by this instance.
     */
    readonly lvl: DbgLevel;

    /**
     * The name of the logger, the default logger is an empty name
     */
    readonly name: string;

    /**
     * Return the logging interface to be used for logging debug messages
     */
    readonly log: IDbgLog;

    /**
     * If this debug instance is a child of a parent then this is a link to
     * their parent instance.
     */
    readonly p?: IDbg;

    /**
     * User context values that are available for this instance or any parent instance
     */
    readonly usr: IDbgUsrCtx;

    /**
     * Additional commands that are available for this instance or any parent instance.
     */
    readonly cmds: IDbgCmds;

    /**
     * Add the {@link IDbgProvider} to the collection of providers for this debug instance
     * @param provider - The provider to add if not already present
     * @returns A context object that can be used to remove this provider from this instance
     */
    addProvider: (provider: IDbgProvider) => IDbgProviderCtx;

    /**
     * Add the provider to the collection of providers while executing the
     * callback function, the requested provider will be removed after the
     * cb has finished executing.
     * @param provider - The provider to add while executing the callback
     * @param callback - The callback function to execute
     * @returns The response from the callback function
     */
    use: <R>(provider: IDbgProvider, callback: () => R) => R;

    // ui?: IDbgUi;
    // submitException?(ex: Error | any): void;

    /**
     * Call the provider for each registered provider.
     * @param callback - The callback function to call with the provider
     * @param handleError - A callback function to call when an exception is thrown for a provider
     */
    each: (callback: DbgProviderCallback, handleError?: (provider: IDbgProvider, error: Error) => void) => void;

    /**
     * Create a new named {@link IDbg} instance which has the current instance as it's parent, any
     * logging to this instance will also be delegated the providers of the current instance as well
     * as any added to the new returne instance.
     * @param config - Can be either a string or an {@link IDbgConfig} instance, when a string value this
     * will be the name of the instance.
     * @returns A new {@link IDbg instance} which can be used for providing scoped debugging
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
     *     name: "MyTest",
     *     lvl: eDbgLevel.All
     * });
     *
     * // The logging context sent to the providers will include the name `MyTest`
     * dbgAll.log.debug("Debug Message"); // "Debug Message" emitted to the provider(s)
     * dbgAll.log.error("Error Message"); // "Error Message" emitted to the provider(s)
     *
     * // If the console provider is added to the instance, then the name will be included
     *  // in the output.
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
    create: (config?: IDbgConfig | string) => IDbg;

    /**
     * Check to see if any logging at this level would be reported.
     * @param level - The logging level
     * @returns `true` if at least one provider would cause the logging at this level to be recorded.
     */
    chkLvl: (level: DbgLevel) => boolean;
}
