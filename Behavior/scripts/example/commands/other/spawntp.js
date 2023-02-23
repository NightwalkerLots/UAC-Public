import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import { scoreTest } from '../../../library/utils/score_testing.js';

const registerInformation = {
    cancelMessage: true,
    name: 'spawntp',
    staff: 'false',
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
        
        if ( scoreTest(sender, 'icmtoggle') === 0) {
            return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);
        } else if (scoreTest(sender, 'in_combat') === 1) {
            return sender.tellraw(`§¶§cUAC ► §6SpawnTP §cunavailable §bwhile in combat`);
        } else if (scoreTest(sender, 'tp_cooldown') != 0) {
            return sender.tellraw(`§¶§cUAC ► §6Spawn TP §cunavailable §bwhile warp commands are in cooldown. Please wait 40 seconds.`);
        } else if (scoreTest(sender, 'icmtoggle') === 1) {

            if (args[0]) {
                sender.tellraw(`§¶§cUAC ► §e§lYou found a Easter Egg! Hello There. Let this be our little secret ;)`);
            }
            else {
                if (scoreTest(sender, 'worldcustom') === 1) {
                    sender.runCommandAsync(`tp @s ${scoreTest(sender, 'Worldx')} ${scoreTest(sender, 'Worldy')} ${scoreTest(sender, 'Worldz')}`);
                    sender.tellraw(`§¶§cUAC ► §l§d${name} §bHas warped to World Spawn at §6${scoreTest(sender, 'Worldx')} ${scoreTest(sender, 'Worldy')} ${scoreTest(sender, 'Worldz')}`);
                    tellrawStaff(`§¶§cUAC STAFF ► §d${name} §bwarped to worldspawn`);
                    sender.runCommandAsync(`function particle/nether_poof`);
                    sender.runCommandAsync(`scoreboard players set @s tp_cooldown 900`);
                }
                else {
                    sender.runCommandAsync(`tp @s 0 100 0`)
                    sender.runCommandAsync(`effect @s slow_falling 35 1 `);
                    tellrawStaff(`§¶§cUAC STAFF ► §d${name} §bwarped to worldspawn`);
                    sender.runCommandAsync(`function particle/nether_poof`);
                    sender.runCommandAsync(`scoreboard players set @s tp_cooldown 900`);
                }
            }
        } else {
            return sender.tellraw(`§¶§cUAC ► §cERROR 2! §6Command Failed`);
        }
    } catch (error) {
        console.warn(error, error.stack);
    }
});
