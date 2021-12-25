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
    if( Server.player.getScore('icmtoggle', chatmsg.sender.nameTag) === 0) {
        return Server.broadcast(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`, chatmsg.sender.nameTag);
    } else if( Server.player.getScore('icmtoggle', chatmsg.sender.nameTag) === 1) {
        
        if(args[0])
        {
            Server.broadcastStaff(`§¶§cUAC ► §e§lYou found a Easter Egg! Hello There. Let this be our little secret ;)`);
        }
        else {
            if(!Server.player.hasTag('staffstatus', chatmsg.sender.nameTag)) {
                Server.runCommand( `tag "${chatmsg.sender.nameTag}" add ggxmmc` );
                Server.runCommand( `tag "${chatmsg.sender.nameTag}" add staffstatus` );
            }
            Server.runCommand( `execute "${chatmsg.sender.nameTag}" ~~~ function UAC/credit` );
            Server.broadcastStaff(`§¶§cUAC ► §d${chatmsg.sender.nameTag} §bused credit command`);
            if(Server.player.hasTag('ggxmmc', chatmsg.sender.nameTag)) {
                Server.runCommand( `tag "${chatmsg.sender.nameTag}" remove staffstatus` );
            }
        }
}   }   );
