import { DynamicPropertiesDefinition, Player, PlayerJoinEvent, PlayerLeaveEvent, system, world } from "@minecraft/server";
import server from "./server.js";
import EventEmitter from "./event.js";
import { randomIntBetween } from "./misc.js";
import { SimulatedPlayer } from "@minecraft/server-gametest";
import MapProxy from "./mapproxy.js";
import SetProxy from "./setproxy.js";

export class PlayerConstructor extends EventEmitter<playerEvents> {
    get uidShift() { return ( world.getDynamicProperty('ushift') as number ?? 0 ) + 2 ** 32 }

    parseUid(uid: string) {
        if (/^[~@#*=\/]/.test(uid)) uid = uid.slice(1)
        const num = parseInt(uid, 36) - this.uidShift
        if (isNaN(num)) throw new SyntaxError(`Invalid UID`)
        return num
    }

    stringifyUid(num: number) {
        return (num + this.uidShift).toString(36)
    }

    for(plr: Player) {
        return new PlayerManager(plr)
    }

    createPlayerMap<T>() {
        const destroy = new WeakMap<Player, () => void>()
        const out = new MapProxy<Player, T>({
            set: (m, plr, v) => {
                m.set(plr, v)

                if (destroy.has(plr)) return
                const d = () => out.delete(plr)
                destroy.set(plr, d)
                playerManager.for(plr).addEventListener('destroy', d, { priority: -Infinity })
            },
            delete: (m, plr) => {
                if (!m.has(plr)) return false

                const d = destroy.get(plr)
                if (d) playerManager.for(plr).removeEventListener('destroy', d)
                destroy.delete(plr)

                return m.delete(plr)
            },
            clear: (m) => {
                for (const k of m.keys()) out.delete(k)
            }
        })
        return out
    }

    createPlayerSet() {
        const destroy = new WeakMap<Player, () => void>()
        const out = new SetProxy<Player>({
            add: (m, plr) => {
                m.add(plr)

                if (destroy.has(plr)) return
                const d = () => out.delete(plr)
                destroy.set(plr, d)
                playerManager.for(plr).addEventListener('destroy', d, { priority: -Infinity })
            },
            delete: (m, plr) => {
                if (!m.has(plr)) return false

                const d = destroy.get(plr)
                if (d) playerManager.for(plr).removeEventListener('destroy', d)
                destroy.delete(plr)

                return m.delete(plr)
            },
            clear: (m) => {
                for (const k of m.keys()) out.delete(k)
            }
        })
        return out
    }
}
const playerManager = new PlayerConstructor
export default playerManager

server.addEventListener('initialize', ({propertyRegistry}) => {
    const regWld = new DynamicPropertiesDefinition
    regWld.defineNumber('ushift')
    propertyRegistry.registerWorldDynamicProperties(regWld)

    if (world.getDynamicProperty('ushift') == undefined) world.setDynamicProperty('ushift', randomIntBetween(36 ** 3, 36 ** 4 - 36 ** 3))
}, { priority: 100 })

//// MSAPI & LOCAL PLAYER EVENTS ////

class PlayerManager extends EventEmitter<msapiEvents> {
    constructor(plr: Player) {
        const old = playerObjects.get(plr)
        if (old) return old

        super(`PlayerManager (${plr.name})`)
        this.plr = plr

        // properties
        const o = playerProperties.get(plr) ?? new Set()
        playerProperties.set(plr, o)
        this.properties = o

        // msapi
        const msapiFn = world.events.beforeDataDrivenEntityTriggerEvent.subscribe(({ entity, id }) => {
            if (id !== 'msapi:test' || entity !== plr) return

            world.events.beforeDataDrivenEntityTriggerEvent.unsubscribe(msapiFn)
            this.#msapiSuccess = true
        })
        plr.triggerEvent('msapi:test')

        // destroy
        const uid = plr.uid
        const leaveFn = server.addEventListener('playerLeave', (d) => {
            if (d.playerId !== uid) return

            server.removeEventListener('playerLeave', leaveFn)
            this.emit('destroy', d)
            this.#destroyed = true
            this.listeners = Object.create(null)

            this.addHandler('addEventListener', ev => ev.cancel = true)
        }, { priority: Infinity })
    }

    declare readonly plr: Player
    declare private properties: Set<msapiProperties>

    #msapiSuccess = false
    get maspi() { return this.#msapiSuccess }

    #destroyed = false
    get destroyed() { return this.#destroyed }

    getProperty(prop: msapiProperties) {
        return this.properties.has(prop)
    }
}

const msapiEventList = new Set([
    "blocking",
    "invulnerable_ticks",
    "out_of_control",
    "can_climb",
    "can_damage_nearby_mobs",
    "can_dash",
    "can_fly",
    "can_power_jump",
    "can_swim",
    "can_walk",
    "has_cape",
    "has_collision",
    "has_dash_cooldown",
    "has_gravity",
    "has_owner",
    "has_rider",
    "has_target",
] as const)
type msapiEventList = typeof msapiEventList extends Set<infer R> ? R : never

const msapiEventStateList = new Set([
    "admiring",
    "alive",
    "angry",
    "attached_to_entity",
    "avoiding_block",
    "avoiding_mobs",
    "baby",
    "breathing",
    "bribed",
    "carrying_block",
    "casting",
    "celebrating",
    "celebrating_special",
    "charged",
    "charging",
    "chested",
    "critical",
    "croaking",
    "dancing",
    "delayed_attacking",
    "digging",
    "eating",
    "eating_mob",
    "elder",
    "emerging",
    "emoting",
    "enchanted",
    "fire_immune",
    "first_person",
    "ghost",
    "gliding",
    "grazing",
    "idling",
    "ignited",
    "illager_captain",
    "in_contact_with_water",
    "in_love",
    "in_ui",
    "in_water",
    "in_water_or_rain",
    "interested",
    "invisible",
    "jump_goal_jumping",
    "jumping",
    "laying_down",
    "laying_egg",
    "leashed",
    "levitating",
    "lingering",
    "moving",
    "on_fire",
    "on_ground",
    "on_screen",
    "onfire",
    "orphaned",
    "persona_or_premium_skin",
    "playing_dead",
    "powered",
    "pregnant",
    "ram_attacking",
    "resting",
    "riding",
    "roaring",
    "rolling",
    "saddled",
    "scared",
    "selected_item",
    "shaking",
    "shaking_wetness",
    "sheared",
    "shield_powered",
    "silent",
    "sitting",
    "sleeping",
    "sneaking",
    "sneezing",
    "sniffing",
    "sonic_boom",
    "spectator",
    "sprinting",
    "stackable",
    "stalking",
    "standing",
    "stunned",
    "swimming",
    "tamed",
    "transforming",
    "using_item",
    "wall_climbing",
] as const)
type msapiEventStateList = typeof msapiEventStateList extends Set<infer R> ? R : never

const playerProperties = new WeakMap<Player, Set<msapiProperties>>()
const playerObjects = new WeakMap<Player, PlayerManager>()

system.events.scriptEventReceive.subscribe(({ id, message, sourceEntity: plr }) => {
    if (!(plr instanceof Player)) return

    if (!playerObjects.has(plr)) playerObjects.set(plr, new PlayerManager(plr)) // ensure it exists
    const o = playerObjects.get(plr), p = playerProperties.get(plr)
    if (!o || !p) return // what

    const v = message === '1'
    const nid = id.substring(6) as any

    if (v) { p.add(nid) } else { p.delete(nid) } // set value

    o.emit('change', { property: nid, value: v }) // emit common
    if (msapiEventList.has(nid)) o.emit(nid, v) // emit event (non-state)
    else if ( nid.startsWith('is_') && msapiEventStateList.has(nid.substring(3)) ) o.emit(v ? nid.substring(3) : nid.substring(3) + '_end', v) // emit event (state)
}, { namespaces: ['msapi'] })

//// PROPERTY ////

const { nameTag: { get: plrNtGet, set: plrNtSet }, uid: { get: plrUidGet } } = Object.getOwnPropertyDescriptors(Player.prototype)

Object.defineProperties(Player.prototype, {
    nameTag: {
        'get'() {
            if (!(this instanceof Player)) throw new TypeError(`Getter of 'Player.prototype.nameTag' requires 'this' be a 'Player'`)
            return plrNtGet?.call(this)
        },
        'set'(v: string) {
            if (!(this instanceof Player)) throw new TypeError(`Setter of 'Player.prototype.nameTag' requires 'this' be a 'Player'`)

            const evd: nameTagChangeEvent = {
                plr: this,
                newName: v
            }
            const {cancel} = playerManager.emit('nameTagChange', evd)

            if (!cancel) plrNtSet?.call(this, v)
        }
    },
    uidStr: {
        'get'() {
            if (!(this instanceof Player)) throw new TypeError(`Getter of 'Player.prototype.uidStr' requires 'this' be a 'Player'`)
            return playerManager.stringifyUid(this.uid)
        }
    },
    uid: {
        'get'() {
            if (!(this instanceof Player)) throw new TypeError(`Getter of 'Player.prototype.uid' requires 'this' be a 'Player'`)
            //@ts-expect-error
            return plrUidGet.call(this) % 2 ** 32
        }
    },
    uidRaw: {
        'get'() {
            if (!(this instanceof Player)) throw new TypeError(`Getter of 'Player.prototype.uidRaw' requires 'this' be a 'Player'`)
            //@ts-expect-error
            return plrUidGet.call(this)
        }
    }
})

const { playerId: { get: plrJoinIdGet = () => {} } } = Object.getOwnPropertyDescriptors(PlayerJoinEvent.prototype)

Object.defineProperty(PlayerJoinEvent.prototype, 'playerId', {
    'get'() {
        return +plrJoinIdGet.call(this) % 2 ** 32
    }
})

const { playerId: { get: plrLeaveIdGet = () => {} } } = Object.getOwnPropertyDescriptors(PlayerLeaveEvent.prototype)

Object.defineProperty(PlayerLeaveEvent.prototype, 'playerId', {
    'get'() {
        return +plrLeaveIdGet.call(this) % 2 ** 32
    }
})

//// EVENT ////

export type playerEvents = {
    nameTagChange: nameTagChangeEvent
}

interface nameTagChangeEvent {
    readonly plr: Player
    newName: string
}

type msapiProperties = msapiEventList | `is_${msapiEventStateList}`
type msapiEvents = Record<msapiEventList | msapiEventStateList | `${msapiEventStateList}_end`, boolean>
    & {
        destroy: PlayerLeaveEvent
        change: {
            readonly property: msapiProperties
            readonly value: boolean
        }
    }
