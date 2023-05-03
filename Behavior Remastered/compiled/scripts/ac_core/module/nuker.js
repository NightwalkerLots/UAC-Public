import { world } from "@minecraft/server";
import cc from "../../core/lib/cc.js";
import EventEmitter from "../../core/lib/event.js";
import message from "../../core/lib/message.js";
import permission from "../../core/lib/permission.js";
import server from "../../core/lib/server.js";
import { ModuleConfigParser } from "../lib/mcf.js";
import { kick } from "../lib/misc.js";
import { Module } from "../lib/module.js";
import banModule from "./ban.js";
import blacklistModule from "./blacklist.js";
export class NukerModuleConstructor extends Module {
    constructor() {
        super('nuker', 'Nuker', 'Detects nuker', {
            maxSpeed: 3,
            maxHardSpeed: 20,
            flagWearoffTime: 3000,
            automodThreshold: 3,
            automodAction: 'kick',
            automodDuration: 259_200_000,
        });
        this.configParser = new ModuleConfigParser(this.data, {
            'max-speed': {
                name: 'Max breaking speed',
                desc: 'Max blocks broken before detection in blocks/tick',
                typeDesc: { type: 'number' },
                key: 'maxSpeed',
                type: cc.argumentParser.parseNumber
            },
            'max-hard-speed': {
                name: 'Max hard breaking speed',
                desc: 'Max blocks broken before automod in blocks/tick',
                typeDesc: { type: 'number' },
                key: 'maxHardSpeed',
                type: cc.argumentParser.parseNumber
            },
            'flag-timer': {
                name: 'Flag timer',
                desc: 'Specifies the time in milliseconds before flags wears off, increases for each person depending on how many flags',
                typeDesc: { type: 'number' },
                key: 'flagWearoffTime',
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
        });
    }
    events = new EventEmitter();
    counter = new Map();
    flagCount = new WeakMap();
    flagCooldownStart = new WeakMap();
    action(plr, detection, detail, force = false) {
        const ctime = Date.now();
        const flagCooldown = this.flagCooldownStart.get(plr) ?? ctime;
        const wearoff = Math.floor((ctime - flagCooldown) / this.data.flagWearoffTime);
        const flagCount = Math.max((this.flagCount.get(plr) ?? 0) - wearoff, 0) + 1 + (force ? this.data.automodThreshold : 0);
        this.flagCooldownStart.set(plr, flagCooldown + wearoff * this.data.flagWearoffTime);
        this.flagCount.set(plr, flagCount);
        const action = flagCount < this.data.automodThreshold ? 'alert' : this.data.automodAction;
        message.sendMsgToAdmins(60, `§3[§bUAC§3]§r [§e${this.name}§r] §c${detection}§r detected on §d${plr.name}§r! (flags: ${flagCount}/${this.data.automodThreshold}) §7${detail}§r`);
        this.events.emit('action', {
            plr,
            action,
            detail,
            detection
        });
        const kickMsg = `§c${detection}§r detected §7${detail}§r`;
        switch (action) {
            case 'alert':
                plr.tell(`§e${detection} detected! §6${detail.replace(/§./g, '')}§e`);
                return false;
            case 'kick':
                message.sendMsgToAdmins(60, `§3[§bUAC§3]§r [§e${this.name}§r] §d${plr.name}§r has been §ekicked§r!`);
                kick(plr, kickMsg);
                return true;
            case 'ban':
                //message.sendMsgToAdmins(60, `§3[§bUAC§3]§r [§e${this.name}§r] §d${plr.name}§r has been §ebanned§r for §a${convertToTime(this.data.automodDuration)}§r!`)
                banModule.ban(plr, `§r[§e${this.name}§r]`, kickMsg, this.data.automodDuration);
                return true;
            case 'blacklist':
                //message.sendMsgToAdmins(60, `§3[§bUAC§3]§r [§e${this.name}§r] §d${plr.name}§r has been §eblacklisted§r!`)
                blacklistModule.add(plr, `§r[§e${this.name}§r]`, kickMsg);
                return true;
            default:
                return false;
        }
    }
}
const nukerModule = new NukerModuleConstructor;
export default nukerModule;
server.addEventListener('tick', ({ deltaTime }) => {
    const tpsDetectionRate = deltaTime / 0.05;
    for (const [plr, c] of nukerModule.counter) {
        if (c > Math.ceil(nukerModule.data.maxSpeed * tpsDetectionRate))
            nukerModule.action(plr, 'Bad breaking speed', `§7(BPS: §2${c}§7)`);
        if (c > Math.ceil(nukerModule.data.maxHardSpeed * tpsDetectionRate))
            nukerModule.action(plr, 'Illegal breaking speed', `§7(BPS: §2${c}§7)`, true);
    }
    nukerModule.counter.clear();
});
world.events.blockBreak.subscribe(({ player: plr }) => {
    if (permission.getPlayerLevel(plr) > 60)
        return;
    const c = (nukerModule.counter.get(plr) ?? 0) + 1;
    nukerModule.counter.set(plr, c);
});
