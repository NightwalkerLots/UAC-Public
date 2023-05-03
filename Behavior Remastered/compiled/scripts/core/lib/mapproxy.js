import { hasInstance } from "./misc.js";
export default class MapProxy {
    constructor(handler, entries = []) {
        if (entries instanceof Map)
            this.#map = entries;
        this.#handler = Object.assign(createDefaultHandler(this.#map), handler);
        for (const [k, v] of entries)
            this.#map.set(k, v);
    }
    #map = new Map();
    #handler;
    set(key, value) {
        this.#handler.set(this.#map, key, value);
        return this;
    }
    delete(key) {
        return this.#handler.delete(this.#map, key);
    }
    clear() {
        this.#handler.clear(this.#map);
    }
    get(key) {
        return this.#handler.get(this.#map, key);
    }
    has(key) {
        return this.#handler.has(this.#map, key);
    }
    get size() { return this.#handler.size(this.#map); }
    entries() {
        return this.#handler.entries(this.#map);
    }
    keys() {
        return this.#handler.keys(this.#map);
    }
    values() {
        return this.#handler.values(this.#map);
    }
    forEach(callbackfn, thisArg) {
        this.#handler.forEach(this.#map, callbackfn, thisArg);
    }
    *[Symbol.iterator]() { yield* this.entries(); }
    [Symbol.toStringTag] = 'Map';
}
function createDefaultHandler(map) {
    return {
        set: (_, k, v) => map.set(k, v),
        delete: (_, k) => map.delete(k),
        clear: () => map.clear(),
        get: (_, k) => map.get(k),
        has: (_, k) => map.has(k),
        size: () => map.size,
        entries: () => map.entries(),
        keys: () => map.keys(),
        values: () => map.values(),
        forEach: (_, cb, thisArg) => map.forEach(cb, thisArg)
    };
}
Object.defineProperty(Map, Symbol.hasInstance, { value: function (v) { return hasInstance(v, [Map, MapProxy]); } });
