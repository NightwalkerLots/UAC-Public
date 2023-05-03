import cc from "../../../core/lib/cc.js";
import chatModule from "../../module/chat.js";
cc.create('uac:servermute', {
    name: '[UAC] Server Mute',
    description: 'Mutes server',
    usage: [
        { usage: ['servermute', { name: 'type', keyword: ['normal', 'hard'] }, { name: 'duration', type: 'TimeFormat' }, { name: 'reason...', type: 'any' }] },
        { usage: ['servermute', { name: 'type', keyword: ['normal', 'hard'] }, { name: 'reason...', type: 'any' }] },
        { usage: ['servermute', { name: 'duration', type: 'TimeFormat' }, { name: 'reason...', type: 'any' }] },
        { usage: ['servermute', { name: 'reason...', type: 'any' }] },
    ],
    minPermLvl: 80,
    trigger: /^(uac-?)?server-?mute$/i,
    typedParams: new cc.typedParams({
        // advanced mute - duration
        // mute <duration> <type> <reason...>
        sequence: [cc.argumentParser.parseTime, ['normal', 'shadow', 'hard']],
        rest: cc.argumentParser.parseAny,
        execute: ([duration, type, ...reason], vars) => {
            vars.reason = reason.join(' ') || 'No reason';
            vars.type = type;
            vars.duration = duration;
        }
    }, {
        // advanced mute - no duration
        // mute <type> <reason...>
        sequence: [['normal', 'shadow', 'hard']],
        rest: cc.argumentParser.parseAny,
        execute: ([type, ...reason], vars) => {
            vars.reason = reason.join(' ') || 'No reason';
            vars.type = type;
        }
    }, {
        // normal mute - duration
        // mute <duration> <reason...>
        sequence: [cc.argumentParser.parseTime],
        rest: cc.argumentParser.parseAny,
        execute: ([duration, ...reason], vars) => {
            vars.reason = reason.join(' ') || 'No reason';
            vars.duration = duration;
        }
    }, {
        // normal mute - no duration
        // mute <reason...>
        sequence: [],
        rest: cc.argumentParser.parseAny,
        execute: ([...reason], vars) => {
            vars.reason = reason.join(' ') || 'No reason';
        }
    }),
    execute: ({ executer, reason, duration = Infinity, type = 'normal' }) => {
        chatModule.serverMute(executer, reason, duration, type);
    }
});
