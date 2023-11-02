import { getGamemode, TellRB } from 'library/utils/prototype.js';
import { scoreTest, setScore } from '../library/utils/score_testing.js';
import { overworld } from '../library/utils/cmd_queue.js';


function op_abuse(player) {
    const name = player.getName();
    if(!player.hasTag(`staffstatus`)) return;
    let gamemode = getGamemode(player)

    if(player.hasTag(`staffstatus`)) {
        //disable godmode
        if(player.hasTag(`tgmGodMode`)) {
            player.removeTag(`tgmGodMode`);
            setScore(player, 'tgmGodMode', 0, false);
            player.runCommandAsync(`effect @s clear`);
            TellRB(`flag_1`, `UAC Anti-Op Abuse ► ${name} tried to toggle godmode. Their godmode status was removed.`);
            try {player.removeTag(`godmode`)} catch{}
        }
        //disable creative invulnerability
        if(gamemode === 'creative') {
            player.runCommandAsync(`gamemode spectator`);
            TellRB(`flag_1`, `UAC Anti-Op Abuse ► ${name} tried to enter creative mode. They were forced into spectator instead.`);
        }
        //disable autototem
        if(player.hasTag(`totemaut`)) {
            player.removeTag(`totemaut`);
            setScore(player, 'totemtog', 0, false);
            setScore(player, 'totemaut', 0, false);
            TellRB(`flag_1`, `UAC Anti-Op Abuse ► ${name} tried to toggle auto-totem. Their auto-totem status was removed.`);
        }
        //force invisible staff into spectator, to remove pvp advantage
        if(player.hasTag(`spectate`) || ( scoreTest(player, 'vnsh') >= 1 ) ) {
            player.runCommandAsync(`gamemode spectator`);
        }
    }
}

export { op_abuse }