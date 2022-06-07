import { world } from 'mojang-minecraft';
import { Server } from '../../../library/Minecraft.js';

const registerInformation = {
    cancelMessage: true,
    name: 'mute',
    staff: 'true',
    description: ' Mute a player for a duration of time measured in minutes',
    usage: '[ mute time @player ]',
    example: [
        ' mute 4 @player '
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
        if(args[0] == 0) {return sender.tellraw(`§¶§c§lUAC ► §cMute time needs to be atleast 1 minute`)}
        if(sender.hasTag('staffstatus')) {} else {return sender.tellraw(`§¶§c§lUAC ► §c§lThis command is meant for staff only`); }

        
        let muteamount = (args[0] * 1200);
        
        if(playerfound) {
            sender.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§c§lUAC ► §d${playername} §bwas muted for §c${args[0]} §bminutes by §d${name}"}]}`)
            sender.runCommand(`scoreboard players add "${playername}" chatspam ${muteamount}`);
            sender.runCommand(`tag "${playername}" add muted`);
        }

        
    } catch (error) {
        console.warn(error, error.stack);
    }
});
