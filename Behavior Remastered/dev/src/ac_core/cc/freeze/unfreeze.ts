import cc from "../../../core/lib/cc.js";
import { getPlayer } from "../../lib/misc.js";
import freezeModule from "../../module/freeze.js";

cc.create('uac:unfreeze', {
    name: 'Unfreeze',
    description: 'Unfreezes someone.',
    usage: [ { usage: ['unfreeze', { name: 'target', type: ['name', 'uid'] }] } ],

    minPermLvl: 60,
    trigger: /^unfreeze$/i,
    typedParams: new cc.typedParams(
        {
            sequence: [cc.argumentParser.parseAny],
            execute: async ([tgt], { executer, log }) => {
                const d = getPlayer(tgt)
                if (!d) throw new Error(`Player not found: '${tgt}' \nThis player is not online and not registered on UAC Player Index.`)
                freezeModule.remove(executer, d)
            }
        }
    )
})
