import { scoreTest, tellraw, tellrawServer } from 'library/utils/prototype.js';
import { world, Player, Dimension, Entity, ItemStack, MinecraftItemTypes } from '@minecraft/server';
const overworld = world.getDimension('overworld');



function ops() {
    let opsbool = scoreTest('opsdummy', 'opstoggle');
    if(opsbool == false) return;

    let players = world.getPlayers();
    for (let player of players) {   
        const name = player.getName();

        if(player.scoreTest('is_sleeping')) {
            player.runCommand(`time set sunrise`);
            player.runCommand(`time add 2000`);
            player.runCommand(`weather clear`);
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §btriggered one player sleep`);
        }
    }
}

export { ops }