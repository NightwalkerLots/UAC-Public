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
    
}

