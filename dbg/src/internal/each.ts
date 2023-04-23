/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { objForEachKey } from "@nevware21/ts-utils";
import { IDbgContextItems } from "../interfaces/IDbgContextItems";

/**
 * @internal
 * @ignore
 * Call the provider for each registered provider.
 * @param parent - The parent IDbg instance
 * @param values - The object containing the named values for this instance
 * @param callback - The callback function to call with the provider
 * @param handleError - A callback function to call when an exception is thrown for a provider
 */
export const _doEach = <T>(parent: IDbgContextItems<T>, values: { [name: string]: T },
    callback: (name: string, dbgCtx: T) => void) => {

    let done: { [key: string]: boolean } = {};
    objForEachKey(values, (name, value) => {
        done[name] = true;
        callback(name, value);
    });

    // Find and process all parent keys that we haven't processed
    parent && parent.each((name, value) => {
        if (!done[name]) {
            done[name] = true;
            callback(name, value);
        }
    });
};
