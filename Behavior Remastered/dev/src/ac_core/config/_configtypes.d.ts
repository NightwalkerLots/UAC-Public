import { GameMode } from "@minecraft/server"

export type CONF_bannedItemData = {
    /** Banned item action. Leave blank to use automod action. */
    action?: 'clear' | 'warn' | 'kick' | 'ban' | 'blacklist'
    /** Checks only if the player is not in creative, otherwise ignore. */
    requireCreative?: boolean
}

export type CONF_chatConfig = {
    /** Slowmode (in milliseconds). */
    slowmode: number,
    /** Maximum message length */
    maxLength: number
}

export type CONF_crasherConfig = {
    /** Automod action. */
    automodAction: 'kick' | 'ban' | 'blacklist'
    /** Automod duration (ban only, in milliseconds). */
    automodDuration: number
}

export type CONF_gamemodeConfig = {
    /** Automod action. */
    automodAction: 'warn' | 'kick' | 'ban' | 'blacklist'
    /** Automod duration (ban only, in milliseconds). */
    automodDuration: number
}

type tagFilter = {[k in 'any' | 'all' | 'none']?: tagFilter} | string[]

export type CONF_gamemodeData = {
    /** Priority - checking order */
    priority: number
    /** Tag filter */
    filter: tagFilter
    /** Allowed gamemodes. */
    allowedGamemodes: GameMode[]
}

export type CONF_iiConfig = {
    /** Tests banned item. */
    testBannedItem: boolean,
    /** Tests illegal item stack. */
    testMaxStack: boolean,
    /** Tests illegal enchantments. */
    testEnch: boolean,
    /** Tests non-empty block container. */
    testNonEmptyContainer: boolean,

    /** Enables sanitizer. */
    sanitizer: boolean,
    
    /** Default stack size. */
    stackSizeDefault: number,

    /** Automod action. */
    automodAction: 'clear' | 'warn' | 'kick' | 'ban' | 'blacklist',
    /** Automod duration (ban only, in milliseconds). */
    automodDuration: number,
}

export type CONF_combatConfig = {
    /** Max reach in blocks. */
    maxReach: number
    /** Max horizontal degree tolerance. */
    maxHorDegTol: number
    /** Max vertical degree tolerance. */
    maxVerDegTol: number
    /** Max AutoAim degree tolerance. */
    autoAimDegTol: number
    /** Max CPS. */
    maxCPS: number

    /** Time (in ticks) for someone to not be flagged after they've bene flagged. */
    flagImmuneTime: number
    /** Flag wearoff time (in milliseconds) */
    flagWearoffTime: number

    /** Detects combat log. */
    combatLog: boolean
    /** Combat log wearoff time, resets everytime they got hit. */
    combatLogWearoffTime: number
    /** Combat log command (only if they rejoin). */
    combatLogCommand: string

    /** Minimum flags required at a time for alert. */
    alertThreshold: number
    /** Minimum flags required at a time for automod action. */
    automodThreshold: number
    /** Automod action. */
    automodAction: 'kick' | 'ban' | 'blacklist'
    /** Automod duration (ban only, in milliseconds). */
    automodDuration: number
}

export type CONF_movementConfig = {
    /** Max velocity / speed in blocks/tick. */
    maxVelocity: number
    /** Max acceleration in blocks/tick. */
    maxAcceleration: number

    /** Flag wearoff time (in milliseconds) */
    flagWearoffTime: number
    /** Previous position in ticks for correction. */
    correctionTicks: number

    /** Minimum flags required at a time for correction. */
    correctionThreshold: number
    /** Minimum flags required at a time for alert. */
    alertThreshold: number
    /** Minimum flags required at a time for automod action. */
    automodThreshold: number

    /** Automod action. */
    automodAction: 'kick' | 'ban' | 'blacklist'
    /** Automod duration (ban only, in milliseconds). */
    automodDuration: number
}

export type CONF_nukerConfig = {
    /** Max blocks broken count for detection in blocks/tick */
    maxSpeed: number
    /** Max blocks broken count for automod in blocks/tick */
    maxHardSpeed: number

    /** Flag wearoff time (in milliseconds) */
    flagWearoffTime: number

    /** Minimum flags required at a time for automod action. */
    automodThreshold: number

    /** Automod action. */
    automodAction: 'kick' | 'ban' | 'blacklist'
    /** Automod duration (ban only, in milliseconds). */
    automodDuration: number
}

export type CONF_RBRelayConfig = {
    /** Logs detection. */
    logDetection: boolean
    /** Logs action. */
    logAction: boolean
    /** Logs others, such as player join, player spawn, player leave, etc. */
    logOther: boolean
    /** Category fIlters for others, separated with comma. Leave blank for no filter. */
    otherCategoryFilter: string

    /** Target tag/ */
    targetTag: string
}
