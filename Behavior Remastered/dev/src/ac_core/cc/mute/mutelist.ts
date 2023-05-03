import cc from "../../../core/lib/cc.js";
import { convertToTime } from "../../../core/lib/misc.js";
import chatModule from "../../module/chat.js";

cc.create('uac:mutelist', {
    name: '[UAC] Mute list',
    description: 'Shows muted players list',

    minPermLvl: 60,
    trigger: /^(uac-?)?mute-?list$/i,
    execute: ({log}) => {
        const ctime = Date.now()
        const serveMute = chatModule.data.serverMute
        log([
            ' ',
            `Muted players list:`,
            ...Array.from(chatModule.muteCache.values(), v => ` §8:§r ${v.name} §7(§2#${v.uid}§7)§r - Mod: §d${v.muterName}§r - Type: §a${v.type}§r - Expires: §a${convertToTime(ctime > v.expires ? 0 : v.expires - ctime)}§r \n §8:§r  §8:§r Mute reason: §a${v.reason}§r`),
            ' ',
            `Server mute data:`,
            ` §8:§r Currently muted: ${serveMute.expired ? '§aNo' : '§eYes'}§r`,
            ` §8:§r Moderator: §d${serveMute.muterName}§r`,
            ` §8:§r Expires: §a${convertToTime(serveMute.expired || ctime > serveMute.expires ? 0 : serveMute.expires - ctime)}§r`,
            ` §8:§r Reason: §a${serveMute.reason}§r`,
            ' '
        ])
    }
})