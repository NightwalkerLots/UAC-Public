import './lib/mc_compability.js';
import './test.js';
import cc from "./lib/cc.js";
import chat from "./lib/chat.js";
import server from "./lib/server.js";
import { compability } from './lib/compability.js';
import './cc/index.js';
import './config/_icl.js';
import { Player, system } from '@minecraft/server';
import { cse_command_max_level, enable_cross_scripting_execution } from './config/other.js';
server.addEventListener('beforeChat', evd => {
    if (evd.cancel)
        return;
    const { sender: plr, message } = evd;
    if (message.startsWith(cc.prefix)) {
        cc.execute(plr, message);
    }
    else {
        const cevd = chat.send(plr, message, !compability.disableMessageCancel, compability.integrateMessageTargets && evd.sendToTargets ? evd.targets : undefined);
        if (compability.disableMessageCancel) {
            evd.targets = cevd.cancel ? [] : cevd.targets;
            evd.sendToTargets = true;
            return;
        }
    }
    evd.cancel = true;
    evd.message = '';
    evd.targets = [];
    evd.sendToTargets = true;
});
system.events.beforeWatchdogTerminate.subscribe(evd => evd.cancel = true);
if (enable_cross_scripting_execution)
    system.events.scriptEventReceive.subscribe(({ id, message, sourceEntity, initiator = sourceEntity }) => {
        if (!(initiator instanceof Player))
            return;
        switch (id) {
            case 'uacx:command':
                {
                    cc.execute(initiator, cc.prefix + message, {}, cse_command_max_level);
                }
                break;
            case 'uacx:chat':
                {
                    chat.send(initiator, message);
                }
                break;
        }
    }, { namespaces: ['uacx'] });
