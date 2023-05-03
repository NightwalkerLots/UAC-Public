import { BlockAreaSize, DynamicPropertiesDefinition, EntityTypes, MinecraftBlockTypes, world } from "@minecraft/server";
import Area from "./area.js";
import EventEmitter from "./event.js";
import loader from "./loader.js";
import { overworld } from "./mc.js";
import { clamp, offset, Vec3 } from "./misc.js";
import EntityLock from "./entlock.js";
import server from "./server.js";
import structure from "./structure.js";
import tempArea from "./temparea.js";
import MapProxy from "./mapproxy.js";
import PromiseController from "./promisectrl.js";
export default class Storage extends EventEmitter {
    static get manifestLock() { return lockManifest; }
    static get dataLock() { return lockData; }
    constructor(id, name, autoload = true, autosaveInterval = 30000) {
        const old = storageList.get(id);
        if (old)
            return old;
        super(`Storage (${name})`);
        this.id = id;
        this.autoload = autoload;
        storageList.set(id, this);
        Promise.all([server.initialize, server.waitFor(2)]).then(async () => {
            if (this.autoload) {
                const retries = 3;
                let success = false;
                for (let i = 1; i <= retries; i++) {
                    try {
                        await this.load();
                        success = true;
                        break;
                    }
                    catch (e) {
                        console.error(`${this.name} [Autoload] failed (${i}/${retries}): ${e instanceof Error ? `${e}\n${e.stack}` : e}`);
                        await server.waitFor(60);
                    }
                }
                if (!success) {
                    console.error(`${this.name} [Autoload] Autoload failed`);
                    return;
                }
            }
            this.autosaveInterval = autosaveInterval;
        });
    }
    id = '';
    autoload = true;
    #autosave = new server.interval(() => this.save().catch(e => console.error(`${this.name} [Autosave]: ${e instanceof Error ? `${e}\n${e.stack}` : e}`)), Infinity);
    get autosaveInterval() { return this.#autosave.interval; }
    set autosaveInterval(v) {
        this.#autosave.interval = v === 0 ? Infinity : clamp(v, 3000, 120000);
        this.#autosave.nextExecTime = Date.now() + this.#autosave.interval;
    }
    get ioActive() { return ioActiveList.has(this.id); }
    async write(data, chunkSize = 16383) {
        const [slot, { center: [x, z] }] = await Promise.all([lock(this.id), centerPos, loaded]);
        try {
            const loc = Vec3(offset([x, slot, z], [0.5, 0.5, 0.5]));
            let i = 0;
            for (let m = data.length / chunkSize; i < m; i++) {
                const entData = lockData.spawn(overworld, loc);
                entData.nameTag = data.substr(i * chunkSize, chunkSize);
                entData.setDynamicProperty('id', this.id);
                entData.setDynamicProperty('index', i);
                await 0;
            }
            const entManifest = lockManifest.spawn(overworld, loc);
            entManifest.setDynamicProperty('id', this.id);
            entManifest.setDynamicProperty('size', i);
            await structure.asyncSave(this.id, new Area([x, slot, z], [x, slot, z]), { saveMode: 'disk', includeEntities: true });
            unlock(this.id, slot);
        }
        catch (e) {
            unlock(this.id, slot);
            throw e;
        }
    }
    async read(maxDelay = 10000) {
        const [slot, { center: [x, z] }] = await Promise.all([lock(this.id), centerPos, loaded]);
        try {
            const loc = Vec3([x, slot, z]);
            let manifestLoaded = false;
            let dataLoadRemaining = 0;
            let chunkList = [];
            const ctrl = new PromiseController();
            ctrl.promise.finally(() => unlock(this.id, slot));
            lockManifest.addEventListener('spawn', ent => {
                const id = ent.getDynamicProperty('id');
                if (id !== this.id)
                    return;
                manifestLoaded = true;
                dataLoadRemaining += ent.getDynamicProperty('size');
                lockManifest.kill(ent);
                if (dataLoadRemaining === 0)
                    ctrl.resolve(chunkList);
            }, { abort: ctrl.promise });
            lockData.addEventListener('spawn', ent => {
                const id = ent.getDynamicProperty('id');
                if (id !== this.id)
                    return;
                chunkList[ent.getDynamicProperty('index')] = ent.nameTag;
                lockData.kill(ent);
                dataLoadRemaining--;
                if (manifestLoaded && dataLoadRemaining === 0)
                    ctrl.resolve(chunkList);
            }, { abort: ctrl.promise });
            if (!await structure.asyncLoad(this.id, loc))
                ctrl.resolve(undefined);
            new server.timeout(delay => ctrl.reject(new RangeError(`Timeout reached (${delay}ms)`)), maxDelay);
            if (await ctrl.promise === undefined)
                return;
            let dataStr = '';
            for (const [i, chunk] of chunkList.entries()) {
                dataStr += chunk;
                if (i % 10)
                    await 0;
            }
            //unlock(this.id, slot)
            return dataStr;
        }
        catch (e) {
            //unlock(this.id, slot)
            throw e;
        }
    }
    async save() {
        const dataObj = Object.create(null);
        this.emit('save', { data: dataObj });
        await this.write(JSON.stringify(dataObj));
    }
    async load() {
        const dataStr = await this.read();
        if (dataStr === undefined)
            return;
        this.emit('load', { data: JSON.parse(dataStr) });
    }
    async 'delete'() {
        if (this.emit('delete', undefined).cancel)
            return false;
        return await structure.asyncDelete(this.id);
    }
}
const storageList = new Map();
Storage.cachedList = new MapProxy({
    set: () => { throw new Error('Map is read-only'); },
    delete: () => { throw new Error('Map is read-only'); },
    clear: () => { throw new Error('Map is read-only'); },
}, storageList);
const centerPos = tempArea.request('uacx:storage');
const loaded = Promise.all([centerPos, server.initialize]).then(async ([{ center: [x, z] }]) => {
    if (world.getDynamicProperty('uacx:sload'))
        return;
    await loader.spawn(Vec3([x, 1023, z]));
    while (true) {
        try {
            for (let i = -64; i < 320; i++)
                overworld.getBlock(Vec3([x, i, z])).setType(MinecraftBlockTypes.air);
            break;
        }
        catch { }
        await server.nextTick;
    }
    world.setDynamicProperty('uacx:sload', true);
});
//// DATA & MANIFEST ////
const lockManifest = new EntityLock('uacx:storage_manifest');
const lockData = new EntityLock('uacx:storage_data');
server.addEventListener('initialize', ({ propertyRegistry }) => {
    const regDat = new DynamicPropertiesDefinition;
    regDat.defineString('id', 32);
    regDat.defineNumber('index');
    propertyRegistry.registerEntityTypeDynamicProperties(regDat, EntityTypes.get(lockData.id));
    const regManifest = new DynamicPropertiesDefinition;
    regManifest.defineString('id', 32);
    regManifest.defineNumber('size');
    propertyRegistry.registerEntityTypeDynamicProperties(regManifest, EntityTypes.get(lockManifest.id));
    const regWld = new DynamicPropertiesDefinition;
    regWld.defineBoolean('uacx:sload');
    propertyRegistry.registerWorldDynamicProperties(regWld);
}, { priority: Infinity });
//// IO & FREE SLOT ////
const ioActiveList = new Set();
const freeSlotList = new Set(Array.from(Array(384), (v, i) => i - 64));
async function lock(id) {
    if (ioActiveList.has(id))
        throw new TypeError(`Storage '${id}' is currently busy`);
    ioActiveList.add(id);
    let slot;
    while (([slot] = freeSlotList, typeof slot !== 'number'))
        await server.nextTick;
    freeSlotList.delete(slot);
    await clean(slot);
    return slot;
}
async function unlock(id, slot) {
    if (!ioActiveList.has(id))
        return;
    ioActiveList.delete(id);
    freeSlotList.add(slot);
    await clean(slot);
}
async function clean(slot) {
    const { center: [x, z] } = await centerPos;
    for (const ent of overworld.getEntities({ location: Vec3([x, slot, z]), volume: new BlockAreaSize(0, 0, 0) }))
        ent.id === lockData.id ? lockData.kill(ent)
            : ent.id === lockManifest.id ? lockManifest.kill(ent)
                : ent.kill();
}
