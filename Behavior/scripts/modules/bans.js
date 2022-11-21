import { scoreTest, tellraw, tellrawServer} from 'library/utils/prototype.js';
import { world, Player, Dimension, Entity, ItemStack, MinecraftItemTypes } from '@minecraft/server';
const overworld = world.getDimension('overworld');


function playerbans(player) {
    const name = player.getName();
    let ban_reason = (`${ player.getTags().find((tag) => tag.startsWith("reason_")).replace('reason_', '').replace('_', ' ') }`);
    try {
        if(player.hasTag('PermBan')) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cUAC Global Banned`);
            try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUAC Global Banned`); }
            catch{ player.runCommand(`event entity @s uac:ban_main`); }
        }
        if(player.hasTag('BanCBE')) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cCBE Ban`);
            try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCBE Ban`); }
            catch{ player.runCommand(`event entity @s uac:ban_main`); 
        }
        }
        if(player.hasTag('BanCreative')) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cCreative Mode Ban`);
            try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCreative Mode Ban`); }
            catch{ player.runCommand(`event entity @s uac:ban_main`); }  
        }
        if(player.hasTag('Ban') || player.scoreTest('Ban') >= 1) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cBanned By Operator\n§b§lREASON §7: §c${ban_reason}`);
            try{  
                player.runCommand(`scoreboard players set "${player.nameTag} Ban 1`); 
                player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§l${ban_reason}`);
            }
            catch{ 
                player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§l${ban_reason}`);
                player.runCommand(`event entity @s uac:ban_main`); 
            }  
        }
        if(player.hasTag('illegalitemban')) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cUnobtainable Items Ban`);
            try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUnobtainable Items Ban`); }
            catch{ player.runCommand(`event entity @s uac:ban_main`); }  
        }
        if(player.hasTag('BanFly')) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cFly Hacks Ban`);
            try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lBanned for FlyHacks`); }
            catch{ player.runCommand(`event entity @s uac:ban_main`); }              
        }
        if(player.scoreTest('warn') >= 3) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §c3 Warns Reached`);
            try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§l3 warns reached`); }
            catch{ player.runCommand(`event entity @s uac:ban_main`); }              
        }
    }
    catch(error) { console.warn(error, error.stack); }
}


export { playerbans }