import cc from "../lib/cc.js";
import sdefault from "../lib/sdefault.js";

cc.create('ctoggle', {
    name: 'Command Toggle',
    description: 'Enables / disables command',
    usage: [
        {
            usage: ['cmdtgl', 'list'],
            description: 'Shows command toggle list'
        }, {
            usage: ['cmdtgl', 'set', { name: 'command', type: ['id', 'trigger'] }, { name: 'toggle', type: 'boolean' }],
            description: 'Sets command toggle'
        }
    ],

    minPermLvl: 80,
    trigger: /^(command|cmd)-?(toggle|tgl)$/i,
    typedParams: new cc.typedParams(
        {
            sequence: ['list'],
            execute: ([], { executer, log }) => {
                const list = [...cc.values()].sort( (a,b) => a.name.localeCompare(b.name) )

                return log([
                    ` `,
                    `Command list:`,
                    ...list.map(cc => ` §8:§r ${cc.hidden ? '§7§o' : ''}${cc.name || 'Unnamed'}§r §7(${cc.id})§r §8-§r ${cc.enabled ? '§aenabled§r' : '§cdisabled§r'} ${!cc.canBeDeleted ? '§e(locked)§r' : ''}`),
                    ` `,
                ])
            }
        }, {
            sequence: ['set', cc.argumentParser.parseAny, cc.argumentParser.parseBoolean],
            execute: ([,cmd, tgl], { log }) => {
                const c = cc.get(cmd) || cc.getFromTrigger(cmd)
                if (!c) throw new Error(`Command not found: ${c}`)
                if (!c.canBeDeleted) throw new Error(`This command's toggle mustn't be changed.`)

                c.enabled = tgl
                log(`${tgl ? 'Enabled' : 'Disabled'} command ${c.name || c.id}.`)
            }
        }
    ),

    canBeDeleted: false
})

sdefault.addEventListener('save', ({data}) => {
    data.cc_toggle = Array.from(cc.values(), cc => [cc.id, cc.enabled])
})

sdefault.addEventListener('load', ({data}) => {
    if (!data.cc_toggle) return
    for (const [id, tgl] of data.cc_toggle) {
        const c = cc.get(id)
        if (!c) continue
        c.enabled = tgl
    }
})
