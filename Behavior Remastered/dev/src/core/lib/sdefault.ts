import { DynamicPropertiesDefinition, world } from "@minecraft/server";
import type { chatGroupJSON } from "./chat.js";
import type { compability } from "./compability.js";
import { randomstr } from "./misc.js";
import type { roleConfig, roleGroupJSON } from "./role.js";
import server from "./server.js";
import Storage from "./storage.js";

const sdefault = new Storage<DataV1>('uacx', 'UAC')
export default sdefault

sdefault.addEventListener('save', ({data}) => {
    data.version = 1
})

sdefault.addEventListener('load', ({data}, ctrl) => {
    switch (data.version) {
        case 1: {

        }; break
        
        default:
            ctrl.break()
            throw new Error(`Cannot load save data: invalid version (${data.version})`)
    }
}, { priority: Infinity })

server.addEventListener('initialize', ({propertyRegistry}) => {
    const reg = new DynamicPropertiesDefinition
    reg.defineString('sukey', 8)

    propertyRegistry.registerWorldDynamicProperties(reg)

    let key = world.getDynamicProperty('sukey')
    if (typeof key !== 'string') world.setDynamicProperty('sukey', key = randomstr(8))

    sdefault.id = key
}, { priority: Infinity })

interface DataV1 {
    [k: string]: any
    version: number

    role: roleGroupJSON[]
    roleConfig: typeof roleConfig
    chat: chatGroupJSON[]
    cc: {
        prefix: string
    }
    
    cc_onjoin: {
        cmd: string[]
        execreg: boolean
    }
    cc_onleave: {
        cmd: string[]
    }
    cc_onregister: {
        cmd: string[]
    }
    cc_tps: {
        cmd: string[]
        interval: number
    }
    cc_toggle: [string, boolean][]

    compability: typeof compability
}
