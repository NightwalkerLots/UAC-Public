import cc from "../lib/cc.js";
import { formatterEscapeRegex } from "../lib/misc2.js";
import role from "../lib/role.js";

cc.create("role", {
    name: 'Role',
    description: 'Configures roles / ranks',
    usage: [
        {
            usage: ['role', 'group', 'create', { name: 'id', type: 'any' }, { name: 'pos', type: 'number', optional: true }, { name: 'default-role', type: 'any', optional: true }],
            description: 'Creates a role group, collection of roles in a group.'
        }, {
            usage: ['role', 'group', 'edit', { name: 'id', type: 'any' }, { name: 'property', keyword: ['position', 'default-role'] }, { name: 'value', type: '*' }],
            description: 'Edits a property in a role group.'
        }, {
            usage: ['role', 'group', 'roles', { name: 'id', type: 'any' }, 'add-first', { name: 'tag', type: 'any' }, { name: 'role', type: 'any' }],
            description: 'Adds a role in a first position of the list in a role group.'
        }, {
            usage: ['role', 'group', 'roles', { name: 'id', type: 'any' }, 'add-last', { name: 'tag', type: 'any' }, { name: 'role', type: 'any' }],
            description: 'Adds a role in a last position of the list in a role group.'
        }, {
            usage: ['role', 'group', 'roles', { name: 'id', type: 'any' }, 'add-at', { name: 'pos', type: 'number' }, { name: 'tag', type: 'any' }, { name: 'role', type: 'any' }],
            description: 'Adds a role in a specified position of the list in a role group.'
        }, {
            usage: ['role', 'group', 'roles', { name: 'id', type: 'any' }, 'remove-first'],
            description: 'Removes a role in a first position of the list in a role group.'
        }, {
            usage: ['role', 'group', 'roles', { name: 'id', type: 'any' }, 'remove-last'],
            description: 'Removes a role in a last position of the list in a role group.'
        }, {
            usage: ['role', 'group', 'roles', { name: 'id', type: 'any' }, 'remove-at', { name: 'pos', type: 'number' }],
            description: 'Removes a role in a specified position of the list in a role group.'
        }, {
            usage: ['role', 'group', 'roles', { name: 'id', type: 'any' }, 'list'],
            description: 'Shows role list in a role group.'
        }, {
            usage: ['role', 'group', 'delete', { name: 'id', type: 'any' }],
            description: 'Deletes a role group.'
        }, {
            usage: ['role', 'group', 'list'],
            description: 'Shows role group list.'
        }, {
            usage: ['role', 'config'],
            description: 'Shows role configurations.'
        }, {
            usage: ['role', 'config', { name: 'name', type: 'configName' }],
            description: 'Shows role configuration description.'
        }, {
            usage: ['role', 'config', { name: 'name', type: 'configName' }, 'set', { name: 'value', type: '*' }],
            description: 'Configures role.'
        }
    ],
    minPermLvl: 80,
    trigger: /^(chat-?)?(role|rank)$/i,
    typedParams: new cc.typedParams(
        {
            minArgs: 3,
            sequence: ['group', 'create', cc.argumentParser.parseAny, cc.argumentParser.parseNumber, cc.argumentParser.parseAny],
            execute: ([,,id, pos, defaultRole], { log }) => {
                if (role.group.has(id)) throw new Error(`Role group '${id}' already exists`)

                role.group.create(id, pos, defaultRole)
                log(`Created role group '§a${id}§r'.`)
            }
        }, {
            sequence: ['group', 'edit', cc.argumentParser.parseAny, 'position', cc.argumentParser.parseNumber],
            execute: ([,,id,, val], { log }) => {
                const rg = role.group.get(id)
                if (!rg) throw new Error(`Role group '${id}' not found`)

                rg['position'] = val
                return log(`Edited role group '§a${id}§r' property '§aposition§r' to §a${val}§r.`)
            }
        }, {
            sequence: ['group', 'edit', cc.argumentParser.parseAny, 'default-role', cc.argumentParser.parseAny],
            execute: ([,,id,, val], { log }) => {
                const rg = role.group.get(id)
                if (!rg) throw new Error(`Role group '${id}' not found`)

                rg['defaultRole'] = val === 'empty' || val === 'none' ? undefined : val
                return log(`Edited role group '§a${id}§r' property '§adefault-role§r' to ${rg.defaultRole ? `'${rg.defaultRole}'` : '§8<none>§r'}.`)
            }
        }, {
            sequence: ['group', 'roles', cc.argumentParser.parseAny, ['add-first', 'add', 'unshift'], cc.argumentParser.parseAny, cc.argumentParser.parseAny ],
            execute: ([,,id,,tag,r], { log }) => {
                const rg = role.group.get(id)
                if (!rg) throw new Error(`Role group '${id}' not found`)

                rg.roles.unshift([tag, r])
                return log(`Added role '${r}§r' (tag: '§a${tag}§r') to role group '§a${id}§r' at first.`)
            }
        }, {
            sequence: ['group', 'roles', cc.argumentParser.parseAny, ['add-last', 'push'], cc.argumentParser.parseAny, cc.argumentParser.parseAny ],
            execute: ([,,id,,tag,r], { log }) => {
                const rg = role.group.get(id)
                if (!rg) throw new Error(`Role group '${id}' not found`)

                rg.roles.push([tag, r])
                return log(`Added role '${r}§r' (tag: '§a${tag}§r') to role group '§a${id}§r' at last.`)
            }
        }, {
            sequence: ['group', 'roles', cc.argumentParser.parseAny, 'add-at', cc.argumentParser.number(true, 1), cc.argumentParser.parseAny, cc.argumentParser.parseAny ],
            execute: ([,,id,,i,tag,r], { log }) => {
                const rg = role.group.get(id)
                if (!rg) throw new Error(`Role group '${id}' not found`)

                rg.roles.addAt(i - 1, tag, r)
                return log(`Added role '${r}§r' (tag: '§a${tag}§r') to role group '§a${id}§r' at ${i}.`)
            }
        }, {
            sequence: ['group', 'roles', cc.argumentParser.parseAny, ['remove-first', 'remove', 'shift']],
            execute: ([,,id], { log }) => {
                const rg = role.group.get(id)
                if (!rg) throw new Error(`Role group '${id}' not found`)

                const roleData  = rg.roles.shift()
                if (!roleData) return log(`Nothing to remove.`)

                const [tag, r] = roleData
                return log(`Removed role '${r}§r' (tag: '§a${tag}§r') from role group '§a${id}§r' at first.`)
            }
        }, {
            sequence: ['group', 'roles', cc.argumentParser.parseAny, ['remove-last', 'pop']],
            execute: ([,,id], { log }) => {
                const rg = role.group.get(id)
                if (!rg) throw new Error(`Role group '${id}' not found`)

                const roleData  = rg.roles.pop()
                if (!roleData) return log(`Nothing to remove.`)

                const [tag, r] = roleData
                return log(`Removed role '${r}§r' (tag: '§a${tag}§r') from role group '§a${id}§r' at last.`)
            }
        }, {
            sequence: ['group', 'roles', cc.argumentParser.parseAny, 'remove-at', cc.argumentParser.number(true, 1) ],
            execute: ([,,id,,i], { log }) => {
                const rg = role.group.get(id)
                if (!rg) throw new Error(`Role group '${id}' not found`)

                const roleData = rg.roles.removeAt(i - 1)
                if (!roleData) return log(`Nothing to remove.`)

                const [tag, r] = roleData
                return log(`Removed role '${r}§r' (tag: '§a${tag}§r') from role group '§a${id}§r' at ${i}.`)
            }
        }, {
            sequence: ['group', 'roles', cc.argumentParser.parseAny, 'list'],
            execute: ([,,id], { log }) => {
                const rg = role.group.get(id)
                if (!rg) throw new Error(`Role group '${id}' not found`)

                log([
                    ` `,
                    `Group roles: (group: '§a${id}§r')`,
                    ...Array.from(rg.roles, ([tag, role], i) => ` §a${i + 1}§r §8:§r '${tag}' -> ${role}§r`),
                    ` `,
                ])
            }
        }, {
            sequence: ['group', 'delete', cc.argumentParser.parseAny],
            execute: ([,,id], { log }) => {
                if (!role.group.has(id)) throw new Error(`Role group '${id}' not found`)

                role.group.delete(id)
                log(`Deleted role group '§a${id}§r'.`)
            }
        }, {
            sequence: ['group', 'list'],
            execute: ([], { log }) => {
                log([
                    ` `,
                    `Role group list:`,
                    ...Array.from(role.group.values())
                        .sort( ({position: a}, {position: b}) => b - a )
                        .map(g => ` §8:§r §a${g.id}§r §7(position: §a${g.position}§7, role count: §a${g.roles.length}§7, default role: §r${g.defaultRole ?? '§8<none>'}§7)`),
                    ` `
                ])
            }
        }, {
            sequence: ['config', 'role-divider'],
            execute: ([], { log }) => {
                log([
                    `Role divider: §7"§r${role.config.roleDivider}§7"§r`,
                    `The separator of each role.`
                ])
            }
        }, {
            sequence: ['config', 'role-divider', 'set', cc.argumentParser.parseAny],
            execute: ([,,,v], { log }) => {
                role.config.roleDivider = v
                log(`Role divider has been set to §7"§r${role.config.roleDivider}§7"§r.`)
            }
        }, {
            sequence: ['config', 'message-format'],
            execute: ([], { log }) => {
                log([
                    `Message format: §7"§r${role.config.messageFormat.replace(formatterEscapeRegex, '§d$&§r')}§7"§r`,
                    `The format of a message.`
                ])
            }
        }, {
            sequence: ['config', 'message-format', 'set', cc.argumentParser.parseAny],
            execute: ([,,,v], { log }) => {
                role.config.messageFormat = v
                return log(`Message format has been set to §7"§r${role.config.messageFormat.replace(formatterEscapeRegex, '§d$&§r')}§7"§r.`)
            }
        }, {
            sequence: ['config', 'nickname-format'],
            execute: ([], { log }) => {
                return log([
                    `Nickname format: §7"§r${role.config.nicknameFormat.replace(formatterEscapeRegex, '§d$&§r')}§7"§r`,
                    `The format of a nickname.`
                ])
            }
        }, {
            sequence: ['config', 'nickname-format', 'set', cc.argumentParser.parseAny],
            execute: ([,,,v], { log }) => {
                role.config.nicknameFormat = v
                return log(`Nickname format has been set to §7"§r${role.config.nicknameFormat.replace(formatterEscapeRegex, '§d$&§r')}§7"§r.`)
            }
        }, {
            sequence: ['config', 'nickname-format-enable'],
            execute: ([], { log }) => {
                return log([
                    `Nickname format: ${role.config.nicknameFormatToggle ? '§aEnabled§r' : '§cDisabled§r'}`,
                    `Enables / disables nickname formatting.`
                ])
            }
        }, {
            sequence: ['config', 'nickname-format-enable', 'set', cc.argumentParser.parseBoolean],
            execute: ([,,,v], { log }) => {
                role.config.nicknameFormatToggle = v
                return log(`Nickname format toggle has been ${role.config.nicknameFormatToggle ? '§aenabled§r' : '§cdisabled§r'}.`)
            }
        }, {
            sequence: ['config', 'nickname-format-interval'],
            execute: ([], { log }) => {
                return log([
                    `Nickname format interval: §a${role.config.nicknameFormatInterval}ms§r`,
                    `The interval for the nickname to format (in milliseconds).`
                ])
            }
        }, {
            sequence: ['config', 'nickname-format-interval', 'set', cc.argumentParser.number(true, 200, 15000)],
            execute: ([,,,v], { log }) => {
                role.config.nicknameFormatInterval = v
                return log(`Nickname format interval has been set to §a${role.config.nicknameFormatInterval}ms§r.`)
            }
        }, {
            sequence: ['config'],
            execute: ([], { log }) => {
                log([
                    ` `,
                    `Role config:`,
                    ` §8:§r Role divider §7(role-divider)§r: §7"§r${role.config.roleDivider}§7"§r`,
                    ` §8:§r Message format §7(message-format)§r: §7"§r${role.config.messageFormat.replace(formatterEscapeRegex, '§d$&§r')}§7"§r`,
                    ` §8:§r Nickname format §7(nickname-format)§r: §7"§r${role.config.nicknameFormat.replace(formatterEscapeRegex, '§d$&§r')}§7"§r`,
                    ` §8:§r Nickname format enabled §7(nickname-format-enable)§r: ${role.config.nicknameFormatToggle ? '§aYes§r' : '§cNo§r'}`,
                    ` §8:§r Nickname format interval §7(nickname-format-interval)§r: §a${role.config.nicknameFormatInterval}ms§r`,
                    ` `,
                ])
            }
        }
    )
})
