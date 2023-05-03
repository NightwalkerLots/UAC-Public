/**
 * Illegal item config.
 * @type {import('./_configtypes.js').CONF_iiConfig}
 */
export const illegalItemConfig = {
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
};
