/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

/**
 * Identifies the log message function.
 * @param message - The basic message to be reported
 * @param data - An Optional data component that should be reported with the message
 */
export type DbgLogFunc = (message: string, data?: any) => void;

/**
 * Interface for the debugging logging functions that are available for instances of
 * this interface.
 */
export interface IDbgLog {
    /**
     * Logs a message that describes a terminal failure that indicates that the system is unstable
     * and may not be functioning correctly.
     * @param message - The basic message to be reported
     * @param data - An Optional data component that should be reported with the message
     */
    terminal: DbgLogFunc;

    /**
     * Logs a message that describes an unrecoverable application or system crash, or a catastrophic
     * failure that requires immediate attention.
     * @param message - The basic message to be reported
     * @param data - An Optional data component that should be reported with the message
     */
    critical: DbgLogFunc;
    
    /**
     * Logs a message that highlights when the current flow of execution has failed or stopped due to
     * a failure. These should indicate a failure in the current execution, not an entire system wide
     * failure.
     * @param message - The basic message to be reported
     * @param data - An Optional data component that should be reported with the message
     */
    error: DbgLogFunc;
    
    /**
     * Logs a message that highlights an abnormal or unexpected event occurred, but did not otherwise
     * cause the execution to stop.
     * @param message - The basic message to be reported
     * @param data - An Optional data component that should be reported with the message
     */
    warn: DbgLogFunc;
    
    /**
     * Logs that track the general flow of the application. These logs should have long-term value.
     * @param message - The basic message to be reported
     * @param data - An Optional data component that should be reported with the message
     */
    info: DbgLogFunc;
    
    /**
     * Logs that are used for interactive investigation during development. These logs should primarily
     * contain information useful for debugging and have no long-term value.
     * @param message - The basic message to be reported
     * @param data - An Optional data component that should be reported with the message
     */
    debug: DbgLogFunc;
    
    /**
     * Logs that contain the detailed race messages. These messages may contain sensitive data. These
     * messages should be disabled by default and should never be enabled in a production environment
     * due to the possible sensitive data that they might contain.
     * @param message - The basic message to be reported
     * @param data - An Optional data component that should be reported with the message
     */
    trace: DbgLogFunc;
    
    /**
     * Logs that contain the most detailed messages. These messages may contain sensitive data. These
     * messages should be disabled by default and should never be enabled in a production environment
     * due to the possible sensitive data that they might contain.
     * @param message - The basic message to be reported
     * @param data - An Optional data component that should be reported with the message
     */
    verbose: DbgLogFunc;
}