import { system, world } from "@minecraft/server";
import EventEmitter from "./event.js";
import { getFunctionName } from "./misc.js";
export class ServerConstructor extends EventEmitter {
    constructor() {
        super('UAC:server');
        (async () => {
            while (true)
                await (this.nextTick = new Promise(res => system.run(res)));
        })();
        this.initialize = new Promise(res => this.addEventListener('initialize', () => {
            this.initialized = true;
            res();
        }, {
            once: true,
            priority: -Infinity
        }));
    }
    get interval() { return HighInterval; }
    get timeout() { return HighTimeout; }
    nextTick = Promise.resolve();
    waitFor(ticks) {
        return new Promise(res => {
            let i = 0;
            const id = system.runSchedule(() => {
                if (++i < ticks)
                    return;
                res();
                system.clearRun(id);
            });
        });
    }
    initialized = false;
}
const server = new ServerConstructor();
export default server;
export class HighTimeout {
    constructor(fn, timeout) {
        this.fn = fn;
        this.registerTime = Date.now();
        this.execTime = this.registerTime + timeout;
        timeoutList.add(this);
    }
    registerTime;
    execTime;
    fn;
    clear() { return timeoutList.delete(this); }
    get isCleared() { return !timeoutList.has(this); }
}
const timeoutList = new Set();
export class HighInterval {
    constructor(fn, interval, maxCallsPerTick = 1) {
        this.fn = fn;
        this.lastExecTime = Date.now();
        this.nextExecTime = this.lastExecTime + interval;
        this.interval = interval;
        this.maxCallsPerTick = maxCallsPerTick;
        intervalList.add(this);
    }
    lastExecTime;
    nextExecTime;
    interval;
    maxCallsPerTick;
    fn;
    clear() { return intervalList.delete(this); }
    get isCleared() { return !intervalList.has(this); }
}
const intervalList = new Set();
world.events.worldInitialize.subscribe(function f(evd) {
    server.emit('initialize', evd);
    delete server.listeners.initialize;
    server.addHandler('addEventListener', evd => {
        const { eventName } = evd;
        if (eventName === 'initialize')
            evd.cancel = true;
    });
    for (const plr of world.getPlayers()) {
        if (!server.emit('playerJoin', { playerName: plr.name, playerId: plr.uidRaw }).break)
            server.emit('playerLoad', plr);
    }
    world.events.worldInitialize.unsubscribe(f);
});
let lastTime = Date.now();
system.runSchedule(() => {
    for (const timeout of timeoutList) {
        const curTime = Date.now();
        if (curTime > timeout.execTime)
            try {
                timeout.fn(curTime - timeout.registerTime);
            }
            catch (e) {
                console.error(`server > timeout > ${getFunctionName(timeout.fn)}: ${e instanceof Error ? `${e}\n${e.stack}` : e}`);
            }
            finally {
                timeoutList.delete(timeout);
            }
    }
    for (const interval of intervalList) {
        const curTime = Date.now();
        let c = interval.maxCallsPerTick;
        while (c > 0 && curTime > interval.nextExecTime)
            try {
                interval.fn(curTime - interval.lastExecTime);
            }
            catch (e) {
                console.error(`server > interval > ${getFunctionName(interval.fn)}: ${e instanceof Error ? `${e}\n${e.stack}` : e}`);
            }
            finally {
                interval.lastExecTime = curTime;
                interval.nextExecTime += interval.interval;
                c--;
            }
        if (c == 0 && curTime > interval.nextExecTime)
            interval.nextExecTime = curTime + interval.interval - (curTime - interval.nextExecTime) % interval.interval;
    }
    const curTime = Date.now(), deltaTime = curTime - lastTime;
    lastTime = curTime;
    server.emit('tick', { deltaTime: deltaTime / 1000, currentTick: system.currentTick });
});
world.events.playerJoin.subscribe(dat => server.emit('playerJoin', dat));
world.events.playerSpawn.subscribe(({ player, initialSpawn }) => {
    if (initialSpawn ? server.emit('playerRegister', player) : true)
        server.emit('playerLoad', player);
});
world.events.playerLeave.subscribe(dat => server.emit('playerLeave', dat));
world.events.beforeChat.subscribe(evd => server.emit('beforeChat', evd));
