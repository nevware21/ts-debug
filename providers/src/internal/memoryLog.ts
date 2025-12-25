/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { IDbgLogCtx } from "@nevware21/ts-debug";
import { getLazy, objDefineProps } from "@nevware21/ts-utils";
import { IDbgMemoryLog } from "../interfaces/IDbgMemoryLog";
import { _formatName } from "./format";

export const _createMemoryLog = (ctx: IDbgLogCtx, message: string, data?: any) => {
    let usrCtx = ctx && ctx.usr && ctx.usr.cpy();
    return objDefineProps({} as IDbgMemoryLog, {
        t: { v: new Date(), w: false },
        name: { l: getLazy(() => _formatName(ctx, false)) },
        lvl: { v: ctx.lvl, w: false},
        message: { v: message, w: false },
        data: { v: data, w: false },
        usr: { l: getLazy(() => {
            let values: any = {};
            usrCtx && usrCtx.each((name, value) => {
                values[name] = value;
            });

            return values;
        })}
    });
}