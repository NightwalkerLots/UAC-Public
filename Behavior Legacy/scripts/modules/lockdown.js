import { tellrawServer } from '../library/utils/prototype.js';

function lockdown(player) {
    if(!player.isOp()) {
        try{  
            tellrawServer(`§¶§c§lUAC ► §6Lockdown §d${player.nameTag} §bwas denied from joining due to lockdown.`);
            player.runCommandAsync(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lRealm Locked to Staff Only`); 
        }
        catch{ player.runCommandAsync(`event entity @s uac:ban_soft`); }
    }
}

export { lockdown }