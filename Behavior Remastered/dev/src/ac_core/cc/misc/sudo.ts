import { Player } from "@minecraft/server";
import cc from "../../../core/lib/cc.js";
import chat from "../../../core/lib/chat.js";
import message from "../../../core/lib/message.js";
import { prettify } from "../../../core/lib/misc.js";

cc.create('sudo', {
    name: 'Sudo',
    description: 'Unfunny.',
    usage: [
        {
            usage: [ 'sudo', { name: 'target', type: 'selector' }, 'chat', { name: 'message', type: 'any' } ],
            description: 'Sends a message as somebody.'
        }, {
            usage: [ 'sudo', { name: 'target', type: 'selector' }, 'command', { name: 'command', type: 'any' } ],
            description: 'Executes SE3 command as somebody (without prefix).'
        }
    ],

    minPermLvl: 100,
    trigger: /^sudo$/i,
    typedParams: new cc.typedParams(
        {
            sequence: [cc.argumentParser.parseSelector, ['chat', 'command']],
            rest: cc.argumentParser.parseAny,
            execute: async ([selector, type, ...rest], {executer, log}) => {
                const restStr = rest.join(' ')
                
                for (const plr of await selector(executer, { noSelector: false }) as Player[]) {
                    switch (type) {
                        case 'chat': {
                            chat.send(plr, restStr)
                            log(`Message sent as §d${plr.name}§r.`)
                        } break

                        case 'command': {
                            cc.execute(plr, cc.prefix + restStr, { sudoOrigin: executer })
                                .then(v => {
                                    if (v.success === true) return log(`Command executed as §d${plr.name}§r.`)
                                    const err = v.error
                                    log(`§eError executing command as §d${plr.name}§r: §c${err instanceof Error ? err.message : typeof err === 'string' ? err : prettify(err)}`)
                                })
                        } break
                    }
                }
            }
        }
    )
})

cc.event.addEventListener('log', ({ data, message: msg }, ctrl) => {
    if (!(data.sudoOrigin instanceof Player)) return
    ctrl.cancel()

    const plr = data.sudoOrigin
    message.sendMsgToPlayers(data.logTarget.filter(v => v !== plr), `§7${data.executer.name}§r§7 (sudoed by ${plr.name}§r§7) §8-§7 ${message.convertMsg(msg).replace(/\u00a7.|[\r\n]|\s{2,}/g, '').substring(0, 120)}`)
    plr.sendMsg(message.convertMsgToArr(msg).map(segm => `§7[Sudo: ${data.executer.name}§r§7]§r ${segm}`))
})

cc.event.addEventListener('error', ({ data, error }, ctrl) => {
    if (!(data?.sudoOrigin instanceof Player)) return
    ctrl.cancel()
})
