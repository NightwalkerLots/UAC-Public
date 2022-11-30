import { Dimension, Enchantment, Entity, Player, system, world } from "@minecraft/server";
import { SimulatedPlayer } from "@minecraft/server-gametest";
import { getStackTrace } from "./misc.js";
export const overworld = world.getDimension('overworld');

let commandQueueCount = 0

export async function asyncExecCmd(command, source = overworld) {
    if (commandQueueCount > 127) console.warn(`Command queue overload! (${commandQueueCount})`)
    while (true) {
        try {
            return source.runCommandAsync(command);
        } catch (error) {
            //console.warn(error, error.stack);
            await new Promise(res => system.run(res, 0))
            source.runCommandAsync(command);
        }
    }
}

for (const cl of [Dimension, Entity, Player, SimulatedPlayer]) {
    const ORC = cl.prototype.runCommandAsync
    cl.prototype.runCommandAsync = function(c) {
        console.warn(`[${cl.name}/${this.id}] Run command: ${c} \n${getStackTrace(1)}`)
        return ORC(c)
    }
}
