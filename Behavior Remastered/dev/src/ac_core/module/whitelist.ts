import { Player, world } from "@minecraft/server"
import EventEmitter from "../../core/lib/event.js"
import message from "../../core/lib/message.js"
import permission from "../../core/lib/permission.js"
import server from "../../core/lib/server.js"
import { getPlayer, kick } from "../lib/misc.js"
import { Module } from "../lib/module.js"
import { playerIdentity } from "../lib/playerdat.js"
import uacStorage from "../lib/storage.js"

export class WhitelistModuleConstructor extends Module<{}> {
    nameList = new Set<string>()
    uidList = new Map<string, string>()

    events = new EventEmitter<whitelistEvents>('Module (Whitelist)')

    add(plr: playerIdentity | Player | string, mod: Player | string = '[System]') {
        const plrNew = typeof plr == 'string' ? getPlayer(plr) ?? plr : plr
        if (typeof plrNew !== 'string') {
            this.uidList.set(plrNew.uidStr, plrNew.name)
            this.events.emit('add', {
                mod,
                type: 'uid',
                value: plrNew
            })
        } else {
            this.nameList.add(plrNew)
            this.events.emit('add', {
                mod,
                type: 'name',
                value: plrNew
            })
        }
    }

    remove(plr: playerIdentity | Player | string, mod: Player | string = '[System]') {
        const plrNew = typeof plr == 'string' ? getPlayer(plr) ?? plr : plr
        if (typeof plrNew !== 'string') {
            if (!this.uidList.has(plrNew.uidStr)) throw new Error(`This player is not whitelisted: '${plrNew.name}' (#${plrNew.uidStr})`)

            this.uidList.delete(plrNew.uidStr)
            this.events.emit('remove', {
                mod,
                type: 'uid',
                value: plrNew
            })
        } else {
            if (!this.nameList.has(plrNew)) throw new Error(`This player is not whitelisted: '${plrNew}'`)

            this.nameList.delete(plrNew)
            this.events.emit('remove', {
                mod,
                type: 'name',
                value: plrNew
            })
        }
    }
}

const whitelistModule = new WhitelistModuleConstructor('whitelist', 'Whitelist', 'Filters players that can join', {}, false)
export default whitelistModule

uacStorage.addEventListener('save', ({data}) => {
    data.whitelist = {
        name: [...whitelistModule.nameList.values()],
        uid: [...whitelistModule.uidList],
    }
})

uacStorage.addEventListener('load', ({data}) => {
    if (!data.whitelist) return

    whitelistModule.nameList.clear()
    whitelistModule.uidList.clear()
    for (const v of data.whitelist.name) whitelistModule.nameList.add(v)
    for (const [uid, v] of data.whitelist.uid) whitelistModule.uidList.set(uid, v)
})

// Handler

whitelistModule.addEventListener('enable', () => {
    for (const plr of world.getPlayers()) {
        if (permission.getPlayerLevel(plr) >= 60 || whitelistModule.uidList.has(plr.uidStr)) continue
        kick(plr, `Whitelist has been enabled. You are not whitelisted.`)
    }
})

server.addEventListener('playerLoad', (plr, ctrl) => {
    if (!whitelistModule.toggle || permission.getPlayerLevel(plr) >= 60) return

    if (whitelistModule.nameList.has(plr.name)) {
        whitelistModule.nameList.delete(plr.name)
        whitelistModule.uidList.set(plr.uidStr, plr.name)
        return
    }

    if (whitelistModule.uidList.has(plr.uidStr)) return

    ctrl.break()
    kick(plr, `Whitelist is currently enabled. You are not whitelisted.`)
}, { priority: 10000 })

whitelistModule.events.addEventListener('add', ({mod, value}) => {
    const plrMod = mod instanceof Player ? mod : undefined
    const modName = plrMod?.name ?? mod

    const plrTarget = value instanceof Player ? value : undefined
    const targetName = plrTarget?.name ?? ( typeof value == 'string' ? value : value.name )
    const targetUid = plrTarget?.uidStr ?? ( typeof value == 'string' ? undefined : value.uidStr )

    message.sendMsgToAdmins(60, `§3[§bUAC§3]§r §d${modName}§r whitelisted §d${targetName}§r §7(${targetUid ? `§2#${targetUid}§7` : `<uid unknown>`})§r.`, plrMod ? [plrMod] : [])
    if (plrMod) plrMod.tell(`Whitelisted §d${targetName}§r §7(${targetUid ? `§2#${targetUid}§7` : `<uid unknown>`})§r.`)
})

whitelistModule.events.addEventListener('remove', ({mod, value}) => {
    const plrMod = mod instanceof Player ? mod : undefined
    const modName = plrMod?.name ?? (mod || '[System]')

    const plrTarget = value instanceof Player ? value : undefined
    const targetName = plrTarget?.name ?? ( typeof value == 'string' ? value : value.name )
    const targetUid = plrTarget?.uidStr ?? ( typeof value == 'string' ? undefined : value.uidStr )

    message.sendMsgToAdmins(60, `§3[§bUAC§3]§r §d${modName}§r removed §d${targetName}§r §7(${targetUid ? `§2#${targetUid}§7` : `<uid unknown>`})§r from whitelist.`, plrMod ? [plrMod] : [])
    if (plrMod) plrMod.tell(`Removed §d${targetName}§r §7(${targetUid ? `§2#${targetUid}§7` : `<uid unknown>`})§r from whitelist.`)

    if (plrTarget && whitelistModule.toggle && permission.getPlayerLevel(plrTarget) < 60) kick(plrTarget, `You are no longer whitelisted in this server.`)
})

whitelistModule.toggle = false

// Types

export type whitelistEvents = {
    add: {
        readonly mod: Player | string
    } & ({
        readonly type: 'uid'
        readonly value: Player | playerIdentity
    } | {
        readonly type: 'name'
        readonly value: string
    })
    remove: {
        readonly mod: Player | string
    } & ({
        readonly type: 'uid'
        readonly value: Player | playerIdentity
    } | {
        readonly type: 'name'
        readonly value: string
    })
}
