import cc from "../../../core/lib/cc.js";
import chatModule from "../../module/chat.js";

cc.create('uac:serverunmute', {
    name: '[UAC] Server Unmute',
    description: 'Unmutes server',
    usage: [ { usage: ['serverunmute', { name: 'reason...', type: 'any' }] } ],

    minPermLvl: 80,
    trigger: /^(uac-?)?server-?unmute$/i,
    typedParams: new cc.typedParams(
        {
            sequence: [],
            rest: cc.argumentParser.parseAny,
            execute: (reasonArr, { executer }) => {
                const reason = reasonArr.join(' ') || 'No reason'
        
                chatModule.serverUnmute(executer, reason)
            }
        }
    ),
})
