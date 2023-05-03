import { Player } from "@minecraft/server"
import cc, { argumentParser } from "../lib/cc.js"
import permission from "../lib/permission.js"

cc.create('permission', {
    name: 'Permission',
    description: 'Manages permission keys.',
    usage: [
        {
            usage: ['permission', 'set', { name: 'key', type: 'any' }, { name: 'level', type: 'number' }],
            description: 'Creates a new key and assigns level to it.'
        }, {
            usage: ['permission', 'changekey', { name: 'key', type: 'any' }, { name: 'newKey', type: 'any' }],
            description: 'Changes / renames key.'
        }, {
            usage: ['permission', 'list'],
            description: 'Shows key list'
        }, {
            usage: ['permission', 'delete', { name: 'key', type: 'any' }],
            description: 'Deletes a key.'
        }, {
            usage: ['permission', 'player', 'get', { name: 'target', type: 'selector' }],
            description: 'Get players\' assigned keys.'
        }, {
            usage: ['permission', 'player', 'set', { name: 'target', type: 'player' }, { name: 'key', type: 'any' }],
            description: 'Assigns key to players.'
        }, {
            usage: ['permission', 'player', 'reset', { name: 'target', type: 'player' }],
            description: 'Resets players\' assigned key.'
        }, {
            usage: ['permission', 'op'],
            description: 'Shows current OP permission level.'
        }, {
            usage: ['permission', 'op', 'set', { name: 'level', type: 'number' }],
            description: 'Sets OP permission level.'
        }
    ],

    minPermLvl: 100,
    trigger: /^(permission|admin)(-?level)?$/i,
    typedParams: new cc.typedParams(
        {
            sequence: ['set', argumentParser.parseAny, argumentParser.number(true, 0, permission.maxKeyLevel)],
            execute: ([,key, level], { log }) => {
                if (permission.has(key)) throw new Error(`Permission key "${key}" is already registered`)

                permission.set(key, level)

                if (level >= 100) log(`§eWARNING! Setting permission level of key to 100 or above is not recommended.`)
                log([
                    `Set permission key §7"§r${key}§7"§r to §a${level}§r.`,
                    getStorageText()
                ])
            }
        }, {
            sequence: ['changekey', argumentParser.parseAny, argumentParser.parseAny],
            execute: ([,key1, key2], { log }) => {
                if (!permission.has(key1)) throw new Error(`Permission key "${key1}" is not registered`)
                if (permission.has(key2)) throw new Error(`Permission key "${key2}" is already registered`)

                permission.set(key2, permission.get(key1) ?? 0)
                permission.delete(key1)
                log([
                    `Changed permission key from §7"§r${key1}§7"§r to §7"§r${key2}§7"§r.`,
                    getStorageText()
                ])
            }
        }, {
            sequence: ['list'],
            execute: ([], { log }) => {
                log([
                    ` `,
                    `Permission key list`,
                    ...Array.from(permission, ([k, l]) => ` §8:§r §7"§r${k}§7"§r -> §a${l}`),
                    getStorageText(),
                    ` `
                ])
            }
        }, {
            sequence: ['delete', argumentParser.parseAny],
            execute: ([,key], { log }) => {
                if (!permission.has(key)) throw new Error(`Permission key "${key}" is not registered`)

                permission.delete(key)
                return log([
                    `Deleted permission key §7"§r${key}§7"§r.`,
                    getStorageText()
                ])
            }
        }, {
            sequence: ['player', 'get', argumentParser.parseSelector],
            execute: async ([,,selector], { executer, log }) => {
                log([
                    ` `,
                    `Player permission key list:`,
                    ...Array.from(await selector(executer, { noSelector: false }) as Player[], plr => ` §8:§r §d${plr.name}§r: ${ permission.getPlayerKey(plr) ? `§7"§r${permission.getPlayerKey(plr)}§7"§r -> §a${permission.getPlayerLevel(plr)}§r` : `§8<unset>§r` }`),
                    ` `,
                ])
            }
        }, {
            sequence: ['player', 'set', argumentParser.parseSelector, argumentParser.parseAny],
            execute: async ([,,selector, key], { executer, log }) => {
                const [plr] = await selector(executer) as [Player]

                permission.setPlayerKey(plr, key)
                return log(`Sets §d${plr.name}§r'${plr.name[plr.name.length - 1] == 's' ? '' : 's'} permission key to §7"§r${key}§7"§r.`)
            }
        }, {
            sequence: ['player', 'reset', argumentParser.parseSelector],
            execute: async ([,,selector], { executer, log }) => {
                const [plr] = await selector(executer) as [Player]

                permission.resetPlayerKey(plr)
                return log(`Resets §d${plr.name}§r'${plr.name[plr.name.length - 1] == 's' ? '' : 's'} permission key.`)
            }
        }, {
            sequence: ['op'],
            execute: ([], { log }) => {
                log(`OP permission level: §a${permission.opLevel}`)
            }
        }, {
            sequence: ['op', 'set', cc.argumentParser.number(true, 0, 1 << 22)],
            execute: ([,,lvl], { log }) => {
                permission.opLevel = lvl
                log(`OP permission level has been set to §a${permission.opLevel}§r.`)
            }
        }
    ),

    canBeDeleted: false
})

function getStorageText() {
    const size = permission.toString().length
    return `§7Storage: §2${size}§7/§2${permission.maxListSize}§7 characters (§2${(size / permission.maxListSize * 100).toFixed(1)}%§7)`
}
