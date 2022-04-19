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
    if (sender.scoreTest('icmtoggle') === 0) {
        return sender.tellraw(`§¶§cUNITY API §b► §c§lThe Realm Owner currently has Player Commands Disabled`);
    } else if (sender.scoreTest('in_combat') === 1) {
        return sender.tellraw(`§¶§cUNITY API §b► §6Suicide §cunavailable §bwhile in combat`);
    } else if (sender.scoreTest('icmtoggle') === 1) {
        const cancel = `cancel`;
        if (cancel.includes(args[0])) {
            sender.addTag('suicide1');
            sender.tellraw(`§¶§cUNITY API §b► §b§lSuicide was canceled`);
        }
        else {
            if (!sender.hasTag('suicide1')) {
                sender.addTag('suicide1');
                return sender.tellraw(`§¶§cUNITY API §b► §c§lAre you sure? Execute again for suicide. Or use §7[ §bUAC.suicide cancel §7] §cto cancel.`);
            }
            if (sender.hasTag('suicide1')) {
                sender.removeTag('suicide1');
                sender.runCommand(`scoreboard players set @s suicide 1`);
                tellrawStaff(`§¶§cUNITY API §b► §d${name} §bused suicide command`);
                return sender.tellraw(`§¶§cUNITY API §b► §b§lTo prevent combat logging, suicide will happen in 10 seconds`);
            }
        }
    }
});