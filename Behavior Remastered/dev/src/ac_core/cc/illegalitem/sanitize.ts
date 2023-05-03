import cc from "../../../core/lib/cc.js";
import illegalItemModule from "../../module/illegalitem.js";

cc.create('uac:sanitize', {
    name: '[UAC] Sanitizer',
    description: 'Manages sanitized items',
    usage: [
        {
            usage: ['sanitize', 'list'],
            description: 'Shows sanitized items list'
        }, {
            usage: ['sanitize', 'add', { name: 'itemID', type: 'any' }],
            description: 'Adds item to sanitized list'
        }, {
            usage: ['sanitize', 'delete', { name: 'itemID', type: 'any' }],
            description: 'Deletes item from sanitized list'
        }
    ],

    minPermLvl: 80,
    trigger: /^(uac-?)?sanitizer?$/i,
    typedParams: new cc.typedParams(
        {
            sequence: ['list'],
            execute: ([], { log }) => {
                log([
                    ' ',
                    'Sanitized items list:',
                    ...Array.from(illegalItemModule.sanitizeListCache, v => ` §8:§r ${v}`),
                    ' ',
                ])
            }
        }, {
            sequence: ['add', cc.argumentParser.parseAny],
            execute: ([, id], { log }) => {
                if (illegalItemModule.sanitizeListCache.has(id)) throw new Error(`Item '${id}' is already in sanitize list`)

                illegalItemModule.sanitizeListCache.add(id)
                log(`Added item '${id}' to sanitize list.`)
            }
        }, {
            sequence: ['delete', cc.argumentParser.parseAny],
            execute: ([, id], { log }) => {
                if (!illegalItemModule.sanitizeListCache.delete(id)) throw new Error(`Item '${id}' not listed in sanitize list`)
            }
        }
    )
})
