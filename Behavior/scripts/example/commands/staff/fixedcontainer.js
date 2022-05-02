//@ts-check
import { BlockLocation, Dimension, Location, world} from 'mojang-minecraft';
import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import scoreboard from '../../../library/utils/scoreboard.js';

const registerInformation = {
    cancelMessage: true,
    name: 'fixedcontainer',
    staff: 'true',
    description: 'Manages FixedContainer module',
    usage: '',
    example: [
        'fixedcontainer on',
        'fixedcontainer off'
    ]
};

const obj = scoreboard.objective.for('fixedcontainer').dummies.useCache(false)
if (!obj.has('toggle')) obj.set('toggle', 1)

let toggle = obj.get('toggle')

Server.command.register(registerInformation, (chatmsg, args) => {
    const {sender} = chatmsg

    if (!sender.hasTag('staffstatus')) return sender.tellraw(`§¶§cUAC ► §c§lError 4: Only Staff can use this command`)

    switch (args[0]) {
        case undefined:
            return sender.tellraw(`§eFixedContainer§f: ${toggle ? '§aENABLED' : '§cDISABLED'}`);
        case 'enable':
        case 'on': {
            obj.set('toggle', 1)
            toggle = 1
            sender.tellraw(`§eFixedContainer§f has been §aENABLED§r.`);
            tellrawStaff(`§¶§cUAC ► §bPlayer §d${sender.name}§b toggles the §eFixedContainer§f module to §aENABLED§r.`);
        }

        case 'disable':
        case 'off': {
            obj.set('toggle', 0)
            toggle = 0
            sender.tellraw(`§eFixedContainer§f has been §cDISABLED§r.`);
            tellrawStaff(`§¶§cUAC ► §bPlayer §d${sender.name}§b toggles the §eFixedContainer§f module to §cDISABLED§r.`);
        }

        default:
            return sender.tellraw(`§¶§cUAC ► §c§lError 7: command failure`);
    }
});
/** @type { (d: Dimension, v: string) => void } */
const rc = (d, v) => { try { d.runCommand(v) } catch {} }
const { floor } = Math
/** @type { (v: [number, number, number] | Location | BlockLocation) => [number, number, number] } */
const posify = (v) => Array.isArray(v) ? v : [floor(v.x), floor(v.y), floor(v.z)];
/** @type { (v: [number, number, number] | Location | BlockLocation) => string } */
const posConvert = (v) => posify(v).map(v => `§a${v}§r`).join(', ');

const fixes = {
    'minecraft:furnace': 0,
    'minecraft:blast_furnace': 0,
    'minecraft:smoker': 0,
    'minecraft:dispenser': 0,
    'minecraft:dropper': 0,
    'minecraft:hopper': 0,
    'minecraft:chest': 0,
    'minecraft:trapped_chest': 0,
};
world.events.blockPlace.subscribe(({ block, player: plr, dimension: dim }) => {
    if (!(toggle && !plr.hasTag('staffstatus') && block.id in fixes)) return;

    const { location, id, permutation } = block;
    const pos = posify(location), [x, y, z] = pos, posStr = pos.join(' ');

    if (id == 'minecraft:chest' || id == 'minecraft:trapped_chest') {
        const c = block.getComponent('inventory').container;
        for (let m = c.size, i = m - 27; i < m; i++) {
            const item = c.getItem(i);
            if (!item) continue;

            tellrawStaff(`§¶§cUAC ► §cNon-empty ${id}§r placed by §b${plr.name}§r in ${posConvert(block.location)}`);
            const slc = `x=${x}, y=${y}, z=${z}, dx=0, dy=0, dz=0, type=item`;
            rc(dim, `tag @e[${slc}] add tmp`);
            rc(dim, `setblock ${posStr} air 0 destroy`);
            rc(dim, `kill @e[${slc}, tag=!tmp]`);
            rc(dim, `tag @e[${slc}, tag=tmp] remove tmp`);
            break;
        }
    }
    else {
        rc(dim, `setblock ${posStr} air`);
        rc(dim, `setblock ${posStr} ${id}`);
        block.setPermutation(permutation);
    }
});
