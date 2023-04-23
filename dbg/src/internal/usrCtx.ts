/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { objDeepCopy, objHasOwn } from "@nevware21/ts-utils";
import { DbgContextValues } from "../interfaces/IDbgConfig";
import { IDbgUsrCtx } from "../interfaces/IDbgUsrCtx";
import { _getValue } from "./get";
import { _doEach } from "./each";

/**
 * @internal
 * @ignore
 * Internal function to create a {@link IDbgUsrCtx} instance
 * @param usr - The current instance user context values
 * @param parent - The parent user context values
 * @returns A new IDbgUsrCtx instance
 */
export const _createUsrCtx = (_usr?: DbgContextValues, parent?: IDbgUsrCtx): IDbgUsrCtx => {
    // Mark as referenced so we don't alter the original values passed in
    let referenced = true;
    let values = _usr || {};
    
    let usrCtx: IDbgUsrCtx = {
        get: <T>(name: string, dfValue?: T): T => _getValue(parent, values, name, dfValue),
        has: (name: string): boolean => objHasOwn(values, name) || !!(parent && parent.has(name)),
        set: <T>(name: string, value: T) => {
            if (referenced) {
                values = objDeepCopy(values);
                referenced = false;
            }

            values[name] = value;
        },
        rm: (name: string) => {
            if (referenced && objHasOwn(values, name)) {
                values = objDeepCopy(values);
                referenced = false;
            }

            delete values[name];
        },
        each: (cb: (name: string, value: any) => void) => _doEach(parent, values, cb),
        cpy: () => {
            referenced = true;
            return _createUsrCtx(values, parent && parent.cpy());
        }
    };

    return usrCtx;
}