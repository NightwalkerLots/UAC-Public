import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff, tellrawServer, queryTopSolid } from '../../../library/utils/prototype.js';
import { world, Location } from 'mojang-minecraft';
const overworld = world.getDimension('overworld');
const registerInformation = {
    cancelMessage: true,
    name: 'hasitem',
    staff: 'private',
    description: ' ',
    usage: '[  ]',
    example: [
        ' '
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    try {

        //let input = args.join(' ').replace('@', '').replace(/"/g, '');
        //let playerfound = [...world.getPlayers()].find(player => player.getName() === input);
        //let playername = playerfound.getName();
        const { sender } = chatmsg;
        

        if(sender.hasitem('iron_ingot')) {
            sender.tellraw(`you have it`);
        } else {
            sender.tellraw(`Don't have`);
        }
        
        
    } catch (error) {
        console.warn(error, error.stack);
    }
});
