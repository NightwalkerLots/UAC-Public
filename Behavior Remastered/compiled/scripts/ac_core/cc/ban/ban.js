import cc from "../../../core/lib/cc.js";
import { getPlayer } from "../../lib/misc.js";
import banModule from "../../module/ban.js";
cc.create('uac:ban', {
    name: '[UAC] Ban',
    description: 'Bans someone',
    usage: [
        { usage: ['ban', { name: 'target', type: ['name', 'uid'] }, { name: 'duration', type: 'TimeFormat' }, { name: 'reason...', type: 'any' }] },
        { usage: ['ban', { name: 'target', type: ['name', 'uid'] }, { name: 'reason...', type: 'any' }] },
    ],
    minPermLvl: 60,
    trigger: /^(uac-?)?ban$/i,
    typedParams: new cc.typedParams({
        // normal ban - duration
        // ban <player> <duration> <reason...>
        sequence: [cc.argumentParser.parseAny, cc.argumentParser.parseTime],
        rest: cc.argumentParser.parseAny,
        execute: ([plr, duration, ...reason], vars) => {
            vars.plr = plr;
            vars.reason = reason.join(' ') || 'No reason';
            vars.duration = duration;
        }
    }, {
        // normal ban - no duration
        // ban <player> <reason...>
        sequence: [cc.argumentParser.parseAny],
        rest: cc.argumentParser.parseAny,
        execute: ([plr, ...reason], vars) => {
            vars.plr = plr;
            vars.reason = reason.join(' ') || 'No reason';
        }
    }),
    execute: ({ executer, plr, reason, duration = Infinity }) => {
        const plrId = getPlayer(plr);
        if (!plrId)
            throw new Error(`Player not found: '${plr}' \nThis player is not online and not registered on UAC Player Index.`);
        banModule.ban(plrId, executer, reason, duration);
    }
});
