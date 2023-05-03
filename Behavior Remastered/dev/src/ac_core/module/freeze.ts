import { MinecraftEffectTypes, Player, Vector3, world } from "@minecraft/server"
import EventEmitter from "../../core/lib/event.js"
import message from "../../core/lib/message.js"
import server from "../../core/lib/server.js"
import { Module } from "../lib/module.js"
import { playerIdentity } from "../lib/playerdat.js"
import uacStorage from "../lib/storage.js"

export class FreezeModuleConstructor extends Module {
    events = new EventEmitter<freezeEvents>('Module (freeze)')

    list = new Map<number, FreezeData>()

    add(mod: Player, target: Player) {
        if (this.list.has(target.uid)) throw new Error(`Player ${target.name} (#${target.uidStr}) is already frozen`)

        this.list.set(target.uid, {
            name: target.name,
            uid: target.uidStr,
            dim: target.dimension.id,
            loc: target.location
        })

        this.events.emit('add', { mod, target })
    }

    remove(mod: Player, target: Player | playerIdentity) {
        const { name, uid, uidStr } = target
        if (!this.list.delete(uid)) throw new Error(`Player ${name} (#${uidStr}) is not frozen.`)

        this.events.emit('remove', { mod, target })
    }
}

const freezeModule = new FreezeModuleConstructor('freeze', 'Freeze (Passive)')
export default freezeModule

export type FreezeData = {
    name: string
    uid: string

    dim: string
    loc: Vector3
}

uacStorage.addEventListener('save', ({data}) => {
    data.freeze = Array.from(freezeModule.list)
})

uacStorage.addEventListener('load', ({data}) => {
    if (!data.freeze) return
    freezeModule.list.clear()
    for (const [k, v] of data.freeze) freezeModule.list.set(k, v)
})

server.addEventListener('tick', () => {
    for (const plr of world.getPlayers()) {
        const d = freezeModule.list.get(plr.uid)
        if (!d) continue

        plr.teleport(d.loc, world.getDimension(d.dim), plr.rotation.x, plr.rotation.y)
        plr.addEffect(MinecraftEffectTypes.blindness, 20, 0, false)
    }
})

freezeModule.events.addEventListener('add', ({mod, target}) => {
    message.sendMsgToAdmins(40, `§3[§bUAC§3]§r §d${mod.name}§r §efreezed§r §d${mod.name}§r §7(§2#${mod.uidStr}§7)§r`, [mod])
    target.sendMsg(`§gYou are now frozen!§r`)
    mod.sendMsg(`Freezed §d${target.name}§r §7(§2#${target.uidStr}§7)§r.`)
})

freezeModule.events.addEventListener('remove', ({mod, target}) => {
    message.sendMsgToAdmins(40, `§3[§bUAC§3]§r §d${mod.name}§r §aunfreezed§r §d${target.name}§r §7(§2#${target.uidStr}§7)§r`, [mod])
    if (target instanceof Player) target.sendMsg(`§aYou are no longer frozen!§r`)
    mod.sendMsg(`Unfreezed §d${target.name}§r §7(§2#${target.uidStr}§7)§r.`)
})

type freezeEvents = {
    add: {
        readonly mod: Player
        readonly target: Player
    }
    remove: {
        readonly mod: Player
        readonly target: Player | playerIdentity
    }
}
