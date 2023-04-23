/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { getLazy, ILazyValue, objDefine, ObjDefinePropDescriptor, ObjDefinePropDescriptorMap, objDefineProps } from "@nevware21/ts-utils";
import { _chkLevel } from "./checkLevel";
import { DbgLevel, eDbgLevel } from "../dbg/dbgLevel";
import { _forEachDbgLevel } from "../dbg/getDbgLevelName";
import { IDbg } from "../interfaces/IDbg";
import { DbgLogFunc, IDbgLog } from "../interfaces/log/IDbgLog";
import { IDbgLogCtx } from "../interfaces/log/IDbgLogCtx";
import { IDbgProvider } from "../interfaces/provider/IDbgProvider";

/**
 * @internal
 * @ignore
 * Internal function to create a specific {@link DbgLogFunc} level function
 * @param dbg - The current {@link IDbg} instance
 * @param level - The logging level for this {@link DbgLogFunc} instance
 * @param dbgName - The debug level instance name
 * @returns A new DbgLogFunc instance
 */
const _dbgLog = (dbg: IDbg, level: DbgLevel, dbgName: ILazyValue<string>): ObjDefinePropDescriptor => {
    return {
        l: getLazy<DbgLogFunc>(() => {
            let logCtx: IDbgLogCtx = {
                name: null,
                lvl: level,
                usr: dbg.usr
            };

            objDefine(logCtx, "name", {
                l: dbgName
            });

            // Flag used to detect whether this logging function
            // is being called recursively
            let recursionDetect = false;
            return (message: string, data?: any) => {
                if (_chkLevel(level, dbg.lvl)) {
                    if (!recursionDetect) {
                        recursionDetect = true;
                        let errors: Error[];
                        try {
                            dbg.each((provider: IDbgProvider) => {
                                provider && provider.log(logCtx, message, data);
                            }, (provider: IDbgProvider, error: Error) => {
                                if (!errors) {
                                    errors = [];
                                }
                                errors.push(error);
                            });
                        } finally {
                            recursionDetect = false;
                        }
                        if (errors) {
                            throw errors[0];
                        }
                    } else if(level !== eDbgLevel.Error) {
                        dbg.log.error("[Log Recursion]: " + message, data);
                    }
                }
            }
        })
    };
}

/**
 * @internal
 * @ignore
 * Create a new {@link IDbgLog} instance for the {@link IDbg} instance with the dbgName
 * @param dbg - The current {@link IDbg} instance to create a log instance
 * @param dbgName - The name to associated with the instance
 * @returns A new {@link IDbgLog} instance
 */
export const _createDbgLog = (dbg: IDbg, dbgName: ILazyValue<string>) => {
    let dbgLog: IDbgLog = { } as IDbgLog;
    let props: ObjDefinePropDescriptorMap = {};

    // Populate the functions
    _forEachDbgLevel((name: string, level: DbgLevel) => {
        props[name] = _dbgLog(dbg, level, dbgName);
    });

    // Now define the functions
    objDefineProps(dbgLog, props);

    return dbgLog;
}