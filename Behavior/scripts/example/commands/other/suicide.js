import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import { scoreTest } from '../../../library/utils/score_testing.js';
const registerInformation = {
    cancelMessage: true,
    name: 'suicide',
    staff: 'false',
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
    if (scoreTest(sender, 'icmtoggle') === 0) {
        return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);
    } else if (scoreTest(sender, 'in_combat') === 1) {
        return sender.tellraw(`§¶§cUAC ► §6Suicide §cunavailable §bwhile in combat`);
    } else if (scoreTest(sender, 'icmtoggle') === 1) {
        const cancel = `cancel`;
        if (cancel.includes(args[0])) {
            sender.addTag('suicide1');
            sender.tellraw(`§¶§cUAC ► §b§lSuicide was canceled`);
        }
        else {
            if (!sender.hasTag('suicide1')) {
                sender.addTag('suicide1');
                return sender.tellraw(`§¶§cUAC ► §c§lAre you sure? Execute again for suicide. Or use §7[ §bUAC.suicide cancel §7] §cto cancel.`);
            }
            if (sender.hasTag('suicide1')) {
                sender.removeTag('suicide1');
                sender.runCommandAsync(`scoreboard players set @s suicide 1`);
                tellrawStaff(`§¶§cUAC STAFF ► §d${name} §bused suicide command`);
                return sender.tellraw(`§¶§cUAC ► §b§lTo prevent combat logging, suicide will happen in 10 seconds`);
            }
        }
    }
});