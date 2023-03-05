import { tellrawServer, TellRB } from '../../../library/utils/prototype.js';
import { Server } from '../../../library/Minecraft.js';
import { world } from '@minecraft/server';

const registerInformation = {
    cancelMessage: true,
    name: 'ban',
    staff: 'true',
    description: 'Enter/Leave Vanish Mode. Execute again to toggle.',
    usage: '',
    example: [
        'ban player reason'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    try {

        
        const { sender } = chatmsg;
        const name = sender.getName();
        
        let reason = []
        
        
        if (sender.hasTag('staffstatus')) {
            if(!args[0]) {return sender.tellraw(`§¶§c§lUAC ► §cPlayer Name not specified`)}
            let input = args[0].replace('@', '').replace(/"/g, '')
            let playerfound = [...world.getPlayers()].find(player => player.getName() === input);
            if(!playerfound) {return sender.tellraw(`§¶§cUAC ► §c§lError 7: No player by that name. §cUsage : §6UAC.ban @player [reason]\n§bIf they have spaces in their name, instead use\n§6/scoreboard players [ playername ] set Ban 1`);}
            
            
            if(args[1]) {
                reason.push(`${args.join(' ').replace(`${args[0]} `, '').replace('@', '')}`)
            } else {
                reason.push(`None Given`);
            }
            if(playerfound) {
                let playername = playerfound.getName();
                if (playername == name) {return sender.tellraw(`§¶§c§lUAC ► §c§lCan't ban yourself`); }
                sender.runCommandAsync(`tag ${playername} remove reason_none`);
                tellrawServer(`§¶§c§lUAC ► §d${name} §bbanned §d${playername} §bREASON : §c${reason}`);
                TellRB(`ban`, `UAC ► ${name} has banned ${playername}. REASON : ${reason}`);
                sender.runCommandAsync(`tag ${playername} add reason${args.join('_').replace(`${playername}`, '').replace('@', '').replace(args[0], '')}`);
                sender.runCommandAsync(`scoreboard players set ${playername} Ban 1`);
                sender.runCommandAsync(`tag ${playername} add Ban`);
            }

            
        } else {
            return sender.tellraw(`§¶§c§lUAC ► §c§lThis command is meant for staff only`);
        }
    } catch (error) {
        console.warn(error, error.stack);
    }
});
