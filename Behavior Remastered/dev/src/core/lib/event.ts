import { getFunctionName, getStackTrace } from "./misc.js";

export default class EventEmitter<T extends Record<string, any> = {}> {
    constructor(name: string = '<unknown>') {
        this.name = name
    }

    name: string

    listeners: {
        [K in keyof T]?: {
            baseListeners: Set<FunctionListener<T[K]>> // for priority 0
            prioritizedListeners: Map<FunctionListener<T[K]>, number> // for priority > 0
            sorted: boolean
        }
    } = Object.create(null)

    handlers: {
        [K in keyof handlerEvents]?: Set<(eventData: handlerEvents[K]) => void>
    } = Object.create(null)

    addEventListener<name extends Extract<keyof T, string>, fn extends FunctionListener<T[name]>>(eventName: name, listener: fn, options: listenerOptions = {}): fn {
        const evd: handlerEvents['addEventListener'] = {
            eventName,
            listener,
            options,
            cancel: false
        }
        this.emitHandler('addEventListener', evd)
        if (evd.cancel) return listener

        const eventListenerData = this.listeners[eventName] ??= { baseListeners: new Set, prioritizedListeners: new Map, sorted: true }
        if (!evd.options.priority) {
            eventListenerData.baseListeners.add(listener)
        } else {
            eventListenerData.sorted = false
            eventListenerData.prioritizedListeners.set(listener, evd.options.priority)
        }

        evd.options.abort?.finally(() => this.removeEventListener(eventName, listener))

        return listener
    }
    
    removeEventListener<name extends Extract<keyof T, string>>(eventName: name, listener: FunctionListener<T[name]>) {
        const evd: handlerEvents['removeEventListener'] = {
            eventName,
            listener,
            cancel: false
        }
        this.emitHandler('removeEventListener', evd)
        if (evd.cancel) return false

        const eventListenerData = this.listeners[eventName]
        return Boolean( eventListenerData && (eventListenerData.baseListeners.delete(listener) || eventListenerData.prioritizedListeners.delete(listener)) )
    }

    emit<name extends Extract<keyof T, string>>(eventName: name, eventData: T[name], breakable = true) {
        const evd: handlerEvents['emit'] = {
            eventName,
            eventData,
            breakable,
            cancel: false
        }
        this.emitHandler('emit', evd)
        if (evd.cancel) return { break: false, cancel: false, data: eventData }

        let currentListener: FunctionListener<any> = () => {}

        const control = new EventControl({
            'break': (r) => {
                const evd: handlerEvents['controlBreak'] = {
                    eventName,
                    eventData,
                    listener: currentListener,
                    reason: r,
                    cancel: false
                }
                this.emitHandler('controlBreak', evd)
                return !evd.cancel
            }
        })

        const eventListenerData = this.listeners[eventName]
        if (!eventListenerData) return { break: false, cancel: false, data: eventData }

        if (eventListenerData.sorted === false) {
            eventListenerData.sorted = true
            eventListenerData.prioritizedListeners = new Map( [...eventListenerData.prioritizedListeners].sort( ([,a], [,b]) => b - a) )
        }

        for ( const listener of ( function*() { yield* eventListenerData.prioritizedListeners.keys(); yield* eventListenerData.baseListeners } )() ) {
            try {
                currentListener = listener
                listener(eventData, control)
            } catch(err) {
                const evd: handlerEvents['listenerErr'] = {
                    eventName,
                    eventData,
                    listener,
                    err,
                    log: true,
                    break: false,
                    throw: false
                }
                this.emitHandler('listenerErr', evd)
                
                if (evd.log) console.error(`${this.name} > ${eventName} > ${getFunctionName(listener)}: ${ err instanceof Error ? `${err}\n${err.stack}` : err }`)
                if (evd.throw) throw err
                else if (evd.break) control.break(err)
            }
            if (control.isBroken) return { break: true, cancel: control.canceled, data: eventData }
        }

        return { break: false, cancel: control.canceled, data: eventData }
    }

    addHandler<name extends Extract<keyof handlerEvents, string>, fn extends (evd: handlerEvents[name]) => void>(eventName: name, handler: fn): fn {
        (this.handlers[eventName] ??= new Set<any>()).add(handler)
        return handler
    }

    removeHandler<name extends Extract<keyof handlerEvents, string>>(eventName: name, handler: (evd: handlerEvents[name]) => void) {
        return this.handlers[eventName]?.delete(handler) ?? false
    }

    emitHandler<name extends Extract<keyof handlerEvents, string>>(eventName: name, eventData: handlerEvents[name]) {
        for (const listener of this.handlers[eventName] ?? []) listener(eventData)
        return eventData
    }
}

export class EventControl {
    constructor(listeners: controllerListener = {}, canBreak = true) {
        this.#listeners = listeners
        this.canBreak = canBreak
    }
    #listeners: controllerListener

    readonly canBreak: boolean
    #isBroken = false
    get isBroken() { return this.#isBroken }

    break(reason?: any) {
        if (!(this.#listeners.break?.(reason) ?? true)) return false
        this.#isBroken = true
        return true
    }

    canceled = false

    cancel() {
        this.canceled = true
    }
}

type controllerListener = {
    break?: (reason?: any) => boolean | void
}

type FunctionListener<T> = (eventData: T, control: EventControl) => void

type listenerOptions = {
    priority?: number
    once?: boolean
    abort?: Promise<any>
}

export type handlerEvents = {
    addEventListener: {
        readonly eventName: string
        readonly listener: FunctionListener<any>
        options: listenerOptions
        cancel: boolean
    }
    removeEventListener: {
        readonly eventName: string
        readonly listener: FunctionListener<any>
        cancel: boolean
    }
    emit: {
        readonly eventName: string
        readonly eventData: any
        breakable: boolean
        cancel: boolean
    }
    controlBreak: {
        readonly eventName: string
        readonly eventData: any
        readonly listener: FunctionListener<any>
        readonly reason: any
        cancel: boolean
    }
    listenerErr: {
        readonly eventName: string
        readonly eventData: any
        readonly listener: FunctionListener<any>
        readonly err: any
        log: boolean
        'break': boolean
        'throw': boolean
    }
}
