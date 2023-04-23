/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { IDbgLogCtx } from "@nevware21/ts-debug";
import { EMPTY } from "./constants";

export const _formatName = (ctx: IDbgLogCtx, trail: boolean) => {
    let theName = ctx && ctx.name;

    return theName ? "[" + theName + "]" + (trail ? ": " : EMPTY) : EMPTY;
}
