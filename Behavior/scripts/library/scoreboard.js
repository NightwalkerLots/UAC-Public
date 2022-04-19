import { execCmd } from "./mc.js";
import { empty } from "./util.js";
const auth = Symbol();
const toExecutable = (v) => `"${v.replace(/\\|"/g, '\\$&')}"`;
class players {
    setNameMethod;
    useCache;
    'set';
    add;
    'get';
    has;
    reset;
    dummies;
    constructor(key, obj) {
        if (key !== auth)
            throw new ReferenceError('Class is not constructable');
        let nameMethod = 'special', cacheData = new Map(), useCache = true;
        Object.defineProperty(this, 'dummies', { get: () => obj.dummies });
        const nameMethodConvert = (v) => nameMethod == 'special' ? ('§P' + v.name)
            : v.name;
        const nameToExecutable = (v) => `${toExecutable(nameMethodConvert(v))} ${obj.executableId}`;
        this.setNameMethod = (method) => (nameMethod = method, this);
        this.useCache = (set) => (useCache = set, this);
        this.set = (plr, score) => {
            if (useCache)
                cacheData.set(plr, score);
            execCmd(`scoreboard players set ${nameToExecutable(plr)} ${score}`);
            return this;
        };
        this.add = (plr, score) => {
            if (useCache)
                cacheData.set(plr, (cacheData.get(plr) ?? 0) + score);
            execCmd(`scoreboard players add ${nameToExecutable(plr)} ${score}`);
            return this;
        };
        this.get = (plr) => {
            let o;
            if (useCache)
                o = cacheData.get(plr);
            if (o == undefined) {
                try {
                    o = +execCmd(`scoreboard players test ${nameToExecutable(plr)} * *`).statusMessage.match(/-?\d+/)[0];
                }
                catch { }
                if (o != undefined)
                    cacheData.set(plr, o);
            }
            return o;
        };
        this.has = (plr) => {
            try {
                execCmd(`scoreboard players test ${nameToExecutable(plr)} * *`);
                return true;
            }
            catch {
                return false;
            }
        };
        this.reset = (plr) => {
            if (useCache)
                cacheData.delete(plr);
            try {
                execCmd(`scoreboard players reset ${nameToExecutable(plr)}`);
            }
            catch { }
            return this;
        };
    }
}
class dummies {
    setNameMethod;
    useCache;
    'set';
    add;
    'get';
    has;
    reset;
    players;
    constructor(key, obj) {
        if (key !== auth)
            throw new ReferenceError('Class is not constructable');
        let nameMethod = 'special', cacheData = empty(), useCache = true;
        Object.defineProperty(this, 'players', { get: () => obj.players });
        const nameMethodConvert = (v) => nameMethod == 'special' ? ('§D' + v)
            : v;
        const nameToExecutable = (v) => `${toExecutable(nameMethodConvert(v))} ${obj.executableId}`;
        this.setNameMethod = (method) => (nameMethod = method, this);
        this.useCache = (set) => (useCache = set, this);
        this.set = (dummy, score) => {
            if (useCache)
                cacheData[dummy] = score;
            execCmd(`scoreboard players set ${nameToExecutable(dummy)} ${score}`);
            return this;
        };
        this.add = (dummy, score) => {
            if (useCache)
                cacheData[dummy] = cacheData[dummy] ?? 0 + score;
            execCmd(`scoreboard players add ${nameToExecutable(dummy)} ${score}`);
            return this;
        };
        this.get = (dummy) => {
            let o;
            if (useCache)
                o = cacheData[dummy];
            if (o == undefined) {
                try {
                    o = +execCmd(`scoreboard players test ${nameToExecutable(dummy)} * *`).statusMessage.match(/-?\d+/)[0];
                }
                catch { }
                if (o != undefined)
                    cacheData[dummy] = o;
            }
            return o;
        };
        this.has = (dummy) => {
            try {
                execCmd(`scoreboard players test ${nameToExecutable(dummy)} * *`);
                return true;
            }
            catch {
                return false;
            }
        };
        this.reset = (plr) => {
            if (useCache)
                delete cacheData[plr];
            try {
                execCmd(`scoreboard players reset ${nameToExecutable(plr)}`);
            }
            catch { }
            return this;
        };
    }
}
class objective {
    static create = (id, displayName = id) => new objective(id, displayName, false);
    static edit = (id) => new objective(id, '', true);
    static exist = (id) => {
        id = toExecutable(id);
        try {
            execCmd(`scoreboard objectives add ${id} dummy`);
            execCmd(`scoreboard objectives remove ${id}`);
            return false;
        }
        catch {
            return true;
        }
    };
    static for = (id, displayName = id) => new objective(id, displayName, objective.exist(id));
    static delete = (id) => {
        try {
            execCmd(`scoreboard objectives remove ${id}`);
            return true;
        }
        catch {
            return false;
        }
    };
    id;
    executableId;
    dummies;
    players;
    display;
    constructor(id, displayName = id, edit = false) {
        if (id.length > 16)
            throw new RangeError(`Objective identifier cannot go more than 16 characters`);
        const execId = toExecutable(id);
        const exist = objective.exist(id);
        if (edit) {
            if (!exist)
                throw new ReferenceError(`Objective '${id}' not found`);
        }
        else {
            if (exist)
                throw new ReferenceError(`Objective '${id}' has already been created`);
            if (displayName.length > 16)
                throw new RangeError(`Objective display name cannot go more than 32 characters`);
            const execDisplayName = toExecutable(displayName);
            execCmd(`scoreboard objectives add ${execId} dummy ${execDisplayName}`);
        }
        this.id = id;
        this.executableId = execId;
        this.display = new display(auth, execId);
        this.dummies = new dummies(auth, this);
        this.players = new players(auth, this);
    }
}
class display {
    static 'set' = (target, obj) => {
        const id = typeof obj == 'string' ? toExecutable(obj) : obj.executableId;
        execCmd(`scoreboard objectives setdisplay ${target} ${id}`);
    };
    static clear = (target) => {
        execCmd(`scoreboard objectives setdisplay ${target}`);
    };
    'set';
    clear;
    constructor(key, obj) {
        if (key !== auth)
            throw new ReferenceError('Class is not constructable');
        const id = typeof obj == 'string' ? toExecutable(obj) : obj.executableId;
        this.set = (target) => void execCmd(`scoreboard objectives setdisplay ${target} ${id}`);
        this.clear = (target) => void execCmd(`scoreboard objectives setdisplay ${target}`);
    }
}
export default class scoreboard {
    static objective = objective;
    static objectives = objective;
    static display = display;
    constructor() { throw new ReferenceError(`Class is not constructable`); }
}
