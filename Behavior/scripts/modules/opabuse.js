import { getGamemode } from 'library/utils/prototype.js';
import { scoreTest, setScore } from '../library/utils/score_testing.js';
import { overworld } from '../library/utils/cmd_queue.js';


function op_abuse(player) {
    if(!player.hasTag(`staffstatus`)) return;
    let gamemode = getGamemode(player)

    if(player.hasTag(`staffstatus`)) {
        //disable godmode
        if(player.hasTag(`tgmGodMode`)) {
            player.removeTag(`tgmGodMode`);
            setScore(player, 'tgmGodMode', 0, false);
            player.runCommandAsync(`effect @s clear`);
            try {player.removeTag(`godmode`)} catch{}
        }
        //disable creative invulnerability
        if(gamemode === 'creative') {
            player.runCommandAsync(`gamemode spectator`);
        }
        //disable autototem
        if(player.hasTag(`totemaut`)) {
            player.removeTag(`totemaut`);
            setScore(player, 'totemtog', 0, false);
            setScore(player, 'totemaut', 0, false);
        }
        //force invisible staff into spectator, to remove pvp advantage
        if(player.hasTag(`spectate`) || ( scoreTest(player, 'vnsh') >= 1 ) ) {
            player.runCommandAsync(`gamemode spectator`);
        }
    }
}

export { op_abuse }