//@ts-check
/**
 * Permission keys.
 *
 * For example: `owner: 100` will give permission level 100
 * for those whose permission keys is set to `owner`
 * (done through `!op owner`).
 *
 * Please note:
 * - Key length must be less than 24
 * - Key level must be less than 1000
 * - List size must be less than 302 characters (JSON)
 *
 * @type {Record<string, number>}
 */
export const permissionKeys = {
// owner: 100
};
/**
 * Permission OP level.
 * @type {number}
 */
export const permissionOperatorLevel = 100;
