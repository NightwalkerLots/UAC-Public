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
        player.runCommand(`kick ${name} §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lCrash Attempt | Perm Banned`);
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
            worldBorder(player);

            //player.tellraw(`§btick was passed`);
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
    // All This was contributed by MrPatches123
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