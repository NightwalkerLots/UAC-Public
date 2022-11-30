import { Server } from '../../../library/Minecraft.js';
import { scoreTest } from '../../../library/utils/score_testing.js';


const registerInformation = {
    cancelMessage: true,
    name: 'score',
    staff: 'private',
    description: ' ',
    usage: '[  ]',
    example: [
        ' '
    ]
};


Server.command.register(registerInformation, (chatmsg, args) => {
    try {

        
        const { sender } = chatmsg;
        const name = sender.getName();

        sender.tellraw(`(Dev) Last Pos X   :   ${scoreTest(sender, 'lastpos_x')}`);
        
        
    } catch (error) {
        console.warn(error, error.stack);
    }
});
