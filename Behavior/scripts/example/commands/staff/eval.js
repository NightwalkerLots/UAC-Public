import { Server } from '../../../library/Minecraft.js';

import * as mc from 'mojang-minecraft'
import * as gt from 'mojang-gametest'
import * as mcui from 'mojang-minecraft-ui'

import * as mclib from '../../../library/Minecraft.js';
import { Command as commandBuilder } from '../../../library/build/classes/commandBuilder.js';
import { EventEmitter as eventEmitter } from '../../../library/build/classes/eventEmitter.js';
import { Server as serverBuilder } from '../../../library/build/classes/serverBuilder.js';
import * as chatrank from '../../../library/miscellaneous/chatrank.js';
import * as leaderboard from '../../../library/miscellaneous/leaderboard.js';
import * as prototype from '../../../library/utils/prototype.js';
import scoreboard from '../../../library/scoreboard.js';

const registerInformation = {
    cancelMessage: true,
    name: 'eval',
    private: 'true',
    description: 'developer commands',
    usage: '[ script ]',
    example: [
    ]
};

let cmd
const globalBind = new Proxy({
    modules: (() => {
        const x = {
            mc,
            gt,
            mcui
        }
        return new Proxy(Object.create(null), {
            get: (t, p) => x[p],
            set: (t, p, v) => true,
            has: (t, p) => p in x
        })
    })(),
    mclib,
    builder: {
        eventEmitter,
        serverBuilder,
    },
    misc: {
        chatrank,
        leaderboard,
        prototype,
        scoreboard
    },
    get cmd() { return cmd; },
}, {
    get: (t, p) => p in t ? t[p] : globalThis[p],
    has: (t, p) => true
});

const viewObj = (() => {
    const GeneratorFunction = Object.getPrototypeOf(function* () { }).constructor, errUnknown = '§c[Unknown]§r', defTab = ' §8:§r ', defStrEscDict = {
        '\t': 'TAB',
        '\v': 'VTAB',
        '\r': 'CR',
        '\n': 'LF',
        '\f': 'FF',
        '\0': 'NUL',
    }, defStrColorDict = {
        '§0': 'BLACK',
        '§1': 'DBLUE',
        '§2': 'DGRN',
        '§3': 'DAQUA',
        '§4': 'DRED',
        '§5': 'DPURP',
        '§6': 'GOLD',
        '§7': 'GRAY',
        '§8': 'DGRAY',
        '§9': 'BLUE',
        '§a': 'GRN',
        '§b': 'AQUA',
        '§c': 'RED',
        '§d': 'PURP',
        '§e': 'YLW',
        '§f': 'WHITE',
        '§g': 'GOLD',
    }, defStrFormatDict = {
        '§k': 'OBF',
        '§l': 'BOLD',
        '§o': 'RESET',
        '§r': 'ITLC',
    };
    const keyFormat = (k) => typeof k == 'symbol' ? `§a${String(k)}§r` : k[0] == '_' ? `§7${k}§r` : k;
    const exec = (obj, tab = defTab, objlist = [], addObj = obj) => {
        if (objlist.includes(obj))
            return '§b[Circular]';
        if (obj === null || obj === undefined)
            return `§8${obj}`;
        const objConstructor = Object.getPrototypeOf(obj)?.constructor, constructorIsObject = objConstructor === Object || objConstructor == null;
        const o = [];
        const prevTab = tab.slice(0, -defTab.length);
        const kv = (k) => {
            const headings = `${tab} ${keyFormat(k)}${getGetterSetter(k)}: `;
            try {
                return headings + exec(obj[k], tab + defTab, objlist.concat([addObj]), obj[k]);
            }
            catch {
                return headings + errUnknown;
            }
        }, getKeys = () => {
            if (constructorIsObject) {
                return new Set(Reflect.ownKeys(obj));
            }
            else {
                const o = new Set(objConstructor == Function ? Reflect.ownKeys(obj)
                    : Reflect.ownKeys(objConstructor.prototype).filter(v => v in obj).concat(Reflect.ownKeys(obj)));
                o.delete('length');
                o.delete('name');
                o.delete('arguments');
                o.delete('caller');
                o.delete('prototype');
                o.delete('constructor');
                return o;
            }
        }, getGetterSetter = (k) => {
            const { get, set } = Reflect.getOwnPropertyDescriptor(obj, k)
                ?? (k in obj ? Reflect.getOwnPropertyDescriptor(objConstructor.prototype, k) : null)
                ?? {};
            return get && set ? ` §b[Get/Set]§r `
                : get ? ` §b[Get]§r `
                    : set ? ` §b[Set]§r `
                        : '';
        };
        try {
            switch (objConstructor) {
                case String:
                    return `§7"§r${obj.replace(/[\t\r\n\v\f\0]|§./g, (v) => v in defStrEscDict ? `§d[${defStrEscDict[v]}]§r` : v in defStrColorDict ? `§b[${defStrColorDict[v]}]§r` : v in defStrFormatDict ? `§a[${defStrFormatDict[v]}]§r` : `§8[S${v.slice(-1)}]§r`)}§7"§r`;
                case Number:
                    return `§a${obj}§r`;
                case Boolean:
                    return `§a${obj}§r`;
                case RegExp:
                    return `§c${obj}§r`;
                case Symbol:
                    return `§b${String(obj)}§r`;
                case GeneratorFunction:
                case Function: {
                    let l = 0;
                    if (obj.prototype)
                        l++;
                    if (!(Object.getOwnPropertyDescriptor(obj, 'prototype')?.writable ?? true))
                        l++;
                    const cn = obj.name || '(anonymous)';
                    o.push(objConstructor == GeneratorFunction ? `§e[GeneratorFunction: ${cn}]§r`
                        : l == 0 || l == 1 ? `§e[Function: ${cn}]§r`
                            : l == 2 ? `§b[Class: ${cn}]§r`
                                : '');
                    const keys = getKeys();
                    if (keys.size) {
                        o[0] += ' {';
                        for (const k of keys)
                            o.push(kv(k));
                        o.push(`${prevTab} }`);
                    }
                    return o.join('\n§r');
                }
                case Array: {
                    if (!obj.length)
                        return `[] §7Array<0>`;
                    o.push(`[ §7Array<${obj.length}>`);
                    for (const k in obj)
                        o.push(kv(k));
                    o.push(`${prevTab} ]`);
                    return o.join('\n§r');
                }
                default: {
                    const constructorName = objConstructor?.name ?? '[Object: null prototype]';
                    const keys = getKeys();
                    if (!keys.size)
                        return `{} §7${constructorName}`;
                    o.push(`{ §7${constructorName}`);
                    for (const k of keys)
                        o.push(kv(k));
                    o.push(`${prevTab} }`);
                    return o.join('\n§r');
                }
            }
        }
        catch {
            return errUnknown;
        }
    };
    return (obj) => exec(obj);
})();

Server.command.register(registerInformation, (chatmsg, args) => {
    try {
        const { sender } = chatmsg;
        const message = chatmsg.message.substring(4 + commandBuilder.prefix.length + 1)
        const tellraw = (v) => sender.runCommand(`tellraw @s {"rawtext":[{"text":"${v.replaceAll(/\\|"/g, '\\$&')}"}]}`)

        if (!sender.hasTag('staffstatus')) return tellraw(`§¶§cUAC ► §c§lError 4: Only Staff can use this command`)

        tellraw(`> ${message}`);
        try {
            cmd = { evd: chatmsg, args };
            new Function(`with (this) {\nthrow ${message}\n}`).call(globalBind);
        } catch (e) {
            if (e instanceof Error) tellraw(`${e}\n${e.stack}`);
            else tellraw(viewObj(e));
            tellraw(' ');
        }
    } catch(e) {
        console.warn(`${e}\n${e.stack}`)
    }
});