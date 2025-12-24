/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import {
    createCustomError, CustomErrorConstructor, objDefineProps, strLetterCase, strLower
} from "@nevware21/ts-utils";
import { isDbgLevelName } from "@nevware21/ts-debug";
import { EMPTY } from "./constants";

export interface DbgLogError extends CustomErrorConstructor {
    new (message: string, component: string): Error;
    (message: string, component: string): Error;

    readonly type: string;
    readonly component: string;
    readonly message: string;
}

/**
 * @internal
 * @ignore
 */
let _logErrors: { [key: string]: DbgLogError } = { };

/**
 * @internal
 * @ignore
 * Throw a custom `DbgLogError` Error instance with the given message.
 * @group Error
 * @param type - Identifies the DbgLevel type, this MUST match a defined type
 * otherwise it will default to Log.
 * @param message - The message to include in the exception
 * @param componentName - Identifies the component name to be associated with
 * the returned error
 * @example
 * ```ts
 * throwLogException("A window is needed for this operation");
 * ```
 */
export function throwLogError(type?: string, message?: string, componentName?: string): never {
    type = isDbgLevelName(type) ? strLetterCase(strLower(type)) : "Log";
    if (!_logErrors[type]) {
        // Lazily create the class
        _logErrors[type] = createCustomError<DbgLogError>(`Dbg${type}Error`, (self, args) => {
            objDefineProps(self, {
                type: { v: type },
                component: { v: (args.length > 1 && args[1]) || EMPTY }
            });
        });
    }

    throw new _logErrors[type](message, componentName);
}
