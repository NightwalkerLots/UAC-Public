import { hasInstance } from "./misc.js"

export default class SetProxy<K> implements Set<K> {
    constructor(handler: setHandler<K>, entries: Iterable<K> = []) {
        if (entries instanceof Set) this.#map = entries

        this.#handler = Object.assign(createDefaultHandler(this.#map), handler)
        for (const k of entries) this.#map.add(k)
    }

    #map = new Set<K>()
    #handler: Required<setHandler<K>>

    add(key: K) {
        this.#handler.add(this.#map, key)
        return this
    }

    delete(key: K) {
        return this.#handler.delete(this.#map, key)
    }

    clear() {
        this.#handler.clear(this.#map)
    }

    has(key: K) {
        return this.#handler.has(this.#map, key)
    }

    get size() { return this.#handler.size(this.#map) }

    entries(): IterableIterator<[K, K]> {
        return this.#handler.entries(this.#map)
    }

    keys(): IterableIterator<K> {
        return this.#handler.keys(this.#map)
    }

    values(): IterableIterator<K> {
        return this.#handler.values(this.#map)
    }

    forEach(callbackfn: (value: K, key: K, map: Set<K>) => void, thisArg?: any): void {
        this.#handler.forEach(this.#map, callbackfn, thisArg)
    }

    *[Symbol.iterator]() { yield* this.values() }

    [Symbol.toStringTag] = 'Set'
}

export type setHandler<K> = Partial<{
    add: (map: Set<K>, key: K) => void
    delete: (map: Set<K>, key: K) => boolean
    clear: (map: Set<K>) => void

    has: (map: Set<K>, key: K) => boolean
    size: (map: Set<K>) => number

    entries: (map: Set<K>) => IterableIterator<[K, K]>
    keys: (map: Set<K>) => IterableIterator<K>
    values: (map: Set<K>) => IterableIterator<K>
    forEach: (map: Set<K>, callback: (value: K, key: K, map: Set<K>) => void, thisArg?: any) => void
}>

function createDefaultHandler(map: Set<any>): Required<setHandler<any>> {
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
    }
}

Object.defineProperty(Set, Symbol.hasInstance, { value: function(v: any) { return hasInstance(v, [Set, SetProxy]) } })
