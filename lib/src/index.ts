/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

export { IDbg} from "./interfaces/IDbg";
export { IDbgLog} from "./interfaces/IDbgLog";
export { IDbgProvider} from "./interfaces/IDbgProvider";
export { IDbgConsoleConfig, dbgConsoleProvider } from "./dbg/dbgConsoleProvider";
export { $dbgCritical, $dbgError, $dbgInfo, $dbgLog, $dbgTerminal, $dbgTrace, $dbgWarn } from "./dbg/dbgFuncs";
export { eDbgLevel } from "./dbg/dbgLevel";
export { $Dbg, createDbg } from "./dbg/global";