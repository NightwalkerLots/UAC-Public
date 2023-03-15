import { tellrawServer, tellrawStaff, TellRB } from '../library/utils/prototype';
import { scoreTest, setScore } from '../library/utils/score_testing';
import { world } from '@minecraft/server';

function afk_kick(player) {
    const name = player.getName();
    if( player.hasTag('staffstatus') ||  player.hasTag('rb1337')) return;
    if(player.hasTag('is_moving')) { // reset timer
        setScore(player, 'afktimer', 0, false);
    }
    if(scoreTest(player, `afkm`) == 1 && !player.hasTag('is_moving')) { // start counter
        setScore(player, 'afktimer', 1, true);
    }

    //kick count down
    if(scoreTest(player, `afktimer`) == 55) {
        player.sendMessage(`§¶§cUAC §6AFK Kick §b► §d${name} §¶§bRemoved for inactivity in §7: §c4`);
    }
    if(scoreTest(player, `afktimer`) == 60) {
        player.sendMessage(`§¶§cUAC §6AFK Kick §b► §d${name} §¶§bRemoved for inactivity in §7: §c3`);
    }
    if(scoreTest(player, `afktimer`) == 65) {
        player.sendMessage(`§¶§cUAC §6AFK Kick §b► §d${name} §¶§bRemoved for inactivity in §7: §c2`);
    }
    if(scoreTest(player, `afktimer`) == 70) {
        player.sendMessage(`§¶§cUAC §6AFK Kick §b► §d${name} §¶§bRemoved for inactivity in §7: §c1`);
    }
    if(scoreTest(player, `afktimer`) == 72) {
        tellrawServer(`§¶§cUAC §6Anti-AFK §b► §d${name} §¶§cTemp Kicked for Inactivity`);
        TellRB(`flag_0`, `UAC Anti-AFK ► ${name} was temp kicked for inactivity`);
        setScore(player, 'afktimer', 0, false);
        player.runCommandAsync(`kick "${player.getName().replace(`"`, ``)}" §¶§cUAC §6AFK Kick`);
    }
}

export { afk_kick }