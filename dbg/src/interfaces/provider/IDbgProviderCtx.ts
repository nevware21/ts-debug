/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { IDbgProvider } from "./IDbgProvider";

/**
 * Context returned from adding a provider to allow removal
 */
export interface IDbgProviderCtx {
    /**
     * The provider associated with this context
     */
    p: IDbgProvider;

    /**
     * Remove the provider from the instance
     */
    rm: () => void;
}