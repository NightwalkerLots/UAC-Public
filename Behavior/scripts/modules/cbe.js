import { scoreTest } from '../library/utils/score_testing.js';
import { world, ItemStack, MinecraftItemTypes } from '@minecraft/server';
import { TellRB } from '../library/utils/prototype.js';
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

let on_tick = 0;

function anticbe() {
    let acmbool = scoreTest('acmtoggledummy', 'acmtoggle');
    //let on_tick = scoreTest('tpsdummy', 'ontick');
    //stop script if module is disabled
    if(acmbool != 1) return;
    on_tick++;
    //console.warn(on_tick);
    if(on_tick == 40) {
        try {
            overworld.runCommandAsync(`function UAC/asset/cbe_item_kill`);
            on_tick = 0;
        } catch { }
    }
    
    
    let players = world.getPlayers();
    for (let player of players) {   
        const name = player.getName();
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
                playerInventory.clearItem(i); //removes item
            }
            if (clearedItems.includes(item.id)) {
                playerInventory.clearItem(i); //removes item
                itemname = item.id.replace('minecraft:', '');
                player.tellraw(`§¶§c§lUAC ► §6Anti-CBE §c${itemname} §bwas cleared from your inventory`);
                TellRB(`flag_1`, `UAC Anti-CBE ► ${name} had a ${itemname} cleared from their inventory`);
            }
        }
        if (itemArray.length) {
            player.runCommandAsync('function UAC/asset/cbeitem_gt_warn');
            overworld.runCommandAsync(`tellraw @a {"rawtext":[{"text":"§¶§c§lUAC ► §6Anti-CBE §d${name} §bwas temp-kicked for having §c${itemname}"}]}`);
            player.runCommandAsync(`clear @s`);
            try{
                player.runCommandAsync(`kick ${name} §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCBE Attempt | ${itemname}`);
            } catch {
                player.runCommandAsync(`event entity @s uac:ban_main`);
            }
        }
    }
}

export { anticbe };