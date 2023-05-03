import { argumentParser } from "./cc.js";
import { renameFn } from "./misc.js";
/** Local command compiler list */
export default class LCCL extends Map {
    static createCompiler(data, name = '') {
        return renameFn(typeof data === 'function'
            ? data
            : (args, lccl) => {
                const { typedArgs, sequenceData: { execute = () => () => { } } = {} } = data.parse(args);
                return execute(typedArgs, lccl);
            }, name);
    }
    compile(command) {
        const args = Array.isArray(command) ? command : argumentParser.parseArg(command), cmd = args.shift() ?? '';
        const compile = this.get(cmd);
        if (!compile)
            throw new Error(`'${cmd}' is not a local command`);
        return compile(args, this);
    }
}
