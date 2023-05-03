import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff, TellRB } from '../../../library/utils/prototype.js';
import { world } from '@minecraft/server';
const registerInformation = {
    cancelMessage: true,
    name: 'mayfly',
    staff: 'management',
    description: 'Whitelists the player from the anti-fly',
    usage: '[add | remove] @player',
    example: [
        'mayfly add @player',
        'mayfly remove @player'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    try {

        let input = args.join(' ').replace('add ', '').replace('remove ', '').replace('@', '').replace(/"/g, '');
        let playerfound = [...world.getPlayers()].find(player => player.getName() === input);
        //let playername = playerfound.getName();
        const { sender } = chatmsg;
        const name = sender.getName();

        const add = ['add'];
        const remove =['remove'];
        
        
        if (sender.hasTag('staffstatus')) {
            if (args[0]) {
                if(!playerfound) {
                    return sender.tellraw(`§¶§c§lUAC ► §cPlayer not found`);  
                }
                if(add.includes(args[0])) {
                    tellrawStaff(`§l§¶§cUAC STAFF ► §d${playerfound.getName()}§b was given MayFly by §d${name}`);
                    TellRB(`flag_0`, `UAC ► ${name} has whitelisted ${playerfound.getName()} from anti-fly`);
                    sender.runCommandAsync(`execute "${playerfound.getName()}" ~~~ function UAC/mayfly`); 
                } else if (remove.includes(args[0])) {
                    tellrawStaff(`§l§¶§cUAC STAFF ► §d${playerfound.getName()}§b was removed from MayFly by §d${name}`);
                    TellRB(`flag_0`, `UAC ► ${name} has unwhitelisted ${playerfound.getName()} from anti-fly`);
                    sender.runCommandAsync(`execute "${playerfound.getName()}" ~~~ function UAC/mayflyremove`); 
                }
            } else {
                sender.tellraw(`§¶§c§lUAC ► §cNo player specified. Usage: §6UAC.mayfly [add | remove] @player`);
            }
        } else {
            return sender.tellraw(`§¶§c§lUAC ► §c§lThis command is meant for staff only`);
        }
    } catch (error) {
        console.warn(error, error.stack);
    }
});
