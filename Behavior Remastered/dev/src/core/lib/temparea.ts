import { compressBit, parseBit } from './misc.js'
import { DynamicPropertiesDefinition, world } from "@minecraft/server";
import server from "./server.js";

const centerLoc: Array2 = [2 ** 20 - 16384, 2 ** 20 - 16384]
const areaChunkRadius = 3

export class TempAreaConstructor {
    request(id: string) {
        if (server.initialized) throw new TypeError(`Temp area request must be done before world is initialized`)
        return new Promise<taRequestData>(res => requests.set(id, res))
    }
}
const tempArea = new TempAreaConstructor
export default tempArea

//// NEW ////

const directionIndex = [
    [ 1,  0], // 0 (up)
    [ 0,  1], // 1 (right)
    [-1,  0], // 2 (down)
    [ 0, -1], // 3 (left)
] as const

let direction: 0 | 1 | 2 | 3 = 0
let moveRem = 1
let moveDist = 1
let x = 0, z = 0

function newLoc() {
    const [xm, zm] = directionIndex[direction]
    const nl: Array2 = [
        x += xm,
        z += zm
    ]
    if (!--moveRem) {
        //@ts-expect-error
        direction = (direction + 1) % 4
        if (direction == 0 || direction == 2) moveDist++
        moveRem = moveDist

        world.setDynamicProperty('uacx:ta_pos', compressBit([x, 6], [z, 6], [moveRem, 6], [direction, 2, true]))
    }
    return nl
}

//// REQUEST LOADER ////

const requests = new Map<string, (v: taRequestData) => void>()

type taRequestData = {
    index: Array2
    start: Array2
    center: Array2
}

const startOffset = (areaChunkRadius - 1) * 16
const areaSize = (areaChunkRadius * 2 - 1) * 16

server.addEventListener('initialize', ({propertyRegistry}) => {
    const reg = new DynamicPropertiesDefinition
    reg.defineNumber('uacx:ta_pos')
    for (const id of requests.keys()) reg.defineNumber(`uacx:ta/${id}`)

    propertyRegistry.registerWorldDynamicProperties(reg)

    const posBit = world.getDynamicProperty(`uacx:ta_pos`) as number
    if (typeof posBit === 'number') {
        //@ts-expect-error
        [x, z, moveRem, direction] = parseBit(posBit, [6], [6], [6], [2, true])
        moveDist = (
            direction === 0 ? -z * 2 + 1
            : direction === 1 ? x * 2 - 1
            : direction === 2 ? z * 2
            : -x * 2
        )
    }

    for (const [id, res] of requests) {
        let x, z

        const bit = world.getDynamicProperty(`uacx:ta/${id}`)
        if (typeof bit === 'number') {
            [x = 0, z = 0] = parseBit(bit, [6], [6])
        } else {
            [x, z] = newLoc()
            world.setDynamicProperty(`uacx:ta/${id}`, compressBit([x, 6], [z, 6]))
        }

        const xc = x * areaSize + centerLoc[0],
            zc = z * areaSize + centerLoc[1]
        res({
            index: [x, z],
            center: [xc, zc],
            start: [xc - startOffset, zc - startOffset],
        })
    }
    requests.clear()
})
