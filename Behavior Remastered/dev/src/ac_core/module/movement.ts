import { GameMode, Player, Vector, Vector3, world } from "@minecraft/server"
import cc from "../../core/lib/cc.js"
import EventEmitter from "../../core/lib/event.js"
import message from "../../core/lib/message.js"
import permission from "../../core/lib/permission.js"
import server from "../../core/lib/server.js"
import { ModuleConfigParser } from "../lib/mcf.js"
import { kick } from "../lib/misc.js"
import { Module } from "../lib/module.js"
import banModule from "./ban.js"
import blacklistModule from "./blacklist.js"

export class MovementModuleConstructor extends Module<movementModuleData> {
    constructor() {
        super('movement', 'Movement', 'Detects illegal movement', {
            maxVelocity: 4,
            maxAcceleration: 1,
            
            flagWearoffTime: 1500,
            correctionTicks: 12,

            correctionThreshold: 2,
            alertThreshold: 4,
            automodThreshold: 10,

            automodAction: 'kick',
            automodDuration: 259_200_000,
        })

        this.configParser = new ModuleConfigParser(this.data, {
            'max-velocity': {
                name: 'Max velocity',
                desc: 'Specifies maximum velocity in blocks/tick',
                typeDesc: { type: 'number' },

                key: 'maxVelocity',
                type: cc.argumentParser.number(false, 0, Infinity)
            },
            'max-acceleration': {
                name: 'Max acceleration',
                desc: 'Specifies maximum velocity acceleration in blocks/tick',
                typeDesc: { type: 'number' },

                key: 'maxAcceleration',
                type: cc.argumentParser.number(false, 0, Infinity)
            },

            'flag-timer': {
                name: 'Flag timer',
                desc: 'Specifies the time in milliseconds before flags wears off, increases for each person depending on how many flags',
                typeDesc: { type: 'number' },

                key: 'flagWearoffTime',
                type: cc.argumentParser.parseNumber
            },
            'correction-ticks': {
                name: 'Correction',
                desc: 'Specifies amount of ticks for correction',
                typeDesc: { type: 'number' },

                key: 'correctionTicks',
                type: cc.argumentParser.parseNumber
            },

            'correction-threshold': {
                name: 'Correction threshold',
                desc: 'Specifies how much flags needed at once for correction',
                typeDesc: { type: 'number' },

                key: 'correctionThreshold',
                type: cc.argumentParser.parseNumber
            },
            'alert-threshold': {
                name: 'Alert threshold',
                desc: 'Specifies how much flags needed at once for alert',
                typeDesc: { type: 'number' },

                key: 'alertThreshold',
                type: cc.argumentParser.parseNumber
            },
            'automod-threshold': {
                name: 'Automod threshold',
                desc: 'Specifies how much flags needed at once for automod',
                typeDesc: { type: 'number' },

                key: 'automodThreshold',
                type: cc.argumentParser.parseNumber
            },

            'automod-default-action': {
                name: 'Automod default action',
                desc: 'Action for detection',
                typeDesc: { keyword: ['kick', 'ban', 'blacklist'] },

                key: 'automodAction',
                type: ['kick', 'ban', 'blacklist']
            },
            'automod-duration': {
                name: 'Automod duration',
                desc: 'Duration for automod (ban only)',
                typeDesc: { type: 'TimeFormat' },

                key: 'automodDuration',
                type: cc.argumentParser.parseTime
            }
        })
    }

    events = new EventEmitter<movementEvents>('Module (Movement)')

    correctionList = new WeakMap<Player, Vector3[]>()
    prevVelocity = new WeakMap<Player, Vector3>()

    flagCount = new WeakMap<Player, number>()
    flagCooldownStart = new WeakMap<Player, number>()

    action(plr: Player, detection: string, detail: string, correction?: Vector3) {
        const ctime = Date.now()

        const flagCooldown = this.flagCooldownStart.get(plr) ?? ctime
        const wearoff = Math.floor( (ctime - flagCooldown) / this.data.flagWearoffTime )
        const flagCount = Math.max( (this.flagCount.get(plr) ?? 0) - wearoff, 0 ) + 1

        this.flagCooldownStart.set(plr, flagCooldown + wearoff * this.data.flagWearoffTime)
        this.flagCount.set(plr, flagCount)

        this.correctionList.get(plr)?.splice(1)
        if (correction && flagCount >= this.data.correctionThreshold) plr.teleport(correction, plr.dimension, plr.rotation.x, plr.rotation.y)

        if (flagCount < this.data.alertThreshold) return false

        const action = flagCount <= this.data.automodThreshold ? 'alert' : this.data.automodAction

        message.sendMsgToAdmins(60, `§3[§bUAC§3]§r [§e${this.name}§r] §c${detection}§r detected on §d${plr.name}§r! (flags: ${flagCount}/${this.data.automodThreshold}) §7${detail}§r`)

        this.events.emit('action', {
            plr,
            action,
            detail,
            detection
        })

        const kickMsg = `§c${detection}§r detected §7${detail}§r`

        switch (action) {
            case 'alert':
                plr.tell(`§e${detection} detected! §6${detail.replace(/§./g, '')}§e`)
                return false

            case 'kick':
                message.sendMsgToAdmins(60, `§3[§bUAC§3]§r [§e${this.name}§r] §d${plr.name}§r has been §ekicked§r!`)
                kick(plr, kickMsg)
                return true
            
            case 'ban':
                //message.sendMsgToAdmins(60, `§3[§bUAC§3]§r [§e${this.name}§r] §d${plr.name}§r has been §ebanned§r for §a${convertToTime(this.data.automodDuration)}§r!`)
                banModule.ban(plr, `§r[§e${this.name}§r]`, kickMsg, this.data.automodDuration)
                return true
            
            case 'blacklist':
                //message.sendMsgToAdmins(60, `§3[§bUAC§3]§r [§e${this.name}§r] §d${plr.name}§r has been §eblacklisted§r!`)
                blacklistModule.add(plr, `§r[§e${this.name}§r]`, kickMsg)
                return true
            
            default:
                return false
        }
    }
}

const movementModule = new MovementModuleConstructor
export default movementModule

server.addEventListener('tick', ({ deltaTime }) => {
    if (!movementModule.toggle) return
    const tpsRate = deltaTime / 0.05
    for (const plr of world.getPlayers()) {
        if (permission.getPlayerLevel(plr) > 60) continue 

        let list = movementModule.correctionList.get(plr)
        if (!list) movementModule.correctionList.set(plr, list = [])

        list.push(plr.location)
        if (list.length > movementModule.data.correctionTicks) list.shift()
        const correction = list[0] ?? plr.location

        const vel = Vector.multiply(plr.velocity, 1), prevVel = movementModule.prevVelocity.get(plr) ?? vel
        const spd = vel.length()
        const accel = Vector.subtract(vel, prevVel).length()
        movementModule.prevVelocity.set(plr, vel)

        if (accel > movementModule.data.maxAcceleration * tpsRate) movementModule.action(plr, 'Bad acceleration', `§7(Accel: §2${accel.toFixed(2)} b/t§7)`, correction)
        if (spd > movementModule.data.maxVelocity * tpsRate) movementModule.action(plr, 'Bad speed', `§7(Speed: §2${spd.toFixed(2)} b/t§7)`, correction)
    }
})

type movementModuleData = {
    maxVelocity: number
    maxAcceleration: number

    flagWearoffTime: number
    correctionTicks: number

    correctionThreshold: number
    alertThreshold: number
    automodThreshold: number

    automodAction: 'kick' | 'ban' | 'blacklist'
    automodDuration: number
}

type movementModuleAction = movementModuleData['automodAction'] | 'alert'

type movementEvents = {
    action: {
        readonly plr: Player
        readonly action: movementModuleAction
        readonly detection: string
        readonly detail: string
    }
}

