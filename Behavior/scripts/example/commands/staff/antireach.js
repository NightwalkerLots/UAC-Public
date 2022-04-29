//@ts-check
import { Player, world as World } from 'mojang-minecraft';
import { Server } from '../../../library/Minecraft.js';
import area from '../../../library/utils/area.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import scoreboard from '../../../library/utils/scoreboard.js';

const registerInformation = {
    cancelMessage: true,
    name: 'antireach',
    staff: 'true',
    description: 'Manages AntiReach module',
    usage: '',
    example: [
        'antireach on',
        'antireach off',
        'antireach max-dist 6.100',
    ]
};

const obj = scoreboard.objective.for('antireach').dummies.useCache(false)
if (!obj.has('toggle')) obj.set('toggle', 1)
if (!obj.has('max_dist')) obj.set('max_dist', 6000)

// note that this is multiplied by 1000 to support decimals.
let maxdist = obj.get('max_dist')

let toggle = obj.get('toggle')

Server.command.register(registerInformation, (chatmsg, args) => {
    const {sender} = chatmsg

    if (!sender.hasTag('staffstatus')) return sender.tellraw(`§¶§cUAC ► §c§lError 4: Only Staff can use this command`)

    switch (args[0]) {
        case undefined:
            return sender.tellraw(`§eAnti-Reach§f: ${toggle ? '§aENABLED' : '§cDISABLED'}`);
        case 'enable':
        case 'on': {
            obj.set('toggle', 1)
            toggle = 1
            sender.tellraw(`§eAnti-Reach§f has been §aENABLED§r.`);
            tellrawStaff(`§¶§cUAC ► §bPlayer §d${sender.name}§b toggles the §eAnti-Reach§f module to §aENABLED§r.`);
        }

        case 'disable':
        case 'off': {
            obj.set('toggle', 0)
            toggle = 0
            sender.tellraw(`§eAnti-Reach§f has been §cDISABLED§r.`);
            tellrawStaff(`§¶§cUAC ► §bPlayer §d${sender.name}§b toggles the §eAnti-Reach§f module to §cDISABLED§r.`);
        }

        case 'max':
        case 'maxdist':
        case 'max-dist':
        case 'maxreach':
        case 'max-reach': {
            if (!args[1]) return sender.tellraw(`Max reach: §a${maxdist / 1000}`);

            const newValue = ~~(Number(args[1]) * 1000);
            if (!isFinite(newValue)) return sender.tellraw(`§¶§cUAC ► §c§lError 7: ${args[1]} is not a number`);

            maxdist = newValue;
            obj.set('max_dist', newValue)

            sender.tellraw(`Max reach has been set to §a${(newValue / 1000).toFixed(3)}`);
            tellrawStaff(`§¶§cUAC ► §bPlayer §d${sender.name}§b has set the max reach to §a${(newValue / 1000).toFixed(3)}§r`);
            return;
        }
        default:
            return sender.tellraw(`§¶§cUAC ► §c§lError 7: command failure`);
    }
});

const playerCollisionSize = [0.6, 1.2, 0.6]

World.events.entityHit.subscribe(({entity: plr, hitEntity: target}) => {
    if (!( toggle && plr instanceof Player && target && target instanceof Player && plr.hasTag('staffstatus') )) return

    const areaData = area.bindLocation(target.location, playerCollisionSize),
        distarr = areaData.getDistanceWithLocation(plr.headLocation),
        dist = Math.hypot(...distarr)
    
    if (dist > (maxdist / 1000)) tellrawStaff(`§¶§cUAC ► §bPlayer §d${plr.name}§b has §chigh reach§b detected (§c${dist.toFixed(3)}§b)`)
})
