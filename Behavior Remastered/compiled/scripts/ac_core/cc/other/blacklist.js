import cc from "../../../core/lib/cc.js";
import { getPlayer } from "../../lib/misc.js";
import blacklistModule from "../../module/blacklist.js";
cc.create('uac:bl', {
    name: '[UAC] Blacklist',
    description: 'Blaclists someone',
    usage: [
        {
            usage: ['bl', 'add', { name: 'target', type: ['name', 'uid'] }, { name: 'reason...', type: 'any' }],
            description: 'Adds someone to blacklist.'
        }, {
            usage: ['bl', 'remove', { name: 'target', type: ['name', 'uid'] }, { name: 'reason...', type: 'any' }],
            description: 'Removes someone from blacklist.'
        }, {
            usage: ['bl', 'list'],
            description: 'Shows blacklist list.'
        }
    ],
    minPermLvl: 80,
    trigger: /^(uac-?)?(bl|blacklist)$/i,
    typedParams: new cc.typedParams({
        sequence: ['add', cc.argumentParser.parseAny],
        rest: cc.argumentParser.parseAny,
        execute: ([, plr, ...reason], { executer }) => {
            const plrId = getPlayer(plr);
            if (!plrId)
                throw new Error(`Player not found: '${plr}' \nThis player is not online and not registered on UAC Player Index.`);
            blacklistModule.add(plrId, executer, reason.join(' ') || 'No reason');
        }
    }, {
        sequence: ['remove', cc.argumentParser.parseAny],
        rest: cc.argumentParser.parseAny,
        execute: ([, plr, ...reason], { executer }) => {
            const plrId = getPlayer(plr);
            if (!plrId)
                throw new Error(`Player not found: '${plr}' \nThis player is not online and not registered on UAC Player Index.`);
            blacklistModule.remove(plrId, executer, reason.join(' ') || 'No reason');
        }
    }, {
        sequence: ['list'],
        execute: ([], { log }) => {
            log([
                ' ',
                'Blacklisted players: ',
                ...Array.from(blacklistModule.list.values(), v => ` §8:§r ${v.name} §7(§2#${v.uid}§7)§r - Mod: §d${v.modName}§r - Mute reason: §a${v.reason}§r`), ,
                ' '
            ]);
        }
    })
});
