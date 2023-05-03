//@ts-check

/**
 * Disables message cancelation.
 * Disabling this will disable message formatting.
 * Chat group will still work.
 * 
 * Best to disable this when there's another pack
 * that has message formatting you want to use
 * or does not have compability feature in general.
 * 
 * @type { boolean }
 */
export const disable_message_cancel: boolean = false

/**
 * Enables message target integration.
 * 
 * Enabling this will allow the message only to be sent
 * to the targeted players configured within the chat
 * event instead of overwriting with chat group targets.
 * 
 * This means if a pack wants a message to be sent to some players,
 * then the message will be sent only to these players.
 * 
 * Note that the message targets can still be overwritten
 * in some cases, for example: admin chat.
 * 
 * @type { boolean }
 */
export const integrate_message_targets: boolean = false

/**
 * Disables autosave & autoload data.
 * 
 * Note that this will not disable saving & loading data
 * that is based on dynamic property
 * (permission keys & OP level, player UID, temp area, etc.)
 * 
 * @type { boolean }
 */
export const disable_autosave_autoload: boolean = false

/**
 * Enables cross-scripting execution (CSE) through command.
 * For security and safety reasons, this feature is toggled off by default.
 * 
 * CSE Example: `/scriptevent namespace:identifier message`
 * 
 * Supported cross-scripting:
 * - `uacx:command` - Executes a command as a player (non-prefixed).
 *   Example: `/scriptevent uacx:command warp home`
 * - `uacx:chat` - Sends a message as a player.
 *   Example: `/scriptevent uacx:chat Hello world!`
 * 
 * @type {boolean}
 */
export const enable_cross_scripting_execution: boolean = false

/**
 * Maximum command level for CSE (`uacx:command`). Recommended value is 40.
 * For command that requires permission level greater than this value
 * and is executed using CSE, command execution will be aborted.
 * 
 * @type {number}
 */
export const cse_command_max_level: number = 40
