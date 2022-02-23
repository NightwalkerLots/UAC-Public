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
    const { sender } = chatmsg;
    const name = sender.getName();
    if (Server.player.getScore('icmtoggle', name) === 0) {
        return Server.broadcast(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`, name);
    } else if (Server.player.getScore('icmtoggle', name) === 1) {

        if (args[0]) {
            Server.broadcastStaff(`§¶§cUAC ► §e§lYou found a Easter Egg! Hello There. Let this be our little secret ;)`);
        }
        else {
            if (!sender.hasTag('staffstatus')) {
                Server.runCommand(`tag "${name}" add ggxmmc`);
                Server.runCommand(`tag "${name}" add staffstatus`);
            }
            Server.runCommand(`execute "${name}" ~~~ function UAC/credit`);
            Server.broadcastStaff(`§¶§cUAC ► §d${name} §bused credit command`);
            if (sender.hasTag('ggxmmc')) {
                Server.runCommand(`tag "${name}" remove staffstatus`);
            }
        }
    }
});
