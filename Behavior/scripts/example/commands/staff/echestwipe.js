import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import { world } from '@minecraft/server';
const registerInformation = {
    cancelMessage: true,
    name: 'echestwipe',
    staff: 'management',
    description: 'Clears the ender chest of the selected player',
    usage: '[ @player ]',
    example: [
        'echestwipe @player'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    try {

        let input = args.join(' ').replace('@', '').replace(/"/g, '');
        let playerfound = [...world.getPlayers()].find(player => player.getName() === input);
        //let playername = playerfound.getName();
        const { sender } = chatmsg;
        const name = sender.getName();
        
        //
        if (sender.hasTag('staffstatus')) {
            if (args[0]) {
                if(!playerfound) {
                    return sender.tellraw(`§¶§c§lUAC ► §cPlayer not found`);  
                }
                else {
                    tellrawStaff(`§¶§c§lUAC ► §d${playerfound.getName()}§b was Ender Chest Wiped by §d${name}`);
                    sender.runCommandAsync(`execute "${playerfound.getName()}" ~~~ function UAC/echestwipe`);  
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
