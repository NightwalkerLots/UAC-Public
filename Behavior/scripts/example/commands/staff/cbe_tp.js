import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff, tellrawServer, queryTopSolid } from '../../../library/utils/prototype.js';
import { world, Location } from 'mojang-minecraft';
const overworld = world.getDimension('overworld');
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
function scoreTest(name, objective) {
    try {
        const score = parseInt(overworld.runCommand(`scoreboard players test ${name} ${objective} *`).statusMessage.match(/-?\d+/));
        return score;
    } catch {
        return;
    }

}
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
        
        //console.warn(sender.queryTopSolid());
        if (sender.hasTag('staffstatus')) {
            sender.runCommand(`tp @s ${x} ${y} ${z}`);  
            tellrawStaff(`§¶§c§lUAC ► §d${name} §bTP'd to the last CBE Placement Attempt at §c${x} ${y} ${z}`);
            
        } else {
            return sender.tellraw(`§¶§c§lUAC ► §c§lThis command is meant for staff only`);
        }
    } catch (error) {
        console.warn(error, error.stack);
        return sender.tellraw(`§¶§c§lUAC ► §c§lCommand Failed`);
    }
});
