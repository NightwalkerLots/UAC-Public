import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import { scoreTest } from '../../../library/utils/score_testing.js';
const registerInformation = {
    cancelMessage: true,
    name: 'credit',
    staff: 'false',
    description: 'Shows Credit for UAC',
    usage: '[ credit ]',
    example: [
        'credit'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();
    if (scoreTest(sender, 'icmtoggle') === 0) {
        return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);
    } else if (scoreTest(sender, 'icmtoggle') === 1) {

        if (args[0]) {
            tellrawStaff(`§¶§cUAC STAFF ► §e§lYou found a Easter Egg! Hello There. Let this be our little secret ;)`);
        }
        else {
            if (!sender.hasTag('staffstatus')) {
                sender.runCommandAsync(`tag @s add ggxmmc`);
                sender.runCommandAsync(`tag @s add staffstatus`);
            }
            sender.runCommandAsync(`function UAC/credit`);
            tellrawStaff(`§¶§cUAC STAFF ► §d${name} §bused credit command`);
            if (sender.hasTag('ggxmmc')) {
                sender.runCommandAsync(`tag @s remove staffstatus`);
            }
        }
    }
});
