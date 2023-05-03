import cc from "../lib/cc.js";
import permission from "../lib/permission.js";

cc.create('deopself', {
    name: 'DeOP',
    description: 'DeOP yourself.',
    usage: [ { usage: ['deop'] } ],

    minPermLvl: 0,
    trigger: /^deop(-?self)?$/i,
    execute: ({ executer, log }) => {
        permission.resetPlayerKey(executer)
        return log(`Deopped yourself.`)
    },

    canBeDeleted: false
})