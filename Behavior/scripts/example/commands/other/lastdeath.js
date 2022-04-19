import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
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
    const ComString = `function UAC/asset/deathcoords_asset`;
    if (registerInformation.name.match(chatmsg)) {
        if (sender.scoreTest('icmtoggle') === 0) {
            return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);
        } else if (sender.scoreTest('icmtoggle') === 1) {
            sender.runCommand(`${ComString}`);
            sender.runCommand(`playsound note.pling @s ~ ~ ~`);
            tellrawStaff(`§¶§cUAC ► §d${name} §bchecked their last death location`);
        }
    } else {
        return sender.tellraw(`§cError Fatal : Command Failed`);
    }
});
