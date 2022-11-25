import { scoreTest, getGamemode, hotbar, tellrawServer } from 'library/utils/prototype.js';
import { world, Player, Dimension, Entity, ItemStack, MinecraftItemTypes } from '@minecraft/server';
const overworld = world.getDimension('overworld');

function scoreTest(name, objective) {
    try {
        const score = parseInt(overworld.runCommand(`scoreboard players test ${name} ${objective} *`).statusMessage.match(/-?\d+/));
        return score;
    } catch {
        return;
    }

}


function hotbar_message(player) {
    let hmm_toggle = player.scoreTest('hmmtoggle');
    let is_frozen = player.scoreTest('fzplr');
    let in_vanish = player.scoreTest('vnsh');
    let message_type = player.scoreTest('hometp');
    let plr_suicide = player.scoreTest('suicide');
    let unban_window = player.scoreTest('unbantimer');
    let gamemode = getGamemode(player);

    let playercount = scoreTest('playerdummy', 'playercount');
    let entitycount = scoreTest('entitydummy', 'entitycount');

    let kills = player.scoreTest('kills');
    let deaths = player.scoreTest('deaths');
    let killstreak = player.scoreTest('killstreak');
    let money = player.scoreTest('money');

    if(is_frozen) return hotbar(player, `§¶§bYOU HAVE BEEN §cFROZEN §bBY AN OPERATOR \n §¶§bLEAVING MAY RESULT IN A BAN test`);
    if(plr_suicide >= 1) return player.runCommand(`function UAC/asset/hotbar_suicidetimer`);

    if(player.hasTag('staffstatus')) {
        if(unban_window >= 1) return player.runCommand(`function UAC/asset/hotbar_unbantimer`);
        if(in_vanish) return hotbar(player, `§¶§d        VANISH MODE \n §¶§bPlayers§7: §c${playercount} §7|| §bEntities§7: §c${entitycount}`);
        if(hmm_toggle >= 1) {
            if(gamemode == 'creative') player.runCommand(`function UAC/asset/hotbar_creative`);
            if(gamemode == 'spectator') return hotbar(player, `§¶§d      SPECTATOR MODE \n §¶§bPlayers§7: §c${playercount} §7|| §bEntities§7: §c${entitycount}`);
        }
    }

    if(gamemode == 'survival') {
        //with score
        if(hmm_toggle == 1) return hotbar(player, `         §¶§bUAC §7[§2v2§7.§28§7] Public \n §¶§bkills§7: §c${kills} §7| §bdeaths§7: §c${deaths} §7| §bkillstreak§7: §c${killstreak} §7| §c$ ${money}`);
        //without score
        if(hmm_toggle == 2) return hotbar(player, `§¶§bUAC §7[§2v2§7.§28§7] Public`);
        //resource mode
        if(hmm_toggle == 3) return player.runCommand(`titleraw @s title {"rawtext":[{"text":"§¶§bCurrent Version §7[§2v2.8§7] \n\n§6Self Stats"},{"text":"\n§¶§bKills §7: "},{"score":{"name":"@s","objective":"kills"}},{"text":"\n§bDeaths §7: "},{"score":{"name":"@s","objective":"deaths"}},{"text":"\n§bCurrent Killstreak §7: "},{"score":{"name":"@s","objective":"killstreak"}},{"text":"\n§bMoney §7: "},{"score":{"name":"@s","objective":"money"}},{"text":"\n§¶§bDeath Coords: §g "},{"score":{"name":"@s","objective":"X_Coord_D"}},{"text":"/"},{"score":{"name":"@s","objective":"Y_Coord_D"}},{"text":"/"},{"score":{"name":"@s","objective":"Z_Coord_D"}},{"text":"\n§bTime played: "},{"score":{"name":"@s","objective":"timeplayedday"}},{"text":"d/"},{"score":{"name":"@s","objective":"timeplayedhr"}},{"text":"h/"},{"score":{"name":"@s","objective":"timeplayedmin"}},{"text":"m/"},{"score":{"name":"@s","objective":"timeplayedsec"}},{"text":"s/"},{"score":{"name":"@s","objective":"timeplayedtick"}},{"text":"t"},{"text":"\n\n§6Server Stats\n§bPlayerCount §7: "},{"score":{"name":"playerdummy","objective":"playercount"}},{"text":"\n§bEntityCount §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}}]}`)
    
        if(hmm_toggle == 0) {
            // self stats display
            if(message_type == 1337) hotbar(player, `         §¶§bUAC §7[§2v2§7.§28§7] Public \n §¶§bkills§7: §c${kills} §7| §bdeaths§7: §c${deaths} §7| §bkillstreak§7: §c${killstreak} §7| §c$ ${money}`);
            // server stats display
            if(message_type == 420) hotbar(player, `         §¶§bUAC §7[§2v2§7.§28§7] Public \n §¶§bPlayers §7: §c${playercount} §7|| §bEntities §7 : §c${entitycount}`);
        }
    
    }



}

export { hotbar_message }