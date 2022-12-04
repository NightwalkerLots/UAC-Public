import { SimulatedPlayer } from "@minecraft/server-gametest";
import { Block, Entity, IEntityComponent, ItemCooldownComponent, ItemDurabilityComponent, ItemEnchantsComponent, ItemFoodComponent, ItemStack, Player, Dimension, system } from "@minecraft/server";
import { getStackTrace } from "../library/utils/misc.js";

for (const obj of [Entity, Player, SimulatedPlayer, Block, ItemStack, IEntityComponent, Block, ItemFoodComponent, ItemCooldownComponent, ItemEnchantsComponent, ItemDurabilityComponent]) {
    const { get: OIdGet } = Object.getOwnPropertyDescriptor(obj.prototype, "typeId") ?? {};
    Object.defineProperty(obj.prototype, "id", { get: OIdGet });
}

let queueCount = 1

for (const cl of [Dimension, Entity, Player, SimulatedPlayer]) {
    console.warn(cl.name, cl.prototype)
    const ORC = cl.prototype.runCommandAsync
    cl.prototype.runCommandAsync = async function(c) {
        if (++queueCount > 127) console.warn(`Command queue overload! (${queueCount}) \n${getStackTrace(1)}`)
        //console.warn(`[${cl.name}/${this.id}] Run command (queue count: ${queueCount}): ${c} \n${getStackTrace(1)}`)
        while (true) {
            try {
                return ORC.call(this, c).finally(() => queueCount--);
            } catch (error) {
                await new Promise(res => system.run(res, 0))
            }
        }
    }
}

