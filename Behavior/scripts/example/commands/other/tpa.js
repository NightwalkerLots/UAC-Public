import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import { world } from 'mojang-minecraft';
const registerInformation = {
    cancelMessage: true,
    name: 'tpa',
    staff: 'false',
    description: 'Request/Accept Teleport Requests',
    usage: '[ <request | accept | decline | cancel ]',
    example: [
        'tpa request @player',
        'tpa cancel',
        'tpa accept',
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    try {
        const { sender } = chatmsg;
        const name = sender.getName();

        let tpsopen = ['request'];
        let tpsclose = ['cancel', 'decline'];
        let tpsaccept = ['accept'];


        if (sender.scoreTest('icmtoggle') === 0) {
            return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);
        } else if (sender.scoreTest('in_combat') === 1) {
            return sender.tellraw(`§¶§cUAC ► §6TPA §cunavailable §bwhile in combat`);
        } else if (sender.scoreTest('tp_cooldown') != 0) {
            return sender.tellraw(`§¶§cUAC ► §6TPA §cunavailable §bwhile warp commands are in cooldown. Please wait 40 seconds.`);
        } else if (sender.scoreTest('icmtoggle') === 1) {
            if (registerInformation.name.match(chatmsg)) {

                // tpa request
                if (tpsopen.includes(args[0])) {
                    if (sender.scoreTest('tpa') >= 1) {
                        return sender.tellraw(`§¶§cUAC ► §bTPA Channel already created! Your Channel §7:§c "${sender.scoreTest('tpa')}" `);
                    } else {
                        let input = args.join(' ').replace('request ', '').replace('@', '').replace(/"/g, '');
                        let playerfound = [...world.getPlayers()].find(player => player.getName() === input);

                        if(!args[1]) {return sender.tellraw(`§¶§c§lUAC ► §cNo Player was specified`);}
                        if(!playerfound) {return sender.tellraw(`§¶§c§lUAC ► §cPlayer not found`);}
                        let playername = `${playerfound.getName()}`;
                        if(playername == name) {return sender.tellraw(`§¶§c§lUAC ► §cCan't create a request to yourself`);}
                        

                        sender.runCommand(`scoreboard players random @s tpa 1 999999`);
                        sender.runCommand(`scoreboard players set @s tp_cooldown 900`);
                        sender.addTag('tpatemp');
                        sender.runCommand(`scoreboard players operation "${playerfound.getName()}" tpa = "${name}" tpa`);
                        playerfound.tellraw(`§¶§cUAC ► §d${name} §bhas sent you a TPA Request. Use §6UAC.tpa accept §bto accept the request`);
                        sender.tellraw(`§¶§cUAC ► §d${playerfound.getName()} §bwas sent a TPA Request`);
                        tellrawStaff(`§¶§cUAC ► §d${name} §bsent a TPA Request to §d${playerfound.getName()}`);
                    }
                }
                // tpa accept
                else if (tpsaccept.includes(args[0])) { 
                    if (sender.scoreTest('tpa') === 0) {return sender.tellraw(`§¶§c§lUAC ► §cNo TPA Requests to accept`);}
                    if (sender.hasTag('tpatemp')) {return sender.tellraw(`§¶§c§lUAC ► §cYou have a request open to someone, and cannot accept others.`);}
                    //tp logic
                    sender.tellraw(` §¶§cUAC ► §bTPA Request was §2ACCEPTED§7.`);
                    tellrawStaff(` §¶§cUAC ► §d${name} §baccepted a TPA request `);
                    sender.runCommand(`execute @p[name=!"${name}",scores={tpa=${sender.scoreTest('tpa')}}] ~~~ tp @s "${name}"`);
                    sender.runCommand(`scoreboard players set @s tp_cooldown 900`); 
                    sender.runCommand(`execute @p[name=!"${name}",scores={tpa=${sender.scoreTest('tpa')}}] ~~~ scoreboard players set @s tp_cooldown 900`);
            
                    //effects
                    sender.runCommand(`execute @p[name=!"${name}",scores={tpa=${sender.scoreTest('tpa')}}] ~~~ playsound note.pling @s ~ ~ ~`);
                    sender.runCommand(`execute @p[name=!"${name}",scores={tpa=${sender.scoreTest('tpa')}}] ~~~ function particle/nether_poof`);
                    sender.runCommand(`execute @p[name=!"${name}",scores={tpa=${sender.scoreTest('tpa')}}] ~~~ playsound mob.shulker.teleport @s ~~~ 2 2 2`); 

                    //request reset
                    sender.runCommand(`scoreboard players set @a[scores={tpa=${sender.scoreTest('tpa')}}] tpa 0`);
                    sender.runCommand(`execute @a[tag=tpatemp,scores={tpa=${sender.scoreTest('tpa')}}] ~~~ tag @s remove tpatemp`);
                    
                } 
                // tpa cancel/decline
                else if(tpsclose.includes(args[0])) {
                    if (sender.scoreTest('tpa') === 0) {return sender.tellraw(`§¶§c§lUAC ► §cNo TPA Requests to cancel`);}
                    sender.runCommand(`execute @a[tag=tpatemp,scores={tpa=${sender.scoreTest('tpa')}}] ~~~ tag @s remove tpatemp`);
                    sender.runCommand(`scoreboard players set @a[scores={tpa=${sender.scoreTest('tpa')}}] tpa 0`);
                    sender.tellraw(` §¶§cUAC ► §bThe TPA request was closed`);
                    tellrawStaff(` §¶§cUAC ► §d${name} §bclosed a TPA request `);
                } else {
                    return sender.tellraw(`§¶§cUAC ► §cERROR! §6Usage Example §7:§b§l UAC.tpa [ request | cancel | accept ]`);
                }
            }
            else {
                return sender.tellraw(`§¶§cUAC ► §cERROR 2! §6Usage Example §7:§b§l UAC.tpa [ request | cancel | accept ]`);
            }
        }
    } catch(error) { console.warn(error, error.stack); }
});