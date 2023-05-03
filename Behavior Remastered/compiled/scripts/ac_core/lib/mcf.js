import { testArg } from "../../core/lib/cc.js";
export class ModuleConfigParser {
    constructor(obj, values) {
        this.obj = obj;
        this.values = values;
    }
    obj;
    values;
    execute(k, v, execute = true) {
        const t = this.values[k];
        if (!t)
            throw new Error(`Unknown property '${k}'`);
        let parseErrType = [];
        for (const type of Array.isArray(t.type) ? t.type : [t.type]) {
            const r = testArg(v, type);
            if (r.status === 1) {
                if (execute)
                    this.obj[t.key] = r.value;
                return { key: t.key, type: t.type, value: r.value };
            }
            const s = typeof type == 'string' ? `'${type}'` : type instanceof RegExp ? `${type}` : type.name;
            if (!parseErrType.includes(s))
                parseErrType.push(s);
        }
        throw new Error(`Expecting ${parseErrType.join(' | ')}, got '${v}'`);
    }
    map() {
        const obj = {};
        for (const [k, { key }] of Object.entries(this.values))
            obj[k] = this.obj[key];
        return obj;
    }
}
