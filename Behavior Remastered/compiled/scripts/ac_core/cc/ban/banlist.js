import cc from "../../../core/lib/cc.js";
import { convertToTime } from "../../../core/lib/misc.js";
import banModule from "../../module/ban.js";
cc.create('uac:banlist', {
    name: '[UAC] Ban list',
    description: 'Shows banned players list',
    minPermLvl: 60,
    trigger: /^(uac-?)?ban-?list$/i,
    execute: ({ log }) => {
        const ctime = Date.now();
        log([
            ' ',
            `Band players list:`,
            ...Array.from(banModule.list.values(), v => ` §8:§r ${v.name} §7(§2#${v.uid}§7)§r - Mod: §d${v.modName}§r - Expires: §a${convertToTime(ctime > v.expires ? 0 : v.expires - ctime)}§r \n §8:§r  §8:§r Ban reason: §a${v.reason}§r`),
            ' ',
        ]);
    }
});
