/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { IDbg } from "../interfaces/IDbg";
import { createDbg } from "./createDbg";

/**
 * A singleton debug instance which is available for the entire runtime within its
 * scope.
 */
export const $Dbg: IDbg = createDbg();

/**
 * Logs a message that describes a terminal failure that indicates that the system is unstable
 * and may not be functioning correctly.
 * @param message - The basic message to be reported
 * @param data - An Optional data component that should be reported with the message
 * @example
 * ``` ts
 * // Send a fatal startup error to the installed IDbgProviders providers
 * $dbgTerminal("Fatal startup, system will not function. Please fix and restart");
 * ```
 */
export const $dbgTerminal: (message: string, data?: any) => void = $Dbg.log.terminal;

/**
 * Logs a message that describes an unrecoverable application or system crash, or a catastrophic
 * failure that requires immediate attention.
 * @param message - The basic message to be reported
 * @param data - An Optional data component that should be reported with the message
 * @example
 * ``` ts
 * // Send a fatal startup error to the installed IDbgProviders providers
 * $dbgCritical("Unable to capture X, System may not function as expected");
 * ``` */
export const $dbgCritical: (message: string, data?: any) => void = $Dbg.log.critical;

/**
 * Logs a message that highlights when the current flow of execution has failed or stopped due to
 * a failure. These should indicate a failure in the current execution, not an entire system wide
 * failure.
 * @param message - The basic message to be reported
 * @param data - An Optional data component that should be reported with the message
 * @example
 * ``` ts
 * // Send an error message to the installed IDbgProviders providers
 * $dbgError("Unable to initialize X, Y will not be tracked");
 * ``` */
export const $dbgError: (message: string, data?: any) => void = $Dbg.log.error;

/**
 * Logs a message that highlights an abnormal or unexpected event occurred, but did not otherwise
 * cause the execution to stop.
 * @param message - The basic message to be reported
 * @param data - An Optional data component that should be reported with the message
 * @example
 * ``` ts
 * // Send a warning message to the installed IDbgProviders providers
 * $dbgWarn("The pass value was not correct -- ignoring");
 * ``` */
export const $dbgWarn: (message: string, data?: any) => void = $Dbg.log.warn;

/**
 * Logs that track the general flow of the application. These logs should have long-term value.
 * @param message - The basic message to be reported
 * @param data - An Optional data component that should be reported with the message
 * @example
 * ``` ts
 * // Send a information message installed IDbgProviders providers
 * $dbgInfo("Successfully started with version x.y");
 * ```
 */
export const $dbgInfo: (message: string, data?: any) => void = $Dbg.log.info;

/**
 * Logs that are used for interactive investigation during development. These logs should primarily
 * contain information useful for debugging and have no long-term value.
 * @param message - The basic message to be reported
 * @param data - An Optional data component that should be reported with the message
 * @example
 * ``` ts
 * // Send a debug startup error to the installed IDbgProviders providers
 * $dbgLog("Looks like this was true");
 * ```
 */
export const $dbgLog: (message: string, data?: any) => void = $Dbg.log.debug;

/**
 * Logs that contain the detailed trace messages. These messages may contain sensitive data. These
 * messages should be disabled by default and should never be enabled in a production environment
 * due to the possible sensitive data that they might contain.
 * @param message - The basic message to be reported
 * @param data - An Optional data component that should be reported with the message
 * @example
 * ``` ts
 * // Send a trace message to the installed IDbgProviders providers
 * $dbgTrace("Got to here in the code");
 * ```
 */
export const $dbgTrace: (message: string, data?: any) => void = $Dbg.log.trace;

/**
 * Logs that contain the most detailed messages. These messages may contain sensitive data. These
 * messages should be disabled by default and should never be enabled in a production environment
 * due to the possible sensitive data that they might contain.
 * @param message - The basic message to be reported
 * @param data - An Optional data component that should be reported with the message
 * @example
 * ``` ts
 * // Send a trace message to the installed IDbgProviders providers
 * $dbgTrace("Got to here in the code");
 * ```
 */
export const $dbgVerbose: (message: string, data?: any) => void = $Dbg.log.verbose;
