/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

export const enum eDbgLevel {
    /**
     * Not used for writing log messages. Specifies that a logging provider should not log any
     * messages.
     */
    None =	0,
    
    /**
     * Logs a message that describes a terminal failure that indicates that the system is unstable
     * and may not be functioning correctly.
     */
    Terminal = 10,

    /**
     * Logs a message that describes an unrecoverable application or system crash, or a catastrophic
     * failure that requires immediate attention.
     */
    Critical = 20,

    /**
     * Logs a message that highlights when the current flow of execution has failed or stopped due to
     * a failure. These should indicate a failure in the current execution, not an entire system wide
     * failure.
     */
    Error =	30,

    /**
     * Logs a message that highlights an abnormal or unexpected event occurred, but did not otherwise
     * cause the execution to stop.
     */
    Warning = 40,

    /**
     * Logs that track the general flow of the application. These logs should have long-term value.
     */
    Information = 50,

    /**
     * Logs that are used for interactive investigation during development. These logs should primarily
     * contain information useful for debugging and have no long-term value.
     */
    Debug = 60,

    /**
     * Logs that contain the most detailed messages. These messages may contain sensitive data. These
     * messages should be disabled by default and should never be enabled in a production environment
     * due to the possible sensitive data that they might contain.
     */
    Trace =	70,

    /**
     * Not used for writing log messages. Specifies that a logging provider should log all
     * messages.
     */
    All = 999
}
