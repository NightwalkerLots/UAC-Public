import { BlockAreaSize, Entity, ScoreboardIdentityType, ScoreboardObjective, Vector, Vector3, world } from "@minecraft/server"

export function clamp(value: number, min: number, max: number) {
    return Math.max( Math.min(value, max), min )
}

export function compressBit(...data: [value: number, size: number, unsigned?: boolean][]) {
    return +(
        '0b1'
        + data.map(
            ([v, s, u = false]) =>
                Math.abs( Math.trunc( u ? v : ( 1 << s - 1 ) + v ) )
                    .toString(2)
                    .padStart(s, '0')
                    .slice(-s)
        ).join('')
    )
}

const locationTypeEnum = {
    Array: Array,
    BlockAreaSize: BlockAreaSize,
    Vector: Vector,
} as const
Object.setPrototypeOf(locationTypeEnum, null)

export function convertLocationType< T extends keyof typeof locationTypeEnum >(type: T, location: LocationType): T extends 'Array' ? Array3 : InstanceType<typeof locationTypeEnum[T]> {
    //@ts-expect-error
    if (location instanceof locationTypeEnum[type]) return location
    const { x, y, z } = location instanceof Array ? { x: location[0], y: location[1], z: location[2] } : location
    //@ts-expect-error
    return type === 'Array' ? [x, y, z] : new locationTypeEnum[type](x, y, z)
}

export function convertToTime(time: number, ms = true) {
    if (ms) time /= 1000
    if (time >= 1892160000) return 'eternity'

    const y = Math.trunc(time / 31536000),
        mth = Math.trunc((time -= y * 31536000) / 2592000),
        w = Math.trunc((time -= mth * 2592000) / 604800),
        d = Math.trunc((time -= w * 604800) / 86400),
        h = Math.trunc((time -= d * 86400) / 3600),
        m = Math.trunc((time -= h * 3600) / 60),
        s = Math.trunc((time -= m * 60) / 1)

    const arr: [number, string][] = [
        [ y, 'year' ],
        [ mth, 'month' ],
        [ w, 'week' ],
        [ d, 'day' ],
        [ h, 'hour' ],
        [ m, 'minute' ],
        [ s, 'second' ]
    ]
    return arr.filter( ([t]) => t ).slice(0, 2).map( ([t, mod]) => `${t} ${mod}${t == 1 ? '' : 's'}` ).join(' ') || '0 seconds'
}

export function getFunctionName(fn: Function) {
    return `${fn.name || '<anonymous>'} (${fn.fileName ? `defined at ${fn.fileName}:${fn.lineNumber}` : 'native'})`
}

export function getScore(ent: Entity | string, sb: string | ScoreboardObjective, def: number | null = 0) {
    try {
        const obj = sb instanceof ScoreboardObjective ? sb : world.scoreboard.getObjective(sb)
        return typeof ent === 'string' ? obj.getScores().find(({participant}) => participant.type === ScoreboardIdentityType.fakePlayer && participant.displayName === ent)?.score : obj.getScore(ent.scoreboard)
    } catch {
        return def === null ? undefined : 0
    }
}

export function getStackTrace(deleteCount = 0) {
    return new Error().stack?.replace(new RegExp(`^(.*(\n|$)){0,${deleteCount + 1}}`), '') ?? ''
}

export function hasInstance(obj: any, clist: Function[]) {
    const protolist = clist.map(v => v.prototype)
    let cproto = obj
    while (cproto !== null) {
        if (protolist.includes(cproto)) return true
        cproto = Object.getPrototypeOf(cproto)
    }
    return false
}

export function parseRegex(pattern: string) {
    const [, body = pattern, flags] = pattern.match(/^\/(.*)\/([dgimsuy]*)$/) ?? []
    return new RegExp(body, flags)
}

export function mapArray3(a: Array3, fn: (a: number) => number) {
    return a.map(v => fn(v)) as Array3
}

export function mapToObject<L extends Array<string | number> | ReadonlyArray<string | number>>(list: L): Record<L[number], null> {
    const obj = Object.create(null)
    for (const k of list) obj[k] = null
    return obj
}

export function offset(a: Array3, b: Array3, fn: (a: number, b: number) => number = (a, b) => a + b) {
    return a.map((v, i) => fn(v, b[i as 0 | 1 | 2])) as Array3
}

export function parseBit(value: number, ...data: [size: number, unsigned?: boolean][]) {
    let bit = value.toString(2).substring(1)

    const v: number[] = []
    for (const [s, u = false] of data) {
        const localBit = bit.slice(0, s)
        bit = bit.substring(s)

        v.push( +`0b${localBit}` - ( u ? 0 : 1 << s - 1 ) )
    }
    return v
}

export const prettify = (() => {
    // Common
    const AsyncFunction = (async()=>{}).constructor,
        GeneratorFunction = (function*(){}).constructor,
        AsyncGeneratorFunction = (async function*(){}).constructor
    
    const ignoreProroKeys = new Set<any>([ Promise ])
    
    // Object
    function getKeys(obj: any, objPrototype = Object.getPrototypeOf(obj), getPrototypeKeys = true, excludeKeys: (string | symbol)[] = []) {
        let objKeys = Reflect.ownKeys(obj)
        if (getPrototypeKeys) objKeys = objKeys.concat(Reflect.ownKeys(objPrototype ?? {}))

        let keysSet = new Set(objKeys)
        for (const ek of excludeKeys) keysSet.delete(ek)

        return Array.from(keysSet, k => {
            const descriptor = Object.getOwnPropertyDescriptor(obj, k) ?? Object.getOwnPropertyDescriptor(objPrototype, k) ?? {},
                isGetter = Boolean(descriptor.get),
                isSetter = Boolean(descriptor.set)
            return {
                key: k,
                isGetter,
                isSetter
            }
        })
    }

    function formatKey(key: string | symbol, isGetter = false, isSetter = false) {
        return (typeof key === 'symbol' ? '§a' : key[0] === '_' ? '§7' : '') + String(key) + (isGetter && isSetter ? ' §b[Get/Set]§r ' : isGetter ? ' §b[Get]§r ' : isSetter ? ' §b[Set]§r ' : '')
    }

    // String
    const stringFormat = mapToObject(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'l', 'o', 'r']),
        stringEscape: Record<string, string> = {
            '\t': 'TAB',
            '\v': 'VTAB',
            '\r': 'CR',
            '\n': 'LF',
            '\f': 'FF',
            '\0': 'NUL',
            '\ufffe': 'U+FFFE',
            '\uffff': 'U+FFFF',
            '\\': '\\\\',
        }
    
    Object.setPrototypeOf(stringEscape, null)

    // Function
    function fnHeadRenderer(fn: Function, constructor: Function): string {
        const name = fn.name || '<anonymous>',
            loc = fn.fileName ? `${fn.fileName}:${fn.lineNumber}` : '<native>',

            notClass = Object.getOwnPropertyDescriptor(fn, 'prototype')?.writable ?? true,
            isAsync = constructor === AsyncFunction || constructor === AsyncGeneratorFunction,
            isGenerator = constructor === GeneratorFunction || constructor === AsyncGeneratorFunction,
            
            prototypeOf = Object.getPrototypeOf(fn),
            isExtend = prototypeOf instanceof Function
        return notClass
            ? `§e[${isAsync ? 'Async' : ''}${isGenerator ? 'Generator' : ''}Function: ${name} (${loc})]§r`
            : `§b[Class: ${name}${isExtend ? ` (extends: ${fnHeadRenderer(prototypeOf, prototypeOf.constructor).replace(/\u00a7./g, '')})` : ''} (${loc})]§r`
    }

    function exec(obj: any, stack: any[], tab: string, tabSeparator: string) {
        if (stack.includes(obj)) return `§b[Circular]§r`
        if (obj == null) return `§8${obj}§r`

        const curTab = tab.repeat(stack.length + 1),
            prevTab = tab.repeat(stack.length),
            newStack = stack.concat([obj])

        function execNextKey (k: string | symbol) {
            try { return exec(obj[k], newStack, tab, tabSeparator) }
            catch (e) { return `§c[Error]§r` }
        }
        function execNextObj (obj: any) {
            return exec(obj, newStack, tab, tabSeparator)
        }

        const objPrototype = Object.getPrototypeOf(obj),
            objConstructor = objPrototype?.constructor

        switch (objConstructor) {
            case String:
                return '§7"§r'
                    + obj.substring(0, 200).replace( /[\t\r\n\v\f\0\ufffe\uffff\\]|§(.)/gi, (match: string, col: string) => match[0] === '§' ? col in stringFormat ? `§a[S${col}]§r` : `§7[S${col === '§' ? 'S' : col}]§r` : match === '\\' ? '§e\\\\§r' : `§d[${stringEscape[match]}]§r` )
                    + `§7"§r`
                    + ( obj.length > 200 ? ` (${obj.length - 200} more)` : '' )

            case Number:
            case Boolean:
                return `§a${obj}§r`

            case RegExp:
                return `§c${obj}§r`

            case Symbol:
                return `§b${String(obj)}§r`

            case WeakMap:
            case WeakSet:
                return `§7${objConstructor.name}§r { §7[items unknown]§r }`

            default: {
                if (obj instanceof Error) {
                    return [`§b[${obj.name}]§r ${obj.message}`]
                        .concat( obj.stack && !prevTab.length ? obj.stack.split(/^ *at /gm).slice(1).map(v => curTab + tabSeparator + v.slice(0, -1)) : [] )
                        .join('\n')
                } else if (obj instanceof Function) {
                    const out = [fnHeadRenderer(obj, objConstructor)]
    
                    const keys = getKeys(obj, objPrototype, false, ['length', 'name', 'prototype', 'arguments', 'caller'])
                    if (keys.length) {
                        out[0] += ' {'
                        for (const { key, isGetter, isSetter } of keys ) out.push(curTab + tabSeparator + formatKey(key, isGetter, isSetter) + ': ' + execNextKey(key))
                        out.push(`${prevTab}${tabSeparator}}`)
                    }
    
                    return out.join('\n')
                } else if (obj instanceof Array) {
                    if (!obj.length) return `[] §7${objConstructor.name}<${obj.length}>§r`
    
                    const out = [`[ §7${objConstructor.name}<${obj.length}>§r`]
                    for (const k in obj) out.push(curTab + tabSeparator + formatKey(k) + ': ' + execNextKey(k))
                    out.push(`${prevTab}${tabSeparator}]`)
    
                    return out.join('\n')
                } else if (obj instanceof Set) {
                    if (!obj.size) return `[] §7${objConstructor.name}<${obj.size}>§r`
    
                    const out = [`[ §7${objConstructor.name}<${obj.size}>§r`]
                    for (const v of obj) out.push(curTab + tabSeparator + '§l=>§r' + ' ' + execNextObj(v))
                    for (const { key, isGetter, isSetter } of getKeys(obj, objPrototype, true, Reflect.ownKeys(Set.prototype)) ) out.push(curTab + tabSeparator + formatKey(key, isGetter, isSetter) + ': ' + execNextKey(key))
                    out.push(`${prevTab}${tabSeparator}]`)
    
                    return out.join('\n')
                } else if (obj instanceof Map) {
                    if (!obj.size) return `{} §7${objConstructor.name}<${obj.size}>§r`
    
                    const out = [`{ §7${objConstructor.name}<${obj.size}>§r`]
                    for (const [k, v] of obj) out.push(curTab + tabSeparator + '§l=>§r' + ' ' + execNextObj(k) + ' -> ' + execNextObj(v))
                    for (const { key, isGetter, isSetter } of getKeys(obj, objPrototype, true, Reflect.ownKeys(Map.prototype)) ) out.push(curTab + tabSeparator + formatKey(key, isGetter, isSetter) + ': ' + execNextKey(key))
                    out.push(`${prevTab}${tabSeparator}}`)
    
                    return out.join('\n')
                } else {
                    let name = objConstructor == null ? `[${obj[Symbol.toStringTag] ?? 'Object'}: null prototype]` // null prototype
                        : objConstructor != Object ? objConstructor.name // constructor != object
                        : Symbol.toStringTag in obj ? `${objConstructor.name} [${obj[Symbol.toStringTag]}]` // named object
                        : '',
                        getPrototypeKeys = objConstructor !== Object && !ignoreProroKeys.has(objConstructor),
                        excludeKeys = objConstructor != Object ? ['constructor'] : []
            
                    const keys = getKeys(obj, objPrototype, getPrototypeKeys, excludeKeys)
                    if (!keys.length) return `{} §7${name}§r`

                    const out = [`{ §7${name}§r`]
                    for (const { key, isGetter, isSetter } of keys ) out.push(curTab + tabSeparator + formatKey(key, isGetter, isSetter) + ': ' + execNextKey(key))
                    out.push(`${prevTab}${tabSeparator}}`)

                    return out.join('\n')
                }
            }
        }
    }

    return function prettify(obj: any, tab = ' §8:§r ', tabSeparator = ' ') {
        return exec(obj, [], tab, tabSeparator)
    }
})()

export function randomBetween(min: number, max: number) {
    return min + Math.random() * (max - min)
}

export function randomIntBetween(min: number, max: number) {
    return min + Math.trunc(Math.random() * (max - min))
}

export function randomstr(length: number, charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') {
    let o = ''
    for (let i = 0; i < length; i++) o = o.concat( charset[ Math.trunc( Math.random() * charset.length ) ] as string )
    return o
}

export function renameFn<fn extends Function>(fn: fn, value: string | ((name: string) => void)) {
    return Object.defineProperty(fn, 'name', { value: typeof value === 'string' ? value : value(fn.name) })
}

const tagFilterTestEnum = {
    'all': (n: number) => n >= 1,
    'any': (n: number) => 0 < n,
    'none': (n: number) => n === 0
} as const
Object.setPrototypeOf(tagFilterTestEnum, null)

export function testTagFilter(filter: tagFilter, tagList: string[] | Record<string, null>) {
    let testCount = 0, successCount = 0
    tagList = tagList instanceof Array ? mapToObject(tagList) : tagList

    if (filter instanceof Array)
        for (const tag of filter) {
            testCount++
            if (tag in tagList) successCount++
        }
    else
        for (const k in filter) {
            if (k !== 'all' && k !== 'any' && k !== 'none') continue
            testCount++
            if ( tagFilterTestEnum[k]( testTagFilter( filter[k] ?? [], tagList ) ) ) successCount++
        }
    
    return testCount === 0 ? 1 : successCount / testCount
}

export function Vec3([x, y, z]: Array3): Vector3 { return {x, y, z} }

export function wrapString<fn extends Function>(fn: fn, str: string) {
    return Object.defineProperty(fn, 'toString', {
        enumerable: false,
        value: function toString() {
            return str
        },
    })
}
