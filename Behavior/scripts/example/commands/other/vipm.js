import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'vip',
    description: 'Enables/Disables vip effects for the player',
    usage: '[ vip ]',
    example: [
        'vip'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    if(args[0])
    {
        Server.broadcastStaff(`§¶§cUAC ► §e§lYou found a Easter Egg! Yeet! Hello There. Let this be our little secret ;)`);
    }
    else {
        Server.runCommand( `execute "${chatmsg.sender.nameTag}" ~~~ function UAC/asset/uac_vip` );
    }
});
