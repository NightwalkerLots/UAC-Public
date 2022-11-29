import { scoreTest } from 'library/utils/prototype.js';
import { world } from '@minecraft/server';

function movement_check() {
    let players = world.getPlayers();
        for (let player of players) { 
        let lastpos_x = scoreTest(player.nameTag, 'lastpos_x');
        let lastpos_z = scoreTest(player.nameTag, 'lastpos_z');

        if(scoreTest(player.nameTag, 'X_Coordinate') > lastpos_x || scoreTest(player.nameTag, 'X_Coordinate') < lastpos_x) {
            player.runCommandAsync('scoreboard players set @s notmovingflag 0');
            //player.tellraw(`is moving`);
        }
        if(scoreTest(player.nameTag, 'Z_Coordinate') > lastpos_z || scoreTest(player.nameTag, 'Z_Coordinate') < lastpos_z) {
            player.runCommandAsync('scoreboard players set @s notmovingflag 0');
            //player.tellraw(`is moving`);
        }
        if(scoreTest(player.nameTag, 'X_Coordinate') == lastpos_x || scoreTest(player.nameTag, 'Z_Coordinate') == lastpos_z) {
            player.runCommandAsync(`scoreboard players add @s notmovingflag 1`);
        }
    }
}

export { movement_check };