import { Player } from "@minecraft/server";
import cc, { argumentParser } from "../lib/cc.js";
import permission from "../lib/permission.js";

cc.create('deopelse', {
    name: 'DeOPElse',
    description: 'DeOP other player.',
    usage: [ { usage: [ 'deop-else', { name: 'target', type: 'player' } ] } ],

    minPermLvl: 80,
    trigger: /^deop-?(else|others?)$/i,
    typedParams: new cc.typedParams(
        {
            sequence: [argumentParser.parseSelector],
            execute: async ([selector], { executer, log }) => {
                const plvl = permission.getPlayerLevel(executer),
                    [plr] = await selector(executer) as [Player]
                
                if (plr != executer && permission.getPlayerLevel(plr) >= plvl) return log(`§cCannot deop ${plr.name}§r§c: permission level is low`)
                
                permission.resetPlayerKey(plr)
                log(`Successfully deopped §d${plr.name}§r.`)
            }
        }
    )
})
