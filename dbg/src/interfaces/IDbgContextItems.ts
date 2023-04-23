/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

/**
 * The generic context used for passing
 */
export interface IDbgContextItems<T> {
    /**
     * Return the named context value from this instance or it's parent if present.
     * @param name - The name of the value to return
     * @param dfValue - If the named values does not exist in this instance or it's
     * parent then return this value. The default will not be returned even if the
     * value for the key is undefined or null.
     * @returns The value contained in the context or the default
     */
    get: (name: string, dfValue?: T) => T;

    /**
     * Return whether the named context value is available from this instance ir it's
     * parent.
     * @param name - The name of the value to check if it's available
     * @returns `true` if it's present otherwise `false`
     */
    has: (name: string) => boolean;

    /**
     * For each key defined for the current context (and it's parent) call the provided
     * callback function with each key name and it's value. This will only call the callback
     * function once for each name even when the same name is presen in the current instance
     * and it's parent.
     * @param cb - The callback function to call
     */
    each: (cb: (name: string, value: T) => void) => void;
}
