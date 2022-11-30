import { tellrawStaff } from 'library/utils/prototype.js';
import { scoreTest } from '../library/utils/score_testing';
import maxItemStack, { defaultMaxItemStack } from 'library/utils/maxstack.js';
import { world, ItemStack, MinecraftItemTypes } from '@minecraft/server';

const overworld = world.getDimension('overworld');

const unobtainables = {
    'minecraft:invisible_bedrock': 0,
    'minecraft:flowing_lava': 0,
    'minecraft:lava': 0,
    'minecraft:flowing_water': 0,
    'minecraft:water': 0,
    'minecraft:lit_redstone_lamp': 0,
    'minecraft:pistonarmcollision': 0,
    'minecraft:tripwire': 0,
    'minecraft:unpowered_comparator': 0,
    'minecraft:powered_comparator': 0,
    'minecraft:fire': 0,
    'minecraft:lit_furnace': 0,
    'minecraft:lit_redstone_ore': 0,
    'minecraft:unlit_redstone_torch': 0,
    'minecraft:portal': 0,
    'minecraft:powered_repeater': 0,
    'minecraft:invisiblebedrock': 0,
    'minecraft:end_gateway': 0,
    'minecraft:end_portal': 0,
    'minecraft:end_portal_frame': 0,
    'minecraft:structure_void': 0,
    'minecraft:chalkboard': 0,
    'minecraft:bubble_column': 0,
    'minecraft:lit_smoker': 0,
    'minecraft:lava_cauldron': 0,
    'minecraft:jigsaw': 0,
    'minecraft:lit_blast_furnace': 0,
    'minecraft:light_block': 0,
    'minecraft:stickypistonarmcollision': 0,
    'minecraft:soul_fire': 0,
    'minecraft:lit_deepslate_redstone_ore': 0,
    'minecraft:camera': 0,
    'minecraft:allow': 0,
    'minecraft:deny': 0,
    'minecraft:bedrock': 0,
    'minecraft:barrier': 0,
    'minecraft:border_block': 0,
    'minecraft:structure_block': 0,
    'minecraft:glowingobsidian': 0,
    'minecraft:glow_stick': 0,
    'minecraft:netherreactor': 0,
    'minecraft:info_update': 0,
    'minecraft:glowingobsidian': 0,
    'minecraft:mob_spawner': 0,
};


function unobtainable() {
    const uoimbool = scoreTest('uoimtoggledummy', 'uoimtoggle');
    const lore_bool = scoreTest('almdummy', 'almtoggle');
    if(uoimbool === 0) return;

    let players = world.getPlayers();
    for (let player of players) {   
        const name = player.getName();
        if(player.hasTag(`staffstatus`)) { continue }
        let playerInventory = player.getComponent("minecraft:inventory").container;
        
        let itemArray = [];
        let itemname = undefined;
        for (let i = 0; i < playerInventory.size; i++) {
            const item = playerInventory.getItem(i);
            if (!item) { continue; }
            const maxStack = maxItemStack[item.id] ?? defaultMaxItemStack;
            let loreData = String(item.getLore());
            itemname = item.id.replace('minecraft:', '');
            let displayname = item.nameTag;
            
            //flag illegal stack of items
            if (item.amount < 0 || item.amount > maxStack) {
                tellrawStaff(`§¶§c§lUAC ► §6Unobtainable Items §d${name} §bhad §c${item.amount} §bof §c${itemname}`);
                playerInventory.setItem(i, new ItemStack(MinecraftItemTypes.acaciaBoat, 0, 0)); //removes item
            }
            
            //flag items with lore data
            if(loreData.length && lore_bool) {
                if(loreData == '(+DATA)') continue;
                tellrawStaff(`§¶§c§lUAC ► §6Unobtainable Items §d${name} §bhad modified lore on §c${itemname} \n§6§lLore§7: §c§l' ${loreData} '\n§6§lDisplay Name§7: §c§l' ${displayname} '`);
                playerInventory.setItem(i, new ItemStack(MinecraftItemTypes.acaciaBoat, 0, 0)); //removes item
                try {
                    player.runCommandAsync(`kick ${name} §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUnobtainable Item | ${itemname}`);
                } catch {
                    player.runCommandAsync(`event entity @s uac:ban_main`);
                }
            }

            //flag element items
            if(item.id.includes(`element`)) {
                tellrawStaff(`§¶§c§lUAC ► §6Unobtainable Items §d${name} §bhad §c${item.amount} §bof §c${itemname}`);
                playerInventory.setItem(i, new ItemStack(MinecraftItemTypes.acaciaBoat, 0, 0)); //removes item
            }

            //flag illegal items
            if(item.id in unobtainables || item.id.includes(`_egg`)) {
                itemArray.unshift(item.id);
                playerInventory.setItem(i, new ItemStack(MinecraftItemTypes.acaciaBoat, 0, 0)); //removes item
            }
            if (itemArray.length) {
                player.runCommandAsync('function UAC/asset/illegalitemwarn');
                overworld.runCommandAsync(`tellraw @a {"rawtext":[{"text":"§¶§c§lUAC ► §6Unobtainable Items §d${name} §bwas temp-kicked for having §c${itemname}"}]}`);
                player.runCommandAsync(`clear @s`);
                try {
                    player.runCommandAsync(`kick ${name} §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUnobtainable Item | ${itemname}`);
                } catch {
                    player.runCommandAsync(`event entity @s uac:ban_main`);
                }
            }
        }
    }
}


export { unobtainable }