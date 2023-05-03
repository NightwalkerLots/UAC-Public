/**
 * Nuker config.
 * @type {import('./_configtypes.js').CONF_nukerConfig}
 */
export const nukerConfig: CONF_nukerConfig = {
    maxSpeed: 3,
    maxHardSpeed: 20,

    flagWearoffTime: 3000,

    automodThreshold: 3,

    automodAction: 'kick',
    automodDuration: 259_200_000,
}

import { CONF_nukerConfig } from "./_configtypes.js";
