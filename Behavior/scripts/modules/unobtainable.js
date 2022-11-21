import { scoreTest, tellraw } from 'library/utils/prototype.js';
import { world, Player, Dimension, Entity, ItemStack, MinecraftItemTypes } from '@minecraft/server';
const overworld = world.getDimension('overworld');

const spawneggs = [
    'minecraft:npc_spawn_egg',
    'minecraft:glow_squid_spawn_egg',
    'minecraft:axolotl_spawn_egg',
    'minecraft:goat_spawn_egg',
    'minecraft:strider_spawn_egg',
    'minecraft:bee_spawn_egg',
    'minecraft:fox_spawn_egg',
    'minecraft:wandering_trader_spawn_egg',
    'minecraft:panda_spawn_egg',
    'minecraft:cod_spawn_egg',
    'minecraft:tropical_fish_spawn_egg',
    'minecraft:salmon_spawn_egg',
    'minecraft:pufferfish_spawn_egg',
    'minecraft:cat_spawn_egg',
    'minecraft:turtle_spawn_egg',
    'minecraft:parrot_spawn_egg',
    'minecraft:dolphin_spawn_egg',
    'minecraft:llama_spawn_egg',
    'minecraft:polar_bear_spawn_egg',
    'minecraft:zombie_horse_spawn_egg',
    'minecraft:skeleton_horse_spawn_egg',
    'minecraft:mule_spawn_egg',
    'minecraft:donkey_spawn_egg',
    'minecraft:horse_spawn_egg',
    'minecraft:ocelot_spawn_egg',
    'minecraft:bat_spawn_egg',
    'minecraft:rabbit_spawn_egg',
    'minecraft:squid_spawn_egg',
    'minecraft:mooshroom_spawn_egg',
    'minecraft:villager_spawn_egg',
    'minecraft:wolf_spawn_egg',
    'minecraft:sheep_spawn_egg',
    'minecraft:pig_spawn_egg',
    'minecraft:cow_spawn_egg',
    'minecraft:chicken_spawn_egg',
    'minecraft:piglin_brute_spawn_egg',
    'minecraft:zoglin_spawn_egg',
    'minecraft:hoglin_spawn_egg',
    'minecraft:piglin_spawn_egg',
    'minecraft:drowned_spawn_egg',
    'minecraft:vex_spawn_egg',
    'minecraft:evoker_spawn_egg',
    'minecraft:ravager_spawn_egg',
    'minecraft:phantom_spawn_egg',
    'minecraft:vindicator_spawn_egg',
    'minecraft:endermite_spawn_egg',
    'minecraft:shulker_spawn_egg',
    'minecraft:elder_guardian_spawn_egg',
    'minecraft:guardian_spawn_egg',
    'minecraft:wither_skeleton_spawn_egg',
    'minecraft:husk_spawn_egg',
    'minecraft:stray_spawn_egg',
    'minecraft:witch_spawn_egg',
    'minecraft:zombie_villager_spawn_egg',
    'minecraft:blaze_spawn_egg',
    'minecraft:magma_cube_spawn_egg',
    'minecraft:ghast_spawn_egg',
    'minecraft:cave_spider_spawn_egg',
    'minecraft:silverfish_spawn_egg',
    'minecraft:enderman_spawn_egg',
    'minecraft:slime_spawn_egg',
    'minecraft:spider_spawn_egg',
    'minecraft:zombie_pigman_spawn_egg',
    'minecraft:skeleton_spawn_egg',
    'minecraft:creeper_spawn_egg',
    'minecraft:zombie_spawn_egg'
];

const unobtainables = {
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
    if(uoimbool === 0) return;

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
            if(item.id in unobtainables || spawneggs.includes(item.id)) {
                itemname = item.id.replace('minecraft:', '');
                itemArray.unshift(item.id);
                playerInventory.setItem(i, new ItemStack(MinecraftItemTypes.acaciaBoat, 0, 0)); //removes item
            }
            if (itemArray.length) {
                player.runCommand('function UAC/asset/illegalitemwarn');
                overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§c§lUAC ► §6Unobtainable Items §d${name} §bwas temp-kicked for having §c${itemname}"}]}`);
                player.runCommand(`clear @s`);
                player.runCommand(`kick "${name}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUnobtainable Item | ${itemname}`);
                
            }
        }
    }
}


export { unobtainable }