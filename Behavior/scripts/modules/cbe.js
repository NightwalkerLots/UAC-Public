import { scoreTest } from '../library/utils/score_testing.js';
import { world, ItemStack, MinecraftItemTypes } from '@minecraft/server';
import { asyncExecCmd } from '../library/utils/cmd_queue.js'
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
    let on_tick = scoreTest('tpsdummy', 'ontick');
    //stop script if module is disabled
    if(acmbool == false) return;

    if(on_tick === 1) {
        try {
            asyncExecCmd(`kill @e[type=item,name="bee nest"]`);
            asyncExecCmd(`kill @e[type=item,name="beehive"]`);
            asyncExecCmd(`kill @e[type=item,name="tile.movingblock.name]`);
            asyncExecCmd(`kill @e[type=item,name="tile.moving_block.name"]`);
            asyncExecCmd(`kill @e[type=command_block_minecart]`);
            asyncExecCmd(`kill @e[name="minecart"]`);
            asyncExecCmd(`kill @e[type=npc]`);
        } catch { }
    }
    

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
            asyncExecCmd('function UAC/asset/cbeitem_gt_warn', player);
            overworld.runCommandAsync(`tellraw @a {"rawtext":[{"text":"§¶§c§lUAC ► §6Anti-CBE §d${name} §bwas temp-kicked for having §c${itemname}"}]}`);
            asyncExecCmd(`clear @s`, player);
            try{
                asyncExecCmd(`kick ${name} §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCBE Attempt | ${itemname}`, player);
            } catch {
                asyncExecCmd(`event entity @s uac:ban_main`, player);
            }
        }
    }
}

export { anticbe };