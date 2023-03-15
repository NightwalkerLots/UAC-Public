import { getGamemode } from '../library/utils/prototype.js';
//import { scoreTest } from '../library/utils/score_testing';
import { world } from '@minecraft/server';

function hotbar (player, message) {
    try {
        return player.onScreenDisplay.setActionBar(`${message.replaceAll('"', '\\"')}`);
    }
    catch {return}
}

function scoreTest(target, objective) {
    try {
        const oB = world.scoreboard.getObjective(objective)
        if (typeof target == 'string') return oB.getScore(oB.getParticipants().find(pT => pT.displayName == target))
        return oB.getScore(target.scoreboard)
    }catch (error) {
        let na = 0;
        //console.warn(error, error.stack);
        return na;
    }
}

function hotbar_message(player) {
    try {
        let hmm_toggle = scoreTest(player, 'hmmtoggle');
        let is_frozen = scoreTest(player, 'fzplr');
        let in_vanish = scoreTest(player, 'vnsh');
        let message_type = scoreTest(player, 'hometp');
        let plr_suicide = scoreTest(player, 'suicide');
        let unban_window = scoreTest(player, 'unbantimer');
        let gamemode = getGamemode(player);

        let playercount = scoreTest('playerdummy', 'playercount');
        let entitycount = scoreTest('entitydummy', 'entitycount');

        let kills = scoreTest(player, 'kills');
        let deaths = scoreTest(player, 'deaths');
        let killstreak = scoreTest(player, 'killstreak');
        let money = scoreTest(player, 'money');


        if(is_frozen) return hotbar(player, `§¶§bYOU HAVE BEEN §cFROZEN §bBY AN OPERATOR \n §¶§bLEAVING MAY RESULT IN A BAN test`);
        if(plr_suicide >= 1) return player.runCommandAsync(`function UAC/asset/hotbar_suicidetimer`);

        if(player.hasTag('staffstatus')) {
            if(unban_window >= 1) return player.runCommandAsync(`function UAC/asset/hotbar_unbantimer`);
            if(in_vanish) return hotbar(player, `§¶§d        VANISH MODE \n §¶§bPlayers§7: §c${playercount} §7|| §bEntities§7: §c${entitycount}`);
            if(hmm_toggle >= 1) {
                if(gamemode == 'creative') player.runCommandAsync(`function UAC/asset/hotbar_creative`);
                if(gamemode == 'spectator') return hotbar(player, `§¶§d      SPECTATOR MODE \n §¶§bPlayers§7: §c${playercount} §7|| §bEntities§7: §c${entitycount}`);
            }
        }
        if(gamemode == 'survival') {
            //with score
            if(hmm_toggle == 1) return hotbar(player, `         §¶§bUAC §7[§2v2§7.§28§7.§27§7] Public \n §¶§bkills§7: §c${kills} §7| §bdeaths§7: §c${deaths} §7| §bkillstreak§7: §c${killstreak} §7| §c$ ${money}`);
            //without score
            if(hmm_toggle == 2) return hotbar(player, `§¶§bUAC §7[§2v2§7.§28§7.§27§7] Public`);
            //resource mode
            if(hmm_toggle == 3) return player.onScreenDisplay.setTitle(`§¶§bCurrent Version §7[§2v2.8.7§7] \n\n§6Self Stats \n§¶§bKills §7: §c${kills}\n§bDeaths §7: §c${deaths}\n§bCurrent Killstreak §7: §c${killstreak}\n§bMoney §7: §c$${money}\n§¶§bDeath Coords: §g §c${scoreTest(player, `X_Coord_D`)}§g/§c${scoreTest(player, `Y_Coord_D`)}§g/§c${scoreTest(player, `Z_Coord_D`)}\n§bTime played: §gd/§c${scoreTest(player, `timeplayedday`)}§g h/§c${scoreTest(player, `timeplayedhr`)}§g m/§c${scoreTest(player, `timeplayedmin`)}§g s/§c${scoreTest(player, `timeplayedsec`)}§g t/§c${scoreTest(player, `timeplayedtick`)}§g\n\n§6Server Stats\n§bPlayerCount §7: §c${playercount}\n§bEntityCount §7: §c${entitycount}`);
        
            if(hmm_toggle == 0) {
                // self stats display
                if(message_type == 1337) hotbar(player, `         §¶§bUAC §7[§2v2§7.§28§7] Public \n §¶§bkills§7: §c${kills} §7| §bdeaths§7: §c${deaths} §7| §bkillstreak§7: §c${killstreak} §7| §c$ ${money}`);
                // server stats display
                if(message_type == 420) hotbar(player, `         §¶§bUAC §7[§2v2§7.§28§7] Public \n §¶§bPlayers §7: §c${playercount} §7|| §bEntities §7 : §c${entitycount}`);
            }
        
        } 
    }catch(error) {
        console.warn(JSON.stringify(error));
        console.warn(error.toString());
    }
}

export { hotbar_message }