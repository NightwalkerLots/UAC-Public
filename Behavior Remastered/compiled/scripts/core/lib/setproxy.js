import { hasInstance } from "./misc.js";
export default class SetProxy {
    constructor(handler, entries = []) {
        if (entries instanceof Set)
            this.#map = entries;
        this.#handler = Object.assign(createDefaultHandler(this.#map), handler);
        for (const k of entries)
            this.#map.add(k);
    }
    #map = new Set();
    #handler;
    add(key) {
        this.#handler.add(this.#map, key);
        return this;
    }
    delete(key) {
        return this.#handler.delete(this.#map, key);
    }
    clear() {
        this.#handler.clear(this.#map);
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
    *[Symbol.iterator]() { yield* this.values(); }
    [Symbol.toStringTag] = 'Set';
}
function createDefaultHandler(map) {
    return {
        add: (_, k) => map.add(k),
        delete: (_, k) => map.delete(k),
        clear: () => map.clear(),
        has: (_, k) => map.has(k),
        size: () => map.size,
        entries: () => map.entries(),
        keys: () => map.keys(),
        values: () => map.values(),
        forEach: (_, cb, thisArg) => map.forEach(cb, thisArg)
    };
}
Object.defineProperty(Set, Symbol.hasInstance, { value: function (v) { return hasInstance(v, [Set, SetProxy]); } });
