import { Player } from "@minecraft/server"
import EventEmitter from "../../core/lib/event.js"
import message from "../../core/lib/message.js"
import { convertToTime } from "../../core/lib/misc.js"
import permission from "../../core/lib/permission.js"
import playerManager from "../../core/lib/plr.js"
import server from "../../core/lib/server.js"
import { kick } from "../lib/misc.js"
import { Module } from "../lib/module.js"
import { playerIdentity } from "../lib/playerdat.js"
import uacStorage from "../lib/storage.js"

export class banModuleConstructor extends Module {
    list = new Map<string, banData>()

    events = new EventEmitter<banEvents>('Module (Blacklist)')

    ban(plr: playerIdentity | Player, mod: Player | string = '[System]', reason: string = 'No reason', duration: number = Infinity) {
        if (plr instanceof Player && permission.getPlayerLevel(plr) >= 80) throw new Error('This player cannot be banned.')
        const modData = mod instanceof Player ? { name: mod.name, uid: mod.uidStr } : { name: mod, uid: '' }
        const expire = Math.min(Date.now() + duration, Number.MAX_VALUE)

        this.list.set(plr.uidStr, {
            name: plr.name,
            uid: plr.uidStr,

            modName: modData.name,
            modUid: modData.uid,

            reason,
            expires: expire
        })

        this.events.emit('ban', {
            target: plr,
            mod,
            duration,
            reason
        })
    }

    unban(plr: playerIdentity | Player, mod: Player | string = '[System]', reason: string = 'No reason') {
        const data = this.list.get(plr.uidStr)
        if (!data) throw new Error('This player is not banned.')

        this.events.emit('unban', {
            target: plr,
            mod: mod,
            reason
        })

        this.list.delete(plr.uidStr)
    }
}

const banModule = new banModuleConstructor('ban', 'Ban <Passive>', 'Blocks banned players from joining')
export default banModule

uacStorage.addEventListener('save', ({data}) => {
    data.ban = [...banModule.list.values()]
})

uacStorage.addEventListener('load', ({data}) => {
    if (!data.ban) return

    banModule.list.clear()
    for (const v of data.ban) banModule.list.set(v.uid, v)
})

new server.interval(() => {
    const ctime = Date.now()
    for (const m of banModule.list.values()) {
        if (m.expires <= ctime) banModule.unban({
            name: m.name,
            uidStr: m.uid,
            uid: playerManager.parseUid(m.uid)
        }, undefined, 'Ban has expired')
    }
}, 120_000)

// Handler

server.addEventListener('playerLoad', (plr, ctrl) => {
    const d = banModule.list.get(plr.uidStr)
    if (!d) return
    
    const td = d.expires - Date.now()
    if (td <= 0 || permission.getPlayerLevel(plr) >= 80) return banModule.unban(plr, undefined, 'Ban has expired')

    ctrl.break()
    kick(plr, [
        `You are currently §cbanned§r from playing in this server for §a${convertToTime(td)}§r.`,
        ` §8:§r Moderator: §d${d.modName}§r`,
        ` §8:§r Reason: §e${d.reason}§r`,
    ].join('\n'))
}, { priority: 10001 })

banModule.events.addEventListener('ban', ({mod, target, duration, reason}) => {
    const plrMod = mod instanceof Player ? mod : undefined
    const modName = plrMod?.name ?? mod

    const plrTarget = target instanceof Player ? target : undefined
    const targetName = plrTarget?.name ?? target.name

    message.sendMsgToAdmins(60, `§3[§bUAC§3]§r §d${modName}§r banned §d${targetName}§r §7(§2#${target.uidStr}§7)§r for §a${convertToTime(duration)}§r. \nReason: §a${reason}`, plrMod ? [plrMod] : [])
    if (plrMod) plrMod.tell(`Banned §d${targetName}§r §7(§2#${target.uidStr}§7)§r for §a${convertToTime(duration)}§r. \nReason: §a${reason}`)
    
    if (plrTarget) kick(plrTarget, [
        `You have been §cbanned§r for §a${convertToTime(duration)}§r.`,
        ` §8:§r Moderator: §d${modName}§r`,
        ` §8:§r Reason: §e${reason}§r`,
    ].join('\n'))
})

banModule.events.addEventListener('unban', ({mod, target, reason}) => {
    const plrMod = mod instanceof Player ? mod : undefined
    const modName = plrMod?.name ?? mod

    const plrTarget = target instanceof Player ? target : undefined
    const targetName = plrTarget?.name ?? target.name

    reason ||= 'No reason'

    message.sendMsgToAdmins(60, `§3[§bUAC§3]§r §d${modName}§r unbanned §d${targetName}§r §7(§2#${target.uidStr}§7)§r. \nReason: §a${reason}`, plrMod ? [plrMod] : [])
    if (plrMod) plrMod.tell(`Unbanned §d${targetName}§r §7(§2#${target.uidStr}§7)§r. \nReason: §a${reason}`)
})

// Types

export type banData = {
    name: string
    uid: string

    modName: string
    modUid: string

    reason: string
    expires: number
}

export type banEvents = {
    ban: {
        readonly mod: Player | string
        readonly target: Player | playerIdentity
        readonly reason: string
        readonly duration: number
    }
    unban: {
        readonly mod: Player | string
        readonly target: Player | playerIdentity
        readonly reason: string
    }
}
