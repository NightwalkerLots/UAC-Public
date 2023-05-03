import { world } from "@minecraft/server";
import { overworld } from "./mc.js";
import EntityLock from "./entlock.js";
import server from "./server.js";
import { convertLocationType } from "./misc.js";
export class LoaderConstructor {
    get lock() { return lock; }
    async spawn({ x, y, z }) {
        while (true) {
            for (const target of (function* () { for (const e of world.getPlayers())
                yield e; for (const e of overworld.getEntities({ type: lock.id }))
                yield e; })()) {
                const { x: xt, y: yt, z: zt } = target.location;
                const ent = lock.spawn(undefined, convertLocationType('Vector', [xt, yt, zt]));
                await server.waitFor(2);
                ent.teleport({ x, y, z }, ent.dimension, 0, 0);
                await server.waitFor(2);
                return ent;
            }
            await server.nextTick;
        }
    }
}
const loader = new LoaderConstructor;
export default loader;
const lock = new EntityLock('uacx:loader', 'uacx:kill');
