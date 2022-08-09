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
function worldBorder(player) {
    const {x, y, z} = player.location
    const name = player.getName();
    if (Math.abs(x) >= 30000000 || Math.abs(y) >= 30000000 || Math.abs(z) >= 30000000) {
        player.runCommand(`tp @s 0 900 0`);
        tellrawStaff(`§¶§cUAC ► §6Anti-Crasher §bCrash attempt was prevent from §d${name}`);
        //player.runCommand("kill @s");
        player.runCommand(`kick ${name} §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCrash Attempt`);
        player.runCommand(`event entity @s uac:ban_main`);
        //return;
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
    'minecraft:moving_block',
    'minecraft:beehive',
    'minecraft:bee_nest'
];

let tpsArray = [];
world.events.tick.subscribe(({ deltaTime, currentTick }) => {
    try {
        tpsArray.unshift(deltaTime);
        if (tpsArray.length > 250) { tpsArray.pop(); }
        const tps = 1 / (tpsArray.reduce((a, b) => a + b, 0) / tpsArray.length);
        // console.warn(`${tps.toFixed(3)}`);
        const acmbool = scoreTest('acmtoggledummy', 'acmtoggle');
        overworld.runCommand(`scoreboard players add tpsdummy ontick 1`);
        const on_tick = scoreTest('tpsdummy', 'ontick');
        const entitycount = scoreTest('entitydummy', 'entitycount');
        if(on_tick >= 20) {
            if(entitycount >= 340) {
                overworld.runCommand(`function UAC/packages/autoclear-manual`);
                overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► §cEmergency Lag Clear §bwas performed due to entity count going over §6340§b."}]}`)
                overworld.runCommand(`scoreboard players set entitydummy entitycount 0`);
                
            }
            overworld.runCommand('scoreboard players set tpsdummy ontick 0');
        }

        // console.warn(acmbool);
        let players = world.getPlayers();
        let SpawnX = scoreTest('worlddum', 'Worldx');
        let SpawnZ = scoreTest('worlddum', 'Worldz');
        let SpawnY = scoreTest('worlddum', 'Worldy');
        let BorderX = scoreTest('BDXdummy', 'Border_Coord_X');
        let BorderZ = scoreTest('BDXdummy', 'Border_Coord_Z');
        

        for (let player of players) {                                                                     //scorecheck for vanilla api
            const name = player.getName();
            let playerInventory = player.getComponent("minecraft:inventory").container;
            let itemArray = [];
            worldBorder(player);
            
            if(player.scoreTest('fzplr') == 1) {
                if(player.hasTag('staffstatus')) {return player.runCommand(`scoreboard players set @s fzplr 0`);}
                player.runCommand(`tp @s ${player.scoreTest('lastpos_x')} ~ ${player.scoreTest('lastpos_z')}`);
            }            
            //world border Custom Spawn TP
            
            if(player.scoreTest('wbmtoggle') == 1) {
                let {x, y, z} = player.location
                if(Math.abs(x) > BorderX || Math.abs(z) > BorderZ) {
                    player.runCommand(`tp @s ${SpawnX} ${SpawnY} ${SpawnZ}`);
                    overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► §d${player.getName()} §btried passing world border"}]}`);
                }
            }
            

            //afk stuff
            if(on_tick >= 20) {
                player.runCommand('scoreboard players operation @s lastpos_x = @s X_Coordinate');
                player.runCommand('scoreboard players operation @s lastpos_z = @s Z_Coordinate');
                player.runCommand('scoreboard players set tpsdummy ontick 0');
            }
            let lastpos_x = player.scoreTest('lastpos_x');
            let lastpos_z = player.scoreTest('lastpos_z');

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
                if(player.scoreTest('notmovingflag') >= 70) {
                    //player.tellraw(`not moving`)
                }
            }
            

            //cbe stuff
            for (let i = 0; i < playerInventory.size; i++) {
                const item = playerInventory.getItem(i);
                if (!item) { continue; }
                // console.warn(item.id);
                if (bannedItems.includes(item.id)) {
                    if (acmbool) {
                        if(player.hasTag('staffstatus')) { return }
                        itemArray.unshift(item.id);
                        playerInventory.setItem(i, new ItemStack(MinecraftItemTypes.air, 0, 0)); //removes item
                    }
                }
            }
            if (acmbool && itemArray.length) {
                if(player.hasTag('staffstatus')) { return }
                overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§c§lUAC ► §6Anti-CBE §d${name} §bwas temp-kicked for having §c${itemArray}"}]}`);
                player.runCommand(`clear @s`);
                player.runCommand(`kick ${name} §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCBE Attempt | ${itemArray}`);
                player.runCommand('function UAC/asset/cbeitem_gt_warn');
            }
            
        }
    } catch (error) {
        console.warn(error);
    }
    // cbe code was contributed by MrPatches123
    
});

import { world as World, MinecraftBlockTypes } from "mojang-minecraft";
import { tellrawStaff } from '../library/utils/prototype.js';
const blockBans = {
    'minecraft:moving_block': 0,
    'minecraft:beehive': 0,
    'minecraft:beenest': 0,
};
World.events.blockPlace.subscribe(({ block }) => {
    const acmbool = scoreTest('acmtoggledummy', 'acmtoggle');
    if (block.id in blockBans && acmbool || block.id == 'minecraft:moving_block')
        block.setType(MinecraftBlockTypes.air)
    // made by frost
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

world.events.blockBreak.subscribe(
  ({ block, brokenBlockPermutation, dimension, player }) => {
    const old = log[player.name];
    log[player.name] = Date.now();
    
    if (old < Date.now() - 50 || player.hasTag(byPassTag)) return;
    alert++
    if(alert == 1) return;
    if(alert == 249) {tellrawStaff(`§l§¶§cUAC ► §6Anti-Nuker §btemp kicked §d${player.getName()} §bfor Nuker Attempt`);}
    if(alert == 250) {
        player.runCommand(`kick "${player.getName()}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lNuker Attempt`);
        player.runCommand(`event entity @s uac:ban_main`);
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