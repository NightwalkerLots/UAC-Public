import { getFunctionName } from "./misc.js";
export default class EventEmitter {
    constructor(name = '<unknown>') {
        this.name = name;
    }
    name;
    listeners = Object.create(null);
    handlers = Object.create(null);
    addEventListener(eventName, listener, options = {}) {
        const evd = {
            eventName,
            listener,
            options,
            cancel: false
        };
        this.emitHandler('addEventListener', evd);
        if (evd.cancel)
            return listener;
        const eventListenerData = this.listeners[eventName] ??= { baseListeners: new Set, prioritizedListeners: new Map, sorted: true };
        if (!evd.options.priority) {
            eventListenerData.baseListeners.add(listener);
        }
        else {
            eventListenerData.sorted = false;
            eventListenerData.prioritizedListeners.set(listener, evd.options.priority);
        }
        evd.options.abort?.finally(() => this.removeEventListener(eventName, listener));
        return listener;
    }
    removeEventListener(eventName, listener) {
        const evd = {
            eventName,
            listener,
            cancel: false
        };
        this.emitHandler('removeEventListener', evd);
        if (evd.cancel)
            return false;
        const eventListenerData = this.listeners[eventName];
        return Boolean(eventListenerData && (eventListenerData.baseListeners.delete(listener) || eventListenerData.prioritizedListeners.delete(listener)));
    }
    emit(eventName, eventData, breakable = true) {
        const evd = {
            eventName,
            eventData,
            breakable,
            cancel: false
        };
        this.emitHandler('emit', evd);
        if (evd.cancel)
            return { break: false, cancel: false, data: eventData };
        let currentListener = () => { };
        const control = new EventControl({
            'break': (r) => {
                const evd = {
                    eventName,
                    eventData,
                    listener: currentListener,
                    reason: r,
                    cancel: false
                };
                this.emitHandler('controlBreak', evd);
                return !evd.cancel;
            }
        });
        const eventListenerData = this.listeners[eventName];
        if (!eventListenerData)
            return { break: false, cancel: false, data: eventData };
        if (eventListenerData.sorted === false) {
            eventListenerData.sorted = true;
            eventListenerData.prioritizedListeners = new Map([...eventListenerData.prioritizedListeners].sort(([, a], [, b]) => b - a));
        }
        for (const listener of (function* () { yield* eventListenerData.prioritizedListeners.keys(); yield* eventListenerData.baseListeners; })()) {
            try {
                currentListener = listener;
                listener(eventData, control);
            }
            catch (err) {
                const evd = {
                    eventName,
                    eventData,
                    listener,
                    err,
                    log: true,
                    break: false,
                    throw: false
                };
                this.emitHandler('listenerErr', evd);
                if (evd.log)
                    console.error(`${this.name} > ${eventName} > ${getFunctionName(listener)}: ${err instanceof Error ? `${err}\n${err.stack}` : err}`);
                if (evd.throw)
                    throw err;
                else if (evd.break)
                    control.break(err);
            }
            if (control.isBroken)
                return { break: true, cancel: control.canceled, data: eventData };
        }
        return { break: false, cancel: control.canceled, data: eventData };
    }
    addHandler(eventName, handler) {
        (this.handlers[eventName] ??= new Set()).add(handler);
        return handler;
    }
    removeHandler(eventName, handler) {
        return this.handlers[eventName]?.delete(handler) ?? false;
    }
    emitHandler(eventName, eventData) {
        for (const listener of this.handlers[eventName] ?? [])
            listener(eventData);
        return eventData;
    }
}
export class EventControl {
    constructor(listeners = {}, canBreak = true) {
        this.#listeners = listeners;
        this.canBreak = canBreak;
    }
    #listeners;
    canBreak;
    #isBroken = false;
    get isBroken() { return this.#isBroken; }
    break(reason) {
        if (!(this.#listeners.break?.(reason) ?? true))
            return false;
        this.#isBroken = true;
        return true;
    }
    canceled = false;
    cancel() {
        this.canceled = true;
    }
}
