import { CONF_gamemodeConfig, CONF_gamemodeData } from "./_configtypes.js"

/**
 * Gamemode module config.
 * @type {import('./_configtypes.js').CONF_gamemodeConfig}
 */
export const gamemodeConfig: CONF_gamemodeConfig = {
    automodAction: 'blacklist',
    automodDuration: 31_536_000_000,
}

/**
 * Allowed gamemodes list.
 * @type {Record<string, import('./_configtypes.js').CONF_gamemodeData>}
 */
export const gamemodeList: Record<string, CONF_gamemodeData> = {
    default: {
        priority: 0,
        filter: [],
        allowedGamemodes: [
            GameMode.survival,
            GameMode.creative,
            GameMode.adventure,
            GameMode.spectator
        ]
    }
}



import { GameMode } from "@minecraft/server"
