//@ts-check
/**
 * Roles. (JSDOC - Hover on properties for more information.)
 * @type {import("./_configtypes.js").CONF_roles}
 */
export const roles = [
    {
        id: 'admins',
        position: 100,
        default_role: '[Member]',
        roles: [
            ['owner', '[§bOwner§r]'],
            ['admin', '[§3Admin§r]'],
            ['staff', '[§1Staff§r]']
        ]
    }
];
/**
 * Role formattings. (JSDOC - Hover on properties for more information.)
 * @type {import("./_configtypes.js").CONF_roleFormat}
 */
export const role_format = {
    role_divider: ' ',
    message: {
        format: '!<role>! !<name>!: !<message>!'
    },
    nickname: {
        format: '!<role>! !<name>!',
        interval: 30000,
        enabled: true
    }
};
