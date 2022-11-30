import { world } from "@minecraft/server";
export const overworld = world.getDimension('overworld');

// kept for compability - too lazy to change everything on scoreboard.js
export async function asyncExecCmd(command, source = overworld) {
    return source.runCommandAsync(command)
}
