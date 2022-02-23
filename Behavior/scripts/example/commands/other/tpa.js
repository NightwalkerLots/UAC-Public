import { Server } from '../../../library/Minecraft.js';
import { World } from 'mojang-minecraft';
const registerInformation = {
    cancelMessage: true,
    name: 'tpa',
    description: 'Open/Close Teleport Requests',
    usage: '[ <open | create> | close | number ]',
    example: [
        'tpa open',
        'tpa close',
        'tpa 10',
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();

    let tpaIntString = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    let tpsopen = ['open', 'create'];
    let tpsclose = ['close', 'cancel'];


    if (Server.player.getScore('icmtoggle', name) === 0) {
        return Server.broadcast(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`, name);
    } else if (Server.player.getScore('icmtoggle', name) === 1) {

        if (registerInformation.name.match(chatmsg)) {
            if (tpsopen.includes(args[0])) {
                if (sender.hasTag('has_tpa')) {
                    return Server.broadcast(`§¶§cUAC ► §bTPA Channel already created! Your Channel §7:§c "${Server.player.getScore('tpa', name)}" `, name);
                } else {
                    Server.runCommand(`scoreboard players random "${name}" tpa 0 11`);
                    Server.runCommand(`tag "${name}" add has_tpa`);
                    Server.broadcast(`§¶§cUAC ► §bTPA Channel "${Server.player.getScore('tpa', name)}" was created`, name);
                    Server.broadcastStaff(`§¶§cUAC ► §d${name} §bopened a tpa channel`);
                }
            }
            else if (tpsclose.includes(args[0])) {
                if (!Server.player.hasTag('has_tpa')) {
                    return Server.broadcast(`§¶§cUAC ► §bThere was no TPA channel to close" `, name);
                } else {
                    Server.broadcast(`§¶§cUAC ► §bTPA Channel "${Server.player.getScore('tpa', name)}" was closed`, name);
                    Server.runCommand(`scoreboard players reset "${name}" tpa`);
                    Server.runCommand(`tag "${name}" remove has_tpa`);
                    Server.broadcastStaff(`§¶§cUAC ► §d${name} §bclosed their tpa channel manually`);
                }
            }
            else if (tpaIntString.includes(args[0])) {
                Server.broadcast(`${channel_match}`, name);
                Server.runCommand(`playsound note.pling "${name}" ~ ~ ~`);
                Server.runCommand(`tellraw "${name}" {"rawtext":[{"text":"§¶§cUAC ► §6TPA §7: §bSuccessfully teleported to §6"},{"selector":"@p[scores={tpa=${args[0]}}]"}]}`);
                Server.runCommand(`tp "${name}" @p[scores={tpa=${args[0]}}]`);
                Server.runCommand(`execute @p[scores={tpa=${args[0]}}] ~~~ tag @s remove has_tpa`);
                Server.runCommand(`execute "${name}" ~~~ function particle/nether_poof`);
                Server.runCommand(`execute @p[scores={tpa=${args[0]}}] ~~~ playsound mob.shulker.teleport @s ~~~ 2 1 2`);
                Server.runCommand(`execute "${name}" ~~~ playsound mob.shulker.teleport @s ~~~ 2 2 2`);
                Server.runCommand(`tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC ► §d${name} §bteleported to §d"},{"selector":"@p[scores={tpa=${args[0]}}]"},{"text":" §bvia §eTPA"}]}`);
                Server.runCommand(`execute @p[scores={tpa=${args[0]}}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §6TPA §7: §5${name} §bhas §bSuccessfully teleported! Your TPA Channel is now closed."}]}`);
                Server.runCommand(`execute @p[scores={tpa=${args[0]}}] ~~~ scoreboard players reset @s tpa`);
            } else {
                return Server.broadcast(`§¶§cUAC ► §cERROR! §6Usage Example §7:§b§l UAC.tpa [ open | close | number ]`, name);
            }
        }
        else {
            return Server.broadcast(`§¶§cUAC ► §cERROR 2! §6Usage Example §7:§b§l UAC.tpa [ open | close | number ]`, name);
        }
    }
});