import { Player, world } from "@minecraft/server";
import Area from "../../core/lib/area.js";
import cc from "../../core/lib/cc.js";
import EventEmitter from "../../core/lib/event.js";
import message from "../../core/lib/message.js";
import { convertLocationType, Vec3 } from "../../core/lib/misc.js";
import permission from "../../core/lib/permission.js";
import server from "../../core/lib/server.js";
import { ModuleConfigParser } from "../lib/mcf.js";
import { kick } from "../lib/misc.js";
import { Module } from "../lib/module.js";
import banModule from "./ban.js";
import blacklistModule from "./blacklist.js";

export class CrasherModuleConstructor extends Module<crasherModuleData> {
    constructor() {
        super('crasher', 'Crasher', 'Detectes crasher', {
            automodAction: 'blacklist',
            automodDuration: 31_536_000_000
        })

        this.configParser = new ModuleConfigParser(this.data, {
            'automod-action': {
                name: 'Automod action',
                desc: 'Action for crasher',
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

    events = new EventEmitter<crasherModuleEvents>('Module (Crasher)')
}

const crasherModule = new CrasherModuleConstructor
export default crasherModule

const maxDist = 0x2ffffff
const boundArea = new Area([~maxDist, ~maxDist, ~maxDist], [maxDist, maxDist, maxDist])
const innerBoundArea = boundArea.offset(0).shrink(0x1ffffff)

server.addEventListener('tick', () => {
    if (!crasherModule.toggle) return
    for (const plr of world.getPlayers()) {
        const pLoc = convertLocationType('Array', plr.location)
        if (permission.getPlayerLevel(plr) >= 80 || boundArea.isInside(pLoc)) continue

        const dtl = `§7(Location: ${pLoc.map(v => `§2${v.toFixed(1)}§7`).join(', ')})`
        const banMsg = `§cCrasher§r detected ${dtl}`
        message.sendMsgToAdmins(60, `§3[§bUAC§3]§r [§eCrasher§r] §cCrasher§r detected on §d${plr.name}§r! ${dtl}`)

        plr.teleport(Vec3(innerBoundArea.getClosestLocation(pLoc)), plr.dimension, plr.rotation.x, plr.rotation.y)

        crasherModule.events.emit('detect', {
            action: crasherModule.data.automodAction,
            plr,
            detection: 'Crasher',
            detail: dtl
        })

        switch (crasherModule.data.automodAction) {
            case 'kick':
                message.sendMsgToAdmins(60, `§3[§bUAC§3]§r [§eCrasher§r] §d${plr.name}§r has been §ekicked§r!`)
                kick(plr, banMsg)
                break
            
            case 'ban':
                banModule.ban(plr, `§r[§eCrasher§r]`, banMsg, crasherModule.data.automodDuration)
                break
            
            case 'blacklist':
                blacklistModule.add(plr, `§r[§eCrasher§r]`, banMsg)
                break
        }
    }
})

crasherModule.toggle = false

export type automodAction = 'kick' | 'ban' | 'blacklist'

type crasherModuleData = {
    automodAction: automodAction
    automodDuration: number
}

type crasherModuleEvents = {
    detect: {
        readonly plr: Player
        readonly action: automodAction
        readonly detection: string
        readonly detail: string
    }
}
