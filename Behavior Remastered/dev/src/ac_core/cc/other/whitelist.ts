import cc from "../../../core/lib/cc.js";
import { getPlayer } from "../../lib/misc.js";
import whitelistModule from "../../module/whitelist.js";

cc.create('uac:wl', {
    name: '[UAC] Whitelist',
    description: 'Whitelist someone',
    usage: [
        {
            usage: ['wl', 'add', { name: 'target', type: ['name', 'uid'] }],
            description: 'Adds someone to whitelist.'
        }, {
            usage: ['wl', 'remove', { name: 'target', type: ['name', 'uid'] }],
            description: 'Removes someone from whitelist.'
        }, {
            usage: ['wl', 'list'],
            description: 'Shows whitelist list.'
        }
    ],

    minPermLvl: 80,
    trigger: /^(uac-?)?(wl|whitelist)$/i,
    typedParams: new cc.typedParams(
        {
            sequence: ['add', cc.argumentParser.parseAny],
            execute: ([,plr], { executer }) => {
                whitelistModule.add(plr, executer)
            }
        }, {
            sequence: ['remove', cc.argumentParser.parseAny],
            execute: ([,plr], { executer }) => {
                whitelistModule.remove(plr, executer)
            }
        }, {
            sequence: ['list'],
            execute: ([], { log }) => {
                log([
                    ' ',
                    'Whitelisted players: ',
                    ...Array.from(whitelistModule.uidList, ([uid, v]) => ` §8:§r ${v} §7(§2#${uid}§7)§r`),
                    ...Array.from(whitelistModule.nameList, v => ` §8:§r ${v} §7(<uid unknown>)§r`),
                    ' '
                ])
            }
        }
    )
})