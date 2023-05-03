export type CONF_roles = {
    /** Identifier of a group. */
    id: string
    /** Group position. Ordered from right (highest) to left (lowest). */
    position?: number
    /** Default group role. Can be empty. */
    default_role?: string
    /**
     * Group roles. Note the order.
     * 
     * If there's multiple roles applicable to the player, the highest ones will be selected.
     */
    roles: [tag: string, role: string][]
}[]

export type CONF_roleFormat = {
    /**
     * Role divider.
     * 
     * If set to, for example, `' '`, the role output will be `Role1 Role2`.
     * 
     * If set to `'--'`, the role output will be `Role1--Role2`.
     */
    role_divider: string
    /** Message formatting config. */
    message: {
        /**
         * Message format.
         * Escape with `!<...>!`.
         * 
         * Current available local commands:
         * - `name` (`name`) - returns player name
         * - `message` (`message`) - returns player message
         * - `role` (`role`) - returns player roles
         * - `score` (`score {obj: any}`) - returns player score on an objective
         */
        format: string
    }
    /** Nickname formatting config. */
    nickname: {
        /**
         * Nickname format.
         * Escape with `!<...>!`.
         * 
         * Current available local commands:
         * - `name` (`name`) - returns player name
         * - `role` (`role`) - returns player roles
         * - `score` (`score {obj: any}`) - returns player score on an objective
         */
        format: string
        /** Nickname format interval (milliseconds). */
        interval: number
        /** Enable nickname format. */
        enabled: boolean
    }
}

export type CONF_chatGroups = {
    /** Identifier of a group */
    id: string
    /**
     * Group priority.
     * 
     * If there's multiple applicable groups, the highest priority will be selected.
     */
    priority?: number
    /**
     * Tag filter.
     * - `all` - all tests must pass
     * - `any` - at least one of the test must pass
     * - `none` - none of the test must pass
     * - array (`[...]`) - list of tags
     */
    tag_filter?: tagFilter
}[]

type tagFilter = {[k in 'any' | 'all' | 'none']?: tagFilter} | string[]
