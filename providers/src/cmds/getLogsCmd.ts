/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */


import { arrAppend, isArray } from "@nevware21/ts-utils";
import { IDbg, IDbgCmdContext } from "@nevware21/ts-debug";
import { IDbgMemoryLog } from "../interfaces/IDbgMemoryLog";

const GET_LOGS = "getLogs";

/**
 * Add the `:getLogs` command to the provided instance
 * @param dbg - The dbg instance
 * @returns An array of {@link IDbgMemoryLog} entries from any available installed
 * {@link IDbgMemoryProvider} provider.
 */
export const addGetLogsCmd = (dbg: IDbg) => {
    return dbg.cmds.add(":getLogs", {
        desc: "getLogs command",
        exec: (context: IDbgCmdContext) => {
            let dbg = context.dbg;
            let entries: IDbgMemoryLog[] = [];
    
            dbg.each((provider) => {
                if (provider[GET_LOGS]) {
                    let theLogs = provider[GET_LOGS]();
                    if (isArray(theLogs)) {
                        arrAppend(entries, theLogs);
                    }
                }
            });
        
            return entries;
        }
    });
}