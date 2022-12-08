import { tellrawServer} from 'library/utils/prototype.js';
import { scoreTest } from '../library/utils/score_testing';
import { world } from '@minecraft/server';
import { asyncExecCmd } from '../library/utils/cmd_queue'
const overworld = world.getDimension('overworld');


function playerbans(player) {
    const name = player.getName();
    let ban_reason = (`${ player.getTags().find((tag) => tag.startsWith("reason_")).replace('reason_', '').replace('_', ' ') }`);
    try {
        if(player.hasTag('PermBan')) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cUAC Global Banned`);
            try{  asyncExecCmd(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUAC Global Banned`, player); }
            catch{ asyncExecCmd(`event entity @s uac:ban_main`, player); }
        }
        if(player.hasTag('BanCBE')) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cCBE Ban`);
            try{  asyncExecCmd(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCBE Ban`); }
            catch{ asyncExecCmd(`event entity @s uac:ban_main`, player); 
        }
        }
        if(player.hasTag('BanCreative')) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cCreative Mode Ban`);
            try{  asyncExecCmd(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCreative Mode Ban`, player); }
            catch{ asyncExecCmd(`event entity @s uac:ban_main`, player); }  
        }
        if(player.hasTag('Ban') || scoreTest(player, 'Ban') >= 1) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cBanned By Operator\n§b§lREASON §7: §c${ban_reason}`);
            try{  
                asyncExecCmd(`scoreboard players set "${player.nameTag}" Ban 1`, player); 
                asyncExecCmd(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§l${ban_reason}`, player);
            }
            catch{ 
                asyncExecCmd(`event entity @s uac:ban_main`, player); 
            }  
        }
        if(player.hasTag('illegalitemban')) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cUnobtainable Items Ban`);
            try{  asyncExecCmd(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUnobtainable Items Ban`, player); }
            catch{ asyncExecCmd(`event entity @s uac:ban_main`, player); }  
        }
        if(player.hasTag('BanFly')) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cFly Hacks Ban`);
            try{  asyncExecCmd(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lBanned for FlyHacks`, player); }
            catch{ asyncExecCmd(`event entity @s uac:ban_main`); }              
        }
        if(scoreTest(player, 'warn') >= 3) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §c3 Warns Reached`);
            try{  asyncExecCmd(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§l3 warns reached`, player); }
            catch{ asyncExecCmd(`event entity @s uac:ban_main`, player); }              
        }
    }
    catch(error) { console.warn(error, error.stack); }
}


export { playerbans }