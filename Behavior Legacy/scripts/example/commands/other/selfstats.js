import { Server } from '../../../library/Minecraft.js';
import { world } from '@minecraft/server';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import { setScore } from '../../../library/utils/score_testing.js';
const registerInformation = {
    cancelMessage: true,
    name: 'stats',
    staff: 'false',
    description: 'Shows player stats',
    usage: '<player | get> [player name]',
    example: [
        'stats',
        'stats get {player name}',
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {

    try {
        const { sender } = chatmsg;
        const name = sender.getName();
        
        switch (args[0]) {
            case undefined:
                sender.addTag('stats_temp');
                tellrawStaff(`§l§¶§cUAC STAFF ► §d${name} §bchecked their own stats`);
                return sender.runCommandAsync(`function UAC/itemcommand/playerstats`);
            case 'get': {
                try {
                    let input = args.join(' ').replace('@', '').replace(/"/g, '').replace('get ', '');
                    let playerfound = [...world.getPlayers()].find(player => player.getName() === input);
                    if (!args[1]) return sender.tellraw(`§¶§c§lUAC ► §cNo player name was specified`);
                    if (!playerfound) return sender.tellraw(`§¶§c§lUAC ► §cNo player by that name`);
    
                    let playername = playerfound.getName();
                    if(playername == name) {tellrawStaff(`§l§¶§cUAC STAFF ► §d${name} §bchecked their own stats`);}
                    else {tellrawStaff(`§l§¶§cUAC STAFF ► §d${name} §bchecked §d${playername}§b's stats`);}
                    sender.addTag('stats_temp');
                    sender.runCommandAsync(`execute "${playername}" ~~~ function UAC/itemcommand/playerstats`);
                } catch(error) {
                    console.warn( JSON.stringify(e.stack), e)
                }
                
            }break
        }
    }
    catch (error) {
        console.warn(error, error.stack);
    }
});
