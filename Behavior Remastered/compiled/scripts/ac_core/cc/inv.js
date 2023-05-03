import cc from "../../core/lib/cc.js";
import { asyncExecCmd } from "../../core/lib/mc.js";
cc.create('uac:inv', {
    name: '[UAC] Inventory',
    description: 'Saves, loads, clears, and clones someone\'s inventory',
    usage: [
        {
            usage: ['inv', 'save', { name: 'target', type: 'player', optional: true }, { name: 'id', type: 'any', optional: true }],
            description: 'Saves inventory temporatily'
        }, {
            usage: ['inv', 'load', { name: 'target', type: 'player', optional: true }, { name: 'id', type: 'any', optional: true }],
            description: 'Loads saved inventory'
        }, {
            usage: ['inv', 'clear', { name: 'target', type: 'player', optional: true }],
            description: 'Clears inventory'
        }, {
            usage: ['inv', 'eclear', { name: 'target', type: 'player', optional: true }],
            description: 'Clears enderchest'
        }, {
            usage: ['inv', 'clone', { name: 'target', type: 'player' }],
            description: 'Clones someone\'s inventory'
        },
    ],
    minPermLvl: 80,
    trigger: /^(uac-?)?inv(entory)?$/i,
    typedParams: new cc.typedParams({
        minArgs: 1,
        sequence: ['save', cc.argumentParser.parseSelector, cc.argumentParser.parseAny],
        execute: async ([, target, id], { executer, log }) => {
            const [plr] = target ? await target(executer) : [executer];
            const sid = id ?? executer.name;
            const c = plr.getComponent('inventory').container;
            savedInventory.set(sid, {
                list: Array.from(Array(c.size), (v, i) => c.getItem(i)),
                slot: plr.selectedSlot
            });
            log(`Saved ${executer === plr ? 'your' : `§d${plr.name}§r's`} inventory with ID '${sid}'.`);
        }
    }, {
        minArgs: 1,
        sequence: ['load', cc.argumentParser.parseSelector, cc.argumentParser.parseAny],
        execute: async ([, target, id], { executer, log }) => {
            const [plr] = target ? await target(executer) : [executer];
            const sid = id ?? executer.name;
            const data = savedInventory.get(sid);
            if (!data)
                throw new Error(`Saved inventory '${sid}' not available`);
            const c = plr.getComponent('inventory').container;
            for (let i = 0; i < c.size; i++)
                c.setItem(i, data.list[i]);
            plr.selectedSlot = data.slot;
            log(`Loaded saved inventory '${sid}' to ${executer === plr ? 'your' : `§d${plr.name}§r's`} inventory.`);
        }
    }, {
        minArgs: 1,
        sequence: ['clear', cc.argumentParser.parseSelector],
        execute: async ([, target], { executer, log }) => {
            const [plr] = target ? await target(executer) : [executer];
            const c = plr.getComponent('inventory').container;
            for (let i = 0; i < c.size; i++)
                c.setItem(i, undefined);
            log(`Cleared ${executer === plr ? 'your' : `§d${plr.name}§r's`} inventory.`);
        }
    }, {
        minArgs: 1,
        sequence: ['eclear', cc.argumentParser.parseSelector],
        execute: async ([, target], { executer, log }) => {
            const [plr] = target ? await target(executer) : [executer];
            for (let i = 0; i < 27; i++)
                asyncExecCmd(`replaceitem entity @s slot.enderchest ${i} air`, plr);
            log(`Cleared ${executer === plr ? 'your' : `§d${plr.name}§r's`} enderchest.`);
        }
    }, {
        sequence: ['clone', cc.argumentParser.parseSelector],
        execute: async ([, target], { executer, log }) => {
            const [plr] = await target(executer);
            const c = plr.getComponent('inventory').container;
            const cb = executer.getComponent('inventory').container;
            for (let i = 0, m = Math.min(cb.size, c.size); i < m; i++)
                cb.setItem(i, c.getItem(i) ?? undefined);
            executer.selectedSlot = plr.selectedSlot;
            log(`Cloned §d${plr.name}§r's inventory.`);
        }
    })
});
const savedInventory = new Map();
