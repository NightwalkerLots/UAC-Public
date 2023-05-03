import { DynamicPropertiesDefinition, MinecraftEntityTypes, world } from "@minecraft/server";
import MapProxy from "./mapproxy.js";
import { clamp } from "./misc.js";
import server from "./server.js";
// List
const listId = 'uacx:plist';
const maxListSize = 301;
// Player
const playerKeyId = 'uacx:key';
// OP
const opId = 'uacx:oplvl';
let opLevel = 100;
// Key
const maxKeyLength = 23;
const maxKeyLevel = 999;
export class PermissionConstructor extends MapProxy {
    constructor() {
        super({
            set: (map, key, level) => {
                if (map.has(key))
                    throw new TypeError(`Key '${key}' already has level assigned to it.`);
                if (key.length > maxKeyLength)
                    throw new RangeError(`Key length must be below ${maxKeyLength} characters`);
                if (level > maxKeyLevel)
                    throw new RangeError(`Max level allowed to be assigned is ${maxKeyLevel}`);
                level = clamp(~~level, 0, maxKeyLevel);
                map.set(key, level);
                const newSize = this.#updateString().length;
                if (newSize > maxListSize) {
                    map.delete(key);
                    this.#updateString();
                    throw new RangeError(`List size limit exceeded (${newSize} / ${maxListSize})`);
                }
                //this.#updateString()
                save();
                return this;
            },
            delete: (map, key) => {
                const v = map.delete(key);
                this.#updateString();
                save();
                return v;
            },
            clear: (map) => {
                map.clear();
                this.#updateString();
                save();
            }
        });
    }
    // config
    get maxListSize() {
        return maxListSize;
    }
    get maxKeyLength() {
        return maxKeyLength;
    }
    get maxKeyLevel() {
        return maxKeyLevel;
    }
    get opLevel() {
        return opLevel;
    }
    set opLevel(v) {
        opLevel = v;
        server.initialize.then(() => world.setDynamicProperty(opId, opLevel));
    }
    // string
    #cachedString = '{}';
    #updateString() {
        return this.#cachedString = JSON.stringify(Object.fromEntries([...this]));
    }
    toString() {
        return this.#cachedString;
    }
    // player
    setPlayerKey(player, key) {
        if (key.length > maxKeyLength)
            throw new RangeError(`Key length must be below ${maxKeyLength} characters`);
        return player.setDynamicProperty(playerKeyId, key);
    }
    getPlayerKey(player) {
        return player.getDynamicProperty(playerKeyId);
    }
    resetPlayerKey(player) {
        return player.removeDynamicProperty(playerKeyId);
    }
    getPlayerLevel(player) { return Math.max(player.isOp?.() ? opLevel : 0, this.get(player.getDynamicProperty(playerKeyId)) ?? 0); }
    // other stuff
    *getAdmins(minLvl = 0, source = world.getPlayers(), exclude = []) {
        for (const plr of source)
            if (!exclude.includes(plr) && this.getPlayerLevel(plr) >= minLvl)
                yield plr;
    }
}
const permission = new PermissionConstructor();
export default permission;
server.addEventListener('initialize', ({ propertyRegistry }) => {
    const regwl = new DynamicPropertiesDefinition;
    regwl.defineString(listId, maxListSize);
    regwl.defineNumber(opId);
    propertyRegistry.registerWorldDynamicProperties(regwl);
    const regplr = new DynamicPropertiesDefinition;
    regplr.defineString(playerKeyId, maxKeyLength);
    propertyRegistry.registerEntityTypeDynamicProperties(regplr, MinecraftEntityTypes.player);
    // loading old config
    opLevel = world.getDynamicProperty(opId) ?? opLevel;
    const oldList = world.getDynamicProperty(listId);
    if (typeof oldList === 'string') {
        permission.clear();
        for (const [k, v] of Object.entries(JSON.parse(oldList)))
            permission.set(k.substring(0, maxKeyLength), clamp(v, 0, maxKeyLevel));
    }
}, { priority: Infinity });
async function save() {
    await server.initialize;
    world.setDynamicProperty(listId, permission.toString());
}
