import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'worldspawn',
    description: 'Configure the World Spawn in UAC',
    usage: '[ set | remove ]',
    example: [
        'worldspawn remove',
        'worldspawn set 0 90 0'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();
    let worldset = ['set'];
    let worldremove = ['remove'];

    if (Server.player.hasTag('staffstatus', name)) {
        if (worldset.includes(args[0])) {
            Server.runCommand(`scoreboard players operation worlddum Worldx = "${name}" X_Coordinate`);
            Server.runCommand(`scoreboard players operation worlddum Worldy = "${name}" Y_Coordinate`);
            Server.runCommand(`scoreboard players operation worlddum Worldz = "${name}" Z_Coordinate`);
            Server.runCommand(`scoreboard players set "${name}" Worldx ${Server.player.getScore('X_Coordinate', name)}`);
            Server.runCommand(`scoreboard players set "${name}" Worldy ${Server.player.getScore('Y_Coordinate', name)}`);
            Server.runCommand(`scoreboard players set "${name}" Worldz ${Server.player.getScore('Z_Coordinate', name)}`);
            Server.runCommand(`execute "${name}" ~~~ setworldspawn  ~~~`);
            Server.runCommand(`execute "${name}" ~~~ function particle/explode`);
            Server.runCommand(`scoreboard players set worlddum worldcustom 1`);
            Server.broadcast(`§¶§cUAC ► §b§lWorld Spawn configured to §e${Server.player.getScore('Worldx', name)} ${Server.player.getScore('Worldy', name)} ${Server.player.getScore('Worldz', name)}§b! Players will be sent here after passing World Border`, name);
        }
        else if (worldremove.includes(args[0])) {
            Server.runCommand(`scoreboard players set worlddum worldcustom 0`);
            Server.runCommand(`scoreboard players set worlddum Worldx 0`);
            Server.runCommand(`scoreboard players set worlddum Worldz 0`);
            Server.runCommand(`scoreboard players set worlddum Worldy 0`);
            Server.runCommand(`scoreboard players operation "${name}" Worldx = worlddum Worldx`);
            Server.runCommand(`scoreboard players operation "${name}" Worldy = worlddum Worldy`);
            Server.runCommand(`scoreboard players operation "${name}" Worldz = worlddum Worldz`);
            Server.broadcast(`§¶§cUAC ► §b§lCustom World Spawn has been set back to default`, name);
        }
        else {
            Server.broadcast(`§¶§cUAC ► §cERROR 2! §6Usage Example §7:§b§l UAC.worldspawn [ set | remove ]`, name);
        }
    }
    else {
        Server.broadcast(`§¶§cUAC ► §c§lError 4: Only Staff can configure world spawn`, name);
    }
});