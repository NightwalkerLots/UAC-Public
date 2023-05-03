import { DynamicPropertiesDefinition, world } from "@minecraft/server";
import { randomstr } from "./misc.js";
import server from "./server.js";
import Storage from "./storage.js";
const sdefault = new Storage('uacx', 'UAC');
export default sdefault;
sdefault.addEventListener('save', ({ data }) => {
    data.version = 1;
});
sdefault.addEventListener('load', ({ data }, ctrl) => {
    switch (data.version) {
        case 1:
            {
            }
            ;
            break;
        default:
            ctrl.break();
            throw new Error(`Cannot load save data: invalid version (${data.version})`);
    }
}, { priority: Infinity });
server.addEventListener('initialize', ({ propertyRegistry }) => {
    const reg = new DynamicPropertiesDefinition;
    reg.defineString('sukey', 8);
    propertyRegistry.registerWorldDynamicProperties(reg);
    let key = world.getDynamicProperty('sukey');
    if (typeof key !== 'string')
        world.setDynamicProperty('sukey', key = randomstr(8));
    sdefault.id = key;
}, { priority: Infinity });
