import { Vector3, Vector, BlockAreaSize } from "@minecraft/server"

declare global {
    type Array2<T = number> = [T, T]
    type Array3<T = number> = [T, T, T]

    type LocationType = Array3 | Vector3 | Vector | BlockAreaSize

    type tagFilter = { [k in 'all' | 'any' | 'none']?: tagFilter } | string[]
}
