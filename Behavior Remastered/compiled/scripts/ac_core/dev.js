import { MinecraftBlockTypes } from '@minecraft/server';
import * as gt from '@minecraft/server-gametest';
import { randomstr, Vec3 } from '../core/lib/misc.js';
import server from '../core/lib/server.js';
gt.register("uac", "logfiller", (test) => {
    const spawnLoc = Vec3([1, 2, 1]);
    const plList = Array.from(Array(30), () => test.spawnSimulatedPlayer(spawnLoc, `Dummy-${randomstr(8)}`));
    const i = server.addEventListener('tick', () => { for (const plr of plList)
        plr.applyKnockback(0, 0, 0, 50); });
    test.succeedWhen(() => {
        test.assertBlockPresent(MinecraftBlockTypes.air, spawnLoc, false);
        server.removeEventListener('tick', i);
    });
    test.succeedOnTick(2147483627);
})
    .maxTicks(2147483647)
    .structureName("gametest:platformdummy");
