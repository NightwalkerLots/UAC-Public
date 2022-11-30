import { Server } from '../../../library/Minecraft.js';
import { scoreTest } from '../../../library/utils/score_testing.js';
import { asyncExecCmd } from '../../../library/utils/cmd_queue.js';


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

        asyncExecCmd(`say this worked`, sender);
        
        
    } catch (error) {
        console.warn(error, error.stack);
    }
});
