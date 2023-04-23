/*
 * @nevware21/ts-debug
 * https://github.com/nevware21/ts-debug
 *
 * Copyright (c) 2023 Nevware21
 * Licensed under the MIT license.
 */

import { asString, getLength, strEndsWith, strStartsWith, strSubstring, strTrim } from "@nevware21/ts-utils";


export interface IParsedArgs {
    cmd: string;
    args: any[];
    res?: any;
}

function _addArg(cmds: IParsedArgs[], theCmd: IParsedArgs, token: string, lastToken: string) {
    if(token) {
        if(!theCmd) {
            let len = getLength(token);
            // Unquote
            if (len > 1 && strStartsWith(token, "\"") && strEndsWith(token, "\"")) {
                token = strSubstring(token, 1, len-1);
            }

            theCmd = {
                cmd: token,
                args: []
            }
            cmds.push(theCmd);
        } else {
            theCmd.args.push(token);
        }
    } else if (theCmd && lastToken === ",") {
        theCmd.args.push(undefined);
    }

    return theCmd;
}

export const _parseCmdLine = (theCmdLine: string): IParsedArgs[] => {
    let cmds: IParsedArgs[] = [];
    let startAt = 0;
    let inEscape = false;
    let idx = 0;
    let quoteCh;
    let inBrackets = 0;
    let lastToken;
    let theCmd: IParsedArgs;

    if (theCmdLine) {
        let cmdLine = strTrim(asString(theCmdLine));
        let len = getLength(cmdLine);

        while (idx < len) {
            let addArg = false;
            let ch = cmdLine[idx++];
            if (!quoteCh) {
                if (!inBrackets) {
                    if (ch === "\"" || ch === "'") {
                        quoteCh = ch;
                    } else if (ch === " ") {
                        addArg = true;
                    } else if (ch === "(") {
                        inBrackets ++;
                        addArg = true;
                    } else if (ch === ";") {
                        theCmd = null;
                        addArg = true;
                    }
                } else {
                    if (ch === ",") {
                        addArg = true;
                    } else if (ch === "(") {
                        inBrackets ++;
                    } else if (ch === ")") {
                        inBrackets --;
                        if (!inBrackets) {
                            addArg = true;
                        }
                    }
                }
            } else {
                // inQuote
                if (!inEscape) {
                    if (ch === quoteCh) {
                        quoteCh = null;
                        theCmd = _addArg(cmds, theCmd, strTrim(strSubstring(cmdLine, startAt, idx)), lastToken);
                        startAt = idx;
                    } else if (ch === "\\") {
                        inEscape = true;
                    }
                } else {
                    inEscape = false;
                }
            }

            if (addArg) {
                theCmd = _addArg(cmds, theCmd, strTrim(strSubstring(cmdLine, startAt, idx-1)), lastToken);
                startAt = idx;
                lastToken = ch;
            }
        }
    
        if (idx !== startAt) {
            _addArg(cmds, theCmd, strTrim(strSubstring(cmdLine, startAt)), lastToken);
        }
    }

    return cmds;
};
