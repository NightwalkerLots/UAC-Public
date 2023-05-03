import { tellrawServer, TellRB } from 'library/utils/prototype.js';
import { scoreTest, setScore } from '../library/utils/score_testing';
import { world } from '@minecraft/server';
const overworld = world.getDimension('overworld');


function playerbans(player) {
    const name = player.getName();
    let ban_reason = (`${ player.getTags().find((tag) => tag.startsWith("reason_")).replace('reason_', '').replace('_', ' ') }`);
    try {
        if(player.hasTag('PermBan')) {
            TellRB(`ban`, `UAC SYSTEM ► ${name} was banned. REASON : UAC Global Banned`);
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cUAC Global Banned`);
            try{  player.runCommandAsync(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUAC Global Banned`); }
            catch{ player.runCommandAsync(`event entity @s uac:ban_main`); }
        }
        if(player.hasTag('BanCreative')) {
            TellRB(`ban`, `UAC SYSTEM ► ${name} was banned. REASON : Gamemode Manipulation`);
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cCreative Mode Ban`);
            try{  player.runCommandAsync(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCreative Mode Ban`); }
            catch{ player.runCommandAsync(`event entity @s uac:ban_main`); }  
        }
        if(player.hasTag('Ban') || scoreTest(player, 'Ban') >= 1) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cBanned By Operator\n§b§lREASON §7: §c${ban_reason}`);
            try{  
                TellRB(`ban`, `UAC SYSTEM ► ${name} was banned manually. REASON : ${ban_reason}`);
                setScore(player, 'Ban', 1, false);
                player.runCommandAsync(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§l${ban_reason}`);
            }
            catch{ 
                player.runCommandAsync(`event entity @s uac:ban_main`); 
            }  
        }
        if(player.hasTag('illegalitemban')) {
            TellRB(`ban`, `UAC SYSTEM ► ${name} was banned. REASON : Unobtainable Items`);
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cUnobtainable Items Ban`);
            try{  player.runCommandAsync(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUnobtainable Items Ban`); }
            catch{ player.runCommandAsync(`event entity @s uac:ban_main`); }  
        }
        if(player.hasTag('BanFly')) {
            TellRB(`ban`, `UAC SYSTEM ► ${name} was banned. REASON : Fly Hacks`);
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cFly Hacks Ban`);
            try{  player.runCommandAsync(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lBanned for FlyHacks`); }
            catch{ player.runCommandAsync(`event entity @s uac:ban_main`); }              
        }
        if(scoreTest(player, 'warn') >= 3) {
            TellRB(`ban`, `UAC SYSTEM ► ${name} was banned. REASON : Reached 3 Regular Warns`);
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §c3 Warns Reached`);
            try{  player.runCommandAsync(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§l3 warns reached`); }
            catch{ player.runCommandAsync(`event entity @s uac:ban_main`); }              
        }
    }
    catch(error) { console.warn(error, error.stack); }
}


export { playerbans }