import cc from "../../../core/lib/cc.js";
import illegalItemModule from "../../module/illegalitem.js";
const supportedEnch = new Set([
    'protection',
    'fireProtection',
    'featherFalling',
    'blastProtection',
    'projectileProtection',
    'thorns',
    'respiration',
    'depthStrider',
    'aquaAffinity',
    'sharpness',
    'smite',
    'baneOfArthropods',
    'knockback',
    'fireAspect',
    'looting',
    'efficiency',
    'silkTouch',
    'unbreaking',
    'fortune',
    'power',
    'punch',
    'flame',
    'infinity',
    'luckOfTheSea',
    'lure',
    'frostWalker',
    'mending',
    'binding',
    'vanishing',
    'impaling',
    'riptide',
    'loyalty',
    'channeling',
    'multishot',
    'piercing',
    'quickCharge',
    'soulSpeed',
    'swiftSneak',
]);
const enchListFlags = new cc.typedFlags(new Proxy(Object.create(null), {
    get: (t, k) => typeof k == 'symbol' ? t[k] : [cc.argumentParser.parseNumber, 'inherit']
}), 'EnchList');
cc.create('uac:illench', {
    name: '[UAC] Illegal Enchantment',
    description: 'Manages maximum enchantment level',
    usage: [
        {
            usage: ['illench', 'list'],
            description: 'Shows max enchantment level list & enchantment overrides list.'
        }, {
            usage: ['illench', 'set', { name: 'enchantment', type: 'Enchantment' }, { name: 'level', type: 'number' }],
            description: 'Sets max enchantment level.'
        }, {
            usage: ['illench', 'overrides', 'add', { name: 'id', type: 'any' }, { name: 'list', type: 'EnchantmentList', optional: true }],
            description: 'Adds enchantment level override.'
        }, {
            usage: ['illench', 'overrides', 'assign', { name: 'id', type: 'any' }, { name: 'list', type: 'EnchantmentList' }],
            description: 'Assigns max enchantment level to override.'
        }, {
            usage: ['illench', 'overrides', 'set', { name: 'id', type: 'any' }, { name: 'enchantment', type: 'Enchantment' }, { name: 'level', type: 'number', keyword: 'inherit' }],
            description: 'Sets max enchantment level on override. Use inherit to unset the enchantment.'
        }, {
            usage: ['illench', 'overrides', 'delete', { name: 'id', type: 'any' }],
            description: 'Deletes max enchantment level override.'
        }
    ],
    minPermLvl: 80,
    trigger: /^ill(egal)?-?ench(ant(ment)?s?)?$/i,
    typedParams: new cc.typedParams({
        sequence: ['list'],
        execute: ([], { log }) => {
            log([
                ' ',
                `Max enchantment level list:`,
                ...Object.entries(illegalItemModule.data.maxEnchLevels).map(([k, v]) => ` §8:§r ${k}: §a${v}§r`),
                ' ',
                'Enchantment overrides list:',
                ...Object.entries(illegalItemModule.data.enchOverrides).map(([k, l]) => ` §8:§r ${k}: \n` + Object.entries(l).map(([k, v]) => ` §8:§r  §8:§r ${k}: §a${v}§r`).join('\n')),
                ' ',
            ]);
        }
    }, {
        sequence: ['set', cc.argumentParser.parseAny, cc.argumentParser.parseNumber],
        execute: ([, id, lvl], { log }) => {
            if (!supportedEnch.has(id))
                throw new Error(`Enchantment '${id}' is unknown.`);
            illegalItemModule.data.maxEnchLevels[id] = lvl;
            return log(`Set max enchantment level for '${id}' to §a${lvl}§r.`);
        }
    }, {
        minArgs: 3,
        sequence: ['overrides', 'add', cc.argumentParser.parseAny, enchListFlags],
        execute: ([, , id, list = {}], { log }) => {
            if (id in illegalItemModule.data.enchOverrides)
                throw new Error(`Enchantment overrides for '${id}' already exists.`);
            const override = Object.create(null);
            for (const [k, v] of Object.entries(list)) {
                if (!supportedEnch.has(k)) {
                    log(`Enchantment '${k}' is unknown.`);
                    continue;
                }
                if (v !== 'inherit')
                    override[k] = v;
            }
            illegalItemModule.data.enchOverrides[id] = override;
            log(`Added enchantment overrides for item '${id}'. See ${cc.prefix}illench list to see overrides.`);
        }
    }, {
        sequence: ['overrides', 'assign', cc.argumentParser.parseAny, enchListFlags],
        execute: ([, , id, list], { log }) => {
            const override = illegalItemModule.data.enchOverrides[id];
            if (!override)
                throw new Error(`Enchantment overrides for '${id}' not found.`);
            for (const [k, v] of Object.entries(list)) {
                if (!supportedEnch.has(k)) {
                    log(`Enchantment '${k}' is unknown.`);
                    continue;
                }
                if (v === 'inherit')
                    delete override[k];
                else
                    override[k] = v;
            }
            log(`Edited enchantment overrides for item '${id}'. See ${cc.prefix}illench list to see overrides.`);
        }
    }, {
        sequence: ['overrides', 'set', cc.argumentParser.parseAny, cc.argumentParser.parseAny, [cc.argumentParser.parseNumber, 'inherit']],
        execute: ([, , id, ench, lvl], { log }) => {
            const override = illegalItemModule.data.enchOverrides[id];
            if (!override)
                throw new Error(`Enchantment overrides for '${id}' not found.`);
            if (!supportedEnch.has(ench))
                throw new Error(`Enchantment '${ench}' is unknown.`);
            if (lvl === 'inherit') {
                delete override[ench];
                log(`Inherited enchantment override '${ench}' for item '${id}'.`);
            }
            else {
                override[ench] = lvl;
                log(`Set enchantment override '${ench}' for item '${id}' to §a${lvl}§r`);
            }
        }
    }, {
        sequence: ['overrides', 'delete', cc.argumentParser.parseAny],
        execute: ([, , id], { log }) => {
            if (!(id in illegalItemModule.data.enchOverrides))
                throw new Error(`Enchantment overrides for '${id}' not found.`);
            delete illegalItemModule.data.enchOverrides[id];
            log(`Deleted enchantment overrides for item '${id}'.`);
        }
    })
});
