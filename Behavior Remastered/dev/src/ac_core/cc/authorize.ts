import { DynamicPropertiesDefinition, Player, world } from "@minecraft/server";
import cc from "../../core/lib/cc.js";
import { randomstr } from "../../core/lib/misc.js";
import permission from "../../core/lib/permission.js";
import server from "../../core/lib/server.js";

const authcc = cc.create('uac:authorize', {
    name: '[UAC] Authorize',
    description: 'Authorize to UAC. (one-time command)',

    minPermLvl: 0,
    trigger: /^(uac-?)?auth(orize)?$/i,
    hidden: true,
    execute: ({ executer, log }) => {
        // is already op, disable auth
        if (permission.getPlayerLevel(executer) >= 100) {
            world.setDynamicProperty('uac:auth', true)
            cc.delete(authcc.id)

            return log('OK')
        }

        const k = authList.get(executer)

        // auth not run
        if (!k) {
            const rand = randomstr(16, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
            authList.set(executer, rand)
            return log(`Give yourself tag §a${rand}§r to authorize to UAC.`)
        }

        if (!executer.hasTag(k)) throw new Error('Authorization failed')

        world.setDynamicProperty('uac:auth', true)
        cc.delete(authcc.id)

        const randkey = randomstr(23, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*`~-=_+;\':,./<>?')
        permission.set(randkey, 100)
        permission.setPlayerKey(executer, randkey)

        log('OK')
    },
    onDelete: () => {
        authList = new WeakMap()
    }
})

server.addEventListener('initialize', ({propertyRegistry}) => {
    const reg = new DynamicPropertiesDefinition
    reg.defineBoolean('uac:auth')
    propertyRegistry.registerWorldDynamicProperties(reg)

    if (world.getDynamicProperty('uac:auth')) cc.delete(authcc.id)
}, { priority: Infinity })

let authList = new WeakMap<Player, string>
