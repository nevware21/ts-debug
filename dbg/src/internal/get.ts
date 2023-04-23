/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { isUndefined, objHasOwn } from "@nevware21/ts-utils";
import { IDbgContextItems } from "../interfaces/IDbgContextItems";

/**
 * Return the registered command
 * @param parent
 * @param cmds
 * @param name
 * @returns
 */
export const _getValue = <T>(parent: IDbgContextItems<T>, values: { [key: string]: any }, name: string, dfValue: T): T => {
    let value: T = objHasOwn(values, name) ? values[name] : (parent && parent.get(name, dfValue));
    if (isUndefined(value)) {
        value = dfValue;
    }

    return value;
};
