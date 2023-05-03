import { DynamicPropertiesDefinition, Entity, EntityType, EntityTypes, Player, PropertyRegistry, World, world } from "@minecraft/server";
import { SimulatedPlayer } from "@minecraft/server-gametest";
import { getStackTrace } from "../lib/misc.js";

export class dpropConstructor {
    get entity() { return entRegList }
    getEntity(entity: string | EntityType) { return entRegList[typeof entity === 'string' ? entity : entity.id] }

    get world() { return worldReg }
}
const dprop = new dpropConstructor
export default dprop

//// DYNAMIC PROPERTIES DEFINITION ////

const extraSizes = {
    string: 2,
    number: 5,
    boolean: 2
} as const

const definitionList = new WeakMap<DynamicPropertiesDefinition, definitionData>()

const { defineString: dpdStr, defineBoolean: dpdBool, defineNumber: dpdNum } = DynamicPropertiesDefinition.prototype

DynamicPropertiesDefinition.prototype.defineString = function (id, ml) {
    if (!( this instanceof DynamicPropertiesDefinition )) throw new TypeError

    dpdStr.call(this, id, ml)

    const obj = definitionList.get(this) ?? {
        definitions: Object.create(null),
        size: 0
    }

    obj.definitions[id] = { type: 'string', maxSize: ml }
    obj.size += id.length + ml + extraSizes.string

    definitionList.set(this, obj)
}

DynamicPropertiesDefinition.prototype.defineNumber = function (id) {
    if (!( this instanceof DynamicPropertiesDefinition )) throw new TypeError

    dpdNum.call(this, id)

    const obj = definitionList.get(this) ?? {
        definitions: Object.create(null),
        size: 0
    }

    obj.definitions[id] = { type: 'number' }
    obj.size += id.length + extraSizes.number

    definitionList.set(this, obj)
}

DynamicPropertiesDefinition.prototype.defineBoolean = function (id) {
    if (!( this instanceof DynamicPropertiesDefinition )) throw new TypeError

    dpdBool.call(this, id)

    const obj = definitionList.get(this) ?? {
        definitions: Object.create(null),
        size: 0
    }

    obj.definitions[id] = { type: 'boolean' }
    obj.size += id.length + extraSizes.boolean

    definitionList.set(this, obj)
}

type definitionData = {
    definitions: Record<string, definitionType>
    size: number
}
type definitionType = {
    type: 'string'
    maxSize: number
} | {
    type: 'number'
} | {
    type: 'boolean'
}

//// REGISTRY ////

const entRegList = Object.create(null) as Record<string, definitionData>
const worldReg: definitionData = {
    definitions: Object.create(null),
    size: 0
}

const { registerEntityTypeDynamicProperties: regEnt, registerWorldDynamicProperties: regWld } = PropertyRegistry.prototype

PropertyRegistry.prototype.registerEntityTypeDynamicProperties = function(def, type) {
    if (!(this instanceof PropertyRegistry)) throw new TypeError

    regEnt.call(this, def, type)

    const defData = definitionList.get(def)
    if (!defData) {
        console.warn(`track failed (type: entity, entid: ${type.id}) \n${getStackTrace(1)}`)
        return
    }

    const regDat = entRegList[type.id] || {
        definitions: Object.create(null),
        size: 0
    }

    regDat.size += defData.size
    Object.assign(regDat.definitions, defData.definitions)

    entRegList[type.id] = regDat
}

PropertyRegistry.prototype.registerWorldDynamicProperties = function(def) {
    if (!(this instanceof PropertyRegistry)) throw new TypeError

    regWld.call(this, def)

    const defData = definitionList.get(def)
    if (!defData) {
        console.warn(`track failed (type: world) \n${getStackTrace(1)}`)
        return
    }

    worldReg.size += defData.size
    Object.assign(worldReg.definitions, defData.definitions)
}

//// GET DYNAMIC PROPERTIES ////

function getDynamicPropertiesOf(target: Entity | Player | SimulatedPlayer) {
    const obj = Object.create(null)

    const type = EntityTypes.get(target.id),
        regData = entRegList[type.id]
    if (!regData) return obj

    for (const k in regData.definitions) Object.defineProperty(obj, k, { get() { return target.getDynamicProperty(k) } })
    return obj
}

Object.defineProperty(Entity.prototype, 'getDynamicProperties', {
    configurable: true,
    value() { return getDynamicPropertiesOf(this) }
})
Object.defineProperty(Player.prototype, 'getDynamicProperties', {
    configurable: true,
    value() { return getDynamicPropertiesOf(this) }
})
Object.defineProperty(SimulatedPlayer.prototype, 'getDynamicProperties', {
    configurable: true,
    value() { return getDynamicPropertiesOf(this) }
})

Object.defineProperty(World.prototype, 'getDynamicProperties', {
    configurable: true,
    value() {
        const obj = Object.create(null)
        for (const k in worldReg.definitions)
            Object.defineProperty(obj, k, { get() { return world.getDynamicProperty(k) } })
        return obj
    }
})
