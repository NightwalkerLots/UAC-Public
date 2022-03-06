import '../library/utils/prototype.js';
import './commands/import-commands.js';  //all player chat commands

import { world, Player, Dimension, Entity, ItemStack, MinecraftItemTypes } from 'mojang-minecraft';
const overworld = world.getDimension('overworld');
//This runs a test to see if gametest is even on. Curtain modules will switch methods if gametest fails
const gametestTest = () => {
    const gt_test = `scoreboard players set @r[scores={has_gt=0}] has_gt 1`;
    try { overworld.runCommand(gt_test); } catch { }
};
function scoreTest(name, objective) {
    try {
        const score = parseInt(overworld.runCommand(`scoreboard players test ${name} ${objective} *`).statusMessage.match(/-?\d+/));
        return score;
    } catch {
        return;
    }

}
world.events.tick.subscribe(gametestTest);

/*
░░████░░░████░░████████░░████████░░░░░░░
░░████░░░████░░███░░███░░████████░░░░░░░
░░████░░░████░░████████░░███░░░░░░░░░░░░ <3
░░████░░░████░░███░░███░░████████░░░░░░░
░░███████████░░███░░███░░████████░░░░░░░
*/

// Filter CBE items
const bannedItems = [
    'minecraft:movingblock',
    'minecraft:beehive',
    'minecraft:bee_nest',
    'minecraft:cod_bucket',
    'minecraft:pufferfish_bucket',
    'minecraft:salmon_bucket',
    'minecraft:tropical_fish_bucket',
    'minecraft:powder_snow_bucket',
    'minecraft:axolotl_bucket'
];

let tpsArray = [];
world.events.tick.subscribe(({ deltaTime, currentTick }) => {
    try {
        tpsArray.unshift(deltaTime);
        if (tpsArray.length > 250) { tpsArray.pop(); }
        const tps = 1 / (tpsArray.reduce((a, b) => a + b, 0) / tpsArray.length);
        // console.warn(`${tps.toFixed(3)}`);
        const acmbool = scoreTest('acmtoggledummy', 'acmtoggle');
        // console.warn(acmbool);
        let players = world.getPlayers();
        for (let player of players) {                                                                     //scorecheck for vanilla api
            const name = player.getName();
            let playerInventory = player.getComponent("minecraft:inventory").container;
            let itemArray = [];
            for (let i = 0; i < playerInventory.size; i++) {
                const item = playerInventory.getItem(i);
                if (!item) { continue; }
                // console.warn(item.id);
                if (bannedItems.includes(item.id)) {
                    if (acmbool) {
                        itemArray.unshift(item.id);
                        playerInventory.setItem(i, new ItemStack(MinecraftItemTypes.air, 0, 0)); //removes item
                    }
                }
            }
            if (acmbool && itemArray.length && player.hasTag('staffstatus')) {
                overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§c§lUAC ► §6Anti-CBE §d${name} §bwas temp-kicked for having §c${itemArray}"}]}`);
                player.runCommand('function UAC/asset/cbeitem_gt_warn');
            }
        }
    } catch (error) {
        console.warn(error);
    }
});

// Run when a player loads and joins
// All This was contributed by MrPatches123

