export const clamp = (value, min, max) => Math.max(Math.min(value, max), min);
export const empty = (obj) => Object.defineProperties(Object.create(null), Object.getOwnPropertyDescriptors(obj ?? {}));
export const hex = (i, minLength = 1, radix = 36) => i.toString(radix).padStart(minLength, '0');
export const mapObject = (i) => {
    let o = empty();
    for (let v of i)
        o[v] = 1;
    return o;
};
export const parseRegex = (v) => {
    const { body = v, flags = '' } = v.match(/^\/(?<body>.*)\/(?<flags>[dgimsuy]*)$/)?.groups ?? {};
    return new RegExp(body, flags);
};
export class progressBar {
    static normal = (length, data) => {
        return Object.assign([], ...data.map(v => {
            let filledLength = ~~(clamp(v.percentage, 0, 1) * length);
            let bar = Object.assign(Array(length).fill(v.empty), Array(filledLength).fill(v.filled));
            for (let k in bar)
                if (bar[k] == undefined)
                    delete bar[k];
            return bar;
        }).reverse());
    };
    static normalJoin = (length, data) => this.normal(length, data).join('');
    static divider = (length, data) => {
        return Object.assign([], ...data.map(v => {
            let filledLength = ~~(clamp(v.percentage, 0, 1) * (length - 1));
            let bar = Object.assign(Array(length - 1).fill(v.empty), Array(filledLength).fill(v.filled));
            bar.splice(filledLength, 0, v.divider);
            for (let k in bar)
                if (bar[k] == undefined)
                    delete bar[k];
            return bar;
        }).reverse());
    };
    static dividerJoin = (length, data) => this.divider(length, data).join('');
    static middleText = (arr, text) => {
        let pos = arr.length / 2, delCnt = pos % 1 == 0 ? 0 : 1;
        arr.splice(~~pos, delCnt, text);
        return arr;
    };
    static middleTextJoin = (arr, text) => this.middleText(arr, text).join('');
}
export const randomstr = (length, charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') => {
    let o = '';
    for (let i = 0; i < length; i++)
        o = o.concat(charset[Math.floor(Math.random() * charset.length)]);
    return o;
};
const defaultStressTestResPre = {
    name: null,
    fn: null,
    count: Infinity,
    time: Infinity,
    speed: -Infinity
};
export const stressTest = (c, data) => {
    const p = [];
    for (const { name, count = c, fn } of data) {
        const start = Date.now();
        for (let i = 0; i < c; i++)
            fn();
        const time = Date.now() - start;
        p.push({
            name,
            fn,
            count,
            time,
            speed: count / time * 1000
        });
    }
    const highest = p.reduce((a, b) => b.speed > a.speed ? b : a, defaultStressTestResPre);
    const o = p.map(v => {
        let rate = v.speed / highest.speed;
        return {
            ...v,
            rate,
            outText: (`[§r${progressBar.middleTextJoin(progressBar.normal(30, [
                { percentage: rate, empty: '§8:', filled: v == highest ? '§e:' : '§b:' }
            ]), `§r ${(rate * 100).toFixed(4).substring(0, 5)}% `)}§r]`
                + ` §7-§r speed: §a${v.speed.toFixed(3)} ops§r (§a${(1000 / v.speed).toFixed(3)} ms/ops§r)`
                + ` §7-§r time: §a${v.time}ms§r`
                + ` §7-§r ${v.name}`)
        };
    });
    return o;
};
export const viewObj = (() => {
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
        const objConstructor = Object.getPrototypeOf(obj)?.constructor, constructorIsObject = objConstructor === Object || objConstructor === null;
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