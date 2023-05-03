import { GameMode, Player, world } from "@minecraft/server";
import cc from "../../core/lib/cc.js";
import EventEmitter from "../../core/lib/event.js";
import { asyncExecCmd } from "../../core/lib/mc.js";
import message from "../../core/lib/message.js";
import { testTagFilter } from "../../core/lib/misc.js";
import permission from "../../core/lib/permission.js";
import server from "../../core/lib/server.js";
import { ModuleConfigParser } from "../lib/mcf.js";
import { kick } from "../lib/misc.js";
import { Module } from "../lib/module.js";
import uacStorage from "../lib/storage.js";
import banModule from "./ban.js";
import blacklistModule from "./blacklist.js";

const gmList = Object.values(GameMode)

export class GamemodeModuleConstructor extends Module<gamemodeModuleData> {
    constructor() {
        super('gamemode', 'Gamemode', 'Locks gamemode', {
            automodAction: 'blacklist',
            automodDuration: 31_536_000_000,
        
            list: [
                ['default', {
                    priority: 0,
                    filter: [],
                    allowedGamemodes: gmList
                }]
            ]
        })

        this.configParser = new ModuleConfigParser(this.data, {
            'automod-action': {
                name: 'Automod action',
                desc: 'Action for illegal gamemode',
                typeDesc: { keyword: ['warn', 'kick', 'ban', 'blacklist'] },
        
                key: 'automodAction',
                type: ['warn', 'kick', 'ban', 'blacklist']
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

    events = new EventEmitter<gamemodeModuleEvents>('Module (Gamemode)')

    listCache = new Map<string, gamemodeDataCache>()
}

const gamemodeModule = new GamemodeModuleConstructor
export default gamemodeModule

uacStorage.addEventListener('save', () => {
    gamemodeModule.data.list = Array.from(gamemodeModule.listCache, ([k, v]) => [k, { ...v, allowedGamemodes: [...v.allowedGamemodes.values()] }] )
}, { priority: 200 })

uacStorage.addEventListener('load', () => {
    gamemodeModule.listCache.clear()
    for (const [k, v] of gamemodeModule.data.list) gamemodeModule.listCache.set(k, { ...v, allowedGamemodes: new Set(v.allowedGamemodes) })
})()

server.addEventListener('tick', () => {
    if (!gamemodeModule.toggle) return
    for (const gm of gmList) {
        for (const plr of world.getPlayers({ gameMode: gm })) {
            if (permission.getPlayerLevel(plr) >= 60) continue

            let data
            for (const d of gamemodeModule.listCache.values()) {
                if (testTagFilter(d.filter, plr.getTags()) === 1) {
                    data = d
                    break
                }
            }
            if (!data || data.allowedGamemodes.has(gm)) continue

            const dtl = `§7(Gamemode: §2${gm}§7)`
            const banMsg = `§cIllegal gamemode§r detected ${dtl}`
            message.sendMsgToAdmins(60, `§3[§bUAC§3]§r [§eGamemode§r] §cIllegal gamemode§r detected on §d${plr.name}§r! ${dtl}`)

            const [gmNew = GameMode.adventure] = data.allowedGamemodes
            asyncExecCmd(`gamemode ${gmNew}`, plr)
    
            gamemodeModule.events.emit('detect', {
                plr,
                data,
                gamemode: gm,
                action: gamemodeModule.data.automodAction,
                detection: 'Illegal gamemode',
                detail: dtl
            })
    
            switch (gamemodeModule.data.automodAction) {
                case 'warn':
                    plr.tell(`§eIllegal gamemode not allowed! §6${dtl.replace(/§./g, '')}§e`)
                    break

                case 'kick':
                    message.sendMsgToAdmins(60, `§3[§bUAC§3]§r [§eGamemode§r] §d${plr.name}§r has been §ekicked§r!`)
                    kick(plr, banMsg)
                    break
                
                case 'ban':
                    banModule.ban(plr, `§r[§eGamemode§r]`, banMsg, banModule.data.automodDuration)
                    break
                
                case 'blacklist':
                    blacklistModule.add(plr, `§r[§eGamemode§r]`, banMsg)
                    break
            }
        }
    }
})

export type automodAction = 'warn' | 'kick' | 'ban' | 'blacklist'

type gamemodeModuleData = {
    automodAction: automodAction
    automodDuration: number

    list: [string, gamemodeData][]
}

type gamemodeData = {
    priority: number
    filter: tagFilter
    allowedGamemodes: GameMode[]
}

type gamemodeDataCache = Replace<gamemodeData, { allowedGamemodes: Set<GameMode> }>

type gamemodeModuleEvents = {
    detect: {
        readonly plr: Player
        readonly data: gamemodeDataCache
        readonly gamemode: GameMode
        readonly action: automodAction
        readonly detection: string
        readonly detail: string
    }
}
