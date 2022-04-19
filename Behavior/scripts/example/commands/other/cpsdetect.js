import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import scoreboard from '../../../library/scoreboard.js'
import { Player, world } from 'mojang-minecraft';
const registerInformation = {
    cancelMessage: true,
    name: 'cpsdetect',
    description: 'Enables / disables CPS detection',
    usage: '[ on | off ]',
    example: [
        'illench',
        'illench on',
        'illench off',
    ]
};

let sbtoggle = scoreboard.objective.for('CPSMT').dummies
sbtoggle.setNameMethod('normal').useCache(false)

/** @type {number} */
let toggle = sbtoggle.get('value') ?? ( sbtoggle.set('value', 1), 1 )

/** @type {Map<Player, {arr: number[], last: number}>} */
const prevHitTime = new Map,
/** @type {Map<Player, number>} */
    cleanup = new Map

world.events.entityHit.subscribe(({hitEntity, entity}) => {
    if (!toggle || !hitEntity || entity.hasTag('staffstatus')) return

    const curTime = Date.now()

    if (!prevHitTime.has(entity)) prevHitTime.set(entity, { arr: [1, 1, 1], last: curTime - 1000 })

    cleanup.delete(entity)
    cleanup.set(entity, curTime + 3000)

    const data = prevHitTime.get(entity)
    const cps = 1000 / (curTime - data.last)
    data.last = curTime

    const arr = data.arr
    arr.push(cps)
    arr.splice(0, Math.max( Math.min( arr.length - 1, arr.length - cps ), 0 ))
    const cpsAvg = arr.reduce((a,b) => a+b, 0) / arr.length,
        cpsMax = Math.max(...arr)
    if (cpsAvg >= 16) tellrawStaff(
        `§¶§cUNITY API §b► §l§d${entity.name} §bhas §chigh CPS §bdetected: `
        + `§aCPS§f: §c${cps.toFixed(2).padStart(5)}§b - `
        + `§aAverage ${arr.length.toFixed(0).padStart(2)}§f: §c${cpsAvg.toFixed(2).padStart(5)}§b - `
        + `§aHighest ${arr.length.toFixed(0).padStart(2)}§f: §c${cpsMax.toFixed(2).padStart(6)}§b`
    )
})

world.events.tick.subscribe(() => {
    const curTime = Date.now()
    for (let [ent, time] of cleanup) {
        if (time > curTime) break
        cleanup.delete(ent)
        prevHitTime.delete(ent)
        console.warn('reset')
    }
})

Server.command.register(registerInformation, (chatmsg, args) => {
    const sender = chatmsg.sender
    try {
        if (sender.hasTag('staffstatus')) {
            if (!args[0]) return sender.tellraw(`§¶§cCPS detection§b status: ${toggle ? '§aENABLED' : '§cDISABLED'}`)
            switch (args[0]) {
                case 'on':
                case 'enable': {
                    sender.tellraw(`§¶§cCPS detection§b has been §aENABLED`)
                    tellrawStaff(`§¶§cCPS detection§b has been §aENABLED§b by §d${sender.name}`)
                    sbtoggle.set('value', toggle = 1)
                }; break

                case 'off':
                case 'disable': {
                    sender.tellraw(`§¶§cCPS detection§b has been §cDISABLED`)
                    tellrawStaff(`§¶§cCPS detection§b has been §cDISABLED§b by §d${sender.name}`)
                    sbtoggle.set('value', toggle = 0)
                }; break

                default:
                    return plr.tellraw(`§¶§cUNITY API §b► §c§lError: Invalid argument ${args[0]}`)
            }
        } else {
            sender.tellraw(`§¶§cUNITY API §b► §c§lError 4: Only Staff can use this command`);
        }
    } catch(e) {
        console.warn(`${e}\n${e?.stack}`)
    }
});
