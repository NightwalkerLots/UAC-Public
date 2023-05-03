import cc from "../../../core/lib/cc.js";
import { getPlayer } from "../../lib/misc.js";
import chatModule from "../../module/chat.js";
cc.create('uac:unmute', {
    name: '[UAC] Unmute',
    description: 'Unmutes someone',
    usage: [{ usage: ['unmute', { name: 'target', type: ['name', 'uid'] }, { name: 'reason...', type: 'any' }] }],
    minPermLvl: 60,
    trigger: /^(uac-?)?unmute$/i,
    typedParams: new cc.typedParams({
        sequence: [cc.argumentParser.parseAny],
        rest: cc.argumentParser.parseAny,
        execute: ([plr, ...reasonArr], { executer }) => {
            const plrId = getPlayer(plr);
            if (!plrId)
                throw new Error(`Player not found: '${plr}' \nThis player is not online and not registered on UAC Player Index.`);
            const reason = reasonArr.join(' ') || 'No reason';
            chatModule.unmute(plrId, executer, reason);
        }
    }),
});
