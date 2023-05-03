import cc from "../../../core/lib/cc.js";
import message from "../../../core/lib/message.js";
import logModule from "../../module/log.js";
cc.create('uac:warn', {
    name: 'Warn',
    description: 'Warns someone',
    usage: [
        {
            usage: ['warn', { name: 'target', type: 'player' }, { name: 'message', type: 'any' }]
        }
    ],
    minPermLvl: 40,
    trigger: /^warn$/i,
    typedParams: new cc.typedParams({
        sequence: ['warn', cc.argumentParser.parseSelector],
        rest: cc.argumentParser.parseAny,
        execute: async ([, slc, ...msgStr], { executer, log }) => {
            const [tgt] = await slc(executer);
            const msg = msgStr.join(' ');
            logModule.push({
                timestamp: Date.now(),
                type: 'action',
                modName: executer.name,
                modUid: executer.uidStr,
                name: tgt.name,
                uid: tgt.uidStr,
                reason: msg,
                action: 'warn',
                actionDuration: 0
            });
            message.sendMsgToAdmins(40, `§3[§bUAC§3]§r §d${executer.name}§r §ewarned§r §d${tgt.name}§r §7(§2#${tgt.uidStr}§7)§r: ${msg}`, [executer]);
            tgt.sendMsg(`§gYou have been warned!§r §e${msg}`);
            log(`Warned §d${tgt.name}§r §7(§2#${tgt.uidStr}§7)§r: ${msg}`);
        }
    })
});
