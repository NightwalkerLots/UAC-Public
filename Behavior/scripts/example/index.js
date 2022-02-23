import './commands/import-commands.js';  //all player chat commands
import { word, Player, Dimension, Entity, ItemStack, MinecraftItemTypes } from 'mojang-minecraft';
const overworld = world.getDimension('overworld') 
//This runs a test to see if gametest is even on. Curtain modules will switch methods if gametest fails
const gametestTest = () => {
    const gt_test = `scoreboard players set @r[scores={has_gt=0}] has_gt 1`
    overworld.runCommand(gt_test, World.getDimension("overworld"));
}
world.events.tick.unsubscribe()
world.events.tick.subscribe()

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
world.events.tick.subscribe(({deltaTime,currentTick}) => {
    try {
        tpsArray.unshift(deltaTime);
        if (tpsArray.length > 250) { tpsArray.pop(); }
        const tps = 1/(tpsArray.reduce((a, b) => a + b, 0) / tpsArray.length);
        console.warn(`${tps.toFixed(5)}`);
        const acmbool = Boolean(parseInt(overworld.runCommand(`scoreboard players test acmtoggledummy ACM *`).statusMessage.match(/-?\d+/))); 
        let players = World.getPlayers();
        for (let player of players) {                                                                     //scorecheck for vanilla api
                const name = player.getName()
                let playerInventory = player.getComponent("minecraft:inventory").container;
                let itemArray = [];
                for (let i = 0; i < playerInventory.size; i++) {
                    const item = playerInventory.getItem(i);
                    if (!item) { continue;}
                    console.warn(item.id);
                    if (bannedItems.includes(item.id)) {
                        if(acmbool) {
                            itemArray.unshift(item.id);
                            playerInventory.setItem(i, new ItemStack(MinecraftItemTypes.air, 0, 0)); //removes item
                        }
                    }
                }
                if (acmbool && itemArray.length) {
                    overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§c§lUAC ► §6Anti-CBE §d${name} §bwas temp-kicked for having §c${itemArray}"}]}`)
                    player.runCommand('function UAC/asset/cbeitem_gt_warn')
                }
        }
    } catch (error) {
        console.warn(error);
    }
});

// Run when a player loads and joins
// All This was contributed by MrPatches123
const betaPlayerFunctions = {
    getName: function () {
        //if (/"|\\/.test(this.nameTag)) {
        //    this.nameTag = this.nameTag.replace(/"|\\/g, '');
        //}
         return this.nameTag;
    } //not beta but fixes nameSpoof command tartgeting issues
};
Object.assign(Player.prototype, betaPlayerFunctions);
