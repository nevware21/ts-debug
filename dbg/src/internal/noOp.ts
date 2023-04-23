/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

/**
 * @internal
 * @ignore
 * Simple reused function to assign as a no-op after removing a provider or
 * returning if the provider is already present
 */
export const noOpFunc = () => {};