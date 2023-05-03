import { DynamicPropertiesDefinition, Vector3, world } from "@minecraft/server"
import { randomstr } from "../../core/lib/misc.js"
import server from "../../core/lib/server.js"
import Storage from "../../core/lib/storage.js"
import { FreezeData } from "../module/freeze.js"
import { banData } from "../module/ban.js"
import { blacklistData } from "../module/blacklist.js"

const uacStorage = new Storage<StorageV1>('uac', 'UAC')
export default uacStorage

uacStorage.addEventListener('save', ({data}) => {
    data.version = 1
}, { priority: Infinity })

uacStorage.addEventListener('load', ({data}, ctrl) => {
    switch (data.version) {
        case 1: {

        } break
        
        default:
            ctrl.break()
            throw new Error(`Cannot load save data: invalid version (${data.version})`)
    }
}, { priority: Infinity })

server.addEventListener('initialize', ({propertyRegistry}) => {
    const reg = new DynamicPropertiesDefinition
    reg.defineString('uac:key', 8)

    propertyRegistry.registerWorldDynamicProperties(reg)

    let key = world.getDynamicProperty('uac:key')
    if (typeof key !== 'string') world.setDynamicProperty('uac:key', key = randomstr(8))

    uacStorage.id = key
}, { priority: Infinity })

interface StorageV1 {
    version: number

    modules: [id: string, data: [toggle: boolean, data: any]][]

    ban: banData[]
    blacklist: blacklistData[]
    whitelist: {
        name: string[]
        uid: [string, string][]
    }

    freeze: [number, FreezeData][]
}
