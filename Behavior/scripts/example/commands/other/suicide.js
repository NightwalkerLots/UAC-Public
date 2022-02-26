import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
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
    if( sender.scoreTest('icmtoggle') === 0) {
        return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);
    } else if( sender.scoreTest('icmtoggle') === 1) {
        const cancel = `cancel`;
        if( cancel.includes(args[0]) )
        {
            sender.runCommand( `tag @s remove suicide1` );
            sender.tellraw(`§¶§cUAC ► §b§lSuicide was canceled`);
        }
        else {
            if(!Server.player.hasTag('suicide1', name)) {
                sender.runCommand( `tag @s add suicide1` );
                return sender.tellraw(`§¶§cUAC ► §c§lAre you sure? Execute again for suicide. Or use §7[ §bUAC.suicide cancel §7] §cto cancel.`);
            }
            if(Server.player.hasTag('suicide1', name)) {
                sender.runCommand( `tag @s remove suicide1` );
                sender.runCommand( `scoreboard players set @s suicide 1` );
                sender.runCommand( `scoreboard players set @s hometp 7` );
                tellrawStaff(`§¶§cUAC ► §d${name} §bused suicide command`);
                return sender.tellraw(`§¶§cUAC ► §b§lTo prevent combat logging, suicide will happen in 10 seconds`);
            }
        }
}   }   );