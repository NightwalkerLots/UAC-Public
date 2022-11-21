import { scoreTest, tellraw } from 'library/utils/prototype.js';
import { world, Player, Dimension, Entity, ItemStack, MinecraftItemTypes } from '@minecraft/server';
const overworld = world.getDimension('overworld');

const bannedItems = [
    'minecraft:movingblock',
    'minecraft:moving_block',
    'minecraft:beehive',
    'minecraft:bee_nest',
    'minecraft:command_block_minecart'
];

const clearedItems = [
    'minecraft:tadpole_bucket',
    'minecraft:cod_bucket',
    'minecraft:salmon_bucket',
    'minecraft:tropical_fish_bucket',
    'minecraft:pufferfish_bucket',
    'minecraft:axolotl_bucket',
    'minecraft:dispenser'
]


function anticbe() {
    let acmbool = scoreTest('acmtoggledummy', 'acmtoggle');
    //stop script if module is disabled
    if(acmbool == false) return;
    try {
        overworld.runCommand(`kill @e[type=item,name="bee nest"]`);
        overworld.runCommand(`kill @e[type=item,name="beehive"]`);
        overworld.runCommand(`kill @e[type=item,name="tile.movingblock.name]`);
        overworld.runCommand(`kill @e[type=item,name="tile.moving_block.name"]`);
        overworld.runCommand(`kill @e[type=command_block_minecart]`);
        overworld.runCommand(`kill @e[name="minecart"]`);
        overworld.runCommand(`kill @e[type=npc]`);
    } catch { }
    

    let players = world.getPlayers();
    for (let player of players) {   
        const name = player.getName();
        if(acmbool == 0) return;
        let playerInventory = player.getComponent("minecraft:inventory").container;
        let itemArray = [];
        let itemname = undefined;

        for (let i = 0; i < playerInventory.size; i++) {
            const item = playerInventory.getItem(i);
            if (!item) { continue; }
            if(player.hasTag(`staffstatus`)) { return }
            // console.warn(item.id);
            if (bannedItems.includes(item.id)) {
                itemname = item.id.replace('minecraft:', '');
                itemArray.unshift(item.id);
                playerInventory.setItem(i, new ItemStack(MinecraftItemTypes.acaciaBoat, 0, 0)); //removes item
            }
            if (clearedItems.includes(item.id)) {
                playerInventory.setItem(i, new ItemStack(MinecraftItemTypes.acaciaBoat, 0, 0)); //removes item
                itemname = item.id.replace('minecraft:', '');
                player.tellraw(`§¶§c§lUAC ► §6Anti-CBE §c${itemname} §bwas cleared from your inventory`);
            }
        }
        if (itemArray.length) {
            if(acmbool === 0) return;
            player.runCommand('function UAC/asset/cbeitem_gt_warn');
            overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§c§lUAC ► §6Anti-CBE §d${name} §bwas temp-kicked for having §c${itemname}"}]}`);
            player.runCommand(`clear @s`);
            player.runCommand(`kick "${name}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCBE Attempt | ${itemname}`);
            player.runCommand(`event entity @s uac:ban_main`);
        }
    }
}

export { anticbe };