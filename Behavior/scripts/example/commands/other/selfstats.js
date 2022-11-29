import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff, scoreTest } from '../../../library/utils/prototype.js';
const registerInformation = {
    cancelMessage: true,
    name: 'stats',
    staff: 'false',
    description: 'Shows player stats',
    usage: '<player | get> [player name]',
    example: [
        'stats',
        'stats get {player name}',
        'stats player {player name}'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {

    try {
        const { sender } = chatmsg;
        const name = sender.getName();
        let cmdUsage = ['get', 'player'];
        const ComStringStats = `function UAC/itemcommand/playerstats`;
        const PlayerArgString = {
            one: Server.player.find(`${args[1]}`),
            two: Server.player.find(`${args[1]} ${args[2]}`),
            three: Server.player.find(`${args[1]} ${args[2]} ${args[3]}`),
            four: Server.player.find(`${args[1]} ${args[2]} ${args[3]} ${args[4]}`),
        };
        const PlayerStringStats = {
            one: `execute "${args[1]}" ~~~ function UAC/itemcommand/playerstats`,
            two: `execute "${args[1]} ${args[2]}" ~~~ function UAC/itemcommand/playerstats`,
            three: `execute "${args[1]} ${args[2]} ${args[3]}" ~~~ function UAC/itemcommand/playerstats`,
            four: `execute "${args[1]} ${args[2]} ${args[3]} ${args[4]}" ~~~ function UAC/itemcommand/playerstats`
        };
        if ( scoreTest(sender.nameTag, 'icmtoggle') === 0) {
            return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);
        } else if ( scoreTest(sender.nameTag, 'icmtoggle') === 1) {
            sender.addTag('stats_temp');  //gives tag
            if (cmdUsage.includes(args[0])) {
                if (!args[1]) {
                    sender.runCommandAsync(`playsound note.pling @s ~ ~ ~`);
                    sender.tellraw(`§¶§cUAC ► §c§lPlease Provide Player Name`);
                    sender.removeTag('stats_temp');
                }
                else if (args[1] && !args[2]) {
                    if (PlayerArgString.one) {
                        sender.runCommandAsync(`playsound note.pling @s ~ ~ ~`);
                        sender.runCommandAsync(`${PlayerStringStats.one}`);
                        sender.removeTag('stats_temp');
                        return tellrawStaff(`§¶§cUAC ► §d${name} §bused stats §d${args.join(' ')}`);
                    }
                    else {
                        sender.tellraw(`§¶§cUAC ► §c§lNo player by that name`);
                    }
                }
                else if (args[1] && args[2] && !args[3]) {
                    if (PlayerArgString.two) {
                        sender.runCommandAsync(`playsound note.pling @s ~ ~ ~`);
                        sender.runCommandAsync(`${PlayerStringStats.two}`);
                        sender.removeTag('stats_temp');
                        return tellrawStaff(`§¶§cUAC ► §d${name} §bused stats §d${args.join(' ')}`);
                    }
                    else {
                        return sender.tellraw(`§¶§cUAC ► §c§lNo player by that name`);
                    }
                }
                else if (args[1] && args[2] && args[3] && !args[4]) {
                    if (PlayerArgString.three) {
                        sender.runCommandAsync(`playsound note.pling @s ~ ~ ~`);
                        sender.runCommandAsync(`${PlayerStringStats.three}`);
                        sender.removeTag('stats_temp');
                        return tellrawStaff(`§¶§cUAC ► §d${name} §bused stats §d${args.join(' ')}`);
                    }
                    else {
                        sender.tellraw(`§¶§cUAC ► §c§lNo player by that name`);
                    }
                }
                else if (args[1] && args[2] && args[3] && args[4]) {
                    if (PlayerArgString.four) {
                        sender.runCommandAsync(`playsound note.pling @s ~ ~ ~`);
                        sender.runCommandAsync(`${PlayerStringStats.four}`);
                        sender.removeTag('stats_temp');
                        return tellrawStaff(`§¶§cUAC ► §d${name} §bused stats §d${args.join(' ')}`);
                    }
                    else {
                        sender.tellraw(`§¶§cUAC ► §c§lNo player by that name`);
                    }
                }
                else {
                    sender.tellraw(`§¶§cUAC ► §c§lError : Did not Understand Player Name`);
                    sender.runCommandAsync(`tag @s remove stats_temp`);
                }
            }
            else if (registerInformation.name.match(chatmsg)) {
                sender.runCommandAsync(`${ComStringStats}`);
                sender.removeTag('stats_temp');
                sender.runCommandAsync(`playsound note.pling @s ~ ~ ~`);
                return tellrawStaff(`§¶§cUAC ► §d${name} §bchecked their stats`);
            } else {
                return sender.tellraw(`§¶§cUAC ► §c§lError : Command Failed`);
            }
        }
    } catch (error) {
        console.warn(error, error.stack);
    }
});
