import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
const registerInformation = {
    cancelMessage: true,
    name: 'stats',
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
        const ComStringStats = `function API/asset/playerstats`;
        const PlayerArgString = {
            one: Server.player.find(`${args[1]}`),
            two: Server.player.find(`${args[1]} ${args[2]}`),
            three: Server.player.find(`${args[1]} ${args[2]} ${args[3]}`),
            four: Server.player.find(`${args[1]} ${args[2]} ${args[3]} ${args[4]}`),
        };
        const PlayerStringStats = {
            one: `execute "${args[1]}" ~~~ function API/asset/playerstats`,
            two: `execute "${args[1]} ${args[2]}" ~~~ function API/asset/playerstats`,
            three: `execute "${args[1]} ${args[2]} ${args[3]}" ~~~ function API/asset/playerstats`,
            four: `execute "${args[1]} ${args[2]} ${args[3]} ${args[4]}" ~~~ function API/asset/playerstats`
        };
        if (sender.scoreTest('icmtoggle') === 0) {
            return sender.tellraw(`§¶§cUNITY API §b► §c§lThe Realm Owner currently has Player Commands Disabled`);
        } else if (sender.scoreTest('icmtoggle') === 1) {
            sender.addTag('stats_temp');  //gives tag
            if (cmdUsage.includes(args[0])) {
                if (!args[1]) {
                    sender.runCommand(`playsound note.pling @s ~ ~ ~`);
                    sender.tellraw(`§¶§cUNITY API §b► §c§lPlease Provide Player Name`);
                    sender.removeTag('stats_temp');
                }
                else if (args[1] && !args[2]) {
                    if (PlayerArgString.one) {
                        sender.runCommand(`playsound note.pling @s ~ ~ ~`);
                        sender.runCommand(`${PlayerStringStats.one}`);
                        sender.removeTag('stats_temp');
                        return tellrawStaff(`§¶§cUNITY API §b► §d${name} §bused stats §d${args.join(' ')}`);
                    }
                    else {
                        sender.tellraw(`§¶§cUNITY API §b► §c§lNo player by that name`);
                    }
                }
                else if (args[1] && args[2] && !args[3]) {
                    if (PlayerArgString.two) {
                        sender.runCommand(`playsound note.pling @s ~ ~ ~`);
                        sender.runCommand(`${PlayerStringStats.two}`);
                        sender.removeTag('stats_temp');
                        return tellrawStaff(`§¶§cUNITY API §b► §d${name} §bused stats §d${args.join(' ')}`);
                    }
                    else {
                        return sender.tellraw(`§¶§cUNITY API §b► §c§lNo player by that name`);
                    }
                }
                else if (args[1] && args[2] && args[3] && !args[4]) {
                    if (PlayerArgString.three) {
                        sender.runCommand(`playsound note.pling @s ~ ~ ~`);
                        sender.runCommand(`${PlayerStringStats.three}`);
                        sender.removeTag('stats_temp');
                        return tellrawStaff(`§¶§cUNITY API §b► §d${name} §bused stats §d${args.join(' ')}`);
                    }
                    else {
                        sender.tellraw(`§¶§cUNITY API §b► §c§lNo player by that name`);
                    }
                }
                else if (args[1] && args[2] && args[3] && args[4]) {
                    if (PlayerArgString.four) {
                        sender.runCommand(`playsound note.pling @s ~ ~ ~`);
                        sender.runCommand(`${PlayerStringStats.four}`);
                        sender.removeTag('stats_temp');
                        return tellrawStaff(`§¶§cUNITY API §b► §d${name} §bused stats §d${args.join(' ')}`);
                    }
                    else {
                        sender.tellraw(`§¶§cUNITY API §b► §c§lNo player by that name`);
                    }
                }
                else {
                    sender.tellraw(`§¶§cUNITY API §b► §c§lError : Did not Understand Player Name`);
                    sender.runCommand(`tag @s remove stats_temp`);
                }
            }
            else if (registerInformation.name.match(chatmsg)) {
                sender.runCommand(`${ComStringStats}`);
                sender.removeTag('stats_temp');
                sender.runCommand(`playsound note.pling @s ~ ~ ~`);
                return tellrawStaff(`§¶§cUNITY API §b► §d${name} §bchecked their stats`);
            } else {
                return sender.tellraw(`§¶§cUNITY API §b► §c§lError : Command Failed`);
            }
        }
    } catch (error) {
        console.warn(error, error.stack);
    }
});
