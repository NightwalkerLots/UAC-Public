import cc, { argumentParser } from "../lib/cc.js";
import permission from "../lib/permission.js";

cc.create('opself', {
    name: 'OP',
    description: 'OP yourself.',
    usage: [ { usage: [ 'op', { name: 'key', type: 'any' } ] } ],

    minPermLvl: 0,
    trigger: /^op(-?self)?$/i,
    typedParams: new cc.typedParams(
        {
            sequence: [argumentParser.parseAny],
            execute: ([key], { executer, log }) => {
                permission.setPlayerKey(executer, key)
                return log(`Successfully opped yourself with key §7"§r${key}§7"§r.`)
            }
        },
    ),

    canBeDeleted: false
})