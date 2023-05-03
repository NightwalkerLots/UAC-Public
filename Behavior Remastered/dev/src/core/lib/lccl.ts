import { argumentParser, CCTypedParams } from "./cc.js";
import { renameFn } from "./misc.js";

/** Local command compiler list */
export default class LCCL<Args extends any[] = []> extends Map<string, compileFn<Args>> {
    static createCompiler<Args extends any[] = []>(data: compileFn | CCTypedParams<LCCL, (...args: Args) => any>, name = ''): compileFn<Args> {
        return renameFn(
            typeof data === 'function'
                ? data
                : (args: string[], lccl: LCCL<Args>) => {
                    const { typedArgs, sequenceData: { execute = () => () => {} } = {} } = data.parse(args)
                    return execute(typedArgs, lccl)
                },
            name
        )
    }

    compile(command: string | string[]): ReturnType<compileFn<Args>> {
        const args = Array.isArray(command) ? command : argumentParser.parseArg(command),
            cmd = args.shift() ?? ''

        const compile = this.get(cmd)
        if (!compile) throw new Error(`'${cmd}' is not a local command`)

        return compile(args, this)
    }
}

export type compileFn<Args extends any[] = []> = (args: string[], lccl: LCCL<Args>) => (...args: Args) => any
