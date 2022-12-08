import { scoreTest } from '../library/utils/score_testing.js';
import { asyncExecCmd } from '../library/utils/cmd_queue.js';

function movement_check(player) {
    try {
        let lastpos_x = scoreTest(player, 'lastpos_x');
        let lastpos_z = scoreTest(player, 'lastpos_z');

        if(scoreTest(player, 'X_Coordinate') > lastpos_x || scoreTest(player, 'X_Coordinate') < lastpos_x) {
            asyncExecCmd('scoreboard players set @s notmovingflag 0', player);
            //player.tellraw(`is moving`);
        }
        if(scoreTest(player, 'Z_Coordinate') > lastpos_z || scoreTest(player, 'Z_Coordinate') < lastpos_z) {
            asyncExecCmd('scoreboard players set @s notmovingflag 0', player);
            //player.tellraw(`is moving`);
        }
        if(scoreTest(player, 'X_Coordinate') == lastpos_x || scoreTest(player, 'Z_Coordinate') == lastpos_z) {
            asyncExecCmd(`scoreboard players add @s notmovingflag 1`, player);
        }
    }catch (error) {
        console.warn(error);
    }
}

export { movement_check };