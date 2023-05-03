import { Player, world } from "@minecraft/server"
import EventEmitter from "./event.js"
import LCCL from "./lccl.js"
import { clamp, getScore, mapToObject } from "./misc.js"
import { createFormatter } from "./misc2.js"
import sdefault from "./sdefault.js"
import server, { HighInterval } from "./server.js"

class RoleConstructor extends EventEmitter<roleEvents> {
    get group() { return roleGroup }
    get config() { return roleConfig }

    formatNickname(plr: Player) {
        const evd: roleEvents['nicknameFormat'] = {
            player: plr,
            name: plr.name,
            roles: roleGroup.getRoles(plr.getTags()),
            format: nicknameFormat.format.toString()
        }

        this.emit('nicknameFormat', evd)

        return ( nicknameFormat.format.toString() !== evd.format ? createFormatter(evd.format, nicknameFormat.lccl) : nicknameFormat.format )(evd).trim()
    }

    formatMessage(plr: Player, message: string) {
        const evd: roleEvents['messageFormat'] = {
            player: plr,
            name: plr.name,
            message,
            roles: roleGroup.getRoles(plr.getTags()),
            format: messageFormat.format.toString()
        }

        this.emit('messageFormat', evd)

        return ( messageFormat.format.toString() !== evd.format ? createFormatter(evd.format, messageFormat.lccl) : messageFormat.format )(evd).trim()
    }
}
const role = new RoleConstructor('UAC:role')
export default role

//// CONFIG ////

const nicknameFormat: formatObject['nickname'] = {
    lccl: new LCCL([
        ['name', () => o => o.name],
        ['role', () => o => o.roles.join(roleConfig.roleDivider)],
        ['level', () => o => o.player.level],
        ['score', ([obj]) => {
            if (!obj) throw new Error('[Score] Objective not specified')
            return o => getScore(o.player, obj) ?? 0
        }],
    ]),
    format: () => '',

    toggle: true,
    interval: new HighInterval(() => {
        if (!nicknameFormat.toggle) return
        for (const plr of world.getPlayers())
            plr.nameTag = role.formatNickname(plr)
    }, 15000),
}
nicknameFormat.format = createFormatter('!<role>! !<name>!', nicknameFormat.lccl)

server.addEventListener('playerLoad', plr => {
    if (!nicknameFormat.toggle) return
    plr.nameTag = role.formatNickname(plr)
})

const messageFormat: formatObject['message'] = {
    lccl: new LCCL([
        ['name', () => o => o.name],
        ['level', () => o => o.player.level],
        ['role', () => o => o.roles.join(roleConfig.roleDivider)],
        ['score', ([obj]) => {
            if (!obj) throw new Error('[Score] Objective not specified')
            return o => getScore(o.player, obj) ?? 0
        }],
        ['message', () => o => o.message],
    ]),
    format: () => '',
}
messageFormat.format = createFormatter('!<role>! !<name>!: !<message>!', messageFormat.lccl)

type formatObject = {
    nickname: {
        format: (t: roleEvents['nicknameFormat']) => string
        lccl: LCCL<[roleEvents['nicknameFormat']]>

        toggle: boolean
        interval: HighInterval
    }
    message: {
        format: (t: roleEvents['messageFormat']) => string
        lccl: LCCL<[roleEvents['messageFormat']]>
    }
}

export const roleConfig = {
    get messageFormat() { return messageFormat.format.toString() },
    set messageFormat(v) { messageFormat.format = createFormatter(v, messageFormat.lccl) },

    get nicknameFormat() { return nicknameFormat.format.toString() },
    set nicknameFormat(v) { nicknameFormat.format = createFormatter(v, nicknameFormat.lccl) },
    get nicknameFormatInterval() { return nicknameFormat.interval.interval },
    set nicknameFormatInterval(v) { nicknameFormat.interval.interval = clamp(v, 200, 15000) },
    get nicknameFormatToggle() { return nicknameFormat.toggle },
    set nicknameFormatToggle(v) {
        if (v === nicknameFormat.toggle) return
        nicknameFormat.toggle = v

        for (const plr of world.getPlayers())
            plr.nameTag = v ? role.formatNickname(plr) : plr.name
    },

    roleDivider: ' '
}
Object.setPrototypeOf(roleConfig, null)

//// GROUP ////

let listSorted = true

export class RoleGroupConstructor extends Map<string, RoleGroup> {
    create(...args: ConstructorParameters<typeof RoleGroup>) { return new RoleGroup(...args) }

    createFromJSON({id, position, defaultRol3: defaultRole, roles}: roleGroupJSON) {
        return new RoleGroup(id, position, defaultRole, roles)
    }

    getRoles(data: string[] | Record<string, null>) {
        data = data instanceof Array ? mapToObject(data) : data

        if (!listSorted) {
            const nl = Array.from(this).sort( ([, { position: a }], [, { position: b }]) => b - a)
            this.clear()
            for (const [k, v] of nl) this.set(k, v)
            
            listSorted = true
        }

        return Array.from(this.values(), group => group.getRole(data)).filter(v => v !== undefined) as string[]
    }
}
export const roleGroup = new RoleGroupConstructor

export class RoleGroup {
    constructor(id: string, priority = 0, defaultRole?: string, roles: [tag: string, role: string][] = [], addtoList = true) {
        this.id = id
        this.position = priority
        this.defaultRole = defaultRole

        for (const [tag, role] of roles) this.roles.addBack(tag, role)

        if (addtoList) {
            roleGroup.set(id, this)
            listSorted = false
        }
    }
    readonly id: string
    position: number
    defaultRole?: string
    get isListed() { return roleGroup.get(this.id) === this }

    roles = new RoleGroupRoles

    getRole(data: string[] | Record<string, null>) {
        data = data instanceof Array ? mapToObject(data) : data

        for (const [tag, role] of this.roles) if (tag in data) return role
        return this.defaultRole || undefined
    }

    toJSON() {
        const { id, position, defaultRole, roles } = this
        return { id, position, defaultRole, roles }
    }
}

export class RoleGroupRoles extends Array<[tag: string, role: string]> {
    add(tag: string, role: string) {
        this.unshift([tag, role])
        return this
    }
    addBack(tag: string, role: string) {
        this.push([tag, role])
        return this
    }
    addAt(index: number, tag: string, role: string) {
        this.splice(~~Math.max(index, 0), 0, [tag, role])
        return this
    }

    remove() {
        return this.shift()
    }
    removeBack() {
        return this.pop()
    }
    removeAt(index: number) {
        return this.splice(~~Math.max(index, 0), 1)[0]
    }
}

export type roleGroupJSON = {
    id: string
    position: number
    defaultRol3?: string
    roles: [string, string][]
}

//// EVENTS ////

export type roleEventsBase = {
    readonly player: Player
    format: string
    name: string
    roles: string[]
}

export type roleEvents = {
    nicknameFormat: roleEventsBase
    messageFormat: roleEventsBase & {
        message: string
    }
}

sdefault.addEventListener('save', ({data}) => {
    data.role = Array.from(roleGroup.values(), g => g.toJSON())
    data.roleConfig = {...roleConfig}
})

sdefault.addEventListener('load', ({data}) => {
    if (!data.role) return

    roleGroup.clear()
    for (const gJSON of data.role) roleGroup.createFromJSON(gJSON)
})

sdefault.addEventListener('load', ({data}) => {
    if (!data.roleConfig) return
    Object.assign(roleConfig, data.roleConfig)
})
