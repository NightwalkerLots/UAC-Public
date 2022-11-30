import { Dimension, Entity, Player, system, world } from "@minecraft/server";
import { SimulatedPlayer } from "@minecraft/server-gametest";
import { getStackTrace } from "./misc.js";
export const overworld = world.getDimension('overworld');

// kept for compability - too lazy to change everything on scoreboard.js
export async function asyncExecCmd(command, source = overworld) {
    return source.runCommandAsync(command)
}

let queueCount = 1

for (const cl of [Dimension, Entity, Player, SimulatedPlayer]) {
    const ORC = cl.prototype.runCommandAsync
    cl.prototype.runCommandAsync = async function(c) {
        if (++queueCount > 127) console.warn(`Command queue overload! (${queueCount}) \n${getStackTrace(1)}`)
        console.warn(`[${cl.name}/${this.id}] Run command (queue count: ${queueCount}): ${c} \n${getStackTrace(1)}`)

        while (true) {
            try {
                return ORC(command).finally(() => queueCount--);
            } catch (error) {
                await new Promise(res => system.run(res, 0))
                source.runCommandAsync(command);
            }
        }
    }
}
