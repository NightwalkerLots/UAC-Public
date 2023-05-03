/**
 * Illegal item config.
 * @type {import('./_configtypes.js').CONF_iiConfig}
 */
export const illegalItemConfig: CONF_iiConfig = {
    // Checks
    testBannedItem: true,
    testMaxStack: true,
    testEnch: true,
    testNonEmptyContainer: true,

    // Advanced
    sanitizer: true,
    
    stackSizeDefault: 64,

    // Automod
    automodAction: 'blacklist',
    automodDuration: 31_536_000_000,
}

// See other: banneditem.ts (Banned item list)
// See other: enchant.ts (Max enchant level & enchant level overrides)
// See other: maxstack.ts (Max item stack size)
// See other: sanitize.ts (Sanitizer)



import { CONF_iiConfig } from "./_configtypes.js";
