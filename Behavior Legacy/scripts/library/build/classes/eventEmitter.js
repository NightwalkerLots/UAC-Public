var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EventControl_listeners, _EventControl_isBroken;

export class EventEmitter {
    constructor(name = '<unknown>') {
        this.listeners = Object.create(null);
        this.handlers = Object.create(null);
        this.name = name;
        this._listeners = [];
        this._configurations = {
            maxListeners: 10
        };
    }
    /**
     * @private
     * @param {string} eventName Event type to listen for
     * @param {Function} listener Function to callback on fire
     * @param {boolean} [once] Wheather to listen for the event only ONCE or not
     * @param {boolean} [prepand] Insert the Event in the beginning of the Array, so it executes first
     */
    _addListener(eventName, listener, once, prepand) {
        const listenerCount = this.listenerCount(eventName);
        if (listenerCount >= this._configurations.maxListeners)
            throw `Warning: Possible EventEmitter memory leak detected. ${listenerCount + 1} ${eventName} listeners added. Use emitter.setMaxListeners(n) to increase limit`;
        const data = {
            eventName,
            listener,
            once,
            executed: false
        };
        if (prepand)
            this._listeners.unshift(data);
        else
            this._listeners.push(data);
    }
    ;
    addEventListener(eventName, listener, options = {}) {
        var _a;
        var _b;
        const evd = {
            eventName,
            listener,
            options,
            cancel: false
        };
        this.emitHandler('addEventListener', evd);
        if (evd.cancel)
            return listener;
        const eventListenerData = (_a = (_b = this.listeners)[eventName]) !== null && _a !== void 0 ? _a : (_b[eventName] = { baseListeners: new Set, prioritizedListeners: new Map, sorted: true });
        if (!evd.options.priority) {
            eventListenerData.baseListeners.add(listener);
        }
        else {
            eventListenerData.sorted = false;
            eventListenerData.prioritizedListeners.set(listener, evd.options.priority);
        }
        return listener;
    }
    /**
     * @private
     * @param {string} eventName Event type to remove
     * @param {Function} listener Function that is being called
     */
    _removeListener(eventName, listener) {
        if (typeof listener === 'number')
            this._listeners.splice(listener, 1);
        const index = this._listeners.findIndex(v => v.eventName === eventName && v.listener === listener);
        if (index !== -1)
            this._listeners.splice(index, 1);
    }
    ;
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
    addListener(eventName, listener) {
        this._addListener(eventName, listener, false);
        return this;
    }
    ;
    _emit(eventName, ...args) {
        let status = false;
        this._listeners.forEach(object => {
            if (object.eventName === eventName) {
                if (object.once && object.executed)
                    return;
                object.listener(...args);
                status = true, object.executed = true;
            }
            ;
        });
        return status;
    }
    ;
    emit(eventName, eventData, breakable = true) {
        const evd = {
            eventName,
            eventData,
            breakable,
            cancel: false
        };
        this.emitHandler('emit', evd);
        if (evd.cancel)
            return false;
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
            return true;
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
                return false;
        }
        return true;
    }
    eventNames() {
        return this._listeners.map(v => v.eventName);
    }
    ;
    getMaxListeners() {
        return this._configurations?.maxListeners;
    }
    ;
    listenerCount(eventName) {
        return eventName ? this._listeners.filter(v => v.eventName === eventName).length : this._listeners.length;
    }
    ;
    addHandler(eventName, handler) {
        var _a;
        var _b;
        ((_a = (_b = this.handlers)[eventName]) !== null && _a !== void 0 ? _a : (_b[eventName] = new Set())).add(handler);
        return handler;
    }
    removeHandler(eventName, handler) {
        var _a, _b;
        return (_b = (_a = this.handlers[eventName]) === null || _a === void 0 ? void 0 : _a.delete(handler)) !== null && _b !== void 0 ? _b : false;
    }
    emitHandler(eventName, eventData) {
        var _a;
        for (const listener of (_a = this.handlers[eventName]) !== null && _a !== void 0 ? _a : [])
            listener(eventData);
        return eventData;
    }
    listeners(eventName) {
        const Functions = [];
        this._listeners.forEach(object => {
            if (object.eventName === eventName && !object.once)
                Functions.push(object.listener);
        });
        return Functions;
    }
    ;
    off(eventName, listener) {
        this._removeListener(eventName, listener);
        return this;
    }
    ;
    on(eventName, listener) {
        this._addListener(eventName, listener, false);
        return this;
    }
    ;
    once(eventName, listener) {
        this._addListener(eventName, listener, true);
        return this;
    }
    ;
    prependListener(eventName, listener) {
        this._addListener(eventName, listener, false, true);
        return this;
    }
    ;
    prependOnceListener(eventName, listener) {
        this._addListener(eventName, listener, true, true);
        return this;
    }
    ;
    removeAllListeners(eventName) {
        eventName ? this._listeners = this._listeners.filter(element => element.eventName !== eventName) : this._listeners = [];
    }
    ;
    removeListener(eventName, listener) {
        this._removeListener(eventName, listener);
        return this;
    }
    ;
    setMaxListeners(number) {
        if (typeof number === 'number')
            this._configurations.maxListeners = number;
    }
    ;
    rawListeners(eventName) {
        const Functions = [];
        this._listeners.forEach(object => {
            if (object.eventName === eventName)
                Functions.push(object.listener);
        });
        return Functions;
    }
    ;
};

class EventControl {
    constructor(listeners = {}, canBreak = true) {
        _EventControl_listeners.set(this, void 0);
        _EventControl_isBroken.set(this, false);
        __classPrivateFieldSet(this, _EventControl_listeners, listeners, "f");
        this.canBreak = canBreak;
    }
    get isBroken() { return __classPrivateFieldGet(this, _EventControl_isBroken, "f"); }
    break(reason) {
        var _a, _b, _c;
        return ((_c = (_b = (_a = __classPrivateFieldGet(this, _EventControl_listeners, "f")).break) === null || _b === void 0 ? void 0 : _b.call(_a, reason)) !== null && _c !== void 0 ? _c : true) && !__classPrivateFieldGet(this, _EventControl_isBroken, "f") && (__classPrivateFieldSet(this, _EventControl_isBroken, true, "f"));
    }
}

_EventControl_listeners = new WeakMap(), _EventControl_isBroken = new WeakMap();

