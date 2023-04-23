/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { createEnumValueMap } from "@nevware21/ts-utils";

/**
 * Defines the logging debug levels.
 */
export const enum eDbgLevel {
    /**
     * Not used for writing log messages. Specifies that a logging provider should not log
     * any messages.
     */
    None =	0,
    
    /**
     * Logs a message that describes a terminal failure that indicates that the system is
     * unstable and may not be functioning correctly.
     */
    Terminal = 10,

    /**
     * Logs a message that describes an unrecoverable application or system crash, or a
     * catastrophic failure that requires immediate attention.
     */
    Critical = 20,

    /**
     * Logs a message that highlights when the current flow of execution has failed or
     * stopped due to a failure. These should indicate a failure in the current execution,
     * not an entire system wide failure.
     */
    Error =	30,

    /**
     * Logs a message that highlights an abnormal or unexpected event occurred, but did
     * not otherwise cause the execution to stop.
     */
    Warning = 40,

    /**
     * Logs that track the general flow of the application. These logs should have
     * long-term value.
     */
    Information = 50,

    /**
     * Logs that are used for interactive investigation during development. These logs
     * should primarily contain information useful for debugging and have no long-term
     * value.
     */
    Debug = 60,

    /**
     * Logs that contain the detailed trace messages. These messages may contain sensitive
     * data. These messages should be disabled by default and should never be enabled in
     * a production environment due to the possible sensitive data that they might contain.
     */
    Trace =	70,

    /**
     * Logs that contain the most detailed messages. These messages may contain sensitive
     * data. These messages should be disabled by default and should never be enabled in
     * a production environment due to the possible sensitive data that they might contain.
     */
    Verbose = 80,

    /**
     * Not used for writing log messages. Specifies that a logging provider should log all
     * messages.
     */
    All = 999
}

/**
 * A namespaced value map identifying the logging debug levels which maps to the
 * {@link eDbgLevel}.
 */
export const DbgLevel = createEnumValueMap<typeof eDbgLevel>({
    /**
     * Not used for writing log messages. Specifies that a logging provider should not
     * log any messages, maps to {@link eDbgLevel.None}.
     */
    None: eDbgLevel.None,

    /**
     * Logs a message that describes a terminal failure that indicates that the system
     * is unstable and may not be functioning correctly, maps to {@link eDbgLevel.None}.
     */
    Terminal: eDbgLevel.Terminal,

    /**
     * Logs a message that describes an unrecoverable application or system crash, or a
     * catastrophic failure that requires immediate attention, maps to
     * {@link eDbgLevel.None}.
     */
    Critical: eDbgLevel.Critical,

    /**
     * Logs a message that highlights when the current flow of execution has failed or stopped
     * due to a failure. These should indicate a failure in the current execution, not an
     * entire system wide failure, maps to {@link eDbgLevel.None}.
     */
    Error: eDbgLevel.Error,

    /**
     * Logs a message that highlights an abnormal or unexpected event occurred, but did not
     * otherwise cause the execution to stop, maps to {@link eDbgLevel.None}.
     */
    Warning: eDbgLevel.Warning,

    /**
     * Logs that track the general flow of the application. These logs should have long-term
     * value, maps to {@link eDbgLevel.None}.
     */
    Information: eDbgLevel.Information,

    /**
     * Logs that are used for interactive investigation during development. These logs should
     * primarily  contain information useful for debugging and have no long-term value, maps
     * to {@link eDbgLevel.Debug}.
     */
    Debug: eDbgLevel.Debug,

    /**
     * Logs that contain the detailed trace messages. These messages may contain sensitive data.
     * These  messages should be disabled by default and should never be enabled in a production
     * environment due to the possible sensitive data that they might contain, maps to
     * {@link eDbgLevel.Trace}.
     */
    Trace: eDbgLevel.Trace,

    /**
     * Logs that contain the most detailed messages. These messages may contain sensitive data.
     * These  messages should be disabled by default and should never be enabled in a production
     * environment due to the possible sensitive data that they might contain, maps to
     * {@link eDbgLevel.Verbose}.
     */
    Verbose: eDbgLevel.Verbose,

    /**
     * Not used for writing log messages. Specifies that a logging provider should log all
     * messages, maps to {@link eDbgLevel.All}.
     */
    All: eDbgLevel.All
});

/**
 * The type to identify the logging debug levels which maps to the {@link eDbgLevel}.
 */
export type DbgLevel = eDbgLevel | number;
