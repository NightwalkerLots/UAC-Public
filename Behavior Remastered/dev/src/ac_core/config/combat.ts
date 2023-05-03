/**
 * Combat config.
 * @type {import('./_configtypes.js').CONF_combatConfig}
 */
export const combatConfig: CONF_combatConfig = {
    maxReach: 3,
    maxHorDegTol: 90,
    maxVerDegTol: 45,
    autoAimDegTol: 0.1,
    maxCPS: 20,

    flagWearoffTime: 1000,
    flagImmuneTime: 2,

    combatLog: false,
    combatLogWearoffTime: 10000,
    combatLogCommand: 'tag @s add combatlog',

    alertThreshold: 1,
    automodThreshold: 10,
    automodAction: 'kick',
    automodDuration: 259_200_000,
}

import { CONF_combatConfig } from "./_configtypes.js";
