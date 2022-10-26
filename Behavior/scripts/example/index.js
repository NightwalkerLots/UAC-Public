import './wrap.js';
import '../library/utils/prototype.js';
import './commands/import-commands.js';  //all player chat commands

import { world as World, MinecraftBlockTypes, EntityEventOptions, system } from "@minecraft/server";
import { tellrawStaff, tellrawServer } from '../library/utils/prototype.js';

import { world, Player, Dimension, Entity, ItemStack, MinecraftItemTypes } from '@minecraft/server';
const overworld = world.getDimension('overworld');
//This runs a test to see if gametest is even on. Curtain modules will switch methods if gametest fails
world.events.tick.subscribe(({ deltaTime, currentTick }) => {
    overworld.runCommand(`scoreboard players set @a has_gt 1`);
})

function scoreTest(name, objective) {
    try {
        const score = parseInt(overworld.runCommand(`scoreboard players test ${name} ${objective} *`).statusMessage.match(/-?\d+/));
        return score;
    } catch {
        return;
    }

}
function worldBorder(player) {
    const {x, y, z} = player.location
    const name = player.getName();
    if (Math.abs(x) >= 30000000 || Math.abs(y) >= 30000000 || Math.abs(z) >= 30000000) {
        player.runCommand(`tp @s 0 900 0`);
        tellrawStaff(`§¶§cUAC ► §6Anti-Crasher §bCrash attempt was prevent from §d${name}`);
        //player.runCommand("kill @s");
        try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCrash Attempt`); }
        catch{ player.runCommand(`event entity @s uac:ban_main`); }
        //return;

        //Anti-Crasher contributed by SmoothieMC
    }
}

function playerbans(player) {
    const name = player.getName();
    try {
        if(player.hasTag('PermBan')) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cUAC Global Banned`);
            try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUAC Global Banned`); }
            catch{ player.runCommand(`event entity @s uac:ban_main`); }
        }
        if(player.hasTag('BanCBE')) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cCBE Ban`);
            try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCBE Ban`); }
            catch{ player.runCommand(`event entity @s uac:ban_main`); 
        }
        }
        if(player.hasTag('BanCreative')) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cCreative Mode Ban`);
            try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCreative Mode Ban`); }
            catch{ player.runCommand(`event entity @s uac:ban_main`); }  
        }
        if(player.hasTag('Ban')) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cBanned By Operator`);
            try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lBanned by an Operator`); }
            catch{ player.runCommand(`event entity @s uac:ban_main`); }  
        }
        if(player.hasTag('illegalitemban')) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cUnobtainable Items Ban`);
            try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUnobtainable Items Ban`); }
            catch{ player.runCommand(`event entity @s uac:ban_main`); }  
        }
        if(player.hasTag('BanFly')) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §cFly Hacks Ban`);
            try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lBanned for FlyHacks`); }
            catch{ player.runCommand(`event entity @s uac:ban_main`); }              
        }
        if(player.scoreTest('warn') >= 3) {
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §bwas kicked §7: §c3 Warns Reached`);
            try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§l3 warns reached`); }
            catch{ player.runCommand(`event entity @s uac:ban_main`); }              
        }
    }
    catch(error) { console.warn(error, error.stack); }
}

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
    'minecraft:moving_block',
    'minecraft:beehive',
    'minecraft:bee_nest'
];
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
};

let SpawnX = scoreTest('worlddum', 'Worldx');
let SpawnZ = scoreTest('worlddum', 'Worldz');
let SpawnY = scoreTest('worlddum', 'Worldy');
let BorderX = scoreTest('BDXdummy', 'Border_Coord_X');
let BorderZ = scoreTest('BDXdummy', 'Border_Coord_Z');


world.events.tick.subscribe(({ deltaTime, currentTick }) => {
    try {
        
        const acmbool = scoreTest('acmtoggledummy', 'acmtoggle');
        const WorldBorderbool = scoreTest('wbmtoggledummy', 'wbmtoggle');
        const on_tick = scoreTest('tpsdummy', 'ontick');
        const entitycount = scoreTest('entitydummy', 'entitycount');
        const entitycountdown = scoreTest('entitydummy', 'entityclear');
        const uoimbool = scoreTest('uoimtoggledummy', 'uoimtoggle');

        overworld.runCommand(`scoreboard players add tpsdummy ontick 1`);
        
        
        
        if(on_tick >= 20) {
            if(entitycount >= 340) {
                overworld.runCommand(`function UAC/packages/autoclear-manual`);
                overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► §cEmergency Lag Clear §bwas performed due to entity count going over §6340§b."}]}`)
                overworld.runCommand(`scoreboard players set entitydummy entitycount 0`);
                
            }
            if(entitycount >= 110) {
                if(entitycountdown == 0) {
                    overworld.runCommand(`scoreboard players set entitydummy entityclear 400`);
                }
            }
            overworld.runCommand('scoreboard players set tpsdummy ontick 0');
        }
        if(entitycountdown >= 1) {
            overworld.runCommand(`scoreboard players remove entitydummy entityclear 1`);
            if(entitycountdown == 350) { overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c5"}]}`); }
            if(entitycountdown == 300) { overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c4"}]}`); }
            if(entitycountdown == 250) { overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c3"}]}`); }
            if(entitycountdown == 200) { overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c2"}]}`); }
            if(entitycountdown == 150) { overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c1"}]}`); }
            if(entitycountdown == 100) { overworld.runCommand(`function UAC/packages/autolagclearasset`); }
        }
        
        let players = world.getPlayers();
        for (let player of players) {                                                                   
            const name = player.getName();
            worldBorder(player);

            //Namespoof patch provided by the Paradox Team
            let char_length = player.nameTag
            for (let i = 0; i < char_length.length; i++) {
                if (char_length.charCodeAt(i) > 255) {
                    console.warn(`Illegal bytes outside the UTF-8 range`);
                    tellrawStaff(`§¶§cUAC ► §6Anti-NameSpoof §bBypass was prevented from §d${name}`);
                    try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lInvalid GamerTag`); }
                    catch{ player.runCommand(`event entity @s uac:ban_main`); }  
                }
                //console.warn(`Everything appears normal`);
            }

            
            if(player.scoreTest('fzplr') == 1) {
                if(player.hasTag('staffstatus')) {return player.runCommand(`scoreboard players set @s fzplr 0`);}
                player.runCommand(`tp @s ${player.scoreTest('lastpos_x')} ~ ${player.scoreTest('lastpos_z')}`);
            }       

            //slow scripts - players
            let lastpos_x = player.scoreTest('lastpos_x');
            let lastpos_z = player.scoreTest('lastpos_z');

            if(on_tick >= 20) {
                if(scoreTest('mrunban', 'unban') == 0) {
                    playerbans(player);
                }

                //afk stuff
                player.runCommand('scoreboard players operation @s lastpos_x = @s X_Coordinate');
                player.runCommand('scoreboard players operation @s lastpos_z = @s Z_Coordinate');
                
                if(player.scoreTest('X_Coordinate') > lastpos_x || player.scoreTest('X_Coordinate') < lastpos_x) {
                    player.runCommand('scoreboard players set @s notmovingflag 0');
                    //player.tellraw(`is moving`);
                }
                if(player.scoreTest('Z_Coordinate') > lastpos_z || player.scoreTest('Z_Coordinate') < lastpos_z) {
                    player.runCommand('scoreboard players set @s notmovingflag 0');
                    //player.tellraw(`is moving`);
                }
                if(player.scoreTest('X_Coordinate') == lastpos_x || player.scoreTest('Z_Coordinate') == lastpos_z) {
                    player.runCommand(`scoreboard players add @s notmovingflag 1`);
                }
                
                //world border Custom Spawn TP
                if(WorldBorderbool) {
                    let {x, y, z} = player.location
                    if(Math.abs(x) > BorderX || Math.abs(z) > BorderZ) {
                        player.runCommand(`tp @s ${SpawnX} ${SpawnY} ${SpawnZ}`);
                        overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► §d${player.getName()} §btried passing world border"}]}`);
                    }
                }
            }
            

            //cbe stuff
            if(acmbool || uoimbool) {
                let playerInventory = player.getComponent("minecraft:inventory").container;
                let itemArray = [];
                let itemname = undefined;
                let flagtype = undefined;
                for (let i = 0; i < playerInventory.size; i++) {
                    const item = playerInventory.getItem(i);
                    if (!item) { continue; }
                    if(player.hasTag(`staffstatus`)) { return }
                    // console.warn(item.id);
                    if (bannedItems.includes(item.id) || item.id in unobtainables || spawneggs.includes(item.id)) {
                        itemname = item.id.replace('minecraft:', '');
                        if(bannedItems.includes(item.id)) { flagtype = 0; }
                        if(item.id in unobtainables) { flagtype = 1; }
                        if(spawneggs.includes(item.id)) { flagtype = 1; }
                        itemArray.unshift(item.id);
                        playerInventory.setItem(i, new ItemStack(MinecraftItemTypes.acaciaBoat, 0, 0)); //removes item
                    }
                }
                if (itemArray.length) {
                    if(acmbool && flagtype == 0) {
                        player.runCommand('function UAC/asset/cbeitem_gt_warn');
                        overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§c§lUAC ► §6Anti-CBE §d${name} §bwas temp-kicked for having §c${itemname}"}]}`);
                        player.runCommand(`clear @s`);
                        player.runCommand(`kick "${name}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCBE Attempt | ${itemname}`);
                        flagtype = undefined;
                        //player.runCommand(`event entity @s uac:ban_main`);
                    }
                    if(uoimbool&& flagtype == 1) {
                        player.runCommand('function UAC/asset/illegalitemwarn');
                        overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§c§lUAC ► §6Unobtainable Items §d${name} §bwas temp-kicked for having §c${itemname}"}]}`);
                        player.runCommand(`clear @s`);
                        player.runCommand(`kick "${name}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUnobtainable Item | ${itemname}`);
                        flagtype = undefined;
                    }
                }
            }
        }
    } catch (error) {
        console.warn(error);
    }
    // cbe code was contributed by MrPatches123
    
});

const blockBans = {
    'minecraft:moving_block': 0,
    'minecraft:beehive': 0,
    'minecraft:bee_nest': 0,
};
World.events.blockPlace.subscribe(({ block, player }) => {
    // made originally by frost, and perfected by nightwalkerlots
    const acmbool = scoreTest('acmtoggledummy', 'acmtoggle');
    const uoimbool = scoreTest('uoimtoggledummy', 'uoimtoggle');
    let {x, y, z} = block.location;
    if (block.id in blockBans && acmbool || block.id == 'minecraft:moving_block') {
        tellrawStaff(`§¶§c§lUAC ► §6Anti-CBE §bItem Placement Flag \nBlock Type §7: §c${block.id.replace('minecraft:', '')} §bBlock Placer §7: §c${player.nameTag} §bLocation §7: §c${x} ${y} ${z} \n§bUse §2UAC.cbetp §bto teleport there!`);
        let type = block.id.replace('minecraft:', '');
        block.setType(MinecraftBlockTypes.air);
        overworld.runCommand(`scoreboard players set cbe_x cbe_location ${x}`);
        overworld.runCommand(`scoreboard players set cbe_y cbe_location ${y}`);
        overworld.runCommand(`scoreboard players set cbe_z cbe_location ${z}`);
        if(player.hasTag(`staffstatus`)) { return }
        player.runCommand('function UAC/asset/cbeitem_gt_warn');
        overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§c§lUAC ► §6Anti-CBE §d${player.nameTag} §bwas temp-kicked for having §c${type}"}]}`);
        player.runCommand(`clear @s`);
        try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCBE Attempt | ${type}`);  }
        catch{player.runCommand(`event entity @s uac:ban_main`);}
    }
    if (block.id in unobtainables && uoimbool) {
        tellrawStaff(`§¶§c§lUAC ► §6Unobtainable Items §bBlock Placement Flag \nBlock Type §7: §c${block.id.replace('minecraft:', '')} §bBlock Placer §7: §c${player.nameTag} §bLocation §7: §c${x} ${y} ${z}`);
        let type = block.id.replace('minecraft:', '');
        block.setType(MinecraftBlockTypes.air);
        if(player.hasTag(`staffstatus`)) { return };
        player.runCommand(`function UAC/asset/illegalitemwarn`);
        overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§c§lUAC ► §6Unobtainable Items §d${player.nameTag} §bwas temp-kicked for having §c${type}"}]}`);
        player.runCommand(`clear @s`);
        try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUnobtainable Items | ${type}`);  }
        catch{player.runCommand(`event entity @s uac:ban_main`);}    }
});

world.events.playerJoin.subscribe((data) => {
    let player = data.player;
    let name = player.nameTag;
    
    function OnPlayerLoad(callback) {
        let LoadedCallBack = world.events.tick.subscribe((tickEvent) => {
            try {
            world.getDimension("overworld").runCommand(`testfor "${name}"`);
            world.events.tick.unsubscribe(LoadedCallBack);
            callback();
            } catch (error) {
                const on_tick = scoreTest('tpsdummy', 'ontick');
                if(on_tick == 20) { player.runCommand(`scoreboard players add @s online 1`); }
                if(player.scoreTest('online') >= 22) { 
                    tellrawStaff(`§¶§c§lUAC ► §6Anti-Namespoof §d${player.nameTag} §bwas temp-kicked.`); 
                    player.runCommand(`scoreboard players set @s online 0`);
                    player.runCommand(`event entity @s uac:ban_main`);
                }
                console.warn(error, error.stack);
            }
        });
    }
    OnPlayerLoad(() => {
        overworld.runCommand(`scoreboard players set "${name}" online 1`);
        overworld.runCommand(`execute "${name}" ~~~ function UAC/packages/playerjoined`);
        if(scoreTest('mrunban', 'unban') == 0) {
            playerbans(player);
        }
    })
});

world.events.playerLeave.subscribe(data => {
    overworld.runCommand(`scoreboard players set * online 0`);
    overworld.runCommand(`scoreboard players set @a online 1`);
});

//  chat filter example code
world.events.beforeChat.subscribe((data) => {
  try {
    let crbool = scoreTest('crdummy', 'chatrank');
    let acsbool = scoreTest('acsdummy', 'acstoggle');
    let time = (data.sender.scoreTest('chatspam') / 20);
    let mutetime = (time / 60)

    if(data.sender.hasTag('muted')) {
        (data.cancel = true);
        if(data.sender.scoreTest('chatspam') <= 1200)
        {
            data.sender.tellraw(`§¶§c§lUAC ► §bYou are currently muted for §c${time} §bseconds left`)
        } else {
            return data.sender.tellraw(`§¶§c§lUAC ► §bYou are currently muted for §c${mutetime} §bminutes left`)
        } 
        return
    }

    
    if(acsbool) { data.sender.runCommand(`scoreboard players add @s chatspam 100`); }
    if(acsbool && data.sender.scoreTest('chatspam') >= 500 && !data.sender.hasTag('staffstatus')) {
        
        (data.cancel = true);
        return data.sender.tellraw(`§¶§cUAC ► §6Anti-ChatSpam §bYour messages are being rate limted. Please Wait §c§l${time} §r§bseconds`);
    }

    let temprank = (`${ data.sender.getTags().find((tag) => tag.startsWith("temprank:")) }`);
    if (data.sender.hasTag(temprank)) {
        let givenrank = (`${ data.sender.getTags().find((tag) => tag.startsWith("temprank:")).replace('temprank:', '') }`);
        let newrank = (`rank:${givenrank}`);
        let currentrank = (`${ data.sender.getTags().find((tag) => tag.startsWith("rank:")) }`);
        if(temprank == currentrank) {
            data.sender.runCommand(`tag @s remove ${temprank}`);
        }
        data.sender.runCommand(`tag @s remove ${currentrank}`);
        data.sender.runCommand(`tag @s add ${newrank}`);
        data.sender.runCommand(`tag @s remove ${temprank}`);
    }

    let tempcolor = (`${ data.sender.getTags().find((tag) => tag.startsWith("tempcolor:")) }`);
    if (data.sender.hasTag(tempcolor)) {
        let givencolor = (`${ data.sender.getTags().find((tag) => tag.startsWith("tempcolor:")).replace('tempcolor:', '') }`);
        let newcolor = (`color:${givencolor}`);
        let currentcolor = (`${ data.sender.getTags().find((tag) => tag.startsWith("color:")) }`);
        if(tempcolor == currentcolor) {
            data.sender.runCommand(`tag @s remove "${tempcolor}"`);
        }
        data.sender.runCommand(`tag @s remove "${currentcolor}"`);
        data.sender.runCommand(`tag @s add "${newcolor}"`);
        data.sender.runCommand(`tag @s remove "${tempcolor}"`);
    }
    if(data.sender.hasTag('rankremove')) {
        let currentrank = (`${ data.sender.getTags().find((tag) => tag.startsWith("rank:")) }`);
        data.sender.runCommand(`tag @s remove ${currentrank}`);
        data.sender.runCommand(`tag @s add "rank:Member"`);
        data.sender.runCommand(`tag @s remove rankremove`);
    }
    if(crbool) {
        if(data.message.startsWith('UAC.')) { return }
        let color = (
            `${data.sender
                .getTags()
                .find((tag) => tag.startsWith("color:"))
                ?.replace(/"/g, '')
                ?.replace('color:', '') ?? "b"}`
        )
        return (
            (data.cancel = true),
            world.getDimension("overworld").runCommand(
            `tellraw @a {"rawtext":[{"text":"§l§8[§r§${color}${
                data.sender
                .getTags()
                .find((tag) => tag.startsWith("rank:"))
                ?.substring(5)
                ?.replaceAll("--", "§r§l§8][§r") ?? "Member"
            }§l§8]§r §7${data.sender.nameTag}:§r ${data.message}"}]}`
            )
        );
    }
  } catch (error) {
    return (data.cancel = false), console.warn(`${error}, ${error.stack}`);
  }
});


//Anti-Nuker
/** 
 * The log of the players break times
 * @type {Object<Player.name: number>}
 */
const log = {};

/**
 * Allow staff to be whitelisted
 * @type {string}
 */
const byPassTag = "staffstatus";
let alert = 0;
const ores = [
    'minecraft:ancient_debris',
    'minecraft:diamond_ore',
    'minecraft:deepslate_diamond_ore',
    'minecraft:emerald_ore',
    'minecraft:deepslate_emerald_ore',
    'minecraft:deepslate_redstone_ore',
    'minecraft:lapis_ore',
    'minecraft:deepslate_lapis_ore',
    'minecraft:gold_ore',
    'minecraft:deepslate_gold_ore',
    'minecraft:iron_ore',
    'minecraft:deepslate_iron_ore',
];

world.events.blockBreak.subscribe(({ block, brokenBlockPermutation, dimension, player }) => {
    let {x, y, z} = block.location;
    const old = log[player.name];
    let playername = player.getName();
    let blockname = brokenBlockPermutation.type.id;
    log[player.name] = Date.now();
    const mdmbool = scoreTest('mdmtoggledummy', 'mdmtoggle');
    const diamond_notiv = scoreTest('mdmtoggledummy', 'diamondmd');
    const emerald_notiv = scoreTest('mdmtoggledummy', 'emeraldmd');
    const gold_notiv = scoreTest('mdmtoggledummy', 'goldmd');
    const iron_notiv = scoreTest('mdmtoggledummy', 'ironmd');
    const lapiz_notiv = scoreTest('mdmtoggledummy', 'lapizmd');
    const nether_notiv = scoreTest('mdmtoggledummy', 'scrapmd');
    
    //Mining Detection - Gametest Implementation
    if(ores.includes(blockname) && mdmbool) {
        let send_mdm_message = 1;
        if(blockname.replace('deepslate_', '') == 'minecraft:diamond_ore') {player.runCommand(`scoreboard players add @s diamond_ore 1`); if(diamond_notiv == 0) { send_mdm_message = 0;}}
        if(blockname.replace('deepslate_', '') == 'minecraft:emerald_ore') {player.runCommand(`scoreboard players add @s emerald_ore 1`); if(emerald_notiv == 0) { send_mdm_message = 0;}}
        if(blockname.replace('deepslate_', '') == 'minecraft:gold_ore') {player.runCommand(`scoreboard players add @s gold_ore 1`); if(gold_notiv == 0) { send_mdm_message = 0;}}
        if(blockname.replace('deepslate_', '') == 'minecraft:iron_ore') {player.runCommand(`scoreboard players add @s iron_ore 1`); if(iron_notiv == 0) { send_mdm_message = 0;}}
        if(blockname.replace('deepslate_', '') == 'minecraft:lapis_ore') {player.runCommand(`scoreboard players add @s lapis_ore 1`); if(lapiz_notiv == 0) { send_mdm_message = 0;}}
        if(blockname == 'minecraft:ancient_debris') {player.runCommand(`scoreboard players add @s ancient_debris 1`); if(nether_notiv == 0) { send_mdm_message = 0;}}

        if(send_mdm_message == 1) {
            tellrawStaff(`§l§¶§cUAC ► §6Mining Detection §d§l${playername} §bmined §c${blockname.replace('minecraft:', '')} §bat §c${x} ${y} ${z}. §bTotal §7: §c${player.scoreTest(`${blockname.replace('minecraft:', '').replace('deepslate_', '')}`)}`);
        }
    }

    //Anti-Nuker
    if (old < Date.now() - 15 || player.hasTag(byPassTag)) return;
    alert++
    if(alert == 1) return;
    if(alert == 250) {
        alert = 0;
        tellrawStaff(`§l§¶§cUAC ► §6Anti-Nuker §btemp kicked §d${player.getName()} §bfor Nuker Attempt`);
        try{  player.runCommand(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lNuker Attempt`); }
        catch{ player.runCommand(`event entity @s uac:ban_main`); }  
    }
    dimension
      .getBlock(block.location)
      .setPermutation(brokenBlockPermutation.clone());
    dimension
      .getEntitiesAtBlockLocation(block.location)
      .filter((entity) => entity.id === "minecraft:item")
      .forEach((item) => item.kill());
  }
);

world.events.playerLeave.subscribe((data) => delete log[data.playerName]);

system.events.beforeWatchdogTerminate.subscribe((beforeWatchdogTerminate) => {
    // We try to stop any watchdog crashes incase malicous users try to make the scripts lag
    // and causing the server to crash
    tellrawStaff(`§¶§c§lUAC ► §6SYSTEM §c§lPrevented WatchDog Termination`);
    beforeWatchdogTerminate.cancel = true;
});

