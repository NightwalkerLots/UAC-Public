import cc from "../../core/lib/cc.js";
import module from "../lib/module.js";
import { prettify } from "../../core/lib/misc.js";
cc.create('uac:module', {
    name: '[UAC] Module',
    description: 'Manage & configure module',
    usage: [
        {
            usage: ['module', 'enable|disable', { name: 'module', type: 'any' }],
            description: 'Enables / disables module.'
        }, {
            usage: ['module', 'configure', { name: 'module', type: 'any' }, { name: 'property', type: '*' }, { name: 'value', type: '*' }],
            description: 'Configures a module.'
        }, {
            usage: ['module', 'allconfig'],
            description: 'Shows all module configuration.'
        }, {
            usage: ['module', 'list'],
            description: 'Shows module list.'
        }
    ],
    minPermLvl: 80,
    trigger: /^(uac-?)?(manage-?)?modules?$/i,
    typedParams: new cc.typedParams({
        sequence: ['list'],
        execute: ([], { executer, log }) => {
            log([
                ' ',
                'Module list:',
                ...Array.from(module.values(), v => ` §8:§r ${v.name} (${v.toggle ? '§aenabled§r' : '§cdisabled§r'}) §7(${v.id})§r §8-§r §7${v.desc}§r`),
                ' ',
            ]);
        }
    }, {
        sequence: [['enable', 'disable'], cc.argumentParser.parseAny],
        execute: ([tgl, id], { executer, log }) => {
            const m = module.get(id);
            if (!m)
                throw new Error(`Module '${id}' not found`);
            const tglNew = tgl === 'enable';
            if (m.toggle === tglNew)
                return log(`Module §e${m.name}§r is currently enabled.`);
            m.setToggle(tglNew, executer);
        }
    }, {
        minArgs: 2,
        sequence: ['configure', cc.argumentParser.parseAny, cc.argumentParser.parseAny, cc.argumentParser.parseAny],
        execute: ([, id, key, value], { executer, log }) => {
            const m = module.get(id);
            if (!m)
                throw new Error(`Module '${id}' not found`);
            const c = m.configParser;
            if (!c)
                throw new Error(`Module ${m.name} is not configurable`);
            if (key == undefined)
                return log([
                    ' ',
                    `Config for §e${m.name}§r:`,
                    ...Object.entries(c.values).map(([k, v]) => ` §8:§r ${v.name} §7(${k})§r: ${prettify(c.obj[v.key])}`),
                    ' '
                ]);
            const t = c.values[key];
            if (!t)
                throw new Error(`Unknown property '${key}'`);
            if (value == undefined)
                return log([
                    ' ',
                    `${t.name}: ${prettify(c.obj[t.key])} (type: §a${cc.formatType(t.typeDesc)}§r)`,
                    t.desc,
                    ' ',
                ]);
            c.execute(key, value);
            log(`Set config property '${t.name}' for module §e${m.name}§r to ${prettify(c.obj[t.key])}`);
        }
    }, {
        sequence: ['allconfig'],
        execute: ([], { executer, log }) => {
            let x = [];
            x.push(' ');
            for (const m of module.values()) {
                if (!m.configParser)
                    continue;
                x.push('§e' + m.name + '§r');
                for (const [k, v] of Object.entries(m.configParser.values))
                    x.push(` §8:§r ${k}: ${prettify(m.data[v.key])}`);
            }
            x.push(' ');
            log(x);
        }
    })
});
