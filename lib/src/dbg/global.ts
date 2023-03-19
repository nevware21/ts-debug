/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { IDbg } from "../interfaces/IDbg";
import { eDbgLevel } from "./dbgLevel";

export function createDbg() {

    function _dbgLog(level: eDbgLevel): (message: string, data?: any) => void {
        return (message: string, data?: any) => {
            dbg.provider && dbg.provider.log(level, message, data);
        }
    }

    function _createDbgLog() {
        return {
            terminal: _dbgLog(eDbgLevel.Terminal),
            critical: _dbgLog(eDbgLevel.Critical),
            error: _dbgLog(eDbgLevel.Error),
            warn: _dbgLog(eDbgLevel.Warning),
            info: _dbgLog(eDbgLevel.Information),
            debug: _dbgLog(eDbgLevel.Debug),
            trace: _dbgLog(eDbgLevel.Trace)
        }
    }

    let dbg: IDbg = {
        provider: null,
        log: _createDbgLog()
    };

    return dbg;
}

/**
 * A singleton debug instance which is available for the entire runtime within its
 * scope.
 */
export const $Dbg: IDbg = createDbg();