import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff, TellRB } from '../../../library/utils/prototype.js';
import { setScore } from '../../../library/utils/score_testing.js';
import scoreboard from '../../../library/scoreboard.js'
import { system } from '@minecraft/server';
const registerInformation = {
    cancelMessage: true,
    name: 'illench',
    staff: 'true',
    description: 'Enables / disables illegal enchantment detection',
    usage: '[ on | off ]',
    example: [
        'illench',
        'illench on',
        'illench off',
    ]
};

let sbtoggle = scoreboard.objective.for('illench').dummies
sbtoggle

/** @type {number} */
let toggle = sbtoggle.get('value') ?? ( sbtoggle.set('value', 1), 1 )

import { ItemStack, MinecraftEnchantmentTypes, MinecraftItemTypes, world } from '@minecraft/server';

const overworld = world.getDimension('overworld')

/** @type {{[k: string]: {[k: string]: number}}} */
const enchantmentDefs = {
    0: {},
    1: {
        protection: 4,
        fireProtection: 4,
        blastProtection: 4,
        projectileProtection: 4,
        thorns: 3,
        respiration: 3,
        aquaAffinity: 1,
        unbreaking: 3,
        mending: 1,
        binding: 1,
        vanishing: 1
    },
    2: {
        protection: 4,
        fireProtection: 4,
        blastProtection: 4,
        projectileProtection: 4,
        thorns: 3,
        unbreaking: 3,
        mending: 1,
        binding: 1,
        vanishing: 1
    },
    4: {
        protection: 4,
        fireProtection: 4,
        featherFalling: 4,
        blastProtection: 4,
        projectileProtection: 4,
        thorns: 3,
        depthStrider: 3,
        unbreaking: 3,
        frostWalker: 2,
        mending: 1,
        binding: 1,
        vanishing: 1,
        soulSpeed: 3
    },
    8: {
        protection: 4,
        fireProtection: 4,
        blastProtection: 4,
        projectileProtection: 4,
        thorns: 3,
        unbreaking: 3,
        swiftSneak: 3,
        mending: 1,
        binding: 1,
        vanishing: 1
    },
    15: {
        protection: 4,
        fireProtection: 4,
        featherFalling: 4,
        blastProtection: 4,
        projectileProtection: 4,
        thorns: 3,
        respiration: 3,
        depthStrider: 3,
        aquaAffinity: 1,
        unbreaking: 3,
        frostWalker: 2,
        mending: 1,
        binding: 1,
        vanishing: 1,
        soulSpeed: 3
    },
    16: {
        sharpness: 5,
        smite: 5,
        baneOfArthropods: 5,
        knockback: 2,
        fireAspect: 2,
        looting: 3,
        unbreaking: 3,
        mending: 1,
        vanishing: 1
    },
    32: {
        unbreaking: 3,
        power: 5,
        punch: 2,
        flame: 1,
        infinity: 1,
        mending: 1,
        vanishing: 1
    },
    64: {
        efficiency: 5,
        silkTouch: 1,
        unbreaking: 3,
        fortune: 3,
        mending: 1,
        vanishing: 1
    },
    128: {
        efficiency: 5,
        silkTouch: 1,
        unbreaking: 3,
        mending: 1,
        vanishing: 1
    },
    256: {
        unbreaking: 3,
        mending: 1,
        vanishing: 1
    },
    512: {
        sharpness: 5,
        smite: 5,
        baneOfArthropods: 5,
        efficiency: 5,
        silkTouch: 1,
        unbreaking: 3,
        fortune: 3,
        mending: 1,
        vanishing: 1
    },
    1024: {
        efficiency: 5,
        silkTouch: 1,
        unbreaking: 3,
        fortune: 3,
        mending: 1,
        vanishing: 1
    },
    2048: {
        efficiency: 5,
        silkTouch: 1,
        unbreaking: 3,
        fortune: 3,
        mending: 1,
        vanishing: 1
    },
    3648: {
        sharpness: 5,
        smite: 5,
        baneOfArthropods: 5,
        efficiency: 5,
        silkTouch: 1,
        unbreaking: 3,
        fortune: 3,
        mending: 1,
        vanishing: 1
    },
    4096: { 
        unbreaking: 3,
        luckOfTheSea: 3,
        lure: 3,
        mending: 1,
        vanishing: 1
    },
    8192: { 
        unbreaking: 3,
        mending: 1,
        vanishing: 1
    },
    16384: { 
        unbreaking: 3,
        mending: 1,
        binding: 1,
        vanishing: 1
    },
    32768: {
      unbreaking: 3,
      mending: 1,
      vanishing: 1,
      impaling: 5,
      riptide: 3,
      loyalty: 3,
      channeling: 1
    },
    65536: {
      unbreaking: 3,
      mending: 1,
      vanishing: 1,
      multishot: 1,
      piercing: 4,
      quickCharge: 3
    },
    131072: {
        unbreaking: 3,
        mending: 1,
        vanishing: 1
    },
    131520: {
      efficiency: 5,
      silkTouch: 1,
      unbreaking: 3,
      fortune: 3,
      mending: 1,
      vanishing: 1
    },
    262144: {
        binding: 1,
        vanishing: 1
    },
    '-1': {
        protection: 4,
        swiftSneak: 3,
        fireProtection: 4,
        featherFalling: 4,
        blastProtection: 4,
        projectileProtection: 4,
        thorns: 3,
        respiration: 3,
        depthStrider: 3,
        aquaAffinity: 1,
        sharpness: 5,
        smite: 5,
        baneOfArthropods: 5,
        knockback: 2,
        fireAspect: 2,
        looting: 3,
        efficiency: 5,
        silkTouch: 1,
        unbreaking: 3,
        fortune: 3,
        power: 5,
        punch: 2,
        flame: 1,
        infinity: 1,
        luckOfTheSea: 3,
        lure: 3,
        frostWalker: 2,
        mending: 1,
        binding: 1,
        vanishing: 1,
        impaling: 5,
        riptide: 3,
        loyalty: 3,
        channeling: 1,
        multishot: 1,
        piercing: 4,
        quickCharge: 3,
        soulSpeed: 3
    }
}

const allEnchantments = Object.values(MinecraftEnchantmentTypes);

system.runInterval(() => {
    if (!toggle) return
    for (let plr of world.getPlayers()) {
        if (plr.hasTag('staffstatus')) continue
        let c = plr.getComponent('inventory').container
        for (let i = 0, m = c.size; i < m; i++) {
            let item = c.getItem(i)
            if (item === undefined) continue
            let enchantment = item.getComponent('enchantments').enchantments
            let enchlist = enchantmentDefs[enchantment.slot]
            let verify = false;
            for ( let ench of allEnchantments ) {
                let enchLvl = enchantment.hasEnchantment(ench),
                    maxLvl = enchlist[ench.id] ?? 0
                if ( enchLvl > maxLvl ) {
                    verify = true;
                    tellrawStaff(`§¶§cUAC STAFF §b► §l§d${plr.name} §bhas §cillegal enchantment §bdetected §c${item.id.replace('minecraft:', '')} §bin their inventory: §c${ench.id} §b(§e${enchLvl}§b/§e${maxLvl}§b)`);
                    plr.tellraw(`§¶§cUAC §b► §l§d${plr.name} §bhas §cillegal enchantment §bdetected §c${item.id.replace('minecraft:', '')} §bin their inventory: §c${ench.id} §b(§e${enchLvl}§b/§e${maxLvl}§b)`);
                    c.setItem(i, MinecraftItemTypes.air);
                }
            }
            if(verify === true) {
                TellRB(`flag_1`, `UAC Anti-32k ► ${plr.name} was temp-kicked for impossible enchants`);
                plr.runCommandAsync(`function UAC/punish`);
                try{  plr.runCommandAsync(`kick "${plr.name}" §r\n§l§c\n§r\n§eKicked By:§r §l§3§•Unity Anti•Cheat§r\n§bReason:§r §c§lInvalid Enchantment | ${item.id.replace('minecraft:', '')}`); }
                catch{ plr.runCommandAsync(`event entity @s uac:ban_main`); }  
            }
        }
    }
})

Server.command.register(registerInformation, (chatmsg, args) => {
    const sender = chatmsg.sender
    try {
        if (sender.hasTag('staffstatus')) {
            if (!args[0]) return sender.tellraw(`§¶§bIllegal enchantment detection status: ${toggle ? '§aENABLED' : '§cDISABLED'}`)
            switch (args[0]) {
                case 'on':
                case 'enable': {
                    setScore('illenchdummy', 'illench', 1, false);
                    sender.runCommandAsync(`scoreboard players operation @a illench = illenchdummy illench`)
                    tellrawStaff(`§¶§cIllegal§b enchantment detection has been §aENABLED§b by §d${sender.name}`)
                    sbtoggle.set('value', toggle = 1)
                }; break

                case 'off':
                case 'disable': {

                    setScore('illenchdummy', 'illench', 0, false);
                    sender.runCommandAsync(`scoreboard players operation @a illench = illenchdummy illench`)
                    tellrawStaff(`§¶§cIllegal§b enchantment detection has been §cDISABLED§b by §d${sender.name}`)
                    sbtoggle.set('value', toggle = 0)
                }; break

                default:
                    return plr.tellraw(`§¶§cUAC §b► §c§lError: Invalid argument ${args[0]}`)
            }
        } else {
            sender.tellraw(`§¶§cUAC §b► §c§lError 4: Only Staff can use this command`);
        }
    } catch(e) {
        console.warn(`${e}\n${e?.stack}`)
    }
});
