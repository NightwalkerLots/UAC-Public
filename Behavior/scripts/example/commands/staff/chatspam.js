import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff, tellrawServer, queryTopSolid } from '../../../library/utils/prototype.js';
import { world, Location } from 'mojang-minecraft';
const registerInformation = {
    cancelMessage: true,
    name: 'chatspam',
    staff: 'true',
    description: ' Turns anti-chatspam on/off',
    usage: '[ on | off ]',
    example: [
        'chatspam on',
        'chatspam off'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    try {
        const { sender } = chatmsg;
        const name = sender.getName();

        let usage = ['on', 'off'];
        if(args[0]){} else {return sender.tellraw(`§¶§c§lUAC ► §c§lNo argument given. Usage: on/off`)}
        if(args[0]== usage[0] || args[0] == usage[1]) {} else {return sender.tellraw(`§¶§c§lUAC ► §c§lInvalid argument. Usage: on/off`)}
        if(args[1]) {return sender.tellraw(`§¶§c§lUAC ► §c§lExtra argument not needed. Usage: on/off`)}

        if(sender.hasTag('staffstatus')) {
            if(usage[0].includes(args[0])) {
                sender.runCommand(`scoreboard players set acsdummy acstoggle 1`);
                sender.tellraw(`§¶§c§lUAC ► §6Anti-Chatspam §7: §2ENABLED`);
            }
            if(usage[1].includes(args[0])) {
                sender.runCommand(`scoreboard players set acsdummy acstoggle 0`);
                sender.tellraw(`§¶§c§lUAC ► §6Anti-Chatspam §7: §cDISABLED`);
            }
        } else {
            return sender.tellraw(`§¶§c§lUAC ► §c§lThis command is meant for staff only`);
        }
        
        
    } catch (error) {
        console.warn(error, error.stack);
    }
});
