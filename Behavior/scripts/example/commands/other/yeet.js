import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'hello',
    description: 'hello',
    usage: '[ hello ]',
    example: [
        'hello'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
if(args[0])
{
    Server.broadcast(`Hello`, chatmsg.sender.nameTag);
}
else {
    Server.broadcast(`Failed`, chatmsg.sender.nameTag);
}
});