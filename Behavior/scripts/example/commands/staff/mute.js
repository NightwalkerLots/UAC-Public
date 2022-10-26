import { world } from '@minecraft/server';
import { Server } from '../../../library/Minecraft.js';

const registerInformation = {
    cancelMessage: true,
    name: 'mute',
    staff: 'management',
    description: ' Mute a player for a duration of time measured in minutes',
    usage: '[ mute time @player ]',
    example: [
        ' mute 4 @player ',
        ' mute remove @player'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    try {

        let input = args.join(' ').replace('@', '').replace(`${args[0]} `, '').replace(/"/g, '');
        let playerfound = [...world.getPlayers()].find(player => player.getName() === input);
        //let playername = playerfound.getName();
        const { sender } = chatmsg;
        const name = sender.getName();

        if(!args[0]) {return sender.tellraw(`§¶§c§lUAC ► §cMute time was not specified. Please provide how many minutes they shall be muted.`)}
        if(!args[1]) {return sender.tellraw(`§¶§c§lUAC ► §cNo player specified. Usage : §6UAC.mute @player [time in minutes]`)}
        if(!playerfound) {return sender.tellraw(`§¶§cUAC ► §c§lError 7: No player by that name. §cUsage : §6UAC.mute @player [time in minutes]`);}

        let playername = playerfound.getName();
        if(args[0] == 0 && args[0] != 'remove') {return sender.tellraw(`§¶§c§lUAC ► §cMute time needs to be atleast 1 minute`)}
        if(sender.hasTag('staffstatus')) {} else {return sender.tellraw(`§¶§c§lUAC ► §c§lThis command is meant for staff only`); }
        if (playername == name) {return sender.tellraw(`§¶§c§lUAC ► §c§lCan't mute yourself`); }
        
        let muteamount = (args[0] * 1200);
        
        if(playerfound) {
            if(args[0] == 'remove') {
                try {
                    sender.runCommand(`scoreboard players set "${playername}" chatspam 0`);
                    sender.runCommand(`tag "${playername}" remove muted`);
                    sender.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§c§lUAC ► §d${playername} §bwas unmuted §bby §d${name}"}]}`);
                    return;
                }
                catch {
                    return sender.tellraw(`§¶§c§lUAC ► §d${playername} §bis already unmuted`);
                }
            }
            try {
                sender.runCommand(`execute "${playername}" ~~~ execute @s[tag=staffstatus] ~~~ tellraw "${name}" {"rawtext":[{"text":"§¶§c§lUAC ► §d${playername} §bis staff and can't be muted"}]}`);
                return;
            } catch {
                sender.runCommand(`execute "${playername}" ~~~ execute @s[tag=!staffstatus] ~~~ tellraw @a {"rawtext":[{"text":"§¶§c§lUAC ► §d${playername} §bwas muted for §c${args[0]} §bminutes by §d${name}"}]}`);
                sender.runCommand(`execute "${playername}" ~~~ scoreboard players add @s[tag=!staffstatus] chatspam ${muteamount}`);
                sender.runCommand(`execute "${playername}" ~~~ tag @s[tag=!staffstatus] add muted`);
            }
            
        }

        
    } catch (error) {
        console.warn(error, error.stack);
    }
});
