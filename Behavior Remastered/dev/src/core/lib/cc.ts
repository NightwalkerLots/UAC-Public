import { CommandResult, Dimension, Entity, ItemTypes, MinecraftBlockTypes, Player, Vector, world } from "@minecraft/server"
import EventEmitter from "./event.js"
import MapProxy from "./mapproxy.js"
import { asyncExecCmd } from "./mc.js"
import message from "./message.js"
import { clamp, getStackTrace, mapToObject, prettify, renameFn, testTagFilter } from "./misc.js"
import permission from "./permission.js"
import { typeObjects, TypeObjectsClass } from "./types.js"

export class CCConstructor extends MapProxy<string, CC> {
    formatType(t: ccType) {
        const l: string[] = []

        const typeList = t.type ?? []
        for (const t of Array.isArray(typeList) ? typeList : [typeList]) l.push(`§e${t}§r`)
    
        const keywordList = t.keyword ?? []
        for (const t of Array.isArray(keywordList) ? keywordList : [keywordList]) l.push(`§a${t}§r`)
    
        return l.join(' | ')
    }

    constructor() {
        super({
            delete: (map, key) => {
                const cc = map.get(key)
                if (cc) {
                    if (!cc.canBeDeleted) return false
                    cc.onDelete?.()
                }
                return map.delete(key)
            },
            clear: (map) => {
                for (const k of map.keys()) this.delete(k)
            }
        })
    }

    event = new EventEmitter<ccEvents>('UAC:CC')

    get typedParams() { return CCTypedParams }
    get typedFlags() { return CCTypedFlags }
    get argumentParser() { return argumentParser }

    prefix = '!'

    create(...args: ConstructorParameters<typeof CC>) {
        return new CC(...args)
    }

    getFromTrigger(trigger: string) {
        for (const cc of this.values())
            if (cc.trigger instanceof Array ? cc.trigger.includes(trigger) : cc.trigger.test(trigger))
                return cc
        return
    }

    async execute(player: Player, command: string, variables?: any, maxPermLvl = Infinity): Promise<ccResult> {
        command = command.substring(this.prefix.length)
        let data: undefined | ccExecuteData

        try {
            const args = argumentParser.parseArg(command),
                trigger = args.shift() ?? ''
            
            const cmd = this.getFromTrigger(trigger)
            if (!cmd) throw new CCError(`Command not found: '${trigger}'`, 'ReferenceError')
            if (!cmd.enabled) throw new CCError(`Command is disabled: ${cmd.name}`, 'TypeError')

            const plrTags = player.getTags()
            const plrPermLvl = permission.getPlayerLevel(player)
            if (cmd.minPermLvl > maxPermLvl || plrPermLvl < cmd.minPermLvl || testTagFilter(cmd.tagFilter, plrTags) != 1)
                throw new CCError(`You have no permission to use this command: ${cmd.name}`, 'TypeError')

            const argFull = command.substring(trigger.length + 1)
            
            const { typedArgs, sequenceData } = cmd.typedParams?.parse(args) ?? { typedArgs: args }
            const admins = cmd.minPermLvl > 0 ? [...permission.getAdmins(plrPermLvl, undefined, [player])] : []

            data = {
                executer: player,
                trigger,
                argFull,
                args,
                typedArgs,
                logTarget: admins,
                log: (msg: any) => {
                    if (data === undefined) return

                    const {cancel, data: evd} = this.event.emit('log', { data, message: msg })
                    if (cancel) return

                    message.sendMsgToPlayers(data.logTarget, `§7${player.name}§r §8-§7 ${message.convertMsg(evd.message).replace(/\u00a7.|[\r\n]|\s{2,}/g, '').substring(0, 120)}`)
                    player.sendMsg(evd.message)
                },
            }
            Object.setPrototypeOf(data, null)
            Object.assign(data, variables)

            if (this.event.emit('execute', data).cancel) return { success: true }

            await sequenceData?.execute?.(typedArgs, data)
            await cmd.execute(data)

            return { success: true }
        } catch(e) {
            if (!this.event.emit('error', { data: data ?? variables, error: e }).cancel) {
                if (e instanceof Error) {
                    if (
                        e instanceof CCError
                        || e.name == 'Error'
                        || e.name == 'SyntaxError'
                        || e.name == 'RangeError'
                    ) player.tell(`§cError! ${e.message}`)
                    else player.tell(`An error occured when executing a custom command: \n${e}\n${e.stack}`)
                }
                else player.sendMsg(e)
            }

            return { success: false, error: e }
        }
    }
}
const cc = new CCConstructor
export default cc

export class CC {
    constructor(id: string, properties: { [K in ccEditableProperties]?: CC[K] } = {}, addToList = true) {
        this.id = id
        Object.assign(this, properties)
        if (addToList) cc.set(id, this)
    }

    readonly id: string
    name = ''
    description = ''
    usage?: ccUsage[]

    get isListed() { return cc.get(this.id) === this }

    trigger: RegExp | string[] = []
    tagFilter: tagFilter = []
    minPermLvl = 0

    typedParams?: CCTypedParams
    execute: (data: ccExecuteData) => any = () => {}

    enabled = true
    hidden = false
    canBeDeleted = true

    onDelete?: () => void
}

type ccResult = {
    success: true
} | {
    success: false
    error: any
}

type ccEditableProperties = Exclude<keyof CC, 'id' | 'isListed'>

type ccUsage = {
    usage: (string | ccType & { name: string, optional?: boolean })[]
    description?: string
    example?: string[]
}

export type ccType = {
    //name: string,
    type?: string | string[],
    keyword?: string | string[],
    //optional?: boolean
}

type ccExecuteData = {
    [k: string]: any
    readonly executer: Player
    readonly trigger: string
    readonly argFull: string
    readonly args: string[]
    readonly typedArgs: any[]
    logTarget: Player[]
    log: (msg: any) => void
}

export class ArgumentParserConstructor {
    parseAny = (value: string) => value

    parseNumber = (value: string, int = true, min = 0, max = Infinity, clampIfOutside = false) => {
        let nv = +(value || '-')

        if (isNaN(nv)) throw new TypeError(`'${value}' is not a number`)
        if (nv < min || nv > max) {
            if (clampIfOutside) nv = clamp(nv, min, max)
            else throw new RangeError(`Number is outside range ([${min}, ${max}])`)
        }

        return int ? Math.floor(nv) : nv
    }

    number = (int = true, min = 0, max = Infinity, clampIfOutside = false) => {
        return renameFn( (value: string) => this.parseNumber(value, int, min, max, clampIfOutside), 'number')
    }

    #booleanKeys = {
        true: Object.setPrototypeOf({
            true: null,
            yes: null,
            1: null,
        }, null) as Record<string, null>,

        false: Object.setPrototypeOf({
            false: null,
            no: null,
            0: null,
        }, null) as Record<string, null>
    }
    
    parseBoolean = (value: string) => {
        if (value in this.#booleanKeys.true) return true
        if (value in this.#booleanKeys.false) return false
        throw new TypeError(`'${value}' is not a boolean`)
    }

    #toggleKeys = {
        true: Object.setPrototypeOf({
            on: null,
            enable: null,
        }, null) as Record<string, null>,

        false: Object.setPrototypeOf({
            off: null,
            disable: null,
        }, null) as Record<string, null>
    }
    
    parseToggle = (value: string) => {
        if (value in this.#toggleKeys.true) return true
        if (value in this.#toggleKeys.false) return false
        throw new TypeError(`'${value}' is not a toggle`)
    }

    parseJSON = (data: string) => {
        try {
            return JSON.parse(data)
        } catch(e) {
            throw e instanceof SyntaxError ? new SyntaxError(`[JSON] ${e.message}`) : e
        }
    }

    #time: Record<string, number> = {
        s: 1,
        m: 60,
        h: 3600,
        d: 86400,
        w: 604800,
        mth: 2592000,
        y: 31536000
    }

    parseTime = (time: string) => {
        if (!/^(\d+(mth|[smhdwy]))+$/.test(time)) throw new SyntaxError(`Invalid time format '${time}'`)
        let total = 0
        for (const [,duration = '0', mod = 's'] of time.matchAll(/(\d+)(mth|[smhdwy])/g)) total += (argumentParser.#time[mod] ?? 0) * +duration
        return total * 1000
    }

    type = (type: typeObjects) => {
        return renameFn((data: string) => {
            const json = JSON.parse(data)
            if (!type.test(json)) throw new TypeError(`'${JSON.stringify(data).replace(/\n */g, ' ').substring(0, 30)}...' is not equal to object type ${type.name}`)
            return json
        }, type.name)
    }

    flag = (flags: CCTypedFlags) => {
        return renameFn((data: string) => {
            try { return flags.parse(data) }
            catch { throw new TypeError(`'${data}' is not equal to flag type ${flags.name}`) }
        }, flags.name)
    }

    parseSelector = (selector: string) =>{
        return async (
            source?: Player | Entity | Dimension,
            {
                onPlayerNotFound = () => { throw new Error(`Player not found: '${selector}'`)},
                onSelectorNotFound = () => { throw new Error(`No players found`)},
                noSelector = true
            }: selectorParserOptions = {}
        ) => {
            if (!noSelector && /^@[spear](\[.*\])?$/.test(selector)) {
                try { await asyncExecCmd(`tag ${selector} add __temp__`, source) } catch {}

                const plist = [...world.getPlayers({ tags: ['__temp__'] })]
                for (const plr of plist) plr.removeTag('__temp__')

                if (!plist.length) onSelectorNotFound()
                return plist
            } else {
                if (selector[0] === '@') selector = selector.substring(1)
                const pname: string = selector[0] === '"' && selector[selector.length - 1] === '"' ? JSON.parse(selector) : selector

                for (const plr of world.getPlayers({ name: pname })) return [plr]
                onPlayerNotFound()
                return []
            }
        }
    }

    parseLocation = (loc: string) => {
        if (loc.toLowerCase() === 'ray') {
            return (plr: Player, floor = false): Array3 => {
                const bl = plr.getBlockFromViewDirection({ maxDistance: 50 })
                if (!bl) throw new Error('Location raycast failed: block not found')
                
                return [bl.x, bl.y, bl.z]
            }
        }

        const group = {
            '(': ')',
            '{': '}',
            '[': ']'
        }
        for (const [open, close] of Object.entries(group))
            if (loc[0] === open && loc[loc.length - 1] === close) {
                loc = loc.slice(1, -1)
                break
            }

        const v = loc.trim().replace(/(?<=[~^\d])((?=[~^])| *, *| +)/g, ',').split(',').map(v => {
            const [match, mod = '', num = '0'] = v.match(/^([~^]?)(-?\d*\.?\d*)$/) ?? []
            if (!match) throw new Error(`'${v}' is not a valid location`)

            const val = this.parseNumber(num || '0', false, -1 << 20, 1 << 20)
            return [mod, val] as [string, number]
        })
        if (!v[0] || !v[1] || !v[2] || v.length !== 3) throw new Error(`Location type requires 3 subarguments`)
        const [[xmod, xval], [ymod, yval], [zmod, zval]] = v

        return (plr: Player, floor = true): Array3 => {
            const {x, y, z} = plr.location
            let arr: Array3
            if (xmod === '^' || ymod === '^' || zmod === '^') {
                if (xmod !== '^' || ymod !== '^' || zmod !== '^') throw new Error(`local coordinates cannot be mixed with world coordinates (use ^ on every or don't use it)`)

                const vv = plr.viewDirection

                const fac1 = Vector.multiply(new Vector(vv.z, 0, -vv.x).normalized(), xval)
                const fac2 = Vector.multiply(Vector.up, yval)
                const fac3 = Vector.multiply(vv, zval)

                const {x: fx, y: fy, z: fz} = [fac1, fac2, fac3].reduce((a, b) => Vector.add(a, b))

                arr = [x + fx, y + fy, z + fz]
            } else {
                arr = [
                    xval + +( xmod === '~' && x ),
                    yval + +( ymod === '~' && y ),
                    zval + +( zmod === '~' && z ),
                ]
            }
            return floor ? arr.map(v => floor ? Math.floor(v) : v) as Array3 : arr
        }
    }

    array3 = <Fn extends (data: string, ...args: any) => any>(f: Fn, name: string | string[] = f.name, isType = true): (data: string) => Array3<ReturnType<Fn>> => {
        return renameFn(
            (data) => {
                const d = this.parseArg(data.slice(1, -1)).map(f) as Array3<any>
                if (d.length !== 3) throw new Error(`Array3 type requires 3 subarguments, received ${d.length}`)
                return d
            },
            'Array3<' + (Array.isArray(name) ? name : [name]).map(t => isType ? t : `"${t}"`).join(' | ') + '>'
        )
    }

    parseBlockType = (arg: string) => {
        const t = MinecraftBlockTypes.get(arg) || MinecraftBlockTypes.get('minecraft:' + arg)
        if (!t) throw new Error(`Unknown block '${arg}'`)
        return t
    }

    parseItemType = (arg: string) => {
        const t = ItemTypes.get(arg)
        if (!t) throw new Error(`Unknown item '${arg}'`)
        return t
    }

    parseArg = (arg: string) => {
        const group = {
            '(': ')',
            '{': '}',
            '[': ']',
            '"': '"'
        }
        let sequence: string[] = [],
            curSequence = '',
            isEscaped = false,
            groupCloseData: string[] = [],
            groupClose = ''
        for (const char of arg + ' ') {
            if (isEscaped) {
                isEscaped = false
            }
            else if (char === '\\') {
                isEscaped = true
                if (groupCloseData[0] === '"') continue
            }
            else if (char in group && groupClose !== '"') {
                //@ts-expect-error
                const close = group[char]
                groupCloseData.push(close)
                groupClose = close
            }
            else if (char === groupClose) {
                groupCloseData.pop()
                //@ts-expect-error
                groupClose = groupCloseData[groupCloseData.length - 1]
            }
            else if (char === ' ' && !groupClose) {
                if (curSequence) {
                    if (curSequence[0] === '"' && curSequence[curSequence.length - 1] === '"') curSequence = curSequence.slice(1, -1)
                    sequence.push(curSequence)
                    curSequence = ''
                }
                continue
            }
            curSequence += char
        }
        if (curSequence) sequence.push(curSequence)
        return sequence
    }
}
export const argumentParser = new ArgumentParserConstructor

renameFn(argumentParser.parseAny, 'any')
renameFn(argumentParser.parseNumber, 'number')
renameFn(argumentParser.parseBoolean, 'boolean')
renameFn(argumentParser.parseToggle, 'toggle')
renameFn(argumentParser.parseJSON, 'JSON')
renameFn(argumentParser.parseSelector, 'selector')
renameFn(argumentParser.parseLocation, 'location')
renameFn(argumentParser.parseTime, 'time')
renameFn(argumentParser.parseArg, 'arg')
renameFn(argumentParser.parseBlockType, 'Block')
renameFn(argumentParser.parseItemType, 'Item')

type selectorParserOptions = {
    onSelectorNotFound?: () => void
    onPlayerNotFound?: () => void
    noSelector?: boolean
}

export class CCTypedParams<execData = ccExecuteData, returnData = any> extends Array<paramTypeSequenceData<execData, returnData>> {
    constructor(...list: paramTypeSequenceData<execData, returnData>[]) {
        super(...list)
    }

    parse(arg: string | string[]) {
        arg = typeof arg == 'string' ? argumentParser.parseArg(arg) : arg
        if (!this.length) return { typedArgs: arg }

        // errors
        let argRange: [number, number] = [Infinity, -Infinity], argErrLvl = 0
        const setRangeErr = (min: number, max: number, lvl: number) => {
            const [cmin, cmax] = argRange
            argRange = [
                min < cmin ? min : cmin,
                max > cmax ? max : cmax
            ]
            argErrLvl = lvl > argErrLvl ? lvl : argErrLvl
        }

        let parseErrType: string[] = [], parseErr: Error | undefined, parseErrLvl = 0
        const setParseErr = (e: Error | paramType, lvl: number): false => {
            if (lvl < parseErrLvl) return false
            if (lvl > parseErrLvl) {
                parseErrType = []
                parseErrLvl = lvl
                parseErr = undefined
            }
            if (e instanceof Error) parseErr = e
            else {
                const s = typeof e == 'string' ? `'${e}'` : e instanceof RegExp ? `${e}` : e.name
                if (!parseErrType.includes(s)) parseErrType.push(s)
            }
            return false
        }


        sequenceLoop:
        for (const sd of this) {
            const { sequence, minArgs = sequence.length, rest } = sd
            const out: any[] = []

            typeLoop:
            for (const [i, s] of sequence.entries()) {
                if (i >= sequence.length) break
                if (!(i in arg)) {
                    if (i >= minArgs) break
                    setRangeErr(minArgs, rest ? Infinity : sequence.length, minArgs)
                    continue sequenceLoop
                }
                for (const type of Array.isArray(s) ? s : [s]) {
                    //@ts-expect-error
                    const r = testArg(arg[i], type)
                    if (r.status !== 1) {
                        if (r.status == -1) setParseErr(r.err, i + 1)
                        else setParseErr(type, i + 1)
                        continue
                    }
                    out.push(r.value)
                    continue typeLoop
                }
                continue sequenceLoop
            }

            const restArg = arg.slice(sequence.length)
            if (restArg.length) {
                if (!rest) {
                    setParseErr(new RangeError(`Argument${arg.length == 1 ? '' : 's'} passed is outside bound (${arg.length}/${sequence.length})`), sequence.length - 0.5)
                    continue
                }
                for (const [i, arg] of restArg.entries()) {
                    const r = testArg(arg, rest)
                    if (r.status !== 1) {
                        if (r.status == -1) setParseErr(r.err, i + 1 + sequence.length)
                        else setParseErr(rest, i + 1 + sequence.length)
                        continue sequenceLoop
                    }
                    out.push(r.value)
                }
            }

            return {
                typedArgs: out,
                sequenceData: sd
            }
        }

        if (argErrLvl > parseErrLvl) throw new RangeError(`Expecting ${ argRange[1] == Infinity ? `at least ${argRange[0]} argument${argRange[0] == 1 ? '' : 's'}` : argRange[0] == argRange[1] ? `${argRange[0]} argument${argRange[0] == 1 ? '' : 's'}` : `${argRange[0]} - ${argRange[1]} argument${argRange[1] == 1 ? '' : 's'}` }, got ${arg.length}`)
        if (parseErr) throw new CCError(parseErr.message, parseErr.name)
        throw new CCError(`Expecting ${parseErrType.join(' | ')}, got '${arg[parseErrLvl - 1]}'`, 'TypeError')
    }
}

export type paramType = CCTypedFlags | typeObjects | string | NamedRegExp | ( ( arg: string ) => any )
type paramTypeSequence = (paramType | paramType[])[]
type paramTypeSequenceData<execData, returnData> = {
    sequence: paramTypeSequence
    rest?: paramType
    minArgs?: number
    
    execute?: (args: any[], data: execData) => returnData
}

export class CCTypedFlags {
    constructor(flags: Record<string, paramType | paramType[]>, name = 'flags') {
        this.flags = flags
        this.name = name

    }

    name: string
    flags: Record<string, paramType | paramType[]>

    parse(flagStr: string | string[]) {
        flagStr = Array.isArray(flagStr) ? flagStr : argumentParser.parseArg(flagStr.slice(1, -1))
        const obj = Object.create(null)

        flagsLoop:
        while (flagStr.length) {
            const [k = '', v] = flagStr.splice(0, 2) as string[]
            if (v === undefined) throw new SyntaxError(`Expecting value for flag '${k}'`)

            const flagType = this.flags[k]
            if (!flagType) throw new SyntaxError(`Invalid flag '${k}'`)

            let parseErrType: string[] = []

            for (const type of Array.isArray(flagType) ? flagType : [flagType]) {
                const r = testArg(v, type)
                if (r.status === 1) {
                    obj[k] = r.value
                    continue flagsLoop
                }
                const s = typeof type == 'string' ? `'${type}'` : type instanceof RegExp ? `${type}` : type.name
                if (!parseErrType.includes(s)) parseErrType.push(s)
            }

            throw new CCError(`Expecting ${parseErrType.join(' | ')}, got '${v}'`, 'TypeError')
        }

        return obj
    }

    generateUsage() {
        const l: string[] = ['', `Properties for §e${this.name}§r:`]

        for (const [k, v] of Object.entries(this.flags)) {
            const typeList = { keyword: [] as string[], type: [] as string[] }
            for (const t of Array.isArray(v) ? v : [v]) typeof t == 'string' ? typeList.keyword.push(t) : typeList.type.push(t.name)

            l.push(` §8:§r ${k}: ${cc.formatType(typeList)}`)
        }

        l.push('')
        return l.join('\n')
    }
}

export class NamedRegExp extends RegExp {
    constructor(pattern: RegExp, name: string) {
        super(pattern)
        this.name = name
    }

    name: string
}

export function testArg (arg: string, argType: paramType): {
    status: 1
    value: any
} | {
    status: 0
} | {
    status: -1
    err: any
} {
    if (argType instanceof TypeObjectsClass) { // argType = objectType
        try {
            const data = JSON.parse(arg)
            return argType.test(data) ? {
                status: 1,
                value: data
            } : {
                status: 0
            }
        } catch(e) {
            return {
                status: -1,
                err: e instanceof Error && !(e instanceof TypeError) ? e : argType
            }
        }
    } else if (typeof argType == 'string') { // argType = string
        return argType === arg ? {
            status: 1,
            value: arg
        } : {
            status: 0
        }
    }
    else if (typeof argType == 'function') { // argType = function
        try {
            return {
                status: 1,
                value: argType(arg)
            }
        } catch (e) {
            return {
                status: -1,
                err: e instanceof Error && !(e instanceof TypeError) ? e : argType
            }
        }
    } else if (argType instanceof NamedRegExp) { // argType = regex
        const m = arg.match(argType)
        return m ? {
            status: 1,
            value: m
        } : {
            status: 0
        }
    } else if (argType instanceof CCTypedFlags) {
        try {
            return {
                status: 1,
                value: argType.parse(arg)
            }
        } catch {
            return {
                status: 0
            }
        }
    } else {
        throw new TypeError(`invalid argument type`)
    }
}

class CCError extends Error {
    constructor(message?: string, name = 'Error') {
        super(message)
        this.name = name
        this.stack = getStackTrace(1)
    }
}

export type ccEvents = {
    execute: ccExecuteData
    log: {
        readonly data: ccExecuteData
        message: any
    }
    error: {
        readonly data: Partial<ccExecuteData>
        readonly error: any
    }
}
