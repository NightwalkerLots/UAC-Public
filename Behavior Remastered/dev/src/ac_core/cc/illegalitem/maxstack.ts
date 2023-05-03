import cc from "../../../core/lib/cc.js";
import { parseRegex, prettify } from "../../../core/lib/misc.js";
import illegalItemModule from "../../module/illegalitem.js";

cc.create('uac:maxstack', {
    name: '[UAC] Max Stack',
    description: 'Manages maximum item stack',
    usage: [
        {
            usage: ['maxstack', 'list'],
            description: 'Shows max item stack list'
        }, {
            usage: ['maxstack', 'set', { name: 'itemID', type: 'any' }, { name: 'stack', type: 'number' }],
            description: 'Sets item max stack.'
        }, {
            usage: ['maxstack', 'set-default', { name: 'stack', type: 'number' }],
            description: 'Sets default item max stack.'
        }, {
            usage: ['maxstack', 'reset', { name: 'itemID', type: 'any' }],
            description: 'Resets item max stack.'
        }, {
            usage: ['maxstack', 'clear'],
            description: 'Clears item max stack list. [DANGEROUS]'
        }
    ],

    minPermLvl: 80,
    trigger: /^(uac-?)?max-?stack$/i,
    typedParams: new cc.typedParams(
        {
            minArgs: 1,
            sequence: ['list', [parseRegex, cc.argumentParser.parseAny]],
            execute: ([,fi], { log }) => {
                const l = Object.entries(illegalItemModule.data.maxStack).filter(([k]) => k.match(fi))
                log([
                    ' ',
                    `Max item stack list: (showing ${l.length}, filter: ${prettify(fi)})`,
                    ...l.map(([k, v]) => ` §8:§r ${k} §a${v}§r`),
                    ' ',
                    `Default item max stack: §a${illegalItemModule.data.stackSizeDefault}§r`,
                    ' ',
                ])
                if (!fi) log([
                    `§oUse filter to reduce amount of items shown`,
                    `§oe.g. §a${cc.prefix}maxstack list spawn_egg§f will show items which id contains 'spawn_egg'`
                ])
            }
        }, {
            sequence: ['set', cc.argumentParser.parseAny, cc.argumentParser.parseNumber],
            execute: ([, id, num], { log }) => {
                illegalItemModule.data.maxStack[id] = num
                log(`Set max item stack for '${id}' to §a${num}§r.`)
            }
        }, {
            sequence: ['set-default', cc.argumentParser.parseNumber],
            execute: ([, num], { log }) => {
                illegalItemModule.data.stackSizeDefault = num
                log(`Set default max item stack to §a${num}§r.`)
            }
        }, {
            sequence: ['reset', cc.argumentParser.parseAny],
            execute: ([, id], { log }) => {
                delete illegalItemModule.data.maxStack[id]
                log(`Resetted max item stack for '${id}'.`)
            }
        }, {
            sequence: ['clear'],
            execute: ([], { log }) => {
                illegalItemModule.data.maxStack = Object.create(null)
                log(`Cleared max item stack list.`)
            }
        }
    )
})
