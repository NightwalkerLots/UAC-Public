import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff, tellrawServer, queryTopSolid } from '../../../library/utils/prototype.js';
import { world, Location } from 'mojang-minecraft';
const overworld = world.getDimension('overworld');
const registerInformation = {
    cancelMessage: true,
    name: 'vanish',
    staff: 'true',
    description: 'Enter/Leave Vanish Mode. Execute again to toggle.',
    usage: '',
    example: [
        'vanish'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    try {

        
        const { sender } = chatmsg;
        const name = sender.getName();
        
        console.warn(sender.queryTopSolid());
        if (sender.hasTag('staffstatus')) {
            sender.runCommand(`function UAC/vanish`);  
            
        } else {
            return sender.tellraw(`§¶§c§lUAC ► §c§lThis command is meant for staff only`);
        }
    } catch (error) {
        console.warn(error, error.stack);
    }
});
