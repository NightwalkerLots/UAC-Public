import cc from "../../../core/lib/cc.js";
import { convertLocationType } from "../../../core/lib/misc.js";
import freezeModule from "../../module/freeze.js";

cc.create('uac:freezelist', {
    name: 'Freeze List',
    description: 'Shows frozen player list.',

    minPermLvl: 60,
    trigger: /^freeze-?list$/i,
    execute: ({ log }) => {
        log([
            ' ',
            'Frozen players list:',
            ...Array.from(freezeModule.list.values(), ({name, uid, dim, loc}) => ` §8:§r ${name} §7(§2#${uid}§7)§r §8-§r ${dim} ${convertLocationType('Array', loc).map(v => `§a${v.toFixed(1)}§r`).join(', ')}`),
            ' ',
        ])
    }
})
