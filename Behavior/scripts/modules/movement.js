import { scoreTest, tellraw } from 'library/utils/prototype.js';
import { world, Player, Dimension, Entity, ItemStack, MinecraftItemTypes } from '@minecraft/server';
const overworld = world.getDimension('overworld');


function movement_check() {
    let players = world.getPlayers();
        for (let player of players) { 
        let lastpos_x = player.scoreTest('lastpos_x');
        let lastpos_z = player.scoreTest('lastpos_z');

        if(player.scoreTest('X_Coordinate') > lastpos_x || player.scoreTest('X_Coordinate') < lastpos_x) {
            player.runCommand('scoreboard players set @s notmovingflag 0');
            //player.tellraw(`is moving`);
        }
        if(player.scoreTest('Z_Coordinate') > lastpos_z || player.scoreTest('Z_Coordinate') < lastpos_z) {
            player.runCommand('scoreboard players set @s notmovingflag 0');
            //player.tellraw(`is moving`);
        }
        if(player.scoreTest('X_Coordinate') == lastpos_x || player.scoreTest('Z_Coordinate') == lastpos_z) {
            player.runCommand(`scoreboard players add @s notmovingflag 1`);
        }
    }
}

export { movement_check };