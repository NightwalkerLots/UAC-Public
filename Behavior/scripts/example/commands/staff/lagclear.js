import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
const registerInformation = {
    cancelMessage: true,
    name: 'lagclear',
    staff: 'true',
    description: 'Manually trigger a lag clear',
    usage: '[ lagclear ]',
    example: [
        'lagclear'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();
    if(args[0])
    {
        tellrawStaff(`§¶§cUAC STAFF ► §e§lYou found a Easter Egg! Yeet! Hello There. Let this be our little secret ;)`);
    }
    else {
        sender.runCommandAsync( `function UAC/lagclear` );
    }
});
