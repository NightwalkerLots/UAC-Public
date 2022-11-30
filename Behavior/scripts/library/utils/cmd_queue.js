import { system, world } from "@minecraft/server";
export const overworld = world.getDimension('overworld');

let commandQueueCount = 0

export async function asyncExecCmd(command, source = overworld) {
    if (++commandQueueCount > 127) console.warn(`Command queue overload! (${commandQueueCount})`)
    while (true) {
        try {
            return source.runCommandAsync(command).finally(() => commandQueueCount--);
        } catch (error) {
            //console.warn(error, error.stack);
            await new Promise(res => system.run(res, 0))
            source.runCommandAsync(command);
        }
    }
}
