/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { arrFindIndex, arrForEach, strLetterCase, strLower } from "@nevware21/ts-utils";
import { IDbgLog } from "../interfaces/log/IDbgLog";
import { EMPTY } from "../internal/constants";
import { DbgLevel, eDbgLevel } from "./dbgLevel";

const _levelNameMap: Array<{ l: number, n: keyof IDbgLog }> = [
    { l: eDbgLevel.Terminal, n: "terminal" },
    { l: eDbgLevel.Critical, n: "critical" },
    { l: eDbgLevel.Error, n: "error" },
    { l: eDbgLevel.Warning, n: "warn" },
    { l: eDbgLevel.Information, n: "info" },
    { l: eDbgLevel.Debug, n: "debug" },
    { l: eDbgLevel.Trace, n: "trace" },
    { l: eDbgLevel.Verbose, n: "verbose" }
];

let _levelNameCache: { [key: number]: string } = { };

/**
 * @internal
 * @ignore
 * For each defined level call the callback with the name and {@link eDbgLevel}
 * value.
 * @param cb - THe callback function to call with each level
 */
export const _forEachDbgLevel = (cb: (name: string, level: eDbgLevel) => void) => {
    arrForEach(_levelNameMap, (map) => {
        cb(map.n, map.l);
    });
}

/**
 * Identifies whether the provided name matches an defined DbgLevel name
 * @param name - The name to match
 * @returns true if the name matches a DbgLevel name otherwise false
 */
export const isDbgLevelName = (name: string): boolean => {
    name = strLower(name || EMPTY);
    return name && arrFindIndex(_levelNameMap, (map) => {
        return map.n === name;
    }) !== -1;
};

/**
 * Get the classification name for the error level provided
 * @param theLevel
 * @returns
 */
export const getDbgLevelName = (theLevel: DbgLevel): string => {
    let lvlName = _levelNameCache[theLevel];
    if (!lvlName) {
        lvlName = "None";
        if (theLevel > 0) {
            lvlName = "Other";

            let idx = 0;
            do {
                lvlName = strLetterCase(_levelNameMap[idx].n);
            } while (_levelNameMap[idx++].l < theLevel && idx < _levelNameMap.length);

            _levelNameCache[theLevel] = lvlName;
        }
    }

    return lvlName;
}
