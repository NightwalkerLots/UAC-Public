import { GameMode } from "@minecraft/server";
import cc from "../../../core/lib/cc.js";
import { ArrayType, ObjectType, ValueType } from "../../../core/lib/types.js";
import gamemodeModule from "../../module/gamemode.js";

const stringArrType = new ArrayType(String, 'string[]')
const GamemodeArrType = new ArrayType(Object.values(GameMode), 'GameMode[]')

const filterObjType = new ObjectType(Object.create(null), undefined, 'TagFilterObject')
const filterObjTypeVal = new ValueType([undefined, stringArrType, filterObjType])
Object.assign(filterObjType.type, { all: filterObjTypeVal, any: filterObjTypeVal, none: filterObjTypeVal })

const filterType = new ValueType([stringArrType, filterObjType], 'TagFilter')

cc.create('uac:gm', {
    name: '[UAC] Gamemode',
    description: 'Manages allowed gamemode',
    usage: [
        {
            usage: ['add', { name: 'groupID', type: 'any' }, { name: 'priority', type: 'number' }, { name: 'filter', type: 'TagFilter' }, { name: 'allowedGamemodes', type: 'GameMode[]' }],
            description: 'Creates gamemode group.'
        }, {
            usage: ['set-filter', { name: 'groupID', type: 'any' }, { name: 'filter', type: 'TagFilter' }],
            description: 'Edits tag filter on a gamemode group.'
        }, {
            usage: ['set-gamemodes', { name: 'groupID', type: 'any' }, { name: 'allowedGamemodes', type: 'GameMode[]' }],
            description: 'Edits allowed gamemodes on a gamemode group.'
        }, {
            usage: ['remove', { name: 'groupID', type: 'any' }],
            description: 'Removes a gamemode group.'
        }, {
            usage: ['list'],
            description: 'Shows gamemode group list.'
        }
    ],

    minPermLvl: 80,
    trigger: /^(uac-?)?(allowed-?)?(gm|game-?mode)$/i,
    typedParams: new cc.typedParams(
        {
            sequence: ['add', cc.argumentParser.parseAny, cc.argumentParser.parseNumber, filterType, GamemodeArrType],
            execute: ([,id, priority, filter, gamemode], { log }) => {
                if (gamemodeModule.listCache.has(id)) throw new Error(`Gamemode group ID '${id}' already exists`)

                if (gamemode.length < 1) throw new Error('Allowed gamemodes must be atleast 1')

                const n = [...gamemodeModule.listCache]
                n.push([id, {
                    priority,
                    filter,
                    allowedGamemodes: new Set(gamemode)
                }])
                n.sort(([,{priority: a}], [,{priority: b}]) => b - a)
                gamemodeModule.listCache = new Map(n)

                log(`Created gamemode group ID '${id}'.`)
            }
        }, {
            sequence: ['set-filter', cc.argumentParser.parseAny, filterType],
            execute: ([,id, filter], { log }) => {
                const d = gamemodeModule.listCache.get(id)
                if (!d) throw new Error(`Gamemode group ID '${id}' not found`)

                d.filter = filter

                log(`Filter set for gamemode group ID '${id}'.`)
            }
        }, {
            sequence: ['set-gamemodes', cc.argumentParser.parseAny, GamemodeArrType],
            execute: ([,id, gamemode], { log }) => {
                const d = gamemodeModule.listCache.get(id)
                if (!d) throw new Error(`Gamemode group ID '${id}' not found`)

                if (gamemode.length < 1) throw new Error('Allowed gamemodes must be atleast 1')

                d.allowedGamemodes = new Set(gamemode)

                log(`Allowed gamemodes set for gamemode group ID '${id}'.`)
            }
        }, {
            sequence: ['remove', cc.argumentParser.parseAny],
            execute: ([,id], { log }) => {
                if (!gamemodeModule.listCache.delete(id)) throw new Error(`Gamemode group ID '${id}' not found`)
                log(`Removed gamemode group ID '${id}'.`)
            }
        }, {
            sequence: ['list'],
            execute: ([], { log }) => {
                log([
                    ' ',
                    'Allowed gamemode list: ',
                    ...Array.from(
                        gamemodeModule.listCache,
                        ([k, v]) => [
                            ` §8:§r ${k}:`,
                            ` §8:§r  §8:§r Priority: §a${v.priority}§r`,
                            ` §8:§r  §8:§r Tag filter: §a${JSON.stringify(v.filter, null, 1).replace(/\n */g, ' ')}§r`,
                            ` §8:§r  §8:§r Allowed gamemodes: ${Array.from(v.allowedGamemodes, v => `§a${v}§r`).join(', ')}`
                        ]
                    ).flat(),
                    ' '
                ])
            }
        }
    )
})