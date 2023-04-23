/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { IDbgContextItems } from "./IDbgContextItems";

/**
 * The Debug user context used for passing user provided context
 * to log records
 */
export interface IDbgUsrCtx extends IDbgContextItems<any> {

    /**
     * Set the named value against the current context, this will replace any value
     * within this instance. If the same key is present in the parent instance the
     * value returned by the parent it not altered.
     *
     * Even if the value set is undefined / null this will still be used as an override
     * for any parent and will be deemed to be present (so the default value for get would
     * not be returned)
     * @param name - The key of the value to set
     * @param value - The value to set for the given name
     */
    set: <T>(name: string, value: T) => void;

    /**
     * Remove this named value from the context, this will cause any value from the parent
     * to be returned again (if present) and the default value may be returned by get.
     * @param name - The key of the value to remove
     */
    rm: (name: string) => void;

    /**
     * Return a copy of the current instance so that any changes to the current instance
     * would not be reflected in the returned copy. The copy will contain references to the
     * current instance keys and values, and the existing instance will also contain references
     * the same values up until the current instance attempts to change it's current state by
     * calling `set`() or `rm`() at which point a lazy `objDeepCopy` will be performed.
     *
     * So if/when the referenced values are mutable values (object/array etc) any direct
     * changes to the value will be reflected on all references. The `objDeepCopy()` does not
     * clone classes.
     * @returns A new IDbgUsrCtx instance
     */
    cpy: () => IDbgUsrCtx;
}