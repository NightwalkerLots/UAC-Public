import { world } from '@minecraft/server';

function scoreTest(target, objective) {
    try {
        const oB = world.scoreboard.getObjective(objective)
        if (typeof target == 'string') return oB.getScore(oB.getParticipants().find(pT => pT.displayName == target))
        return oB.getScore(target.scoreboard)
    } catch (error) {
        console.warn(error, error.stack);
    }
}

function movement_check(player) {
    try {
        let lastpos_x = scoreTest(player, 'lastpos_x');
        let lastpos_z = scoreTest(player, 'lastpos_z');

        if(scoreTest(player, 'X_Coordinate') > lastpos_x || scoreTest(player, 'X_Coordinate') < lastpos_x) {
            player.runCommandAsync('scoreboard players set @s notmovingflag 0');
            //player.tellraw(`is moving`);
        }
        if(scoreTest(player, 'Z_Coordinate') > lastpos_z || scoreTest(player, 'Z_Coordinate') < lastpos_z) {
            player.runCommandAsync('scoreboard players set @s notmovingflag 0');
            //player.tellraw(`is moving`);
        }
        if(scoreTest(player, 'X_Coordinate') == lastpos_x || scoreTest(player, 'Z_Coordinate') == lastpos_z) {
            player.runCommandAsync(`scoreboard players add @s notmovingflag 1`);
        }
    }catch (error) {
        console.warn(error);
    }
}

export { movement_check };