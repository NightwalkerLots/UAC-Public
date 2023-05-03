import { DynamicPropertiesDefinition, MinecraftEntityTypes, MolangVariableMap, Vector, world } from "@minecraft/server"
import cc from "../../../core/lib/cc.js"
import role from "../../../core/lib/role.js"
import server from "../../../core/lib/server.js"

const vipList = new Set<string>([
    "NightwalkerLots",
    "FrostIce482",
    "JayyGhost290",
    "PlazmaticSoul",
    "Zombieclinic",
    "WinFan3672",
    "Tingz091",
    "Dreaxzy6761",
    "Conoryy",
    "citedsinger9159",
    "EnchantedSMC",
    "TheEgg3500",
    "Musty-Poole91",
    "fatdragon2282",
    "carthe123",
    "NVF Destiny"
])

const particleMap: Record<string, { id: string, map?: MolangVariableMap, interval?: number }> = {
    purple: {
        id: 'minecraft:dragon_breath_trail'
    },

    red: {
        id: 'minecraft:redstone_wire_dust_particle'
    },

    green: {
        id: 'minecraft:villager_happy'
    },

    soul: {
        id: 'minecraft:sculk_soul_particle',
        interval: 2
    },

    heart: {
        id: 'minecraft:heart_particle',
        interval: 3
    },

    note: {
        id: 'minecraft:note_particle',
        map: new MolangVariableMap()
            .setColorRGB('variable.note_color', { red: 61, green: 165, blue: 255, alpha: 1 })
    }
}
Object.setPrototypeOf(particleMap, null)

cc.create('uac:vip', {
    name: '[UAC] VIP',
    description: 'UAC VIP Benefits for donors.',
    usage: [
        {
            usage: ['vip', 'trail', { name: 'trail', keyword: Object.keys(particleMap).concat('disable', 'off') }],
            description: 'Sets VIP trail.'
        }, {
            usage: ['vip', 'rank', { name: 'toggle', keyword: ['enable', 'disable', 'on', 'off'] }],
            description: 'Enables / disables VIP rank.'
        }
    ],

    trigger: /^(uac-?)?vip$/i,
    typedParams: new cc.typedParams(
        {
            sequence: ['trail', Object.keys(particleMap).concat('disable', 'off')],
            execute: ([, trail], { executer, log }) => {
                if (trail === 'disable' || trail === 'off') {
                    executer.removeDynamicProperty('uac:viptrail')
                    log('Disabled VIP trail particles.')
                } else {
                    executer.setDynamicProperty('uac:viptrail', trail)
                    log(`VIP Trail particles has been set to §a${trail}§r.`)
                }
            }
        }, {
            sequence: ['rank', cc.argumentParser.parseToggle],
            execute: ([, tgl], { executer, log }) => {
                executer.setDynamicProperty('uac:viprank', tgl)
                log(`${tgl ? 'Enabled' : 'Disabled'} VIP rank.`)
            }
        }
    ),
    execute: ({executer, log}) => {
        if (!vipList.has(executer.name))
            log([
                '§eYou are not a donator to UAC, therefore you won\'t be able to use UAC VIP benefits.',
                'Donate at: §aDiscord.gg/7Us7ER8WUw'
            ])
    }
})

server.addEventListener('initialize', ({propertyRegistry}) => {
    const reg = new DynamicPropertiesDefinition
    reg.defineString('uac:viptrail', 8)
    reg.defineBoolean('uac:viprank')

    propertyRegistry.registerEntityTypeDynamicProperties(reg, MinecraftEntityTypes.player)
})

role.addEventListener('messageFormat', ({player, roles}) => {
    if (vipList.has(player.name) && player.getDynamicProperty('uac:viprank'))
        roles.unshift('[§gUAC VIP§r]')
})

server.addEventListener('tick', ({ currentTick }) => {
    for (const plr of world.getPlayers()) {
        if (!(vipList.has(plr.name) && Vector.multiply(plr.velocity, 1).length() > 0.01)) continue

        const particle = plr.getDynamicProperty('uac:viptrail')
        if (typeof particle !== 'string') continue

        const par = particleMap[particle]
        if (!par || (par.interval ? currentTick % par.interval !== 0 : false)) continue

        plr.dimension.spawnParticle(par.id, plr.location, par.map ?? new MolangVariableMap)
    }
})
