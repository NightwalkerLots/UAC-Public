import { Player } from "@minecraft/server";
import { ActionFormData, FormCancelationReason, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import EventEmitter from "./event.js";
import { getFunctionName } from "./misc.js";
import server from "./server.js";

export class FormBase<T extends FormEvents> extends EventEmitter<T> {
    static get Reusable() { return FormReusable }

    static showBack(plr: Player, redirectStack: Form[], count = 1, ignoreBusy = true) {
        redirectStack.splice(0, count)
        redirectStack.shift()?.send(plr, redirectStack, ignoreBusy)
    }

    _emitBase(player: Player, redirectStack: Form[]) {
        const evd: CommonEventBase = {
            player: player,
            redirectStack: redirectStack
        }
        //@ts-expect-error
        this.emit('show', evd)
        return evd
    }

    _emitCancel(evdBase: CommonEventBase, reason: FormCancelationReason, redirectStack: Form[], ignoreBusy: boolean) {
        const {player: plr, redirectStack: redirector} = evdBase

        const cancelEvd: CommonCancelEvent = {
            ...evdBase,

            reason,

            redirectToPrevious: true
        }
        //@ts-expect-error
        this.emit('cancel', cancelEvd)

        if (cancelEvd.redirect) cancelEvd.redirect.send(plr, redirectStack, ignoreBusy)
        else if (cancelEvd.redirectToPrevious && redirector) FormBase.showBack(plr, redirectStack, 1, ignoreBusy)

        return cancelEvd
    }
}

class FormReusable<T extends FormConstructor> extends FormBase<T extends FormBase<infer R> ? R : never> {
    constructor(form: T, fields: () => { title: string, fields: ConstructorParameters<T>[0] } & (T extends typeof ModalForm ? {} : { message: string }), name?: string) {
        super()

        //@ts-expect-error
        const inst = this.form = new form()
        inst.name = name ?? `[${form.name}] ${name ?? '<unknown>'}`
        //@ts-expect-error
        inst.addEventListener('show', () => Object.assign(inst, fields()))
    }

    readonly form: InstanceType<T>
}

//// MESSAGE FORM ////

export class MessageForm extends FormBase<MessageFormEvents> {
    constructor(field: [MessageField, MessageField], title = '', message = '', name?: string) {
        super('[MessageForm] ' + name)

        this.title = title
        this.message = message
        this.fields = field
    }

    title: string
    message: string
    fields

    async send(plr: Player, redirectStack: Form[] = [], ignoreBusy = true): Promise<{ cancel: true, reason: FormCancelationReason } | { cancel: false, data: MessageFormEvents['submit'] }> {
        redirectStack.unshift(this)
        const evdBase = this._emitBase(plr, redirectStack)

        const fieldCached = this.fields
        const form = new MessageFormData
        form.title(this.title)
        form.body(this.message)
        form.button1(fieldCached[0].label)
        form.button2(fieldCached[1].label)

        while(true) {
            const evd = await form.show(plr)

            if (evd.canceled) {
                if (ignoreBusy && evd.cancelationReason === FormCancelationReason.userBusy) {
                    await server.nextTick
                    continue
                }
                this._emitCancel(evdBase, evd.cancelationReason, redirectStack, ignoreBusy)
                return {
                    cancel: true,
                    reason: evd.cancelationReason
                }
            }
            
            const selection = evd.selection ? 0 : 1,
                field = fieldCached[selection]

            // emit submit
            const submit: MessageFormEvents['submit'] = {
                ...evdBase,

                value: selection,
                field
            }
            const {cancel} = this.emit('submit', submit)

            // exec
            if (!cancel) {
                try { field.action(plr, redirectStack) }
                catch(e) { console.error(`[MessageForm] ${this.name} > action [${selection}] (${getFunctionName(field.action)}): ${e instanceof Error ? `${e}\n${e.stack}` : e}`) }
            }

            return {
                cancel: false,
                data: submit
            }
        }
    }
}

export type MessageField = {
    label: string
    action: (plr: Player, redirectStack: Form[]) => void
}

export type MessageFormEvents = {
    show: CommonEventBase
    submit: CommonEventBase & {
        readonly value: 0 | 1
        readonly field: MessageField
    }
    cancel: CommonCancelEvent
}

//// ACTION FORM ////

export class ActionForm extends FormBase<ActionFormEvents> {
    constructor(fields: ButtonField[] = [], title = '', message = '', name?: string) {
        super('[ActionForm] ' + name)

        this.title = title
        this.message = message
        this.fields = fields
    }

    title: string
    message: string
    fields: ButtonField[]

    async send(plr: Player, redirectStack: Form[] = [], ignoreBusy = true): Promise<{ cancel: true, reason: FormCancelationReason } | { cancel: false, data: ActionFormEvents['submit'] }> {
        redirectStack.unshift(this)
        const evdBase = this._emitBase(plr, redirectStack)

        const fieldCached = this.fields
        const form = new ActionFormData
        form.title(this.title)
        form.body(this.message)
        for (const field of fieldCached) form.button(field.label, field.iconPath)

        while(true) {
            const evd = await form.show(plr)

            if (evd.canceled) {
                if (ignoreBusy && evd.cancelationReason === FormCancelationReason.userBusy) {
                    await server.nextTick
                    continue
                }
                this._emitCancel(evdBase, evd.cancelationReason, redirectStack, ignoreBusy)
                return {
                    cancel: true,
                    reason: evd.cancelationReason
                }
            }
            
            const field = fieldCached[evd.selection]
            if (!field) continue

            // emit submit
            const submitEvd: ActionFormEvents['submit'] = {
                ...evdBase,

                value: evd.selection,
                field
            }
            const {cancel} = this.emit('submit', submitEvd)

            // exec
            if (!cancel) {
                try { field.action(plr, redirectStack) }
                catch(e) { console.error(`[ActionForm] ${this.name} > action [${evd.selection}] (${getFunctionName(field.action)}): ${e instanceof Error ? `${e}\n${e.stack}` : e}`) }
            }

            return {
                cancel: false,
                data: submitEvd
            }
        }
    }
}

export type ButtonField = {
    label: string
    iconPath?: string
    action: (plr: Player, redirectStack: Form[]) => void
}

export type ActionFormEvents = {
    show: CommonEventBase
    submit: CommonEventBase & {
        readonly value: number
        readonly field: ButtonField
    }
    cancel: CommonCancelEvent
}


//// MODAL FORM ////

export class ModalForm extends FormBase<ModalFormEvents> {
    constructor(fields: ModalFieldTypes[] = [], title = '', name?: string) {
        super('[ModalForm] ' + name)

        this.fields = fields
        this.title = title
    }

    title = ''
    fields: ModalFieldTypes[] = []

    async send(plr: Player, redirectStack: Form[] = [], ignoreBusy = true): Promise<{ cancel: true, reason: FormCancelationReason } | { cancel: false, data: ModalFormEvents['submit'] }> {
        redirectStack.unshift(this)
        const evdBase = this._emitBase(plr, redirectStack)

        const fields = this.fields
        const fieldLabels = fields.map(v => Object.create(v.label))
        let fieldDefaultValues = fields.map(v => v.defaultValue) as any[]

        renew:
        while (true) {
            const form = new ModalFormData
            form.title(this.title)

            for (const [i, field] of fields.entries()) {
                switch (field.type) {
                    case 'toggle':
                        form.toggle(fieldLabels[i].generate(), fieldDefaultValues[i])
                        break
                    case 'text':
                        form.textField(fieldLabels[i].generate(), field.placeholderText, fieldDefaultValues[i])
                        break
                    case 'slider':
                        form.slider(fieldLabels[i].generate(), field.min, field.max, field.step, fieldDefaultValues[i])
                        break
                    case 'dropdown':
                        form.dropdown(fieldLabels[i].generate(), field.list, fieldDefaultValues[i])
                        break
                }
            }

            while(true) {
                const evd = await form.show(plr)

                if (evd.canceled) {
                    if (ignoreBusy && evd.cancelationReason === FormCancelationReason.userBusy) {
                        await server.nextTick
                        continue
                    }
                    this._emitCancel(evdBase, evd.cancelationReason, redirectStack, ignoreBusy)
                    return {
                        cancel: true,
                        reason: evd.cancelationReason
                    }
                }

                const values: ModalFormValue[] = fields.map( (field, i) => ({ field, value: evd.formValues[i] }) )

                // error testing
                let errList: ModalFormEvents['err']['errors'] = []
                for (const [i, {field, value}] of values.entries()) {
                    fieldLabels[i].error = undefined

                    let err
                    try { err = field.validate?.(value as never, plr, redirectStack, values) }
                    catch(e) { err = e }

                    if (err) {
                        errList.push({
                            field,
                            value,
                            error: err
                        })
                        fieldLabels[i].error = String(err)
                    }
                }
                if (errList.length) {
                    fieldDefaultValues = values.map(({value}) => value)
                    
                    // emit error, retry
                    const errEvd: ModalFormEvents['err'] = {
                        player: plr,
                        redirectStack,
                        values,
                        errors: errList
                    }
                    this.emit('err', errEvd)
                    continue renew
                }

                // emit submit
                const submitEvd: ModalFormEvents['submit'] = {
                    ...evdBase,

                    values,

                    redirectToPrevious: false
                }
                const {cancel} = this.emit('submit', submitEvd)

                // exec
                if (!cancel) for (const [i, {field, value}] of values.entries()) {
                    try { field.action(value as never, plr, redirectStack, values) }
                    catch(e) { console.error(`[ModalForm] ${this.name} > action [${i}] (${getFunctionName(field.action)}): ${e instanceof Error ? `${e}\n${e.stack}` : e}`) }
                }

                // redirection
                if (submitEvd.redirect) submitEvd.redirect.send(plr, redirectStack, ignoreBusy)
                else if (submitEvd.redirectToPrevious) FormBase.showBack(plr, redirectStack, 1, ignoreBusy)

                return {
                    cancel: false,
                    data: submitEvd
                }
            }
        }
    }
}

export type ModalFormValue = {
    readonly field: ModalFieldTypes
    readonly value: ModalFieldReturnTypes[keyof ModalFieldReturnTypes]
}

export type ModalFormEvents = {
    show: CommonEventBase
    submit: CommonEventBase & {
        readonly values: ModalFormValue[]

        redirect?: Form | undefined
        redirectToPrevious: boolean
    }
    err: CommonEventBase & {
        readonly values: ModalFormValue[]
        readonly errors: (ModalFormValue & { error: any })[]
    }
    cancel: CommonCancelEvent
}

interface ModalFieldReturnTypes {
    toggle: boolean
    dropdown: number
    slider: number
    text: string
}

type ModalFieldBase<K extends string, V> = {
    type: K
    label: ModalFieldLabel
    defaultValue?: V

    validate?: (value: V, plr: Player, redirectStack: Form[], values: ModalFormValue[]) => string | false | void
    action: (value: V, plr: Player, redirectStack: Form[], values: ModalFormValue[]) => void
}

export type ModalFieldTypes = ModalFieldTypesObj[keyof ModalFieldTypesObj]
export type ModalFieldTypesObj = {
    toggle: ModalFieldBase<'toggle', boolean> & {}
    dropdown: ModalFieldBase<'dropdown', number> & {
        list: string[]
    }
    slider: ModalFieldBase<'slider', number> & {
        min: number
        max: number
        step: number
    }
    text: ModalFieldBase<'text', string> & {
        placeholderText: string
    }
}

export class ModalFieldLabel {
    constructor(text: string, warn?: string) {
        this.text = text
        this.warning = warn
    }

    text: string
    warning?: string
    error?: string

    generate() {
        return (this.error ? `§c${this.error}§r\n` : '') + this.text + (this.warning ? `\n§e${this.warning}§r` : '')
    }
}

//// MISC ////

export type Form = ModalForm | ActionForm | MessageForm
export type FormConstructor = typeof ModalForm | typeof ActionForm | typeof MessageForm
export type FormEvents = MessageFormEvents | ActionFormEvents | ModalFormEvents

type CommonEventBase = {
    readonly player: Player
    readonly redirectStack: Form[]
}

type CommonCancelEvent = CommonEventBase & {
    readonly reason: FormCancelationReason

    redirect?: Form | undefined
    redirectToPrevious: boolean
}

new FormBase.Reusable(ModalForm, () => ({
    fields: [],
    title: ''
}))
