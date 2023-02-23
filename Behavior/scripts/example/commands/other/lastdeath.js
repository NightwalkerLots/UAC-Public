import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import { scoreTest } from '../../../library/utils/score_testing';
const registerInformation = {
    cancelMessage: true,
    name: 'lastdeath',
    staff: 'false',
    description: 'Show Coords to Last Death',
    usage: 'lastdeath',
    example: [
        'lastdeath',
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();
    try {
        if ( scoreTest(sender, 'icmtoggle') === 0) return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);
         
        sender.runCommandAsync(`function UAC/asset/deathcoords_asset`);
        tellrawStaff(`§¶§cUAC STAFF ► §d${name} §bchecked their last death location`);
    }catch (error) {
        console.warn(error, error.stack);
    }
});
