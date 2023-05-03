import cc, { argumentParser } from "../lib/cc.js";
import permission from "../lib/permission.js";
cc.create('opelse', {
    name: 'OPElse',
    description: 'OP other player.',
    usage: [{ usage: ['op-else', { name: 'target', type: 'player' }, { name: 'key', type: 'any' }] }],
    minPermLvl: 80,
    trigger: /^op-?(else|others?)$/i,
    typedParams: new cc.typedParams({
        sequence: [argumentParser.parseSelector, argumentParser.parseAny],
        execute: async ([selector, key], { executer, log }) => {
            const plvl = permission.getPlayerLevel(executer), [plr] = await selector(executer);
            if (plr != executer && permission.getPlayerLevel(plr) >= plvl)
                return log(`§cCannot op ${plr.name}§r§c: permission level is low`);
            permission.setPlayerKey(plr, key);
            log(`Successfully opped §d${plr.name}§r with key §7"§r${key}§7"§r.`);
        }
    })
});
