import { Player, world } from "@minecraft/server"
import EventEmitter from "../../core/lib/event.js"
import playerManager from "../../core/lib/plr.js"
import server from "../../core/lib/server.js"
import Storage from "../../core/lib/storage.js"
import { Module } from "../lib/module.js"
import { playerIdentity } from "../lib/playerdat.js"
import uacStorage from "../lib/storage.js"
import banModule from "./ban.js"
import blacklistModule from "./blacklist.js"
import chatModule from "./chat.js"
import combatModule from "./combat.js"
import crasherModule from "./crasher.js"
import freezeModule from "./freeze.js"
import gamemodeModule from "./gamemode.js"
import illegalItemModule from "./illegalitem.js"
import movementModule from "./movement.js"
import nukerModule from "./nuker.js"
import whitelistModule from "./whitelist.js"

class Storagex<T = any> extends Storage<T> {
    io = Promise.resolve()

    read(maxDelay?: number) {
        return new Promise<string | undefined>(res => this.io = this.io.finally(() => res(Storage.prototype.read.call(this, maxDelay))))
    }

    write(data: string, chunkSize?: number) {
        return this.io = this.io.finally(() => Storage.prototype.write.call(this, data, chunkSize))
    }
}

const storageBufferSize = 512
const storageChunkList = Array.from(Array(64), (_, i) => new Storagex<logData[]>(`uac:log_${i.toString(8)}`, `UAC Log chunk ${i}`, false, 0))

export class LogModuleConstructor extends Module<logModuleData> {
    constructor() {
        super('log', 'Log', 'Logs event', {
            curChunkIndex: 0
        })

        uacStorage.addEventListener('save', () => storageChunkList[this.data.curChunkIndex]?.write(JSON.stringify(this.#stream)))
        uacStorage.addEventListener('load', () => storageChunkList[this.data.curChunkIndex]?.read().then(v => { if (v) this.#stream = JSON.parse(v) }))
    }

    events = new EventEmitter<logEvents>('Module (Log)')

    #stream: logData[] = []

    #getSortedChunk() {
        const l = Array.from(storageChunkList)
        l.push(...l.splice(0, this.data.curChunkIndex))
        l.shift() // remove the current writing
        l.reverse() // reverse to latest
        return l
    }

    async* readAll() {
        yield* this.#stream
        const l = Array.from(
            this.#getSortedChunk(),
            s => s.read()
                .then(v => JSON.parse(v ?? '[]') as logData[])
                .catch(() => Promise.reject(new Error(`Reading error at storage chunk '${s.name}'`)))
        )
        for (const v of l ) yield* await v
    }

    async* readAllSlow() {
        yield* this.#stream
        for (const s of this.#getSortedChunk())
            yield* await s.read()
                .then(v => JSON.parse(v ?? '[]') as logData[]) 
                .catch(() => Promise.reject(new Error(`Reading error at storage chunk '${s.name}'`)))
    }

    async getAllLength() {
        const l = Array.from(storageChunkList)
        l.splice(this.data.curChunkIndex, 1) // remove the current writing

        let len = 0
        len += JSON.stringify(this.#stream.length).length
        await Promise.all( Array.from(l, s => s.read().then(v => len += v?.length ?? 0)) )

        return len
    }

    async readSlice(start: number, end: number) {
        if (start >= end) return []
        const l = this.#getSortedChunk(), slen = this.#stream.length

        let o: logData[] = []
        if (start < slen) o = this.#stream.slice(start)
        if (end < slen) return o.slice(0, end - start)

        start = Math.max(start - slen, 0)
        end -= slen
        const sc = Math.floor(start / storageBufferSize), si = start % storageBufferSize
        const ec = Math.floor(end / storageBufferSize)//, ei = end % storageBufferSize

        let p: logData[] = [], prm = Promise.resolve(0)
        for (const s of l.slice(sc, ec + 1)) {
            prm = Promise.all([ s.read(), prm ])
                .then(([s]) => p.push(...JSON.parse(s ?? '[]')))
                .catch(() => Promise.reject(new Error(`Reading error at storage chunk '${s.name}'`)))
        }
        await prm

        return o.concat(p.slice(si, end))
    }

    async read(index: number) {
        if (index < this.#stream.length) return this.#stream[index]

        index -= this.#stream.length
        const chunk = Math.floor(index / storageBufferSize), localIndex = index % storageBufferSize
        const s = this.#getSortedChunk()[chunk]

        return s?.read().then(v => JSON.parse(v ?? '[]')[localIndex] as logData)
    }

    push(data: logData) {
        this.events.emit('log', data)
        if (!this.toggle) return
        
        this.#stream.unshift(data)
        if (this.#stream.length !== storageBufferSize) return

        storageChunkList[this.data.curChunkIndex]?.write(JSON.stringify(this.#stream))

        this.data.curChunkIndex = (this.data.curChunkIndex + 1) % storageChunkList.length
        this.#stream = []
    }

    async clear() {
        this.#stream = []
        this.data.curChunkIndex = 0
        await Promise.all( Array.from(storageChunkList, s => s.delete()) )
    }

    getStorageChunks() { return storageChunkList }
    getChunkBufferSize() { return storageBufferSize }
}

const logModule = new LogModuleConstructor
export default logModule

function actionLogInfo(mod: string | Player, target: Player | playerIdentity, action: string, reason: string, dur: number): logData {
    return {
        timestamp: Date.now(),

        type: 'action',

        action: action,
        actionDuration: dur,
        reason,
        
        modName: typeof mod === 'string' ? mod : mod.name,
        modUid: typeof mod === 'string' ? '' : mod.uidStr,

        name: target.name,
        uid: target.uidStr,
    }
}

function detectionLogInfo(module: Module, plr: Player | playerIdentity, detection: string, detail: string, action: string): logData {
    return {
        timestamp: Date.now(),

        type: 'detection',

        module: module.name,
        detection,
        detail,

        name: plr.name,
        uid: plr.uidStr,

        action,
        actionDuration: module.data.automodDuration ?? 1,
    }
}

function otherLogInfo(plr: Player | playerIdentity, cat: string, msg: string): logData { 
    return {
        timestamp: Date.now(),

        type: 'other',

        name: plr.name,
        uid: plr.uidStr,

        category: cat,
        message: msg
    }
 }

banModule.events.addEventListener('ban', ({mod, reason, duration, target}) => logModule.push(
    actionLogInfo(mod, target, 'ban', reason, duration)
))
banModule.events.addEventListener('unban', ({mod, reason, target}) => logModule.push(
    actionLogInfo(mod, target, 'unban', reason, 0)
))

blacklistModule.events.addEventListener('add', ({mod, reason, target}) => logModule.push(
    actionLogInfo(mod, target, 'blacklist', reason, 0)
))
blacklistModule.events.addEventListener('remove', ({mod, reason, target}) => logModule.push(
    actionLogInfo(mod, target, 'unblacklist', reason, 0)
))
whitelistModule.events.addEventListener('add', d => logModule.push(
    d.type === 'uid' ? actionLogInfo(d.mod, { uid: d.value.uid, uidStr: d.value.uidStr, name: d.value.name }, 'whitelist', '', 0)
        : actionLogInfo(d.mod, { uid: 0, uidStr: '', name: d.value }, 'whitelist', '', 0)
))
whitelistModule.events.addEventListener('remove', d => logModule.push(
    d.type === 'uid' ? actionLogInfo(d.mod, { uid: d.value.uid, uidStr: d.value.uidStr, name: d.value.name }, 'unwhitelist', '', 0)
        : actionLogInfo(d.mod, { uid: 0, uidStr: '', name: d.value }, 'unwhitelist', '', 0)
))

chatModule.events.addEventListener('mute', ({muter, reason, target, duration, type}) => logModule.push(
    actionLogInfo(muter, target, 'mute', reason, duration)
))
chatModule.events.addEventListener('unmute', ({unmuter, reason, target}) => logModule.push(
    actionLogInfo(unmuter, target, 'unmute', reason, 0)
))
chatModule.events.addEventListener('serverMute', ({muter, reason, duration, type}) => logModule.push(
    actionLogInfo(muter, { uid: 0, uidStr: '', name: '' }, 'servermute', reason, duration)
))
chatModule.events.addEventListener('serverUnmute', ({unmuter, reason}) => logModule.push(
    actionLogInfo(unmuter, { uid: 0, uidStr: '', name: '' }, 'serverunmute', reason, 0)
))

freezeModule.events.addEventListener('add', ({mod, target}) => logModule.push(
    actionLogInfo(mod, target, 'freeze', '', 1892160000)
))
freezeModule.events.addEventListener('remove', ({mod, target}) => logModule.push(
    actionLogInfo(mod, target, 'unfreeze', '', 0)
))

combatModule.events.addEventListener('action', ({action, detail, detection, plr}) => logModule.push(
    detectionLogInfo(combatModule, plr, detection, detail, action)
))
combatModule.events.addEventListener('combatlog', ({plrName, plrUid}) => logModule.push(
    detectionLogInfo(combatModule, { uid: playerManager.parseUid(plrUid), uidStr: plrUid, name: plrName }, 'CombatLog', '', 'alert')
))
crasherModule.events.addEventListener('detect', ({action, plr, detail, detection}) => logModule.push(
    detectionLogInfo(crasherModule, plr, detection, detail, action)
))
gamemodeModule.events.addEventListener('detect', ({action, plr, detail, detection}) => logModule.push(
    detectionLogInfo(gamemodeModule, plr, detection, detail, action)
))
movementModule.events.addEventListener('action', ({action, plr, detail, detection}) => logModule.push(
    detectionLogInfo(movementModule, plr, detection, detail, action)
))
illegalItemModule.events.addEventListener('action', ({action, plr, detail, detection}) => logModule.push(
    detectionLogInfo(illegalItemModule, plr, detection, detail, action)
))
nukerModule.events.addEventListener('action', ({action, plr, detail, detection}) => logModule.push(
    detectionLogInfo(nukerModule, plr, detection, detail, action)
))

server.addEventListener('playerLoad', plr => logModule.push(
    otherLogInfo(
        plr,
        'playerspawn',
        `§d${plr.name}§r (§2#${plr.uidStr}§r) spawned`
    )
))

server.addEventListener('playerJoin', ({playerId, playerName}) => logModule.push(
    otherLogInfo(
        {
            name: playerName,
            uid: playerId,
            uidStr: playerManager.stringifyUid(playerId)
        },
        'playerjoin',
        `§d${playerName}§r (§2#${playerManager.stringifyUid(playerId)}§r) joined`
    )
))

server.addEventListener('playerLeave', ({playerId, playerName}) => logModule.push(
    otherLogInfo(
        {
            name: playerName,
            uid: playerId,
            uidStr: playerManager.stringifyUid(playerId)
        },
        'playerleave',
        `§d${playerName}§r (§2#${playerManager.stringifyUid(playerId)}§r) left`
    )
))

type logModuleData = {
    curChunkIndex: number
}

export type logData = { timestamp: number } & (logDataAction | logDataDetection | logDataOther)

type logDataAction = {
    type: 'action'

    action: string
    actionDuration: number
    reason: string

    modName: string
    modUid: string

    name: string
    uid: string
}

type logDataDetection = {
    type: 'detection'

    module: string
    detection: string
    detail: string

    name: string
    uid: string

    action: string
    actionDuration: number
}

type logDataOther = {
    type: 'other'

    name: string
    uid: string

    category: string
    message: string
}

type logEvents = {
    log: logData
}
