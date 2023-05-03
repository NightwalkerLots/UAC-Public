import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import { world } from '@minecraft/server';
const registerInformation = {
    cancelMessage: true,
    name: 'punish',
    staff: 'management',
    description: 'Warns the player while clearing their inventory and ender chest',
    usage: '[ @player ]',
    example: [
        'punish @player'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    try {

        let input = args.join(' ').replace('@', '').replace(/"/g, '');
        let playerfound = [...world.getPlayers()].find(player => player.getName() === input);
        //let playername = playerfound.getName();
        const { sender } = chatmsg;
        const name = sender.getName();
        
        
        if (sender.hasTag('staffstatus')) {
            if (args[0]) {
                if(!playerfound) {
                    return sender.tellraw(`§¶§c§lUAC ► §cPlayer not found`);  
                }
                else {
                    tellrawStaff(`§l§¶§cUAC STAFF ► §d${playerfound.getName()}§b was punished by §d${name}`);
                    TellRB(`flag_0`, `UAC ► ${name} used the punish command on ${playerfound.getName()}`);
                    sender.runCommandAsync(`execute "${playerfound.getName()}" ~~~ function UAC/punish`);  
                }
            } else {
                sender.tellraw(`§¶§c§lUAC ► §cNo player specified`);
            }
        } else {
            return sender.tellraw(`§¶§c§lUAC ► §c§lThis command is meant for staff only`);
        }
    } catch (error) {
        console.warn(error, error.stack);
    }
});
