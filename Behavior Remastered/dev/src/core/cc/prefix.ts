import cc from "../lib/cc.js";

cc.create('prefix', {
    name: 'Prefix',
    description: 'Sets prefix.',
    usage: [
        {
            usage: ['preefix'],
            description: 'Shows current prefix.'
        }, {
            usage: ['prefix', 'set', { name: 'newPrefix', type: 'any' }],
            description: 'Sets current prefix.'
        }
    ],
    minPermLvl: 80,
    trigger: /^prefix$/i,

    typedParams: new cc.typedParams(
        {
            sequence: [],
            execute: ([], { log }) => {
                log(`Current prefix: §7"§r${cc.prefix}§7"`)
            }
        }, {
            sequence: ['set', cc.argumentParser.parseAny],
            execute: ([,prefix], { log }) => {
                cc.prefix = prefix
                log(`Prefix has been set to §7"§r${cc.prefix}§7".`)
            }
        }
    )
})
