import { Player, world } from "@minecraft/server";
import Area from "../../core/lib/area.js";
import cc from "../../core/lib/cc.js";
import EventEmitter from "../../core/lib/event.js";
import { asyncExecCmd } from "../../core/lib/mc.js";
import message from "../../core/lib/message.js";
import { convertLocationType, offset } from "../../core/lib/misc.js";
import permission from "../../core/lib/permission.js";
import playerManager from "../../core/lib/plr.js";
import server, { HighTimeout } from "../../core/lib/server.js";
import { ModuleConfigParser } from "../lib/mcf.js";
import { kick } from "../lib/misc.js";
import { Module } from "../lib/module.js";
import uacStorage from "../lib/storage.js";
import banModule from "./ban.js";
import blacklistModule from "./blacklist.js";
export class CombatModuleConstructor extends Module {
    constructor() {
        super('combat', 'Combat', 'Detects KillAura, AutoClicker, Reach.', {
            maxReach: 3,
            maxHorDegTol: 90,
            maxVerDegTol: 45,
            autoAimDegTol: 0.1,
            maxCPS: 20,
            flagWearoffTime: 1000,
            flagImmuneTime: 2,
            combatLog: false,
            combatLogWearoffTime: 10000,
            combatLogCommand: 'tag @s add combatlog',
            alertThreshold: 1,
            automodThreshold: 10,
            automodAction: 'kick',
            automodDuration: 259_200_000,
            combatLogList: []
        });
        this.configParser = new ModuleConfigParser(this.data, {
            'max-reach': {
                name: 'Max reach',
                desc: 'Max hit distance between players tolerated in blocks',
                typeDesc: { type: 'number' },
                key: 'maxReach',
                type: cc.argumentParser.parseNumber
            },
            'max-hor-deg-tol': {
                name: 'Max horizontal hit degrees tolerance',
                desc: 'self-explanatory',
                typeDesc: { type: 'number' },
                key: 'maxHorDegTol',
                type: cc.argumentParser.parseNumber
            },
            'max-ver-deg-tol': {
                name: 'Max vertical hit degrees tolerance',
                desc: 'self-explanatory',
                typeDesc: { type: 'number' },
                key: 'maxVerDegTol',
                type: cc.argumentParser.parseNumber
            },
            'max-autoaim-deg-tol': {
                name: 'Max AutoAim hit degrees tolerance',
                desc: 'self-explanatory',
                typeDesc: { type: 'number' },
                key: 'autoAimDegTol',
                type: cc.argumentParser.number(false)
            },
            'max-cps': {
                name: 'Max clicks per second',
                desc: 'self-explanatory',
                typeDesc: { type: 'number' },
                key: 'maxCPS',
                type: cc.argumentParser.parseNumber
            },
            'flag-timer': {
                name: 'Flag timer',
                desc: 'Specifies the time in milliseconds before flags wears off, increases for each person depending on how many flags',
                typeDesc: { type: 'number' },
                key: 'flagWearoffTime',
                type: cc.argumentParser.parseNumber
            },
            'flag-immune': {
                name: 'Flag Immune Time',
                desc: 'Specifies the time player won\'t be flagged for a period of time (in ticks) after flagged',
                typeDesc: { type: 'number' },
                key: 'flagImmuneTime',
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
            'combat-log-detection': {
                name: 'Detects combat log',
                desc: 'self-explanatory',
                typeDesc: { type: 'boolean' },
                key: 'combatLog',
                type: cc.argumentParser.parseBoolean
            },
            'combat-log-timer': {
                name: 'Combat log timer',
                desc: 'Time before combatlog tag wears off, resets everytime player gets hit',
                typeDesc: { type: 'TimeFormat' },
                key: 'combatLogWearoffTime',
                type: cc.argumentParser.parseTime
            },
            'combat-log-command': {
                name: 'Combat log command',
                desc: 'Command to be ran if someone combat-logged (only if they rejoin)',
                typeDesc: { type: 'any' },
                key: 'combatLogCommand',
                type: cc.argumentParser.parseAny
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
    events = new EventEmitter('Module (Combat)');
    combatLogList = new Set();
    combatLogTimer = new WeakMap();
    cpsList = new WeakMap();
    detectionImmune = new WeakSet();
    flagCount = new WeakMap();
    flagCooldownStart = new WeakMap();
    action(plr, detection, detail) {
        const ctime = Date.now();
        const flagCooldown = this.flagCooldownStart.get(plr) ?? ctime;
        const wearoff = Math.floor((ctime - flagCooldown) / this.data.flagWearoffTime);
        const flagCount = Math.max((this.flagCount.get(plr) ?? 0) - wearoff, 0) + 1;
        this.flagCooldownStart.set(plr, flagCooldown + wearoff * this.data.flagWearoffTime);
        this.flagCount.set(plr, flagCount);
        if (flagCount < this.data.alertThreshold)
            return false;
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
const combatModule = new CombatModuleConstructor;
export default combatModule;
uacStorage.addEventListener('save', () => {
    combatModule.data.combatLogList = Array.from(combatModule.combatLogList.values());
}, { priority: 200 });
uacStorage.addEventListener('load', () => {
    combatModule.combatLogList = new Set(combatModule.data.combatLogList);
})();
let cpsDetectionRate = 1;
const kaDirectionMapping = {
    '0': {
        '-1': {
            '-1': [[[2, 0], [0, 0]], [[1, 0, 2], [1, 2, 0]]],
            '0': [null, undefined],
            '1': [[[0, 2], [2, 2]], [[1, 0, 0], [1, 2, 2]]],
        },
        '0': {
            '-1': [[[2, 0], [0, 0]], [[1, 0, 0], [1, 2, 0]]],
            '0': [null, null],
            '1': [[[0, 2], [2, 2]], [[1, 0, 2], [1, 2, 2]]],
        },
        '1': {
            '-1': [[[2, 0], [0, 0]], [[1, 0, 0], [1, 2, 2]]],
            '0': [null, undefined],
            '1': [[[0, 2], [2, 2]], [[1, 0, 2], [1, 2, 0]]],
        }
    },
    '1': {
        '-1': {
            '-1': [[[2, 2], [0, 0]], [[0, 0, 2], [2, 2, 0]]],
            '0': [[[2, 2], [2, 0]], [[0, 0, 1], [2, 2, 1]]],
            '1': [[[0, 2], [2, 0]], [[0, 0, 0], [2, 2, 2]]],
        },
        '0': {
            '-1': [[[2, 2], [0, 0]], [[2, 0, 0], [2, 2, 0]]],
            '0': [[[2, 2], [2, 0]], [[2, 0, 1], [2, 2, 1]]],
            '1': [[[0, 2], [2, 0]], [[2, 0, 2], [2, 2, 2]]],
        },
        '1': {
            '-1': [[[2, 2], [0, 0]], [[2, 0, 0], [0, 2, 2]]],
            '0': [[[2, 2], [2, 0]], [[2, 0, 1], [0, 2, 1]]],
            '1': [[[0, 2], [2, 0]], [[2, 0, 2], [0, 2, 0]]],
        }
    },
    '-1': {
        '-1': {
            '-1': [[[2, 0], [0, 2]], [[2, 0, 2], [0, 2, 0]]],
            '0': [[[0, 0], [0, 2]], [[2, 0, 1], [0, 2, 1]]],
            '1': [[[0, 0], [2, 2]], [[2, 0, 0], [0, 2, 2]]],
        },
        '0': {
            '-1': [[[2, 0], [0, 2]], [[0, 0, 0], [0, 2, 0]]],
            '0': [[[0, 0], [0, 2]], [[0, 0, 1], [0, 2, 1]]],
            '1': [[[0, 0], [2, 2]], [[0, 0, 2], [0, 2, 2]]],
        },
        '1': {
            '-1': [[[2, 0], [0, 2]], [[0, 0, 0], [2, 2, 2]]],
            '0': [[[0, 0], [0, 2]], [[0, 0, 1], [2, 2, 1]]],
            '1': [[[0, 0], [2, 2]], [[0, 0, 2], [2, 2, 0]]],
        }
    }
};
function clampDeg(v, method = 'ceil') {
    return v - Math[method]((method === 'floor' ? v + 180 : v - 180) / 360) * 360;
}
function deg2([x, z]) {
    return -Math.atan2(x, z) / Math.PI * 180;
}
function deg3([x, y, z]) {
    return -Math.atan2(y, Math.hypot(x, z)) / Math.PI * 180;
}
function isInside(min, max, rot) {
    return min <= max ? min < rot && rot <= max : !(max <= rot && rot < min);
}
function getHitDeg(a, b, hr) {
    const ab = [a.from, b, a.to];
    const _a = a.getClosestAxisDistance(b);
    const [i, j, k] = _a.map(Math.sign);
    let [h, v] = kaDirectionMapping[i][j][k];
    let hRange = [-Infinity, Infinity], vRange = [-Infinity, Infinity];
    if (h) {
        const [[x1, z1], [x2, z2]] = h;
        hRange = [
            deg2([ab[x1][0] - b[0], ab[z1][2] - b[2]]),
            deg2([ab[x2][0] - b[0], ab[z2][2] - b[2]])
        ];
    }
    if (v !== null) {
        if (v === undefined) {
            const { from: [x1, y1, z1], to: [x2, y2, z2] } = a;
            const planes = [
                [[-45, 45], [[x2, z2], [x1, z2]]],
                [[45, 135], [[x1, z2], [x1, z1]]],
                [[135, -135], [[x1, z1], [x2, z1]]],
                [[-135, -45], [[x2, z1], [x2, z2]]],
            ].find(([[a, b]]) => isInside(a, b, hr));
            if (!planes)
                throw Error();
            const m = 1 - Math.abs((hr - 45) % 90) / 90;
            const [[px1, pz1], [px2, pz2]] = planes[1];
            const max = Math.hypot(px1 * m + px2 * (1 - m) - b[0], pz1 * m + pz2 * (1 - m) - b[2]);
            vRange = j === -1 ? [-90, -Math.atan2(a.from[1] - b[1], max) / Math.PI * 180] : [-Math.atan2(a.to[1] - b[1], max) / Math.PI * 180, 90];
        }
        else {
            const [[x1, y1, z1], [x2, y2, z2]] = v;
            vRange = [
                deg3(offset([ab[x2][0], ab[y2][1], ab[z2][2]], b, (a, b) => a - b)),
                deg3(offset([ab[x1][0], ab[y1][1], ab[z1][2]], b, (a, b) => a - b)),
            ];
        }
    }
    return [hRange, vRange, _a, [i, j, k]];
}
world.events.entityHit.subscribe(({ entity: plr, hitEntity: tgt }) => {
    if (!(combatModule.toggle
        && plr instanceof Player
        && tgt instanceof Player))
        return;
    // combat log
    if (combatModule.data.combatLog && permission.getPlayerLevel(tgt) < 80) {
        combatModule.combatLogList.add(tgt.uidStr);
        combatModule.combatLogTimer.get(tgt)?.clear();
        combatModule.combatLogTimer.set(tgt, new HighTimeout(() => { try {
            tgt.name;
            combatModule.combatLogList.delete(tgt.uidStr);
        }
        catch { } }, combatModule.data.combatLogWearoffTime));
    }
    if (permission.getPlayerLevel(plr) >= 80 || combatModule.detectionImmune.has(plr))
        return;
    const tgtHitbox = Area.fromCenter([0, 0.9, 0], [0.61, 1.8, 0.61]).move(tgt.location);
    // reach
    const reach = tgtHitbox.getClosestDistance(plr.headLocation);
    if (reach > combatModule.data.maxReach)
        combatModule.action(plr, 'Reach', `§7(Dist: §2${reach.toFixed(2)}§7)`);
    // degrees
    const { x: vertRot, y: horRot } = plr.rotation;
    const [[hMin, hMax], [vMin, vMax], _a, _b] = getHitDeg(tgtHitbox, convertLocationType('Array', plr.headLocation), horRot);
    const hMinTol = clampDeg(hMin - combatModule.data.maxHorDegTol, 'floor');
    const hMaxTol = clampDeg(hMax + combatModule.data.maxHorDegTol, 'ceil');
    const vMinTol = vMin - combatModule.data.maxVerDegTol;
    const vMaxTol = vMax + combatModule.data.maxVerDegTol;
    if (!(isInside(vMinTol, vMaxTol, vertRot) && isInside(hMinTol, hMaxTol, horRot)))
        combatModule.action(plr, 'KillAura', '');
    // autoaim
    const tTol = combatModule.data.autoAimDegTol;
    const [tx, ty, tz] = offset(convertLocationType('Array', tgt.location), convertLocationType('Array', plr.headLocation), (a, b) => a - b);
    const horOffset = deg2([tx, tz]) - horRot, vertOffset = deg3([tx, ty, tz]) - vertRot;
    if (Math.abs(horOffset) < tTol || Math.abs(vertOffset) < tTol)
        combatModule.action(plr, 'AutoAim', '');
    // cps
    const ctime = Date.now();
    let cpsData = combatModule.cpsList.get(plr);
    if (!cpsData || ctime - cpsData.lastHitTime > 3000)
        combatModule.cpsList.set(plr, cpsData = { lastHitTime: ctime - 1000, list: [] });
    const cps = 1000 / Math.max(ctime - cpsData.lastHitTime, 1);
    cpsData.list.push(cps);
    cpsData.list.splice(0, Math.max(Math.min(Math.floor(cpsData.list.length - cps), cpsData.list.length - 10), 0));
    cpsData.lastHitTime = ctime;
    const avgCps = cpsData.list.reduce((a, b) => a + b, 0) / cpsData.list.length;
    if (avgCps > combatModule.data.maxCPS * cpsDetectionRate)
        combatModule.action(plr, 'Autoclicker', `§7(CPS: §2${avgCps.toFixed(2)}§7/§2${cps.toFixed(2)}§7)`);
});
server.addEventListener('tick', ({ currentTick, deltaTime }) => {
    if (currentTick % combatModule.data.flagImmuneTime !== 0)
        return;
    combatModule.detectionImmune = new WeakSet();
    cpsDetectionRate = deltaTime / 0.05;
});
server.addEventListener('playerLoad', plr => {
    if (!(combatModule.toggle && combatModule.combatLogList.has(plr.uidStr)))
        return;
    combatModule.combatLogList.delete(plr.uidStr);
    if (combatModule.data.combatLog && combatModule.data.combatLogCommand)
        asyncExecCmd(combatModule.data.combatLogCommand, plr);
});
server.addEventListener('playerLeave', ({ playerId: uid, playerName: name }) => {
    const uidStr = playerManager.stringifyUid(uid);
    if (!(combatModule.toggle && combatModule.data.combatLog && combatModule.combatLogList.has(uidStr)))
        return;
    combatModule.events.emit('combatlog', {
        plrName: name,
        plrUid: uidStr
    });
    message.sendMsgToAdmins(60, `§3[§bUAC§3]§r [§e${combatModule.name}§r] §d${name}§r combat-logged!`);
});
