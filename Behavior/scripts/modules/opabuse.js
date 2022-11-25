import { getGamemode } from 'library/utils/prototype.js';


function op_abuse(player) {
    if(!player.hasTag(`staffstatus`)) return;
    let gamemode = getGamemode(player)

    if(player.hasTag(`staffstatus`)) {
        //disable godmode
        if(player.hasTag(`tgmGodMode`)) {
            player.runCommand(`tag @s remove tgmGodMode`);
            player.runCommand(`scoreboard players @s reset tgmGodMode`);
            player.runCommand(`effect @s clear`);
            try {player.runCommand(`tag @s remove godmode`)} catch{}
        }
        //disable creative invulnerability
        if(gamemode === 'creative') {
            player.runCommand(`gamemode spectator`);
        }
        //disable autototem
        if(player.hasTag(`totemaut`)) {
            player.runCommand(`tag @s remove totemaut`);
            player.runCommand(`scoreboard players @s set totemtog 0`);
            player.runCommand(`scoreboard players @s set totemaut 0`);
        }
        //force invisible staff into spectator, to remove pvp advantage
        if(player.hasTag(`spectate`) || ( player.scoreTest(`vnsh`) >= 1 ) ) {
            player.runCommand(`gamemode spectator`);
        }
    }
}

export { op_abuse }