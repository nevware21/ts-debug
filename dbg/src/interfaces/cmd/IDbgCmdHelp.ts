/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

export type DbgCmdArgHelp = { [cmdName: string]: IDbgCmdHelp };

export interface IDbgCmdHelp {
    optional?: boolean;
    desc: string;
}
