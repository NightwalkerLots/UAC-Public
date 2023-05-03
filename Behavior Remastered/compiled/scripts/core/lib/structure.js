import { asyncExecCmd } from "./mc.js";
import { convertLocationType } from "./misc.js";
export class StructureConstructor {
    asyncSave(name, area, { saveMode = 'memory', includeEntities = true, includeBlocks = true, dimension } = {}) {
        return new Promise(res => {
            asyncExecCmd(`structure save ${JSON.stringify(name)} ${area.from.map(v => Math.floor(v)).join(' ')} ${area.to.map(v => Math.floor(v)).join(' ')} ${includeEntities} ${saveMode} ${includeBlocks}`, dimension)
                .then(() => res(true), () => res(false));
        });
    }
    asyncLoad(name, startPosition, { includeEntities = true, includeBlocks = true, waterlogged = false, rotation = 0, mirror = 'none', integrity = 100, seed, dimension } = {}) {
        return new Promise(res => {
            asyncExecCmd(`structure load ${JSON.stringify(name)} ${convertLocationType('Array', startPosition).map(v => Math.floor(v)).join(' ')} ${rotation}_degrees ${mirror} ${includeEntities} ${includeBlocks} ${waterlogged} ${integrity} ${seed ?? ''}`, dimension)
                .then(() => res(true), () => asyncExecCmd(`structure load ${JSON.stringify(name)} ${convertLocationType('Array', startPosition).map(v => Math.floor(v)).join(' ')} ${rotation}_degrees ${mirror} ${includeEntities} ${includeBlocks} ${integrity} ${seed ?? ''}`, dimension)
                .then(() => res(true), () => res(false)));
        });
    }
    asyncDelete(name) {
        return new Promise(res => {
            asyncExecCmd(`structure delete ${JSON.stringify(name)}`, undefined)
                .then(() => res(true), () => res(false));
        });
    }
}
const structure = new StructureConstructor;
export default structure;
