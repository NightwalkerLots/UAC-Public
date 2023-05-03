import { Entity, ScoreboardIdentity, world } from "@minecraft/server";
import { asyncExecCmd } from "./mc.js";
import { wrapString } from "./misc.js";
export function createFormatter(format, lccl) {
    let fnList = new Proxy(Object.create(null), { has: () => true });
    let fnIndex = 0;
    let out = '', lastIndex = 0;
    for (const { 0: match = '', 2: command = '', index = 0 } of format.matchAll(formatterEscapeRegex)) {
        const fnKey = '_' + (fnIndex++).toString(36);
        fnList[fnKey] = lccl.compile(command);
        out += format.substring(lastIndex, index).replace(/[\\\$`]/g, '\\$&') + `\${${fnKey}(...args)}`;
        lastIndex = index + match.length;
    }
    // add leftover & fix escape
    out += format.substring(lastIndex).replace(/[\\\$`]/g, '\\$&');
    out = out.replace(/\\\\((!+)\<(.*?)\>\2)/g, '$1');
    return wrapString(Function('obj', `with (obj) return (...args) => \`${out}\``)(fnList), format);
}
export const formatterEscapeRegex = /(?<!\\)(!+)\<(.*?)\>\1/g;
export function setScore(data, sb, score) {
    const sbObj = typeof sb === 'string' ? world.scoreboard.getObjective(sb) : sb;
    if (!sbObj)
        return;
    const sbId = data instanceof Entity ? data.scoreboard : data instanceof ScoreboardIdentity ? data : undefined;
    if (sbId)
        sbId.setScore(sbObj, score);
    else {
        const sbStr = JSON.stringify(sbObj.id);
        if (data instanceof Entity)
            asyncExecCmd(`scoreboard players set @s ${sbStr} ${score}`, data);
        else
            asyncExecCmd(`scoreboard players set ${JSON.stringify(data)} ${sbStr} ${score}`);
    }
}
