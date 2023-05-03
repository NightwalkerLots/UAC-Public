import { Player, world } from "@minecraft/server"
import EventEmitter from "../../core/lib/event.js"
import message from "../../core/lib/message.js"
import permission from "../../core/lib/permission.js"
import server from "../../core/lib/server.js"
import { kick } from "../lib/misc.js"
import { Module } from "../lib/module.js"
import { playerIdentity } from "../lib/playerdat.js"
import uacStorage from "../lib/storage.js"

export class BlacklistModuleConstructor extends Module {
    list = new Map<string, blacklistData>()

    events = new EventEmitter<blacklistEvents>('Module (Blacklist)')

    add(plr: playerIdentity | Player, mod: Player | string = '[System]', reason: string = 'No reason') {
        if (plr instanceof Player && permission.getPlayerLevel(plr) >= 80) throw new Error('This player cannot be blacklisted.')
        const modData = mod instanceof Player ? { name: mod.name, uid: mod.uidStr } : { name: mod, uid: '' }

        this.list.set(plr.uidStr, {
            name: plr.name,
            uid: plr.uidStr,

            modName: modData.name,
            modUid: modData.uid,

            reason
        })

        this.events.emit('add', {
            target: plr,
            mod,
            reason
        })
    }

    remove(plr: playerIdentity | Player, mod: Player | string = '[System]', reason: string = 'No reason') {
        const data = this.list.get(plr.uidStr)
        if (!data) throw new Error('This player is not blacklisted.')

        this.events.emit('remove', {
            target: plr,
            mod: mod,
            reason
        })

        this.list.delete(plr.uidStr)
    }
}

const blacklistModule = new BlacklistModuleConstructor('blacklist', 'Blacklist', 'Blocks blacklisted players from joining')
export default blacklistModule

uacStorage.addEventListener('save', ({data}) => {
    data.blacklist = [...blacklistModule.list.values()]
})

uacStorage.addEventListener('load', ({data}) => {
    if (!data.blacklist) return

    blacklistModule.list.clear()
    for (const v of data.blacklist) blacklistModule.list.set(v.uid, v)
})

// Handler

blacklistModule.addEventListener('enable', () => {
    for (const plr of world.getPlayers()) {
        if (permission.getPlayerLevel(plr) >= 60) continue

        const d = blacklistModule.list.get(plr.uidStr)
        if (!d) continue

        kick(plr, [
            `You have been §4blacklisted§r.`,
            ` §8:§r Moderator: §d${d.modName}§r`,
            ` §8:§r Reason: §e${d.reason}§r`,
        ].join('\n'))
    }
})

server.addEventListener('playerLoad', (plr, ctrl) => {
    if (!blacklistModule.toggle) return

    const d = blacklistModule.list.get(plr.uidStr)
    if (!d) return

    if (permission.getPlayerLevel(plr) >= 80) return blacklistModule.remove(plr, undefined, 'Admin cannot be blacklisted')

    ctrl.break()
    kick(plr, [
        `You are currently §4blacklisted§r from playing in this server.`,
        ` §8:§r Moderator: §d${d.modName}§r`,
        ` §8:§r Reason: §e${d.reason}§r`,
    ].join('\n'))
}, { priority: 10002 })

blacklistModule.events.addEventListener('add', ({mod, target, reason}) => {
    const plrMod = mod instanceof Player ? mod : undefined
    const modName = plrMod?.name ?? mod

    const plrTarget = target instanceof Player ? target : undefined
    const targetName = plrTarget?.name ?? target.name

    message.sendMsgToAdmins(60, `§3[§bUAC§3]§r §d${modName}§r blacklisted §d${targetName}§r §7(§2#${target.uidStr}§7)§r. \nReason: §a${reason}`, plrMod ? [plrMod] : [])
    if (plrMod) plrMod.tell(`Blacklisted §d${targetName}§r §7(§2#${target.uidStr}§7)§r. \nReason: §a${reason}`)
    
    if (plrTarget && blacklistModule.toggle) kick(plrTarget, [
        `You have been §4blacklisted§r.`,
        ` §8:§r Moderator: §d${modName}§r`,
        ` §8:§r Reason: §e${reason}§r`,
    ].join('\n'))
})

blacklistModule.events.addEventListener('remove', ({mod, target, reason}) => {
    const plrMod = mod instanceof Player ? mod : undefined
    const modName = plrMod?.name ?? (mod || '[System]')

    const plrTarget = target instanceof Player ? target : undefined
    const targetName = plrTarget?.name ?? target.name

    message.sendMsgToAdmins(60, `§3[§bUAC§3]§r §d${modName}§r removed §d${targetName}§r §7(§2#${target.uidStr}§7)§r from blacklist. \nReason: §a${reason}`, plrMod ? [plrMod] : [])
    if (plrMod) plrMod.tell(`Removed §d${targetName}§r §7(§2#${target.uidStr}§7)§r from blacklist. \nReason: §a${reason}`)
})

// Types

export type blacklistData = {
    name: string
    uid: string

    modName: string
    modUid: string

    reason: string
}

export type blacklistEvents = {
    add: {
        readonly mod: Player | string
        readonly target: Player | playerIdentity
        readonly reason: string
    }
    remove: {
        readonly mod: Player | string
        readonly target: Player | playerIdentity
        readonly reason: string
    }
}
