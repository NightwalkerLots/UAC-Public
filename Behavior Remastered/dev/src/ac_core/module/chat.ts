import { Player, world } from "@minecraft/server";
import cc from "../../core/lib/cc.js";
import chat from "../../core/lib/chat.js";
import EventEmitter from "../../core/lib/event.js";
import { asyncExecCmd } from "../../core/lib/mc.js";
import message from "../../core/lib/message.js";
import { convertToTime } from "../../core/lib/misc.js";
import permission from "../../core/lib/permission.js";
import playerManager from "../../core/lib/plr.js";
import server from "../../core/lib/server.js";
import { ModuleConfigParser } from "../lib/mcf.js";
import { Module } from "../lib/module.js";
import { playerIdentity } from "../lib/playerdat.js";
import uacStorage from "../lib/storage.js";

class ChatModuleConstructor extends Module<chatModuleData> {
    constructor() {
        super('chat',
            'Chat <Passive>',
            'Controls (Server / Shadow) Mute / Unmute, Slowmode, Max chat length',
            {
                slowmode: 3000,
                maxLength: 80,
                mutes: [], // should be unused
                serverMute: {
                    muterName: '',
                    muterUid: '',

                    reason: '',
                    type: 'normal',
                    expires: 0,
                    expired: true
                }
            }
        )
        this.configParser = new ModuleConfigParser(this.data, {
            slowmode: {
                name: 'Slowmode',
                desc: 'Cooldown per message sent in milliseconds',
                typeDesc: { type: 'number' },

                key: 'slowmode',
                type: cc.argumentParser.parseNumber
            },
            'max-length': {
                name: 'Max length',
                desc: 'Maximum message length in characters',
                typeDesc: { type: 'number' },

                key: 'maxLength',
                type: cc.argumentParser.parseNumber
            }
        })
    }

    muteCache = new Map<string, muteData>()
    cooldown = new WeakMap<Player, number>()

    events = new EventEmitter<chatEvents>('Module (Chat)')

    mute(plr: playerIdentity | Player, mod: Player | string = '[System]', reason: string = 'No reason', duration: number = Infinity, muteType: muteData['type'] = 'normal') {
        if (plr instanceof Player && permission.getPlayerLevel(plr) >= 60) throw new Error('This player cannot be muted.')
        const modData = mod instanceof Player ? { name: mod.name, uid: mod.uidStr } : { name: mod, uid: '' }
        const expire = Math.min(Date.now() + duration, Number.MAX_VALUE)

        this.muteCache.set(plr.uidStr, {
            name: plr.name,
            uid: plr.uidStr,

            muterName: modData.name,
            muterUid: modData.uid,

            reason,
            expires: expire,
            type: muteType
        })

        this.events.emit('mute', {
            target: plr,
            muter: mod,
            duration,
            reason,
            type: muteType
        })
    }

    unmute(plr: playerIdentity | Player, mod: Player | string = '[System]', reason: string = 'No reason') {
        const data = this.muteCache.get(plr.uidStr)
        if (!data) throw new Error('This player is not muted.')

        this.events.emit('unmute', {
            target: plr,
            unmuter: mod,
            reason,
            oldType: data.type
        })

        this.muteCache.delete(plr.uidStr)
    }

    serverMute(mod: Player | string = '[System]', reason: string = 'No reason', duration: number = Infinity, muteType: serverMuteData['type'] = 'normal') {
        const modData = mod instanceof Player ? { name: mod.name, uid: mod.uidStr } : { name: mod, uid: '' }
        const expire = Math.min(Date.now() + duration, Number.MAX_VALUE)

        this.data.serverMute = {
            muterName: modData.name,
            muterUid: modData.uid,

            reason,
            expires: expire,
            type: muteType,
            expired: false
        }

        this.events.emit('serverMute', {
            muter: mod,
            duration,
            reason,
            type: muteType
        })
    }

    serverUnmute(mod: Player | string = '[System]', reason: string = 'No reason') {
        if (this.data.serverMute.expired) throw new Error('Server is not muted.')
        this.data.serverMute.expired = true

        this.events.emit('serverUnmute', {
            unmuter: mod,
            reason,
            oldType: this.data.serverMute.type
        })
    }
}

const chatModule = new ChatModuleConstructor
export default chatModule

// Module system

uacStorage.addEventListener('save', () => {
    chatModule.data.mutes = Array.from(chatModule.muteCache.values())
}, { priority: 200 })

uacStorage.addEventListener('load', () => {
    chatModule.muteCache.clear()
    for (const d of chatModule.data.mutes) chatModule.muteCache.set(d.uid, d)
})()

chat.addEventListener('chat', (ev, ctrl) => {
    const { sender: plr, message } = ev
    if (permission.getPlayerLevel(plr) >= 60) return

    const ctime = Date.now()

    function fail(msg: string) {
        plr.tell(msg)
        ctrl.cancel()
        ctrl.break()
    }

    { // 1nd test: mute
        const serverMute = chatModule.data.serverMute
        if (!serverMute.expired) {
            const delta = serverMute.expires - ctime
            if (delta <= 0) chatModule.serverUnmute(undefined, 'Mute has expired')
            else return fail(`§eServer is currently muted by ${serverMute.muterName} and will expire in ${convertToTime(delta)}. \nMute reason: ${serverMute.reason}`)
        }

        const playerMute = chatModule.muteCache.get(plr.uidStr)
        if (playerMute) {
            const delta = playerMute.expires - ctime
            if (delta <= 0) chatModule.unmute(plr, undefined, 'Mute has expired')
            else {
                if (playerMute.type == 'shadow') ev.targets = [plr]
                else return fail(`§cYou are currently muted by ${playerMute.muterName} and will expire in ${convertToTime(delta)}. \nMute reason: ${playerMute.reason}`)
            }
        }
    }

    { // 2nd test: message length
        const lenMax = chatModule.data.maxLength
        if (message.length > lenMax) return fail(`§cNessage is too long! Maximum length is ${lenMax} characters.`)
    }

    { // 3st test: cooldown
        const delta = (chatModule.cooldown.get(plr) ?? 0) - ctime
        if (delta > 0) return fail(`§cToo fast! Please wait ${(delta / 1000).toFixed(2)} seconds before sending another message.`)
    }

    chatModule.cooldown.set(plr, ctime + chatModule.data.slowmode)
}, { priority: Infinity })

new server.interval(() => {
    const ctime = Date.now()
    for (const plr of world.getPlayers()) {
        const m = chatModule.muteCache.get(plr.uidStr)
        if (!m) continue

        if (m.expires <= ctime) chatModule.unmute(plr, undefined, 'Mute has expired')
    }

    const serverMute = chatModule.data.serverMute
    if (!serverMute.expired && serverMute.expires <= ctime) chatModule.serverUnmute(undefined, 'Mute has expired')
}, 3000)

new server.interval(() => {
    const ctime = Date.now()
    for (const m of chatModule.muteCache.values()) {
        if (m.expires <= ctime) chatModule.unmute({
            name: m.name,
            uidStr: m.uid,
            uid: playerManager.parseUid(m.uid)
        }, undefined, 'Mute has expired')
    }
}, 120_000)

// Handler

chatModule.events.addEventListener('mute', ({muter, target, duration, reason, type}) => {
    const plrMod = muter instanceof Player ? muter : undefined
    const modName = plrMod?.name ?? muter

    const plrTarget = target instanceof Player ? target : undefined
    const targetName = plrTarget?.name ?? target.name

    message.sendMsgToAdmins(60, `§3[§bUAC§3]§r §d${modName}§r ${type == 'hard' ? 'hard-muted' : type == 'shadow' ? 'shadow-muted' : 'muted'} §d${targetName}§r §7(§2#${target.uidStr}§7)§r for §a${convertToTime(duration)}§r. \nReason: §a${reason}`, plrMod ? [plrMod] : [])
    if (plrMod) plrMod.tell(`${type == 'hard' ? 'Hard-muted' : type == 'shadow' ? 'Shadow-muted' : 'Muted'} §d${targetName}§r §7(§2#${target.uidStr}§7)§r for §a${convertToTime(duration)}§r. \nReason: §a${reason}`)
    
    if (plrTarget && type !== 'shadow') plrTarget.tell(`§eYou have been ${type == 'hard' ? 'hard-muted' : 'muted'} by ${modName}§r§e for ${convertToTime(duration)}. \nReason: ${reason}`)
    if (plrTarget && type === 'hard') asyncExecCmd('ability @s mute true', plrTarget)
})

server.addEventListener('playerLoad', plr => {
    const mute = chatModule.muteCache.get(plr.uidStr)
    if (!mute) return

    if (mute.type !== 'shadow') plr.tell(`§eYou are currently muted by ${mute.muterName}§r§e and will expire in ${convertToTime(mute.expires - Date.now())}. \nMute reason: ${mute.reason}`)
    if (mute.type === 'hard') asyncExecCmd('ability @s mute true', plr)
})

chatModule.events.addEventListener('unmute', ({unmuter, target, reason, oldType}) => {
    const plrMod = unmuter instanceof Player ? unmuter : undefined
    const modName = plrMod?.name ?? unmuter

    const plrTarget = target instanceof Player ? target : undefined
    const targetName = plrTarget?.name ?? target.name

    reason ||= 'No reason'

    message.sendMsgToAdmins(60, `§3[§bUAC§3]§r §d${modName}§r unmuted §d${targetName}§r §7(§2#${target.uidStr}§7)§r. \nReason: §a${reason}`, plrMod ? [plrMod] : [])
    if (plrMod) plrMod.tell(`Unmuted §d${targetName}§r §7(§2#${target.uidStr}§7)§r. \nReason: §a${reason}`)
    
    if (plrTarget && oldType !== 'shadow') plrTarget.tell(`§aYou have been unmuted by §d${modName}§r§a. \nReason: §b${reason}`)
    if (plrTarget && oldType === 'hard') asyncExecCmd('ability @s mute false', plrTarget)
})

chatModule.events.addEventListener('serverMute', ({muter, duration, reason, type}) => {
    const plrMod = muter instanceof Player ? muter : undefined
    const modName = plrMod?.name ?? muter

    if (plrMod) plrMod.tell(`${type == 'hard' ? 'Hard-muted' : 'Muted'} server for §a${convertToTime(duration)}§r. \nReason: §a${reason}`)
    
    for (const plr of world.getPlayers()) {
        if (plr == muter) continue
        
        if (permission.getPlayerLevel(plr) >= 60) plr.tell(`§3[§bUAC§3]§r §d${modName}§r ${type == 'hard' ? 'hard-muted' : 'muted'} server for §a${convertToTime(duration)}§r. \nReason: §a${reason}`)
        else plr.tell(`§eServer has been ${type == 'hard' ? 'hard-muted' : 'muted'} by ${modName}§r§e for ${convertToTime(duration)}. \nReason: ${reason}`)
        if (type === 'hard') asyncExecCmd('ability @s mute true', plr)
    }
})

server.addEventListener('playerLoad', plr => {
    const mute = chatModule.data.serverMute
    if (mute.expired) return

    plr.tell(`§eServer is currently muted by ${mute.muterName}§r§e and will expire in ${convertToTime(mute.expires - Date.now())}. \nMute reason: ${mute.reason}`)
    if (mute.type === 'hard') asyncExecCmd('ability @s mute true', plr)
})


chatModule.events.addEventListener('serverUnmute', ({unmuter, reason, oldType}) => {
    const plrMod = unmuter instanceof Player ? unmuter : undefined
    const modName = plrMod?.name ?? unmuter

    if (plrMod) plrMod.tell(`Unmuted server. \nReason: §a${reason}`)
    
    for (const plr of world.getPlayers()) {
        if (plr == unmuter) continue
        
        if (permission.getPlayerLevel(plr) >= 60) plr.tell(`§3[§bUAC§3]§r §d${modName}§r unmuted server. \nReason: §a${reason}`)
        else plr.tell(`§aServer has been unmuted by §d${modName}§r§a. \nReason: §b${reason}`)
        if (oldType === 'hard') asyncExecCmd('ability @s mute false', plr)
    }
})

// Types

type chatModuleData = {
    slowmode: number
    maxLength: number
    mutes: muteData[]
    serverMute: serverMuteData
}

export type muteData = {
    name: string
    uid: string

    muterName: string
    muterUid: string

    reason: string
    type: 'shadow' | 'normal' | 'hard'
    expires: number
}

export type serverMuteData = {
    muterName: string
    muterUid: string

    reason: string
    type: 'normal' | 'hard'
    expires: number
    expired: boolean
}

export type chatEvents = {
    mute: {
        readonly target: Player | playerIdentity
        readonly muter: Player | string
        readonly reason: string
        readonly duration: number
        readonly type: muteData['type']
    }
    serverMute: {
        readonly muter: Player | string
        readonly reason: string
        readonly duration: number
        readonly type: serverMuteData['type']
    }
    unmute: {
        readonly target: Player | playerIdentity
        readonly unmuter: Player | string
        readonly reason: string
        readonly oldType: muteData['type']
    }
    serverUnmute: {
        readonly unmuter: Player | string
        readonly reason: string
        readonly oldType: serverMuteData['type']
    }
}
