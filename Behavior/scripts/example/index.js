import './wrap.js';
import '../library/utils/prototype.js';
import './commands/import-commands.js';  //all player chat commands

//external module functions
import { anticbe } from '../modules/cbe.js';
import { unobtainable } from '../modules/unobtainable.js';
import { playerbans } from '../modules/bans.js';
import { ops } from '../modules/oneplayersleep.js';
import { lagclear } from '../modules/lagclear.js';
import { movement_check } from '../modules/movement.js';
import { waitMove } from './commands/staff/gui.js';
import { hotbar_message } from '../modules/hotbar_message.js';
import { op_abuse } from '../modules/opabuse.js';
import { opCheck } from '../modules/OpCheck.js';
import { afk_kick } from '../modules/afk_kick.js';
import { lockdown } from '../modules/lockdown.js';
import { Check_Packet_Behavior } from '../modules/bad_packet.js';
//game resource dependancies
import { world as World, MinecraftBlockTypes, system } from "@minecraft/server";
import { tellrawStaff, tp, tellrawServer, TellRB } from '../library/utils/prototype.js';
import { setScore } from '../library/utils/score_testing.js';
import { world, Player} from '@minecraft/server';


function scoreTest(target, objective) {
    try {
        const oB = world.scoreboard.getObjective(objective)
        if (typeof target == 'string') return oB.getScore(oB.getParticipants().find(pT => pT.displayName == target))
        return oB.getScore(target.scoreboard)
    } catch (error) {
        //console.warn( JSON.stringify(e.stack), e)
    }
}

const overworld = world.getDimension('overworld');

function worldBorder(player) {
    const {x, y, z} = player.location
    const name = player.getName();
    if (Math.abs(x) >= 30000000 || Math.abs(y) >= 30000000 || Math.abs(z) >= 30000000) {
        player.runCommandAsync(`tp @s 0 900 0`);
        tellrawStaff(`§¶§cUAC STAFF STAFF ► §6Anti-Crasher §bCrash attempt was prevent from §d${name}`);
        TellRB(`flag_1`, `UAC SYSTEM ► Crash was prevented from ${name}`);
        //player.runCommandAsync("kill @s");
        try{  player.runCommandAsync(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCrash Attempt`); }
        catch{ player.runCommandAsync(`event entity @s uac:ban_main`); }
        //return;

        //Anti-Crasher contributed by SmoothieMC
    }
}



/*
░░████░░░████░░████████░░████████░░░░░░░
░░████░░░████░░███░░███░░████████░░░░░░░
░░████░░░████░░████████░░███░░░░░░░░░░░░ <3
░░████░░░████░░███░░███░░████████░░░░░░░
░░███████████░░███░░███░░████████░░░░░░░
*/

let SpawnX = scoreTest('worlddum', 'Worldx');
let SpawnZ = scoreTest('worlddum', 'Worldz');
let SpawnY = scoreTest('worlddum', 'Worldy');
let BorderX = scoreTest('BDXdummy', 'Border_Coord_X');
let BorderZ = scoreTest('BDXdummy', 'Border_Coord_Z');
let on_tick = 0;


system.runInterval(() => {
    try {
        on_tick++;
        let WorldBorderbool = scoreTest('wbmtoggledummy', 'wbmtoggle');
        
        let acmbool = scoreTest('acmtoggledummy', 'acmtoggle');
        let uoimbool = scoreTest('uoimtoggledummy', 'uoimtoggle');
        let opsbool = scoreTest('opsdummy', 'opstoggle');
        let opabuse_bool = scoreTest('opamtoggledummy', 'opamtoggle');
        let ld_bool = scoreTest('lddummy', 'SSDEBUG');

        if(acmbool == 1) { anticbe(); }
        if(uoimbool == 1) { unobtainable(); }

        if( on_tick == 10 ) {
            let lagclear_bool = scoreTest('ltmtoggledummy', 'ltmtoggle');
            if(opsbool) { ops(); }
            if(lagclear_bool == 1) { lagclear(); }
        }

        if ( on_tick == 15 ) {
            const entitycount = scoreTest('entitydummy', 'entitycount');
            if(entitycount >= 340) {
                overworld.runCommandAsync(`function UAC/packages/autoclear-manual`);
                tellrawServer(`§¶§cUAC §¶§b► §cEmergency Lag Clear §bwas performed due to entity count going over §6340§b.`);
                TellRB(`flag_0`, `UAC SYSTEM ► Emergency Lag Clear triggered due to entity count going over 340`);
                setScore('entitydummy', 'entitycount', 0, false);
            }
        }
        
        // one second module functions -- 2nd schedual  -- ran from backend not players
        if(on_tick >= 20) {
            let players = world.getPlayers();
            for (let player of players) {                                                                   
                const name = player.getName();
                worldBorder(player);
                if(scoreTest('mrunban', 'unban') == 0) {
                    playerbans(player);
                }
                hotbar_message(player);
                movement_check(player);
                opCheck(player);
                afk_kick(player);
                if(ld_bool) { lockdown(player); }
                if(opabuse_bool) { op_abuse(player) }
                setScore(player, "has_gt", 1, false);
                
                //world border Custom Spawn TP
                if(WorldBorderbool) {
                    let {x, y, z} = player.location
                    if(Math.abs(x) > BorderX || Math.abs(z) > BorderZ) {
                        tp(player, SpawnX, SpawnY, SpawnZ);
                        tellrawServer(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► §d${player.getName()} §btried passing world border"}]}`);
                        TellRB(`flag_0`, `UAC ► ${player.getName()} tried to pass the world border`);
                    }
                }
    
                //Namespoof patch provided by the Paradox Team
                let char_length = player.nameTag
                for (let i = 0; i < char_length.length; i++) {
                    if (char_length.charCodeAt(i) > 255) {
                        console.warn(`Illegal bytes outside the UTF-8 range`);
                        tellrawStaff(`§¶§cUAC STAFF STAFF ► §6Anti-NameSpoof §bBypass was prevented from §d${name}`);
                        TellRB(`flag_1`, `UAC SYSTEM ► ${name} was kicked for namespoofing`);
                        try{  player.runCommandAsync(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lInvalid GamerTag`); }
                        catch{ player.runCommandAsync(`event entity @s uac:ban_main`); }  
                    }
                    //console.warn(`Everything appears normal`);
                }
                
                
                    
            }
            on_tick = 0;
        }
        for (let player of world.getPlayers()) {   
            Check_Packet_Behavior(player);
            if(scoreTest(player, 'fzplr') == 1) {
                if(player.hasTag('staffstatus')) {return player.runCommandAsync(`scoreboard players set @s fzplr 0`);}
                tp(player, scoreTest(player, 'lastpos_x'), scoreTest(player, 'lastpos_y'), scoreTest(player, 'lastpos_z'));
            }
        }
    } catch (e) {
        console.warn( JSON.stringify(e.stack), e)
    }
    // cbe code was contributed by MrPatches123
    
});

const unobtainables = {
    'minecraft:flowing_lava': 0,
    'minecraft:lava': 0,
    'minecraft:flowing_water': 0,
    'minecraft:water': 0,
    'minecraft:lit_redstone_lamp': 0,
    'minecraft:pistonarmcollision': 0,
    'minecraft:tripwire': 0,
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

const blockBans = {
    'minecraft:moving_block': 0,
    'minecraft:beehive': 0,
    'minecraft:bee_nest': 0,
    'minecraft:dispenser': 0
};  
const blockBuckets = {
    'minecraft:axolotl_bucket': 0,
    'minecraft:pufferfish_bucket': 0,
    'minecraft:tropical_fish_bucket': 0,
    'minecraft:salmon_bucket': 0,
    'minecraft:cod_bucket': 0

};
World.events.blockPlace.subscribe(({ block, player }) => {
    // made originally by frost, and perfected by nightwalkerlots
    const acmbool = scoreTest('acmtoggledummy', 'acmtoggle');
    const uoimbool = scoreTest('uoimtoggledummy', 'uoimtoggle');
    let {x, y, z} = player.location;
    let type = block.id.replace('minecraft:', '');
    if (block.id in blockBans && acmbool || block.id == 'minecraft:moving_block') {
        TellRB(`flag_1`, `UAC Anti-CBE ► ${player.nameTag} tried to place ${block.id.replace('minecraft:', '')} at ${x} ${y} ${z}`);
        tellrawStaff(`§l§¶§cUAC STAFF ► §6Anti-CBE §bItem Placement Flag \nBlock Type §7: §c${block.id.replace('minecraft:', '')} §bBlock Placer §7: §c${player.nameTag} §bLocation §7: §c${x} ${y} ${z} \n§bUse §2UAC.cbetp §bto teleport there!`);
        block.setType(MinecraftBlockTypes.air);
        overworld.runCommandAsync(`scoreboard players set cbe_x cbe_location ${x}`);
        overworld.runCommandAsync(`scoreboard players set cbe_y cbe_location ${y}`);
        overworld.runCommandAsync(`scoreboard players set cbe_z cbe_location ${z}`);
        if(player.hasTag(`staffstatus`)) { return }
        player.runCommandAsync('function UAC/asset/cbeitem_gt_warn');
        tellrawServer(`§¶§c§lUAC ► §6Anti-CBE §d${player.nameTag} §bwas temp-kicked for having §c${type}`);
        player.runCommandAsync(`clear @s`);
        try{  player.runCommandAsync(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCBE Attempt | ${type}`);  }
        catch{player.runCommandAsync(`event entity @s uac:ban_main`);}
    }
    if (block.id in unobtainables && uoimbool) {
        TellRB(`flag_1`, `UAC Unobtainable Items ► ${player.nameTag} tried to place ${block.id.replace('minecraft:', '')} at ${x} ${y} ${z}`);
        tellrawStaff(`§l§¶§cUAC STAFF ► §6Unobtainable Items §bBlock Placement Flag \nBlock Type §7: §c${block.id.replace('minecraft:', '')} §bBlock Placer §7: §c${player.nameTag} §bLocation §7: §c${x} ${y} ${z}`);
        let type = block.id.replace('minecraft:', '');
        if(player.hasTag(`staffstatus`)) { return };
        block.setType(MinecraftBlockTypes.air);
        player.runCommandAsync(`function UAC/asset/illegalitemwarn`);
        tellrawServer(`§¶§c§lUAC ► §6Unobtainable Items §d${player.nameTag} §bwas temp-kicked for having §c${type}`);
        player.runCommandAsync(`clear @s`);
        try{  player.runCommandAsync(`kick "${player.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lUnobtainable Items | ${type}`);  }
        catch{player.runCommandAsync(`event entity @s uac:ban_main`);}    }
});


world.events.beforeItemUseOn.subscribe((eventData) => {
    const acmbool = scoreTest('acmtoggledummy', 'acmtoggle');
    let item = eventData.item.id;
    let item_name = item.replace('minecraft:', '');
    let name = eventData.source.nameTag;
    let by_player = undefined;
    let {x, y, z} = eventData.source.location;
    let p = world.getPlayers();
    if(!acmbool) return;
    for (let i of p) {
        const p_name = i.getName();
        if(!p_name.match(name)) {
            by_player = false;
        } else {
            by_player = true;
        }
    }
    if(!by_player) return;
    if(eventData.source.hasTag('staffstatus')) return;

    if(item in blockBans || item in blockBuckets) {
        eventData.cancel = true;
        eventData.source.runCommandAsync('function UAC/asset/cbeitem_gt_warn');
        tellrawServer(`§¶§c§lUAC ► §6CBE Item Use §d${name} §bwas temp-kicked for placing §c${item_name} §bat §c${x} ${y} ${z}`);
        TellRB(`flag_1`, `UAC Anti-CBE ► ${name} was temp-kicked for placing ${item_name} at ${x} ${y} ${z}`);
        try{  eventData.source.runCommandAsync(`kick "${eventData.source.nameTag}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCBE Item Placement | ${item_name}`);  }
        catch{eventData.source.runCommandAsync(`event entity @s uac:ban_main`);}
    }
});


world.events.playerSpawn.subscribe((data) => {
    let player = data.player;
    let name = player.nameTag;
    let {x, y, z} = player.location;
    
    
    if(scoreTest(player, 'seen_gui') == 0) {
        waitMove.set(player, [x, y, z]);
    }
    if(scoreTest('mrunban', 'unban') == 0) {
        playerbans(player);
    }
    if(player.scoreTest('online') == 1) return;
    overworld.runCommandAsync(`execute "${name}" ~~~ function UAC/packages/playerjoined`);
});

world.events.playerLeave.subscribe(data => {
    overworld.runCommandAsync(`scoreboard players set * online 0`);
    overworld.runCommandAsync(`scoreboard players set @a online 1`);
});

//  chat filter example code
world.events.beforeChat.subscribe((data) => {
  try {
    let crbool = scoreTest('crdummy', 'chatrank');
    let acsbool = scoreTest('acsdummy', 'acstoggle');
    let time = (scoreTest(data.sender, 'chatspam') / 20);
    let mutetime = (time / 60)

    if(data.sender.hasTag('muted')) {
        (data.cancel = true);
        if(scoreTest(data.sender, 'chatspam') <= 1200)
        {
            data.sender.tellraw(`§¶§c§lUAC ► §bYou are currently muted for §c${time} §bseconds left`)
        } else {
            return data.sender.tellraw(`§¶§c§lUAC ► §bYou are currently muted for §c${mutetime} §bminutes left`)
        } 
        return
    }

    
    if(acsbool) { setScore(data.sender, "chatspam", 100, true); }
    if(acsbool && scoreTest(data.sender, 'chatspam') >= 500 && !data.sender.hasTag('staffstatus')) {
        
        (data.cancel = true);
        return data.sender.tellraw(`§¶§cUAC ► §6Anti-ChatSpam §bYour messages are being rate limted. Please Wait §c§l${time} §r§bseconds`);
    }

    let temprank = (`${ data.sender.getTags().find((tag) => tag.startsWith("temprank:")) }`);
    if (data.sender.hasTag(temprank)) {
        let givenrank = (`${ data.sender.getTags().find((tag) => tag.startsWith("temprank:")).replace('temprank:', '') }`);
        let newrank = (`rank:${givenrank}`);
        let currentrank = (`${ data.sender.getTags().find((tag) => tag.startsWith("rank:")) }`);
        if(temprank == currentrank) {
            data.sender.runCommandAsync(`tag @s remove ${temprank}`);
        }
        data.sender.runCommandAsync(`tag @s remove ${currentrank}`);
        data.sender.runCommandAsync(`tag @s add ${newrank}`);
        data.sender.runCommandAsync(`tag @s remove ${temprank}`);
    }

    let tempcolor = (`${ data.sender.getTags().find((tag) => tag.startsWith("tempcolor:")) }`);
    if (data.sender.hasTag(tempcolor)) {
        let givencolor = (`${ data.sender.getTags().find((tag) => tag.startsWith("tempcolor:")).replace('tempcolor:', '') }`);
        let newcolor = (`color:${givencolor}`);
        let currentcolor = (`${ data.sender.getTags().find((tag) => tag.startsWith("color:")) }`);
        if(tempcolor == currentcolor) {
            data.sender.runCommandAsync(`tag @s remove "${tempcolor}"`);
        }
        data.sender.runCommandAsync(`tag @s remove "${currentcolor}"`);
        data.sender.runCommandAsync(`tag @s add "${newcolor}"`);
        data.sender.runCommandAsync(`tag @s remove "${tempcolor}"`);
    }
    if(data.sender.hasTag('rankremove')) {
        let currentrank = (`${ data.sender.getTags().find((tag) => tag.startsWith("rank:")) }`);
        data.sender.runCommandAsync(`tag @s remove ${currentrank}`);
        data.sender.runCommandAsync(`tag @s add "rank:Member"`);
        data.sender.runCommandAsync(`tag @s remove rankremove`);
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
            tellrawServer(`§l§8[§r§${color}${
                data.sender
                .getTags()
                .find((tag) => tag.startsWith("rank:"))
                ?.substring(5)
                ?.replaceAll("--", "§r§l§8][§r") ?? "Member"
            }§l§8]§r §7${data.sender.nameTag}:§r ${data.message}`)
        );
    }
  } catch (error) {
    return (data.cancel = false), console.warn(`${error}, ${error.stack}`);
  }
});



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
    try {
        let {x, y, z} = player.location;
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
            if(blockname.replace('deepslate_', '') == 'minecraft:diamond_ore') {setScore(player, 'diamond_ore', 1, true); if(diamond_notiv == 0) { send_mdm_message = 0;}}
            if(blockname.replace('deepslate_', '') == 'minecraft:emerald_ore') {setScore(player, 'emerald_ore', 1, true); if(emerald_notiv == 0) { send_mdm_message = 0;}}
            if(blockname.replace('deepslate_', '') == 'minecraft:gold_ore') {setScore(player, 'gold_ore', 1, true); if(gold_notiv == 0) { send_mdm_message = 0;}}
            if(blockname.replace('deepslate_', '') == 'minecraft:iron_ore') {setScore(player, 'iron_ore', 1, true); if(iron_notiv == 0) { send_mdm_message = 0;}}
            if(blockname.replace('deepslate_', '') == 'minecraft:lapis_ore') {setScore(player, 'lapis_ore', 1, true); if(lapiz_notiv == 0) { send_mdm_message = 0;}}
            if(blockname == 'minecraft:ancient_debris') {setScore(player, 'ancient_debris', 1, true); if(nether_notiv == 0) { send_mdm_message = 0;}}   

            if(send_mdm_message == 1) {
                tellrawStaff(`§l§¶§cUAC STAFF ► §6Mining Detection §d§l${playername} §bmined §c${blockname.replace('minecraft:', '')} §bat §c${Math.round(x)} ${Math.round(y)} ${Math.round(z)}. §bTotal §7: §c${scoreTest(player, `${blockname.replace('minecraft:', '').replace('deepslate_', '')}`)}`);
            }
        }
    } catch(c) {console.warn( JSON.stringify(e.stack), e)}
});

world.events.playerLeave.subscribe((data) => delete log[data.playerName]);

system.events.beforeWatchdogTerminate.subscribe((beforeWatchdogTerminate) => {
    // We try to stop any watchdog crashes incase malicous users try to make the scripts lag
    // and causing the server to crash
    TellRB(`ban`, `UAC SYSTEM ► Prevented a WatchDog Termination. This could be triggered when scripting memory is high!`);
    tellrawStaff(`§l§¶§cUAC STAFF ► §6SYSTEM §c§lPrevented WatchDog Termination`);
    beforeWatchdogTerminate.cancel = true;
});

