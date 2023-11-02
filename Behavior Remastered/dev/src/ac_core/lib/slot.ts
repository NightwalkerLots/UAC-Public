import server from "../../core/lib/server.js"

export default class Slot {
    constructor(list: Iterable<number>) {
        for (const l of list) this.freeSlotList.add(l)
    }

    freeSlotList = new Set<number>()

    async lock() {
        let slot
        while (( [slot] = this.freeSlotList, typeof slot !== 'number' )) await server.nextTick
        this.freeSlotList.delete(slot)

        return slot
    }

    async unlock(slot: number) {
        this.freeSlotList.add(slot)
    }
}