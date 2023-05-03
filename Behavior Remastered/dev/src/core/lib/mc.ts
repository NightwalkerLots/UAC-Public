import { Dimension, Entity, Player, world } from "@minecraft/server"
import server from "./server.js"

export const overworld = world.getDimension('overworld')

export async function asyncExecCmd(command: string, source: Dimension | Entity | Player = overworld) {
    while (true) {
        try { return source.runCommandAsync(command) }
        catch {
            try {
                if (source instanceof Entity) source.nameTag // test for entity load
                await server.nextTick
            } catch {
                return
            }
        }
    }
}
