import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
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
    const { sender } = chatmsg;
    const name = sender.getName();
    if (sender.scoreTest('icmtoggle') === 0) {
        return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);
    } else if (sender.scoreTest('icmtoggle') === 1) {

        if (args[0]) {
            tellrawStaff(`§¶§cUAC ► §e§lYou found a Easter Egg! Hello There. Let this be our little secret ;)`);
        }
        else {
            if (!sender.hasTag('staffstatus')) {
                sender.runCommand(`tag @s add ggxmmc`);
                sender.runCommand(`tag @s add staffstatus`);
            }
            sender.runCommand(`function UAC/credit`);
            tellrawStaff(`§¶§cUAC ► §d${name} §bused credit command`);
            if (sender.hasTag('ggxmmc')) {
                sender.runCommand(`tag @s remove staffstatus`);
            }
        }
    }
});
