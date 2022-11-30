import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import { scoreTest } from '../../../library/utils/score_testing.js';
import { world } from '@minecraft/server';
const registerInformation = {
    cancelMessage: true,
    name: 'tpa',
    staff: 'false',
    description: 'Request/Accept Teleport Requests',
    usage: '[ request | accept | decline | cancel ] <player>',
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


        if (scoreTest(sender, 'icmtoggle') === 0) {
            return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);
        } else if (scoreTest(sender, 'in_combat') === 1) {
            return sender.tellraw(`§¶§cUAC ► §6TPA §cunavailable §bwhile in combat`);
        } else if (scoreTest(sender, 'tp_cooldown') != 0) {
            return sender.tellraw(`§¶§cUAC ► §6TPA §cunavailable §bwhile warp commands are in cooldown. Please wait 40 seconds.`);
        } else if (scoreTest(sender, 'icmtoggle') === 1) {
            if (registerInformation.name.match(chatmsg)) {

                // tpa request
                if (tpsopen.includes(args[0])) {
                    if (scoreTest(sender, 'tpa') >= 1) {
                        return sender.tellraw(`§¶§cUAC ► §bTPA Channel already created! Your Channel §7:§c "${scoreTest(sender, 'tpa')}" `);
                    } else {
                        let input = args.join(' ').replace('request ', '').replace('@', '').replace(/"/g, '');
                        let playerfound = [...world.getPlayers()].find(player => player.getName() === input);

                        if(!args[1]) {return sender.tellraw(`§¶§c§lUAC ► §cNo Player was specified`);}
                        if(!playerfound) {return sender.tellraw(`§¶§c§lUAC ► §cPlayer not found`);}
                        let playername = `${playerfound.getName()}`;
                        if(playername == name) {return sender.tellraw(`§¶§c§lUAC ► §cCan't create a request to yourself`);}
                        

                        sender.runCommandAsync(`scoreboard players random @s tpa 1 999999`);
                        sender.runCommandAsync(`scoreboard players set @s tp_cooldown 900`);
                        sender.addTag('tpatemp');
                        sender.runCommandAsync(`scoreboard players operation "${playerfound.getName()}" tpa = "${name}" tpa`);
                        playerfound.tellraw(`§¶§cUAC ► §d${name} §bhas sent you a TPA Request. Use §6UAC.tpa accept §bto accept the request`);
                        sender.tellraw(`§¶§cUAC ► §d${playerfound.getName()} §bwas sent a TPA Request`);
                        tellrawStaff(`§¶§cUAC ► §d${name} §bsent a TPA Request to §d${playerfound.getName()}`);
                    }
                }
                // tpa accept
                else if (tpsaccept.includes(args[0])) { 
                    if (scoreTest(sender, 'tpa') === 0) {return sender.tellraw(`§¶§c§lUAC ► §cNo TPA Requests to accept`);}
                    if (sender.hasTag('tpatemp')) {return sender.tellraw(`§¶§c§lUAC ► §cYou have a request open to someone, and cannot accept others.`);}
                    //tp logic
                    sender.tellraw(` §¶§cUAC ► §bTPA Request was §2ACCEPTED§7.`);
                    tellrawStaff(` §¶§cUAC ► §d${name} §baccepted a TPA request `);
                    sender.runCommandAsync(`execute @p[name=!"${name}",scores={tpa=${scoreTest(sender, 'tpa')}}] ~~~ tp @s "${name}"`);
                    sender.runCommandAsync(`scoreboard players set @s tp_cooldown 900`); 
                    sender.runCommandAsync(`execute @p[name=!"${name}",scores={tpa=${scoreTest(sender, 'tpa')}}] ~~~ scoreboard players set @s tp_cooldown 900`);
            
                    //effects
                    sender.runCommandAsync(`execute @p[name=!"${name}",scores={tpa=${scoreTest(sender, 'tpa')}}] ~~~ playsound note.pling @s ~ ~ ~`);
                    sender.runCommandAsync(`execute @p[name=!"${name}",scores={tpa=${scoreTest(sender, 'tpa')}}] ~~~ function particle/nether_poof`);
                    sender.runCommandAsync(`execute @p[name=!"${name}",scores={tpa=${scoreTest(sender, 'tpa')}}] ~~~ playsound mob.shulker.teleport @s ~~~ 2 2 2`); 

                    //request reset
                    sender.runCommandAsync(`scoreboard players set @a[scores={tpa=${scoreTest(sender, 'tpa')}}] tpa 0`);
                    sender.runCommandAsync(`execute @a[tag=tpatemp,scores={tpa=${scoreTest(sender, 'tpa')}}] ~~~ tag @s remove tpatemp`);
                    
                } 
                // tpa cancel/decline
                else if(tpsclose.includes(args[0])) {
                    if (scoreTest(sender, 'tpa') === 0) {return sender.tellraw(`§¶§c§lUAC ► §cNo TPA Requests to cancel`);}
                    sender.runCommandAsync(`execute @a[tag=tpatemp,scores={tpa=${scoreTest(sender, 'tpa')}}] ~~~ tag @s remove tpatemp`);
                    sender.runCommandAsync(`scoreboard players set @a[scores={tpa=${scoreTest(sender, 'tpa')}}] tpa 0`);
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