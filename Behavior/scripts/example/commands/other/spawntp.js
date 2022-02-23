import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'spawntp',
    description: 'Warps the player to where staff have set world spawn',
    usage: '[ spawntp ]',
    example: [
        'spawntp'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();
    if (Server.player.getScore('icmtoggle', name) === 0) {
        return Server.broadcast(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`, name);
    } else if (Server.player.getScore('icmtoggle', name) === 1) {

        if (args[0]) {
            Server.broadcast(`§¶§cUAC ► §e§lYou found a Easter Egg! Hello There. Let this be our little secret ;)`, name);
        }
        else {
            if (Server.player.getScore('worldcustom', name) === 1) {
                let command = `tp "${name}" ${Server.player.getScore('Worldx', name)} ${Server.player.getScore('Worldy', name)} ${Server.player.getScore('Worldz', name)}`;
                Server.runCommand(command);
                Server.broadcast(`§¶§cUAC ► §l§d${name} §bHas warped to World Spawn at §6${Server.player.getScore('Worldx', name)} ${Server.player.getScore('Worldy', name)} ${Server.player.getScore('Worldz', name)}`, name);
                Server.broadcastStaff(`§¶§cUAC ► §d${name} §bwarped to worldspawn`);
                Server.runCommand(`execute "${name}" ~~~ function particle/nether_poof`);
            }
            else {
                Server.runCommand(`execute "${name}" ~~~ tp @s 0 100 0`);
                Server.runCommand(`execute "${name}" ~~~ effect @s slow_falling 20 1 `);
                Server.broadcast(`§¶§cUAC ► §d${name} §bwarped to worldspawn`);
                Server.broadcastStaff(`§¶§cUAC ► §d${name} §bwarped to worldspawn`);
                Server.runCommand(`execute "${name}" ~~~ function particle/nether_poof`);
            }
        }
    }
    else {
        return Server.broadcast(`§¶§cUAC ► §cERROR 2! §6Command Failed`, name);
    }
});
