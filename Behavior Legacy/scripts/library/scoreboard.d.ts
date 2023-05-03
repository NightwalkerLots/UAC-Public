import { Player, ScoreboardObjective as MCSO } from "@minecraft/server";
export default class scoreboard {
    static get objective(): typeof ScoreboardObjective;
    static get display(): typeof ScoreboardDisplay;
    static get dummiesObject(): typeof scoreboardDummiesObject;
    protected constructor();
}
export declare class scoreboardDummiesObject {
    static create(sb: string | ScoreboardObjective | MCSO, prefix?: string): Record<string, number>;
    static asyncCreate(sb: string | ScoreboardObjective | MCSO, dataPerTick?: number, prefix?: string): Promise<Record<string, number>>;
    static directCreate(sb: string | ScoreboardObjective | MCSO, prefix?: string): Record<string, number>;
}
export declare class ScoreboardObjective {
    static create(id: string, displayName?: string): ScoreboardObjective;
    static 'get'(id: string): ScoreboardObjective;
    static 'for'(id: string, displayName?: string): ScoreboardObjective;
    static exist(id: string): boolean;
    static 'delete'(id: string): void;
    static getList(): Generator<ScoreboardObjective, void, unknown>;
    static [Symbol.iterator](): Generator<ScoreboardObjective, void, unknown>;
    constructor(KEY: typeof PRIVATE, obj: MCSO);
    readonly id: string;
    readonly execId: string;
    readonly displayName: string;
    readonly data: MCSO;
    readonly dummies: ScoreboardDummies;
    readonly players: ScoreboardPlayers;
    readonly display: ScoreboardDisplay;
}
export declare class ScoreboardDummies {
    #private;
    constructor(KEY: typeof PRIVATE, obj: ScoreboardObjective);
    'set'(name: string, score: number): Promise<boolean>;
    'get'(name: string): any;
    exist(name: string): Promise<boolean>;
    reset(name: string): Promise<boolean>;
    getScores(): Generator<[name: string, score: number, id: number]>;
    [Symbol.iterator](): Generator<[name: string, score: number, id: number], void, unknown>;

    /** @deprecated */
    useCache(v: boolean): this
}
export declare class ScoreboardPlayers {
    #private;
    constructor(KEY: typeof PRIVATE, obj: ScoreboardObjective);
    'set'(plr: Player, score: number): Promise<boolean>;
    'get'(plr: Player): any;
    exist(plr: Player): Promise<boolean>;
    reset(plr: Player): Promise<boolean>;
    getScores(): Generator<[player: Player | null, score: number, id: number]>;
    [Symbol.iterator](): Generator<[player: any, score: number, id: number], void, unknown>;

    /** @deprecated */
    useCache(v: boolean): this
}
export declare class ScoreboardDisplay {
    #private;
    static 'set'(slot: displaySlots, obj?: ScoreboardObjective | MCSO, sort?: 'ascending' | 'descending'): void;
    static clear(slot: displaySlots): void;
    constructor(KEY: typeof PRIVATE, obj: ScoreboardObjective);
    'set'(slot: displaySlots, sort?: 'ascending' | 'descending'): void;
    clear(slot: displaySlots): void;
}
declare const PRIVATE: unique symbol;
declare type displaySlots = 'belowname' | 'list' | 'sidebar';
export {};
