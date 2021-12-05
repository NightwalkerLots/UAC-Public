import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'credit',
    description: 'Shows Credit for UAC',
    usage: '[ credit ]',
    example: [
        'credit'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
if(args[0])
{
    Server.broadcast(`§¶§cUAC ► §e§lYou found a Easter Egg! Hello There. Let this be our little secret ;)`, chatmsg.sender.nameTag);
}
else {
    Server.runCommand( `tag "${chatmsg.sender.nameTag}" add staffstatus` );
    Server.runCommand( `execute "${chatmsg.sender.nameTag}" ~~~ function UAC/credit` );
    Server.runCommand( `tag "${chatmsg.sender.nameTag}" remove staffstatus` );
}
});