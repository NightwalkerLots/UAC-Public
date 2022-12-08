import { tellrawServer } from 'library/utils/prototype.js';
import { scoreTest } from '../library/utils/score_testing';
import { asyncExecCmd } from '../library/utils/cmd_queue.js';
import { world } from '@minecraft/server';



function ops() {
    let opsbool = scoreTest('opsdummy', 'opstoggle');
    if(opsbool == false) return;

    let players = world.getPlayers();
    for (let player of players) {   
        const name = player.getName();

        if(scoreTest(player, 'is_sleeping') == 1) {
            asyncExecCmd(`time set sunrise`, player);
            asyncExecCmd(`time add 2000`, player);
            asyncExecCmd(`weather clear`, player);
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §btriggered one player sleep`);
        }
    }
}

export { ops }