import { ObjectiveSortOrder, ScoreboardIdentityType, ScoreboardObjective as MCSO, world } from "@minecraft/server";
const overworld = world.getDimension('overworld');
export default class scoreboard {
    static get objective() { return ScoreboardObjective; }
    static get display() { return ScoreboardDisplay; }
    static get dummiesObject() { return scoreboardDummiesObject; }
    constructor() { throw new TypeError(`Class '${this.constructor.name}' is not constructable`); }
}


export class scoreboardDummiesObject {
    static create(sb, prefix = '') {
        const { dummies } = typeof sb == 'string' ? ScoreboardObjective.for(sb) : sb instanceof MCSO ? new ScoreboardObjective(PRIVATE, sb) : sb;
        const obj = Object.create(null);
        for (const [key, value] of dummies)
            obj[key.slice(prefix.length)] = value;
        return new Proxy(obj, {
            set: (t, p, v) => {
                if (typeof p == 'symbol')
                    return true;
                t[p] = v;
                dummies.set(prefix + p, v);
                return true;
            },
            deleteProperty: (t, p) => {
                if (typeof p == 'symbol')
                    return true;
                delete t[p];
                dummies.reset(prefix + p);
                return true;
            }
        });
    }
    static async asyncCreate(sb, dataPerTick = 100, prefix = '') {
        const { dummies } = typeof sb == 'string' ? ScoreboardObjective.for(sb) : sb instanceof MCSO ? new ScoreboardObjective(PRIVATE, sb) : sb;
        const obj = Object.create(null);
        let i = 0;
        for (const [key, value] of dummies) {
            if (++i % dataPerTick == 0)
                await null;
            obj[key.slice(prefix.length)] = value;
        }
        return new Proxy(obj, {
            set: (t, p, v) => {
                if (typeof p == 'symbol')
                    return true;
                t[p] = v;
                dummies.set(prefix + p, v);
                return true;
            },
            deleteProperty: (t, p) => {
                if (typeof p == 'symbol')
                    return true;
                delete t[p];
                dummies.reset(prefix + p);
                return true;
            }
        });
    }
    static directCreate(sb, prefix = '') {
        const { dummies } = typeof sb == 'string' ? ScoreboardObjective.for(sb) : sb instanceof MCSO ? new ScoreboardObjective(PRIVATE, sb) : sb;
        return new Proxy(Object.create(null), {
            get: (t, p) => {
                if (typeof p == 'symbol')
                    return undefined;
                return dummies.get(prefix + p);
            },
            set: (t, p, v) => {
                if (typeof p == 'symbol')
                    return true;
                dummies.set(prefix + p, v);
                return true;
            },
            deleteProperty: (t, p) => {
                if (typeof p == 'symbol')
                    return true;
                dummies.reset(prefix + p);
                return true;
            }
        });
    }
}
export class ScoreboardObjective {
    static create(id, displayName = id) {
        const obj = world.scoreboard.addObjective(id, displayName);
        return new this(PRIVATE, obj);
    }
    static 'get'(id) {
        const obj = world.scoreboard.getObjective(id);
        return obj ? new this(PRIVATE, obj) : undefined;
    }
    static 'for'(id, displayName = id) { return this.get(id) ?? this.create(id, displayName); }
    static exist(id) { return Boolean(world.scoreboard.getObjective(id)); }
    static 'delete'(id) { world.scoreboard.removeObjective(id); }
    static *getList() {
        for (const obj of world.scoreboard.getObjectives())
            yield new this(PRIVATE, obj);
    }
    static *[Symbol.iterator]() { yield* this.getList(); }
    constructor(KEY, obj) {
        if (KEY !== PRIVATE)
            throw new TypeError(`Class '${this.constructor.name}' is not directly constructable`);
        this.id = obj.id;
        this.execId = JSON.stringify(obj.id);
        this.displayName = obj.displayName;
        this.data = obj;
        this.dummies = new ScoreboardDummies(PRIVATE, this);
        this.players = new ScoreboardPlayers(PRIVATE, this);
        this.display = new ScoreboardDisplay(PRIVATE, this);
    }
    id;
    execId;
    displayName;
    data;
    dummies;
    players;
    display;
}
export class ScoreboardDummies {
    constructor(KEY, obj) {
        if (KEY !== PRIVATE)
            throw new TypeError(`Class '${this.constructor.name}' is not directly constructable`);
        this.#obj = obj.data;
        this.#execId = obj.execId;
    }
    #obj;
    #execId;
    #tempSet = new Map();
    'set'(name, score) {
        score = ~~score;
        this.#tempSet.set(name, score);
        return overworld.runCommandAsync(`scoreboard players set ${JSON.stringify(name)} ${this.#execId} ${score}`)
            .finally(() => this.#tempSet.delete(name))
            .then(() => true, () => false);
    }
    'get'(name) {
        return this.#tempSet.get(name) ?? this.#obj.getScores().find(({ participant: { type, displayName } }) => type == ScoreboardIdentityType.fakePlayer && displayName == name)?.score;
    }
    exist(name) {
        return overworld.runCommandAsync(`scoreboard players test ${JSON.stringify(name)} ${this.#execId} * *`)
            .then(() => true, () => false);
    }
    reset(name) {
        this.#tempSet.set(name, undefined);
        return overworld.runCommandAsync(`scoreboard players reset ${JSON.stringify(name)} ${this.#execId}`)
            .finally(() => this.#tempSet.delete(name))
            .then(() => true, () => false);
    }
    *getScores() {
        for (const { score, participant } of this.#obj.getScores())
            if (participant.type === ScoreboardIdentityType.fakePlayer)
                yield [JSON.parse(`"${participant.displayName}"`), score, participant.id];
    }
    *[Symbol.iterator]() { yield* this.getScores(); }
}
export class ScoreboardPlayers {
    constructor(KEY, obj) {
        if (KEY !== PRIVATE)
            throw new TypeError(`Class '${this.constructor.name}' is not directly constructable`);
        this.#obj = obj.data;
        this.#execId = obj.execId;
    }
    #obj;
    #execId;
    #tempSet = new Map();
    'set'(plr, score) {
        score = ~~score;
        this.#tempSet.set(plr, score);
        return plr.runCommandAsync(`scoreboard players set @s ${this.#execId} ${score}`)
            .finally(() => this.#tempSet.delete(plr))
            .then(() => true, () => false);
    }
    'get'(plr) {
        try {
            return this.#tempSet.get(plr) ?? (plr.scoreboard ? this.#obj.getScore(plr.scoreboard) : undefined);
        }
        catch {
            return undefined;
        }
    }
    exist(plr) {
        return plr.runCommandAsync(`scoreboard players test @s ${this.#execId} * *`)
            .then(() => true, () => false);
    }
    reset(plr) {
        this.#tempSet.set(plr, undefined);
        return plr.runCommandAsync(`scoreboard players reset @s ${this.#execId}`)
            .finally(() => this.#tempSet.delete(plr))
            .then(() => true, () => false);
    }
    *getScores() {
        for (const { score, participant } of this.#obj.getScores()) {
            if (participant.type !== ScoreboardIdentityType.player)
                continue;
            try {
                yield [participant.getEntity(), score, participant.id];
            }
            catch {
                yield [null, score, participant.id];
            }
        }
    }
    *[Symbol.iterator]() { yield* this.getScores(); }
}
export class ScoreboardDisplay {
    static 'set'(slot, obj, sort = 'descending') {
        obj ? world.scoreboard.setObjectiveAtDisplaySlot(slot, { objective: obj instanceof MCSO ? obj : obj.data, sortOrder: ObjectiveSortOrder[sort] })
            : world.scoreboard.clearObjectiveAtDisplaySlot(slot);
    }
    static clear(slot) { this.set(slot); }
    constructor(KEY, obj) {
        if (KEY !== PRIVATE)
            throw new TypeError(`Class '${this.constructor.name}' is not directly constructable`);
        this.#obj = obj;
    }
    #obj;
    'set'(slot, sort = 'descending') { ScoreboardDisplay.set(slot, this.#obj, sort); }
    clear(slot) { ScoreboardDisplay.clear(slot); }
}
const PRIVATE = Symbol();
