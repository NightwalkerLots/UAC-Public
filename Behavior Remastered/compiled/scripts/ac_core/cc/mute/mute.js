import cc from "../../../core/lib/cc.js";
import { getPlayer } from "../../lib/misc.js";
import chatModule from "../../module/chat.js";
cc.create('uac:mute', {
    name: '[UAC] Mute',
    description: 'Mutes someone',
    usage: [
        { usage: ['mute', { name: 'target', type: ['name', 'uid'] }, { name: 'type', keyword: ['normal', 'shadow', 'hard'] }, { name: 'duration', type: 'TimeFormat' }, { name: 'reason...', type: 'any' }] },
        { usage: ['mute', { name: 'target', type: ['name', 'uid'] }, { name: 'type', keyword: ['normal', 'shadow', 'hard'] }, { name: 'reason...', type: 'any' }] },
        { usage: ['mute', { name: 'target', type: ['name', 'uid'] }, { name: 'duration', type: 'TimeFormat' }, { name: 'reason...', type: 'any' }] },
        { usage: ['mute', { name: 'target', type: ['name', 'uid'] }, { name: 'reason...', type: 'any' }] },
    ],
    minPermLvl: 60,
    trigger: /^(uac-?)?mute$/i,
    typedParams: new cc.typedParams({
        // advanced mute - duration
        // mute <player> <duration> <type> <reason...>
        sequence: [cc.argumentParser.parseAny, cc.argumentParser.parseTime, ['normal', 'shadow', 'hard']],
        rest: cc.argumentParser.parseAny,
        execute: ([plr, duration, type, ...reason], vars) => {
            vars.plr = plr;
            vars.reason = reason.join(' ') || 'No reason';
            vars.type = type;
            vars.duration = duration;
        }
    }, {
        // advanced mute - no duration
        // mute <player> <type> <reason...>
        sequence: [cc.argumentParser.parseAny, ['normal', 'shadow', 'hard']],
        rest: cc.argumentParser.parseAny,
        execute: ([plr, type, ...reason], vars) => {
            vars.plr = plr;
            vars.reason = reason.join(' ') || 'No reason';
            vars.type = type;
        }
    }, {
        // normal mute - duration
        // mute <player> <duration> <reason...>
        sequence: [cc.argumentParser.parseAny, cc.argumentParser.parseTime],
        rest: cc.argumentParser.parseAny,
        execute: ([plr, duration, ...reason], vars) => {
            vars.plr = plr;
            vars.reason = reason.join(' ') || 'No reason';
            vars.duration = duration;
        }
    }, {
        // normal mute - no duration
        // mute <player> <reason...>
        sequence: [cc.argumentParser.parseAny],
        rest: cc.argumentParser.parseAny,
        execute: ([plr, ...reason], vars) => {
            vars.plr = plr;
            vars.reason = reason.join(' ') || 'No reason';
        }
    }),
    execute: ({ executer, plr, reason, duration = Infinity, type = 'normal' }) => {
        const plrId = getPlayer(plr);
        if (!plrId)
            throw new Error(`Player not found: '${plr}' \nThis player is not online and not registered on UAC Player Index.`);
        chatModule.mute(plrId, executer, reason, duration, type);
    }
});
