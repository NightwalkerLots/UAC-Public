import { Server } from '../../../library/Minecraft.js';
import { scoreTest } from '../../../library/utils/score_testing.js';
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
            sender.runCommandAsync(`function UAC/asset/SetWorldSpawn_gt_asset`);
            sender.runCommandAsync(`scoreboard players set @s Worldx ${scoreTest(sender, 'X_Coordinate')}`);
            sender.runCommandAsync(`scoreboard players set @s Worldy ${scoreTest(sender, 'Y_Coordinate')}`);
            sender.runCommandAsync(`scoreboard players set @s Worldz ${scoreTest(sender, 'Z_Coordinate')}`);
            sender.tellraw(`§¶§cUAC ► §b§lWorld Spawn configured to §e${scoreTest(sender, 'X_Coordinate')} ${scoreTest(sender, 'Y_Coordinate')} ${scoreTest(sender, 'Z_Coordinate')}§b! Players will be sent here after passing World Border`);
        }
        else if (worldremove.includes(args[0])) {
            sender.runCommandAsync(`function UAC/asset/RemoveWorldSpawn_gt_asset`);
            sender.tellraw(`§¶§cUAC ► §b§lCustom World Spawn has been set back to default`);
        }
        else {
            sender.tellraw(`§¶§cUAC ► §cERROR 2! §6Usage Example §7:§b§l UAC.worldspawn [ set | remove ]\n§¶§cINFO ► §bThis tells UAC where worldspawn is. Where you're standing will also be where default spawn is now. People will teleport here when crossing world border, or when using the "Spawntp" chat command.`);
        }
    } else {
        sender.tellraw(`§¶§cUAC ► §c§lError 4: Only Staff can configure world spawn`);
    }
});