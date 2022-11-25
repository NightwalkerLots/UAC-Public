import { getGamemode } from '../../../library/utils/prototype.js';
import { Server } from '../../../library/Minecraft.js';

const registerInformation = {
    cancelMessage: true,
    name: 'vanish',
    staff: 'true',
    description: 'Enter/Leave Vanish Mode. Execute again to toggle.',
    usage: '',
    example: [
        'vanish',
        'vanish survival'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    try {

        
        const { sender } = chatmsg;
        const name = sender.getName();
        let gamemode = getGamemode(sender);
        
        if (sender.hasTag('staffstatus')) {
            sender.runCommand(`function UAC/asset/vanish_asset`);
            switch (args[0]) {
                case undefined:
                    return sender.tellraw(`§¶§c§lUAC ► §bYou've kept your current gamemode of §6${gamemode}`);
                case 'survival': {
                    sender.runCommand(`gamemode 0`);
                    sender.tellraw(`§¶§c§lUAC ► §bgamemode switched to §6${args[0]}`);
                } break
                case 'creative': {
                    sender.runCommand(`gamemode 1`);
                    sender.tellraw(`§¶§c§lUAC ► §bgamemode switched to §6${args[0]}`);
                } break
                case 'spectator': {
                    sender.runCommand(`gamemode spectator`);
                    sender.tellraw(`§¶§c§lUAC ► §bgamemode switched to §6${args[0]}`);
                } break
                case 'adventure': {
                    sender.runCommand(`gamemode adventure`);
                    sender.tellraw(`§¶§c§lUAC ► §bgamemode switched to §6${args[0]}`);
                } break
            }
        } else {
            return sender.tellraw(`§¶§c§lUAC ► §c§lThis command is meant for staff only`);
        }
    } catch (error) {
        console.warn(error, error.stack);
    }
});
