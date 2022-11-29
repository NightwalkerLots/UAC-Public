import { Server } from '../../../library/Minecraft.js';
import { scoreTest } from '../../../library/utils/prototype.js';
const registerInformation = {
    cancelMessage: true,
    name: 'worldspawn',
    staff: 'true',
    description: 'Configure the World Spawn in UAC',
    usage: '[ set | remove ]',
    example: [
        'worldspawn remove',
        'worldspawn set 0 90 0'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    let worldset = ['set'];
    let worldremove = ['remove'];

    if (sender.hasTag('staffstatus')) {
        if (worldset.includes(args[0])) {
            sender.runCommandAsync(`scoreboard players operation worlddum Worldx = @s X_Coordinate`);
            sender.runCommandAsync(`scoreboard players operation worlddum Worldy = @s Y_Coordinate`);
            sender.runCommandAsync(`scoreboard players operation worlddum Worldz = @s Z_Coordinate`);       
            sender.runCommandAsync(`function UAC/asset/toggle_sync `);
            sender.runCommandAsync(`scoreboard players set @s Worldx ${scoreTest(sender.nameTag, 'X_Coordinate')}`);
            sender.runCommandAsync(`scoreboard players set @s Worldy ${scoreTest(sender.nameTag, 'Y_Coordinate')}`);
            sender.runCommandAsync(`scoreboard players set @s Worldz ${scoreTest(sender.nameTag, 'Z_Coordinate')}`);
            sender.runCommandAsync(`setworldspawn  ~~~`);
            sender.runCommandAsync(`function particle/explode`);
            sender.runCommandAsync(`scoreboard players set worlddum worldcustom 1`);
            sender.tellraw(`§¶§cUAC ► §b§lWorld Spawn configured to §e${scoreTest(sender.nameTag, 'X_Coordinate')} ${scoreTest(sender.nameTag, 'Y_Coordinate')} ${scoreTest(sender.nameTag, 'Z_Coordinate')}§b! Players will be sent here after passing World Border`);
        }
        else if (worldremove.includes(args[0])) {
            sender.runCommandAsync(`scoreboard players set worlddum worldcustom 0`);
            sender.runCommandAsync(`scoreboard players set worlddum Worldx 0`);
            sender.runCommandAsync(`scoreboard players set worlddum Worldz 0`);
            sender.runCommandAsync(`scoreboard players set worlddum Worldy 0`);
            sender.runCommandAsync(`scoreboard players operation @s Worldx = worlddum Worldx`);
            sender.runCommandAsync(`scoreboard players operation @s Worldy = worlddum Worldy`);
            sender.runCommandAsync(`scoreboard players operation @s Worldz = worlddum Worldz`);
            sender.tellraw(`§¶§cUAC ► §b§lCustom World Spawn has been set back to default`);
        }
        else {
            sender.tellraw(`§¶§cUAC ► §cERROR 2! §6Usage Example §7:§b§l UAC.worldspawn [ set | remove ]\n§¶§cINFO ► §bThis tells UAC where worldspawn is. Where you're standing will also be where default spawn is now. People will teleport here when crossing world border, or when using the "Spawntp" chat command.`);
        }
    } else {
        sender.tellraw(`§¶§cUAC ► §c§lError 4: Only Staff can configure world spawn`);
    }
});