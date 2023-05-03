/**
 * Maximum enchantment level list.
 * @type {Record<string, number>}
 */
export const maxEnchLevel = {
    protection: 4,
    fireProtection: 4,
    featherFalling: 4,
    blastProtection: 4,
    projectileProtection: 4,
    thorns: 3,
    respiration: 3,
    depthStrider: 3,
    aquaAffinity: 1,
    sharpness: 5,
    smite: 5,
    baneOfArthropods: 5,
    knockback: 2,
    fireAspect: 2,
    looting: 3,
    efficiency: 5,
    silkTouch: 1,
    unbreaking: 3,
    fortune: 3,
    power: 5,
    punch: 2,
    flame: 1,
    infinity: 1,
    luckOfTheSea: 3,
    lure: 3,
    frostWalker: 2,
    mending: 1,
    binding: 1,
    vanishing: 1,
    impaling: 5,
    riptide: 3,
    loyalty: 3,
    channeling: 1,
    multishot: 1,
    piercing: 4,
    quickCharge: 3,
    soulSpeed: 3,
    swiftSneak: 3,
};
/**
 * Max enchantment level override list.
 * @type {Record<string, Record<string, number>>}
 *
 * Example use:
 * ```ts
 * {
 *     "minecraft:stick": {
 *         knockback: 10
 *     },
 *     "minecraft:undyed_shulker_box": {
 *         vanishing: 0
 *     },
 *     "minecraft:shulker_box": {
 *         vanishing: 0
 *     }
 * }
 * ```
 */
export const enchOverrideLevel = {
// ...
};
Object.setPrototypeOf(maxEnchLevel, null);
Object.setPrototypeOf(enchOverrideLevel, null);
for (const v of Object.values(enchOverrideLevel))
    Object.setPrototypeOf(v, null);
