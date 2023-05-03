import { Player } from '@minecraft/server';
import message from '../core/lib/message.js';
import module from './lib/module.js';
import './module/index.js';
import './cc/index.js';
import './config/_icl.js';
import './test.js';
import './dev.js';
module.events.addEventListener('enable', ({ executer, module }) => {
    const plr = executer instanceof Player ? executer : undefined;
    const name = plr?.name ?? executer;
    message.sendMsgToAdmins(60, `§3[§bUAC§3]§r Module §e${module.name}§r has been §aenabled§r by §d${name}§r.`, plr ? [plr] : []);
    if (plr)
        plr.tell(`Module §e${module.name}§r has been §aenabled§r.`);
});
module.events.addEventListener('disable', ({ executer, module }) => {
    const plr = executer instanceof Player ? executer : undefined;
    const name = plr?.name ?? executer;
    message.sendMsgToAdmins(60, `§3[§bUAC§3]§r Module §e${module.name}§r has been §cdisabled§r by §d${name}§r.`, plr ? [plr] : []);
    if (plr)
        plr.tell(`Module §e${module.name}§r has been §cdisabled§r.`);
});
