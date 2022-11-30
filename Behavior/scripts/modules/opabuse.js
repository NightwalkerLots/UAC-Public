import { getGamemode } from 'library/utils/prototype.js';
import { scoreTest } from '../library/utils/score_testing';


function op_abuse(player) {
    if(!player.hasTag(`staffstatus`)) return;
    let gamemode = getGamemode(player)

    if(player.hasTag(`staffstatus`)) {
        //disable godmode
        if(player.hasTag(`tgmGodMode`)) {
            player.runCommandAsync(`tag @s remove tgmGodMode`);
            player.runCommandAsync(`scoreboard players @s reset tgmGodMode`);
            player.runCommandAsync(`effect @s clear`);
            try {player.runCommandAsync(`tag @s remove godmode`)} catch{}
        }
        //disable creative invulnerability
        if(gamemode === 'creative') {
            player.runCommandAsync(`gamemode spectator`);
        }
        //disable autototem
        if(player.hasTag(`totemaut`)) {
            player.runCommandAsync(`tag @s remove totemaut`);
            player.runCommandAsync(`scoreboard players @s set totemtog 0`);
            player.runCommandAsync(`scoreboard players @s set totemaut 0`);
        }
        //force invisible staff into spectator, to remove pvp advantage
        if(player.hasTag(`spectate`) || ( scoreTest(player, 'vnsh') >= 1 ) ) {
            player.runCommandAsync(`gamemode spectator`);
        }
    }
}

export { op_abuse }