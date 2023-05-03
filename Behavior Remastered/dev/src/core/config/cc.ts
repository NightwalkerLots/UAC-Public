//@ts-check

/**
 * The prefix for custom command.
 * 
 * @type { string }
 */
export const prefix: string = '!'

/**
 * Custom command toggles.
 * Set to `true` to enable the command.
 * Set to `false` to disable the command.
 * 
 * @type { Record<string, boolean> }
 */
export const commandToggles: Record<string, boolean> = {
    // Admin chat.
    adminchat: true,
    // Chat group configuration.
    chatgroup: true,
    // Compability configuration.
    compability: true,
    // Deop-ing someone else.
    deopelse: true,
    // JavaScript execution.
    eval: true,
    // Command list & detailed info.
    help: true,
    // Onjoin command config & execution.
    onjoin: true,
    // Onleave command config & execution.
    onleave: true,
    // Onregister command config & execution.
    onregister: true,
    // Op-ing someone else.
    opelse: true,
    // Prefix configuration.
    prefix: true,
    // Role configuration.
    role: true,
    // TPS display.
    tps: true,
    // TPS command config & execution.
    tpscmd: true
}
