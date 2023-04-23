/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { isUndefined } from "@nevware21/ts-utils";
import { eDbgLevel } from "../dbg/dbgLevel";

/**
 * @internal
 * @ignore
 * Check whether the `level` is within the supported range from
 * greater than {@link eDbgLevel.None} and less than `maxLevel` if
 * defined.
 */
export const _chkLevel = (level: eDbgLevel, maxLevel?: eDbgLevel): boolean => {
    return (level > eDbgLevel.None) && (level <= maxLevel || isUndefined(maxLevel));
};
