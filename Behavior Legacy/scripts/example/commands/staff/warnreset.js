import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import { world } from '@minecraft/server';
const overworld = world.getDimension('overworld');
const registerInformation = {
    cancelMessage: true,
    name: 'warnreset',
    staff: 'management',
    description: 'Reset all warns from the selected player',
    usage: '[ @player ]',
    example: [
        'warnreset @player'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    try {

        let input = args.join(' ').replace('@', '').replace(/"/g, '');
        let playerfound = [...world.getPlayers()].find(player => player.getName() === input);
        const { sender } = chatmsg;
        const name = sender.getName();
        
        
        if (sender.hasTag('staffstatus')) {
            if (args[0]) {
                if(!playerfound) {
                    return sender.tellraw(`§¶§c§lUAC ► §cPlayer not found`);  
                }
                else {
                    tellrawStaff(`§l§¶§cUAC STAFF ► §d${playerfound.getName()}'s §bwarns were reset by §d${name}`);
                    TellRB(`flag_0`, `UAC ► ${name} has reset the warns of ${playerfound.getName()}`);
                    sender.runCommandAsync(`execute "${playerfound.getName()}" ~~~ function UAC/warnreset`);  
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
