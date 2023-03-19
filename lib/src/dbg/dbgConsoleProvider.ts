/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { eDbgLevel } from "./dbgLevel";
import { IDbgProvider } from "../interfaces/IDbgProvider";
import { arrForEach, encodeAsJson, getInst, isFunction, isUndefined } from "@nevware21/ts-utils";

/**
 * @internal
 * @ignore
 * Provides a lookup map for the logging levels to the console function
 */
const levelFuncMap: Array<{ l: eDbgLevel, f: string, b?: string }> = [
    { l: eDbgLevel.Error, f: "error" },
    { l: eDbgLevel.Warning, f: "warn" },
    { l: eDbgLevel.Information, f: "info" },
    { l: eDbgLevel.Debug, f: "debug" },
    { l: eDbgLevel.Trace, f: "trace", b: "debug" }
];

/**
 * Defines the configuration options for the console debug provider
 */
export interface IDbgConsoleConfig {

    /**
     * The maximum log message level, defaults to {@link eDbgLevel.Error}
     */
    lvl: eDbgLevel
}

/**
 * Create and return a IDbgProvider which will log the messages to the current console
 * @param config - The configuration to apply for the console provider
 * @returns A new IDbgProvider instance
 */
export function dbgConsoleProvider(config?: IDbgConsoleConfig): IDbgProvider {
    let console = getInst<Console>("console");
    let funcMap: { [key in eDbgLevel]?: string } = {};
    let maxLevel = (config || {}).lvl;
    if (isUndefined(maxLevel)) {
        maxLevel = eDbgLevel.Error;
    }
    
    function _log(level: eDbgLevel, message: string, data?: any) {
        if (level > eDbgLevel.None && level <= maxLevel) {
            let func = funcMap[level];
            if (!func) {
                arrForEach(levelFuncMap, (map) => {
                    if (level <= map.l) {
                        func = map.f;
                        if (!console[func]) {
                            func = map.b;
                        }
                        return -1;
                    }
                });
    
                func = funcMap[level] = (isFunction(console[func]) ? func : "log");
            }

            console[func] && console[func](message, data && encodeAsJson(data));
        }
    }

    return {
        log: maxLevel ? _log : () => {}
    }
}
