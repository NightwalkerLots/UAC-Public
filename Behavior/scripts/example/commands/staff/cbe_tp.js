import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import { scoreTest } from '../../../library/utils/score_testing.js';

const registerInformation = {
    cancelMessage: true,
    name: 'cbetp',
    staff: 'true',
    description: 'Teleport to the most recent CBE Block Placement Attempt',
    usage: '',
    example: [
        'cbetp'
    ]
};


Server.command.register(registerInformation, (chatmsg, args) => {
    try {

        
        const { sender } = chatmsg;
        const name = sender.getName();
        if(scoreTest('cbe_x', 'cbe_location') == undefined) {
            return sender.tellraw(`§¶§c§lUAC ► §c§lNo Last Placement Available`);
        }

        let x = scoreTest('cbe_x', 'cbe_location');
        let y = scoreTest('cbe_y', 'cbe_location');
        let z = scoreTest('cbe_z', 'cbe_location');
        
        //
        if (sender.hasTag('staffstatus')) {
            sender.runCommandAsync(`tp @s ${x} ${y} ${z}`, sender);  
            tellrawStaff(`§l§¶§cUAC STAFF ► §d${name} §bTP'd to the last CBE Placement Attempt at §c${x} ${y} ${z}`);
            
        } else {
            return sender.tellraw(`§¶§c§lUAC ► §c§lThis command is meant for staff only`);
        }
    } catch (error) {
        console.warn(error, error.stack);
        return sender.tellraw(`§¶§c§lUAC ► §c§lCommand Failed`);
    }
});
