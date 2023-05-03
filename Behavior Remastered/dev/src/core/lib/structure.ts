import { Dimension } from "@minecraft/server"
import Area  from "./area.js"
import { asyncExecCmd } from "./mc.js"
import { convertLocationType } from "./misc.js"

export class StructureConstructor {
    asyncSave(
        name: string,
        area: Area,
        {
            saveMode = 'memory',
            includeEntities = true,
            includeBlocks = true,
            dimension
        }: saveOptions = {}
    ) {
        return new Promise<boolean>(res => {
            asyncExecCmd(`structure save ${JSON.stringify(name)} ${area.from.map(v => Math.floor(v)).join(' ')} ${area.to.map(v => Math.floor(v)).join(' ')} ${includeEntities} ${saveMode} ${includeBlocks}`, dimension)
                .then(() => res(true), () => res(false))
        })
    }

    asyncLoad(
        name: string,
        startPosition: LocationType,
        {
            includeEntities = true,
            includeBlocks = true,
            waterlogged = false,
            rotation = 0,
            mirror = 'none',
            integrity = 100,
            seed,
            dimension
        }: loadOptions = {}
    ) {
        return new Promise<boolean>(res => {
            asyncExecCmd(`structure load ${JSON.stringify(name)} ${ convertLocationType('Array', startPosition).map(v => Math.floor(v)).join(' ') } ${rotation}_degrees ${mirror} ${includeEntities} ${includeBlocks} ${waterlogged} ${integrity} ${seed ?? ''}`, dimension)
                .then(
                    () => res(true),
                    () => asyncExecCmd(`structure load ${JSON.stringify(name)} ${ convertLocationType('Array', startPosition).map(v => Math.floor(v)).join(' ') } ${rotation}_degrees ${mirror} ${includeEntities} ${includeBlocks} ${integrity} ${seed ?? ''}`, dimension)
                        .then(
                            () => res(true),
                            () => res(false)
                        )
                )
        })
    }

    asyncDelete(name: string) {
        return new Promise<boolean>(res => {
            asyncExecCmd(`structure delete ${JSON.stringify(name)}`, undefined)
                .then(() => res(true), () => res(false))
        })
    }

}
const structure = new StructureConstructor
export default structure

interface saveOptions {
    saveMode?: 'memory' | 'disk'
    includeEntities?: boolean
    includeBlocks?: boolean
    dimension?: Dimension
}

interface loadOptions {
    includeEntities?: boolean
    includeBlocks?: boolean
    waterlogged?: boolean
    rotation?: 0 | 90 | 180 | 270
    mirror?: 'none' | 'x' | 'z' | 'xz'
    integrity?: number
    seed?: string
    dimension?: Dimension
}
