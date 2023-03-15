import { tellrawServer, TellRB } from 'library/utils/prototype.js';

function opCheck(player) {
    const name = player.getName();
    if(!player.isOp() && player.hasTag(`staffstatus`)) {
        player.removeTag(`staffstatus`);
        tellrawServer(`§l§¶§cUAC §6SYSTEM ► §bstaffstatus removed from §d${name} §bbecause they are not operator`);
        TellRB('flag_1', `UAC SYSTEM ► staffstatus removed from ${name} because they are not operator.`);
    }
}

export { opCheck }