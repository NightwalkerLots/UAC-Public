import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff, tellrawServer, queryTopSolid } from '../../../library/utils/prototype.js';
import { world, Location } from 'mojang-minecraft';
const overworld = world.getDimension('overworld');
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
    try {


        const { sender } = chatmsg;
        const name = sender.getName();
        console.warn(sender.queryTopSolid());
        if (sender.scoreTest('icmtoggle') === 0) {
            return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);
        } else if (sender.scoreTest('in_combat') === 1) {
            return sender.tellraw(`§¶§cUAC ► §6SpawnTP §cunavailable §bwhile in combat`);
        } else if (sender.scoreTest('tp_cooldown') != 0) {
            return sender.tellraw(`§¶§cUAC ► §6Spawn TP §cunavailable §bwhile warp commands are in cooldown. Please wait 40 seconds.`);
        } else if (sender.scoreTest('icmtoggle') === 1) {

            if (args[0]) {
                sender.tellraw(`§¶§cUAC ► §e§lYou found a Easter Egg! Hello There. Let this be our little secret ;)`);
            }
            else {
                if (sender.scoreTest('worldcustom') === 1) {
                    sender.teleport(new Location(sender.scoreTest('Worldx'), sender.scoreTest('Worldy'), sender.scoreTest('Worldz')), overworld, ...sender.rotation(true));
                    sender.tellraw(`§¶§cUAC ► §l§d${name} §bHas warped to World Spawn at §6${sender.scoreTest('Worldx')} ${sender.scoreTest('Worldy')} ${sender.scoreTest('Worldz')}`);
                    tellrawStaff(`§¶§cUAC ► §d${name} §bwarped to worldspawn`);
                    sender.runCommand(`function particle/nether_poof`);
                    sender.runCommand(`scoreboard players set @s tp_cooldown 900`);
                }
                else {
                    sender.teleport(new Location(0, sender.queryTopSolid() + 1, 0), overworld, ...sender.rotation(true));
                    sender.runCommand(`effect @s slow_falling 20 1 `);
                    tellrawStaff(`§¶§cUAC ► §d${name} §bwarped to worldspawn`);
                    sender.runCommand(`function particle/nether_poof`);
                    sender.runCommand(`scoreboard players set @s tp_cooldown 900`);
                }
            }
        } else {
            return sender.tellraw(`§¶§cUAC ► §cERROR 2! §6Command Failed`);
        }
    } catch (error) {
        console.warn(error, error.stack);
    }
});
