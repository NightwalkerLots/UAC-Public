import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'suicide',
    description: 'Configure the World Spawn in UAC',
    usage: '[ cancel ]',
    example: [
        'suicide',
        'suicide cancel'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();
    if( Server.player.getScore('icmtoggle', name) === 0) {
        return Server.broadcast(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`, name);
    } else if( Server.player.getScore('icmtoggle', name) === 1) {
        const cancel = `cancel`;
        if( cancel.includes(args[0]) )
        {
            Server.runCommand( `tag "${name}" remove suicide1` );
            Server.broadcast(`§¶§cUAC ► §b§lSuicide was canceled`, name);
        }
        else {
            if(!Server.player.hasTag('suicide1', name)) {
                Server.runCommand( `tag "${name}" add suicide1` );
                return Server.broadcast(`§¶§cUAC ► §c§lAre you sure? Execute again for suicide. Or use §7[ §bUAC.suicide cancel §7] §cto cancel.`, name);
            }
            if(Server.player.hasTag('suicide1', name)) {
                Server.runCommand( `tag "${name}" remove suicide1` );
                Server.runCommand( `scoreboard players set "${name}" suicide 1` );
                Server.runCommand( `scoreboard players set "${name}" hometp 7` );
                Server.broadcastStaff(`§¶§cUAC ► §d${name} §bused suicide command`);
                return Server.broadcast(`§¶§cUAC ► §b§lTo prevent combat logging, suicide will happen in 10 seconds`, name);
            }
        }
}   }   );