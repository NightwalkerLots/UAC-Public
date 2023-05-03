import { MinecraftBlockTypes } from "@minecraft/server";
import * as gt from '@minecraft/server-gametest';
import { randomstr, Vec3 } from "./lib/misc.js";
gt.register("se2", "spawndummy", (test) => {
    const spawnLoc = Vec3([1, 2, 1]);
    test.spawnSimulatedPlayer(spawnLoc, `Dummy`);
    test.succeedWhen(() => test.assertBlockPresent(MinecraftBlockTypes.air, spawnLoc, false));
    test.succeedOnTick(2147483627);
})
    .maxTicks(2147483647)
    .structureName("gametest:platformdummy");
gt.register("se2", "spawnranddummy", (test) => {
    const spawnLoc = Vec3([1, 2, 1]);
    test.spawnSimulatedPlayer(spawnLoc, `Dummy-${randomstr(8)}`);
    test.succeedWhen(() => test.assertBlockPresent(MinecraftBlockTypes.air, spawnLoc, false));
    test.succeedOnTick(2147483627);
})
    .maxTicks(2147483647)
    .structureName("gametest:platformdummy");
