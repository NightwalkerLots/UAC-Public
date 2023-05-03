import { Player, world as World } from '@minecraft/server';
import { Server } from '../../../library/Minecraft.js';
import area from '../../../library/utils/area.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import { scoreTest, setScore } from '../../../library/utils/score_testing';
import scoreboard from '../../../library/scoreboard.js';

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

const obj = scoreboard.objective.for('antireach').dummies
if (!obj.get('toggle')) obj.set('toggle', 0)
if (!obj.get('max_dist')) obj.set('max_dist', 6000)

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
            tellrawStaff(`§¶§cUAC STAFF ► §bPlayer §d${sender.name}§b toggles the §eAnti-Reach§f module to §aENABLED§r.`);
            if(scoreTest(sender, 'armtoggle') == 1) {
                setScore(sender, 'armtoggle', 0, false);
                setScore('armtoggledummy', 'armtoggle', 0, false);
                tellrawStaff(`§¶§cUAC STAFF ► §6Anti-Reach §bThe module's function method was disabled, sense the gametest method is now in use.`)
            }
            return setScore(sender, 'arm_gt_toggle', 1, false);
            
        } 

        case 'disable':
        case 'off': {
            obj.set('toggle', 0)
            toggle = 0
            sender.tellraw(`§eAnti-Reach§f has been §cDISABLED§r.`);
            tellrawStaff(`§¶§cUAC STAFF ► §bPlayer §d${sender.name}§b toggles the §eAnti-Reach§f module to §cDISABLED§r.`);
            return setScore(sender, 'arm_gt_toggle', 0, false);
        } break 

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
            tellrawStaff(`§¶§cUAC STAFF ► §d${sender.name}§b has set the max reach to §a${(newValue / 1000).toFixed(3)}§r`);
            return;
        }
        default:
            return sender.tellraw(`§¶§cUAC ► §c§lError 7: command failure`);
    }
});

const playerCollisionSize = [0.3, 1.8, 0.3]

World.events.entityHit.subscribe(({entity: plr, hitEntity: target}) => {
    if (!( toggle && plr instanceof Player && target && target instanceof Player && plr.hasTag('staffstatus') )) return

    const areaData = area.bindLocation(target.location, playerCollisionSize),
        distarr = areaData.getDistanceWithLocation(plr.headLocation),
        dist = Math.hypot(...distarr)

    if (dist > (maxdist / 1000)) tellrawStaff(`§¶§cUAC STAFF ► §bPlayer §d${plr.name}§b has §chigh reach§b detected (§c${dist.toFixed(3)}§b)`)
})