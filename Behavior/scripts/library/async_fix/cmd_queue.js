import { world } from "@minecraft/server";
import server from "./server_sync.js"
export const overworld = world.getDimension('overworld');


export async function asyncExecCmd(command, source = overworld) {
    while (true) {
        try {
            return source.runCommandAsync(command);
        }
        catch (error) {
            //console.warn(error, error.stack);
            await server.nextTick;
            source.runCommandAsync(command);
        }
    }
}