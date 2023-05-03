/**
 * Movement config.
 * @type {import('./_configtypes.js').CONF_movementConfig}
 */
export const movementConfig: CONF_movementConfig = {
    maxVelocity: 4,
    maxAcceleration: 1,
    
    flagWearoffTime: 1500,
    correctionTicks: 12,

    correctionThreshold: 2,
    alertThreshold: 4,
    automodThreshold: 10,

    automodAction: 'kick',
    automodDuration: 259_200_000,
}

import { CONF_movementConfig } from "./_configtypes.js";
