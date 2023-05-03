import { hasInstance } from "./misc.js"

export default class MapProxy<K, V> implements Map<K, V> {
    constructor(handler: mapHandler<K, V>, entries: Iterable<[K, V]> = []) {
        if (entries instanceof Map) this.#map = entries

        this.#handler = Object.assign(createDefaultHandler(this.#map), handler)
        for (const [k, v] of entries) this.#map.set(k, v)
    }

    #map = new Map<K, V>()
    #handler: Required<mapHandler<K, V>>

    set(key: K, value: V) {
        this.#handler.set(this.#map, key, value)
        return this
    }

    delete(key: K) {
        return this.#handler.delete(this.#map, key)
    }

    clear() {
        this.#handler.clear(this.#map)
    }

    get(key: K) {
        return this.#handler.get(this.#map, key)
    }

    has(key: K) {
        return this.#handler.has(this.#map, key)
    }

    get size() { return this.#handler.size(this.#map) }

    entries(): IterableIterator<[K, V]> {
        return this.#handler.entries(this.#map)
    }

    keys(): IterableIterator<K> {
        return this.#handler.keys(this.#map)
    }

    values(): IterableIterator<V> {
        return this.#handler.values(this.#map)
    }

    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
        this.#handler.forEach(this.#map, callbackfn, thisArg)
    }

    *[Symbol.iterator]() { yield* this.entries() }

    [Symbol.toStringTag] = 'Map'
}

export type mapHandler<K, V> = Partial<{
    set: (map: Map<K, V>, key: K, value: V) => void
    delete: (map: Map<K, V>, key: K) => boolean
    clear: (map: Map<K, V>) => void

    get: (map: Map<K, V>, key: K) => V | undefined
    has: (map: Map<K, V>, key: K) => boolean
    size: (map: Map<K, V>) => number

    entries: (map: Map<K, V>) => IterableIterator<[K, V]>
    keys: (map: Map<K, V>) => IterableIterator<K>
    values: (map: Map<K, V>) => IterableIterator<V>
    forEach: (map: Map<K, V>, callback: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any) => void
}>

function createDefaultHandler(map: Map<any, any>): Required<mapHandler<any, any>> {
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
    }
}

Object.defineProperty(Map, Symbol.hasInstance, { value: function(v: any) { return hasInstance(v, [Map, MapProxy]) } })
