import { Server } from '../../../library/Minecraft.js';
import { world } from '@minecraft/server';

const registerInformation = {
    cancelMessage: true,
    name: 'clean',
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
        const name = sender.getName();
        
        
    } catch (error) {
        console.warn(error, error.stack);
    }
});
