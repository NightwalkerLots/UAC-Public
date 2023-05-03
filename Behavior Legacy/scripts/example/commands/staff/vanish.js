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
        let gamemode = getGamemode(sender);
        
        if (sender.hasTag('staffstatus')) {
            sender.runCommandAsync(`function UAC/asset/vanish_asset`);
            switch (args[0]) {
                case undefined:
                    return sender.tellraw(`§¶§c§lUAC ► §bYou've kept your current gamemode of §6${gamemode}`);
                case 'survival': {
                    sender.runCommandAsync(`gamemode 0`);
                    sender.tellraw(`§¶§c§lUAC ► §bgamemode switched to §6${args[0]}`);
                } break
                case 'creative': {
                    sender.runCommandAsync(`gamemode 1`);
                    sender.tellraw(`§¶§c§lUAC ► §bgamemode switched to §6${args[0]}`);
                } break
                case 'spectator': {
                    sender.runCommandAsync(`gamemode spectator`);
                    sender.tellraw(`§¶§c§lUAC ► §bgamemode switched to §6${args[0]}`);
                } break
                case 'adventure': {
                    sender.runCommandAsync(`gamemode adventure`);
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
