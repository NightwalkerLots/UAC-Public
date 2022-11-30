import { system, world } from "@minecraft/server";
import { EventEmitter } from "../build/classes/eventEmitter";

function getFunctionName(fn) {
    return `${fn.name || '<anonymous>'} (${fn.fileName ? `defined at ${fn.fileName}:${fn.lineNumber}` : 'native'})`;
}

export class ServerConstructor extends EventEmitter {
    constructor() {
        super('SE3:server');
        this.nextTick = Promise.resolve();
        this.initialized = false;
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
    waitFor(ticks) {
        return new Promise(res => {
            let i = 0;
            const fn = world.events.tick.subscribe(() => {
                if (++i < ticks)
                    return;
                world.events.tick.unsubscribe(fn);
                res();
            });
        });
    }
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
    clear() { return intervalList.delete(this); }
    get isCleared() { return !intervalList.has(this); }
}
const intervalList = new Set();
world.events.worldInitialize.subscribe(function f(evd) {
    server._emit('initialize', evd);
    delete server.listeners.initialize;
    server.addHandler('addEventListener', evd => {
        const { eventName } = evd;
        if (eventName === 'initialize')
            evd.cancel = true;
    });
    for (const plr of world.getPlayers())
        joinFn({ player: plr });
    world.events.worldInitialize.unsubscribe(f);
});
world.events.tick.subscribe(evd => {
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
                interval.lastExecTime += interval.interval;
                c--;
            }
        if (c == 0 && curTime > interval.nextExecTime)
            interval.nextExecTime = curTime + interval.interval - (curTime - interval.nextExecTime) % interval.interval;
    }
    server._emit('tick', evd);
});

const joinFn = world.events.playerJoin.subscribe(({player: plr}) => {
    if (server.emit('playerJoin', plr))
        (async() => {
            while(true) {
                try {
                    plr.name
                    try {
                        await plr.runCommandAsync('testfor @s')
                        
                        server.emit('playerLoad', plr)
                        return
                    } catch {}
                } catch {
                    return
                }
                await server.nextTick
            }
        })()
})

world.events.playerLeave.subscribe(({playerName}) => server.emit('playerLeave', playerName))

world.events.beforeChat.subscribe(evd => server.emit('beforeChat', evd))