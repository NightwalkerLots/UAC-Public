import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import { world } from '@minecraft/server';
const registerInformation = {
    cancelMessage: true,
    name: 'warn',
    staff: 'management',
    description: 'Warns the selected player',
    usage: '[ @player ]',
    example: [
        'warn @player'
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
                    tellrawStaff(`§¶§c§lUAC ► §d${playerfound.getName()}§b was warned by §d${name}`);
                    sender.runCommandAsync(`execute "${playerfound.getName()}" ~~~ function UAC/warn`);  
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
