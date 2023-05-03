import cc from "../../../core/lib/cc.js";
import { parseRegex, prettify } from "../../../core/lib/misc.js";
import { ArrayType } from "../../../core/lib/types.js";
import illegalItemModule from "../../module/illegalitem.js";
const numArr = new ArrayType(Number, 'number[]');
const bannedItemFlags = new cc.typedFlags({
    'banned-data': [cc.argumentParser.type(numArr), 'all'],
    'allowed-data-range': cc.argumentParser.parseAny,
    'creative': cc.argumentParser.parseBoolean,
    'action': ['clear', 'warn', 'kick', 'ban', 'blacklist', 'inherit']
}, 'BannedItemOpts');
cc.create('uac:banneditem', {
    name: '[UAC] Banned Item',
    description: 'Manages banned item',
    usage: [
        {
            usage: ['list', { name: 'filter', type: ['string', 'RegExp'] }],
            description: 'Shows banned item list.'
        }, {
            usage: ['add', { name: 'id', type: ['any'] }, { name: 'options', type: 'BannedItemOpts', optional: true }],
            description: 'Adds item to banned item list.' + bannedItemFlags.generateUsage()
        }, {
            usage: ['edit', { name: 'id', type: ['any'] }, { name: 'options', type: 'BannedItemOpts' }],
            description: 'Edits banned item data.'
        }, {
            usage: ['info', { name: 'id', type: ['any'] }],
            description: 'Shows banned item data.'
        }, {
            usage: ['remove', { name: 'id', type: ['any'] }],
            description: 'Removes banned item.'
        }
    ],
    minPermLvl: 80,
    trigger: /^(uac-?)?((ban(ned)?|illegal)-?item|item-?ban)$/i,
    typedParams: new cc.typedParams({
        minArgs: 1,
        sequence: ['list', [parseRegex, cc.argumentParser.parseAny]],
        execute: ([, fi], { log }) => {
            const l = Object.entries(illegalItemModule.data.bannedItem).filter(([k]) => k.match(fi));
            log([
                ' ',
                `Banned item list: (showing ${l.length}, filter: ${prettify(fi)})`,
                ...l.map(([k, v]) => ` §8:§r ${k}`
                    + ` - action: §a${v.action ?? `§7<unset>§r §a${illegalItemModule.data.automodAction}`}§r`
                    + (v.requireCreative ? ' - Requires creative' : '')),
                ' ',
            ]);
            if (!fi)
                log([
                    `§oUse filter to reduce amount of items shown`,
                    `§oe.g. §a${cc.prefix}itemban list spawn_egg§f will show banned items which id contains 'spawn_egg'`
                ]);
        }
    }, {
        minArgs: 2,
        sequence: ['add', cc.argumentParser.parseAny, bannedItemFlags],
        execute: ([, id, { 'banned-data': bannedData, 'creative': requireCreative, 'action': action, 'allowed-data-range': range } = {}], { log }) => {
            if (id in illegalItemModule.data.bannedItem)
                throw new Error(`Item '${id}' is already in banned item list.`);
            const o = illegalItemModule.data.bannedItem[id] = {};
            if (requireCreative !== undefined)
                o.requireCreative = requireCreative;
            if (action)
                o.action = action === 'inherit' ? undefined : action;
            log(`Added item '${id}' to banned item list.`);
        }
    }, {
        sequence: ['edit', cc.argumentParser.parseAny, bannedItemFlags],
        execute: ([, id, { 'banned-data': bannedData, 'creative': requireCreative, 'action': action, 'allowed-data-range': range } = {}], { log }) => {
            const dat = illegalItemModule.data.bannedItem[id];
            if (!dat)
                throw new Error(`Item '${id}' is not banned.`);
            if (requireCreative !== undefined)
                dat.requireCreative = requireCreative;
            if (action)
                dat.action = action === 'inherit' ? undefined : action;
            log(`Edited banned item data '${id}'.`);
        }
    }, {
        sequence: ['info', cc.argumentParser.parseAny],
        execute: ([, id], { log }) => {
            const dat = illegalItemModule.data.bannedItem[id];
            if (!dat)
                throw new Error(`Item '${id}' is not banned.`);
            log([
                ' ',
                `Banned item data for '${id}':`,
                ` §8:§r Require creative: §a${dat.requireCreative ? 'Yes' : 'No'}§r`,
                ` §8:§r Action: §a${dat.action ?? `§7<unset>§r §a${illegalItemModule.data.automodAction}`}§r`,
                ' ',
            ]);
        }
    }, {
        sequence: ['remove', cc.argumentParser.parseAny],
        execute: ([, id], { log }) => {
            const dat = illegalItemModule.data.bannedItem[id];
            if (!dat)
                throw new Error(`Item '${id}' is not banned.`);
            delete illegalItemModule.data.bannedItem[id];
            log(`Deleted banned item '${id}'.`);
        }
    })
});
