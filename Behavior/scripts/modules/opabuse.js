import { getGamemode } from 'library/utils/prototype.js';
import { scoreTest } from '../library/utils/score_testing.js';
import { asyncExecCmd } from '../library/utils/cmd_queue.js'


function op_abuse(player) {
    if(!player.hasTag(`staffstatus`)) return;
    let gamemode = getGamemode(player)

    if(player.hasTag(`staffstatus`)) {
        //disable godmode
        if(player.hasTag(`tgmGodMode`)) {
            player.removeTag(`tgmGodMode`);
            asyncExecCmd(`scoreboard players @s reset tgmGodMode`, player);
            asyncExecCmd(`effect @s clear`, player);
            try {player.removeTag(`godmode`)} catch{}
        }
        //disable creative invulnerability
        if(gamemode === 'creative') {
            asyncExecCmd(`gamemode spectator`, player);
        }
        //disable autototem
        if(player.hasTag(`totemaut`)) {
            player.removeTag(`totemaut`);
            asyncExecCmd(`scoreboard players @s set totemtog 0`, player);
            asyncExecCmd(`scoreboard players @s set totemaut 0`, player);
        }
        //force invisible staff into spectator, to remove pvp advantage
        if(player.hasTag(`spectate`) || ( scoreTest(player, 'vnsh') >= 1 ) ) {
            asyncExecCmd(`gamemode spectator`, player);
        }
    }
}

export { op_abuse }