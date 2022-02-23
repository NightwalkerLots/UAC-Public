import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'lastdeath',
    description: 'Show Coords to Last Death',
    usage: 'lastdeath',
    example: [
        'lastdeath',
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();
    const ComString = `execute "${name}" ~~~ function UAC/asset/deathcoords_asset`;
    if( registerInformation.name.match(chatmsg) ){
        if( Server.player.getScore('icmtoggle', name) === 0) {
            return Server.broadcast(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`, name);
        } else if( Server.player.getScore('icmtoggle', name) === 1) {
        Server.runCommand( `${ComString}` );
        Server.runCommand( `playsound note.pling "${name}" ~ ~ ~` );
        Server.broadcastStaff(`§¶§cUAC ► §d${name} §bchecked their last death location`);
    }
    }else {
        return Server.broadcast(`§cError Fatal : Command Failed`, name);
    }
});
