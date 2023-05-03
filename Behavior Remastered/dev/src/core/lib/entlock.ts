import { DynamicPropertiesDefinition, Entity, EntityTypes, Vector3, world } from "@minecraft/server"
import EventEmitter from "./event.js"
import { overworld } from "./mc.js"
import server from "./server.js"

export default class EntityLock extends EventEmitter<entityLockEvents> {
    constructor(id: string, killId = 'uacx:kill') {
        if (server.initialized) throw new TypeError(`EntityLock instance must be created before world is initialized`)
        super()

        this.id = id
        this.killId = killId

        server.addEventListener('initialize', ({propertyRegistry}) => {
            if (!this.#spawnables) return

            const reg = new DynamicPropertiesDefinition
            reg.defineBoolean('lock')
            propertyRegistry.registerEntityTypeDynamicProperties(reg, EntityTypes.get(id))
            
            world.events.entitySpawn.subscribe(({entity}) => {
                if (entity.id !== this.id) return
                if (!(this.#spawnOpen || entity.getDynamicProperty('lock'))) return void this.kill(entity)
                
                this.#spawnOpen = false
                entity.setDynamicProperty('lock', true)
                this.emit('spawn', entity)
                return
            })

            for (const ent of overworld.getEntities({ type: this.id })) {
                if (this.#spawnables.has(ent)) this.#spawnables.delete(ent)
                else if (!ent.getDynamicProperty('lock')) this.kill(ent)
            }

            this.#spawnables = undefined
            this.#spawnOpen = false
        }, { priority: 100 })

        world.events.beforeDataDrivenEntityTriggerEvent.subscribe(evd => {
            const { entity, id } = evd
            if (id == killId && entity.id === this.id && !this.#killables.has(entity)) return void (evd.cancel = true)
            this.emit('kill', entity)
            return
        })
    }

    #killables = new WeakSet<Entity>()
    #spawnables: WeakSet<Entity> | undefined = new WeakSet()
    #spawnOpen = false

    readonly id: string
    readonly killId: string

    spawn(dim = overworld, spawnLoc: Vector3) {
        this.#spawnOpen = true
        try {
            const ent = dim.spawnEntity(this.id, spawnLoc)
            this.#spawnables?.add(ent)
            return ent
        } catch (e) {
            this.#spawnOpen = false
            throw e
        }
    }

    kill(ent: Entity) {
        if (ent.id !== this.id) return
        this.#killables.add(ent)
        ent.triggerEvent(this.killId)
    }
}

export type entityLockEvents = {
    spawn: Entity
    kill: Entity
}
