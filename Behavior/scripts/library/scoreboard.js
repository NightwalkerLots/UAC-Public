import { world } from "@minecraft/server";
import { asyncExecCmd, overworld } from "./utils/cmd_queue"
///import { scoreTest } from "./utils/score_testing"

class CommandError extends Error {
    code
    command
    constructor(code, message, command) {
        super(message)
        this.code = code
        this.command = command
        this.name = this.constructor.name
        this.message += `\nCode: ${code}  -  Command: ${command}`
        this.stack = this.stack.replace(/.*\n?/, '')
    }
}

function scoreTest(target, objective) {
    try {
        const oB = world.scoreboard.getObjective(objective)
        if (typeof target == 'string') return oB.getScore(oB.getParticipants().find(pT => pT.displayName == target))
        return oB.getScore(target.scoreboard)
    }catch (error) {
        let na = 0;
        console.warn(error, error.stack);
        return na;
    }
}

const execCmd = (command, source = 'overworld') => {
    try {
        return asyncExecCmd(command, (typeof source == 'string' ? world.getDimension(source) : source))
        //return (typeof source == 'string' ? world.getDimension(source) : source).asyncExecCmd(command);
    }
    catch (e) {
        if (e instanceof Error)
            throw e;
        const { statusCode, statusMessage } = JSON.parse(e);
        throw new CommandError(statusCode, statusMessage, command);
    }
};
const empty = (obj) => Object.defineProperties(Object.create(null), Object.getOwnPropertyDescriptors(obj ?? {}));

const auth = Symbol();
const toExecutable = (v) => `"${v.replace(/\\|"/g, '\\$&')}"`;
class players {
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
        let cacheData = new Map(), useCache = true;
        Object.defineProperty(this, 'dummies', { get: () => obj.dummies });
        this.useCache = (set) => (useCache = set, this);
        this.set = (plr, score) => {
            if (useCache)
                cacheData.set(plr, score);
                asyncExecCmd(`scoreboard players set @s ${obj.executableId} ${~~score}`, plr);
            return this;
        };
        this.add = (plr, score) => {
            if (useCache)
                cacheData.set(plr, (cacheData.get(plr) ?? 0) + score);
                asyncExecCmd(`scoreboard players add @s ${obj.executableId} ${~~score}`, plr);
            return this;
        };
        /** @returns {number} */
        this.get = (plr) => {
            let o;
            if (useCache)
                o = cacheData.get(plr);
            if (o == undefined) {
                try {
                    const p = nameToExecutable(dummy).split(" ");
                    const oB = world.scoreboard.getObjective(p[1])
                    o = oB.getScore(oB.getParticipants().find(pT => pT.displayName == p[0]))
                }
                catch { }
                if (o != undefined)
                    cacheData.set(plr, o);
            }
            return o;
        };
        this.has = (plr) => {
            try {
                    //asyncExecCmd(`scoreboard players test ${nameToExecutable(dummy)} * *`);
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
                asyncExecCmd(`scoreboard players reset @s ${obj.executableId}`, plr);
            }
            catch { }
            return this;
        };
    }
}
class dummies {
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
        let cacheData = empty(), useCache = true;
        
        Object.defineProperty(this, 'players', { get: () => obj.players });
        const nameToExecutable = (v) => `${toExecutable(v)} ${obj.executableId}`;
        this.useCache = (set) => (useCache = set, this);
        this.set = (dummy, score) => {
            if (useCache)
                cacheData[dummy] = score;
                asyncExecCmd(`scoreboard players set ${nameToExecutable(dummy)} ${~~score}`);
            return this;
        };
        this.add = (dummy, score) => {
            if (useCache)
                cacheData[dummy] = cacheData[dummy] ?? 0 + score;
                asyncExecCmd(`scoreboard players add ${nameToExecutable(dummy)} ${~~score}`);
            return this;
        };
        /** @returns {number} */
        this.get = (dummy) => {
            let o;
            if (useCache)
                o = cacheData[dummy];
            if (o == undefined) {
                try {
                    const p = nameToExecutable(dummy).split(" ");
                    const oB = world.scoreboard.getObjective(p[1]);
                    o = oB.getScore(oB.getParticipants().find(pT => pT.displayName == p[0]));
                    //o = scoreTest(p[0].toString(),p[1].toString());
                    asyncExecCmd(`say get ${p[0]} ${o}`);
                    //o = +execCmd(`scoreboard players test ${nameToExecutable(dummy)} * *`).statusMessage.match(/-?\d+/)[0];
                }
                catch(error) { console.warn(error, error.stack); }
                if (o != undefined)
                    cacheData[dummy] = o;
            }
            return o;
        };
        this.has = (dummy) => {
            try {
                //asyncExecCmd(`scoreboard players test ${nameToExecutable(dummy)} * *`);
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
                asyncExecCmd(`scoreboard players reset ${nameToExecutable(plr)}`);
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
            //asyncExecCmd(`scoreboard objectives add ${id} dummy`);
            //asyncExecCmd(`scoreboard objectives remove ${id}`);
            return true;
        }
        catch {
            return true;
        }
    };
    static for = (id, displayName = id) => new objective(id, displayName, objective.exist(id));
    static delete = (id) => {
        try {
            //asyncExecCmd(`scoreboard objectives remove ${id}`);
            return true;
        }
        catch {
            return true;
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
            //asyncExecCmd(`scoreboard objectives add ${execId} dummy ${execDisplayName}`);
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
        //asyncExecCmd(`scoreboard objectives setdisplay ${target} ${id}`);
    };
    static clear = (target) => {
        //asyncExecCmd(`scoreboard objectives setdisplay ${target}`);
    };
    'set';
    clear;
    constructor(key, obj) {
        if (key !== auth)
            throw new ReferenceError('Class is not constructable');
        const id = typeof obj == 'string' ? toExecutable(obj) : obj.executableId;
        this.set = (target) => void asyncExecCmd(`scoreboard objectives setdisplay ${target} ${id}`);
        this.clear = (target) => void asyncExecCmd(`scoreboard objectives setdisplay ${target}`);
    }
}
export default class scoreboard {
    static objective = objective;
    static objectives = objective;
    static display = display;
    constructor() { throw new ReferenceError(`Class is not constructable`); }
}