export class TypeConstructor {
    get value() { return ValueType }
    get object() { return ObjectType }
    get array() { return ArrayType }
    get tupleArray() { return TupleArrayType }
}
const type = new TypeConstructor()
export default type

export abstract class TypeObjectsClass {}

export class ValueType extends TypeObjectsClass {
    constructor(type: valueTypes | valueTypes[], name = '<unnamed>') {
        super()
        this.name = name

        const config = this.type

        for (const t of Array.isArray(type) ? type : [type]) {
            if (t instanceof TypeObjectsClass) config.typeObjects.add(t)
            else if (t instanceof Function || t === undefined) config.acceptedTypes[t == String ? 'string' : t == Number ? 'number' : t == Boolean ? 'boolean' : 'undefined'] = null
            else if (t === null) config.allowNull = true
            else {
                const vt = typeof t
                //@ts-expect-error
                vt in config.specificTypes && (config.specificTypes[vt][t] = null)
            }
        }
    }

    name: string

    type: {
        acceptedTypes: { [K in 'string' | 'number' | 'boolean' | 'undefined']?: null }
        specificTypes: { [K in 'string' | 'number' | 'boolean']: Record<string, null> }
        allowNull: boolean
        typeObjects: Set<typeObjects>
    } = {
        acceptedTypes: Object.create(null),
        allowNull: false,
        specificTypes: {
            string: Object.create(null),
            number: Object.create(null),
            boolean: Object.create(null),
        },
        typeObjects: new Set
    }

    test(obj: any): boolean {
        const config = this.type
        const vt = typeof obj

        return vt == 'object' || vt == 'function'
            ? obj === null
                ? config.allowNull
                : Array.from(config.typeObjects).some(t => t.test(obj))
            : vt in config.acceptedTypes
            || vt in config.specificTypes
                //@ts-expect-error
                && obj in config.specificTypes[vt]
    }
}

export class ObjectType extends TypeObjectsClass {
    constructor(type: Record<string, typeObjects | typeObjects[]>, indexType?: typeObjects, name = '<unnamed>') {
        super()
        this.name = name

        Object.assign(this.type, type)
        if (indexType !== undefined) this.indexType = indexType
    }

    name: string

    type: Record<string, typeObjects | typeObjects[]> = Object.create(null)
    indexType: typeObjects | undefined

    test(obj: any): boolean {
        const vt = typeof obj
        if (vt != 'object' && vt != 'function' || obj === null) return false

        const keys = new Set(Object.keys(obj))

        for (const k in this.type) {
            const v = this.type[k]
            keys.delete(k)

            for (const t of v ? v instanceof Array ? v : [v] : [])
                if (!t.test(obj[k])) return false
        }

        if (keys.size > 0) {
            if (this.indexType) {
                for (const k of keys)
                    if (!this.indexType.test(obj[k])) return false
            }
            else return false
        }

        return true
    }
}

export class ArrayType extends TypeObjectsClass {
    constructor(type: valueTypes | valueTypes[], name = '<unnamed>') {
        super()
        this.name = name

        this.#type = type instanceof TypeObjectsClass ? type : new ValueType(type)
    }

    name: string

    #type: typeObjects
    get type(): typeObjects { return this.#type }
    set type(v: valueTypes | valueTypes[]) { this.#type = v instanceof TypeObjectsClass ? v : new ValueType(v) }

    test(arr: any): boolean { return Array.isArray(arr) && arr.every(v => this.#type.test(v)) }
}

export class TupleArrayType extends TypeObjectsClass {
    constructor(type: valueTypes[] | valueTypes[][], minLength = type.length, name = '<unnamed>') {
        super()
        this.name = name

        this.type = type.map(v => v instanceof TypeObjectsClass ? v : new ValueType(v))
        this.minLength = minLength
    }

    name: string

    type: typeObjects[]
    minLength: number

    test(arr: any): boolean {
        return Array.isArray(arr)
            && arr.length >= this.minLength
            && arr.length <= this.type.length
            && this.type.every((t, i) => !(i in arr) && i + 1 >= this.minLength ? true : t.test(arr[i]) )
    }
}

export type primitiveValueTypes = typeof String | string | typeof Number | number | typeof Boolean | boolean | null | undefined
export type typeObjects = ValueType | ObjectType | ArrayType | TupleArrayType
export type valueTypes = primitiveValueTypes | typeObjects
