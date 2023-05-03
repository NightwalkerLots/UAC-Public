import { ActionFormData, FormCancelationReason, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import EventEmitter from "./event.js";
import { getFunctionName } from "./misc.js";
import server from "./server.js";
export class FormBase extends EventEmitter {
    static get Reusable() { return FormReusable; }
    static showBack(plr, redirectStack, count = 1, ignoreBusy = true) {
        redirectStack.splice(0, count);
        redirectStack.shift()?.send(plr, redirectStack, ignoreBusy);
    }
    _emitBase(player, redirectStack) {
        const evd = {
            player: player,
            redirectStack: redirectStack
        };
        //@ts-expect-error
        this.emit('show', evd);
        return evd;
    }
    _emitCancel(evdBase, reason, redirectStack, ignoreBusy) {
        const { player: plr, redirectStack: redirector } = evdBase;
        const cancelEvd = {
            ...evdBase,
            reason,
            redirectToPrevious: true
        };
        //@ts-expect-error
        this.emit('cancel', cancelEvd);
        if (cancelEvd.redirect)
            cancelEvd.redirect.send(plr, redirectStack, ignoreBusy);
        else if (cancelEvd.redirectToPrevious && redirector)
            FormBase.showBack(plr, redirectStack, 1, ignoreBusy);
        return cancelEvd;
    }
}
class FormReusable extends FormBase {
    constructor(form, fields, name) {
        super();
        //@ts-expect-error
        const inst = this.form = new form();
        inst.name = name ?? `[${form.name}] ${name ?? '<unknown>'}`;
        //@ts-expect-error
        inst.addEventListener('show', () => Object.assign(inst, fields()));
    }
    form;
}
//// MESSAGE FORM ////
export class MessageForm extends FormBase {
    constructor(field, title = '', message = '', name) {
        super('[MessageForm] ' + name);
        this.title = title;
        this.message = message;
        this.fields = field;
    }
    title;
    message;
    fields;
    async send(plr, redirectStack = [], ignoreBusy = true) {
        redirectStack.unshift(this);
        const evdBase = this._emitBase(plr, redirectStack);
        const fieldCached = this.fields;
        const form = new MessageFormData;
        form.title(this.title);
        form.body(this.message);
        form.button1(fieldCached[0].label);
        form.button2(fieldCached[1].label);
        while (true) {
            const evd = await form.show(plr);
            if (evd.canceled) {
                if (ignoreBusy && evd.cancelationReason === FormCancelationReason.userBusy) {
                    await server.nextTick;
                    continue;
                }
                this._emitCancel(evdBase, evd.cancelationReason, redirectStack, ignoreBusy);
                return {
                    cancel: true,
                    reason: evd.cancelationReason
                };
            }
            const selection = evd.selection ? 0 : 1, field = fieldCached[selection];
            // emit submit
            const submit = {
                ...evdBase,
                value: selection,
                field
            };
            const { cancel } = this.emit('submit', submit);
            // exec
            if (!cancel) {
                try {
                    field.action(plr, redirectStack);
                }
                catch (e) {
                    console.error(`[MessageForm] ${this.name} > action [${selection}] (${getFunctionName(field.action)}): ${e instanceof Error ? `${e}\n${e.stack}` : e}`);
                }
            }
            return {
                cancel: false,
                data: submit
            };
        }
    }
}
//// ACTION FORM ////
export class ActionForm extends FormBase {
    constructor(fields = [], title = '', message = '', name) {
        super('[ActionForm] ' + name);
        this.title = title;
        this.message = message;
        this.fields = fields;
    }
    title;
    message;
    fields;
    async send(plr, redirectStack = [], ignoreBusy = true) {
        redirectStack.unshift(this);
        const evdBase = this._emitBase(plr, redirectStack);
        const fieldCached = this.fields;
        const form = new ActionFormData;
        form.title(this.title);
        form.body(this.message);
        for (const field of fieldCached)
            form.button(field.label, field.iconPath);
        while (true) {
            const evd = await form.show(plr);
            if (evd.canceled) {
                if (ignoreBusy && evd.cancelationReason === FormCancelationReason.userBusy) {
                    await server.nextTick;
                    continue;
                }
                this._emitCancel(evdBase, evd.cancelationReason, redirectStack, ignoreBusy);
                return {
                    cancel: true,
                    reason: evd.cancelationReason
                };
            }
            const field = fieldCached[evd.selection];
            if (!field)
                continue;
            // emit submit
            const submitEvd = {
                ...evdBase,
                value: evd.selection,
                field
            };
            const { cancel } = this.emit('submit', submitEvd);
            // exec
            if (!cancel) {
                try {
                    field.action(plr, redirectStack);
                }
                catch (e) {
                    console.error(`[ActionForm] ${this.name} > action [${evd.selection}] (${getFunctionName(field.action)}): ${e instanceof Error ? `${e}\n${e.stack}` : e}`);
                }
            }
            return {
                cancel: false,
                data: submitEvd
            };
        }
    }
}
//// MODAL FORM ////
export class ModalForm extends FormBase {
    constructor(fields = [], title = '', name) {
        super('[ModalForm] ' + name);
        this.fields = fields;
        this.title = title;
    }
    title = '';
    fields = [];
    async send(plr, redirectStack = [], ignoreBusy = true) {
        redirectStack.unshift(this);
        const evdBase = this._emitBase(plr, redirectStack);
        const fields = this.fields;
        const fieldLabels = fields.map(v => Object.create(v.label));
        let fieldDefaultValues = fields.map(v => v.defaultValue);
        renew: while (true) {
            const form = new ModalFormData;
            form.title(this.title);
            for (const [i, field] of fields.entries()) {
                switch (field.type) {
                    case 'toggle':
                        form.toggle(fieldLabels[i].generate(), fieldDefaultValues[i]);
                        break;
                    case 'text':
                        form.textField(fieldLabels[i].generate(), field.placeholderText, fieldDefaultValues[i]);
                        break;
                    case 'slider':
                        form.slider(fieldLabels[i].generate(), field.min, field.max, field.step, fieldDefaultValues[i]);
                        break;
                    case 'dropdown':
                        form.dropdown(fieldLabels[i].generate(), field.list, fieldDefaultValues[i]);
                        break;
                }
            }
            while (true) {
                const evd = await form.show(plr);
                if (evd.canceled) {
                    if (ignoreBusy && evd.cancelationReason === FormCancelationReason.userBusy) {
                        await server.nextTick;
                        continue;
                    }
                    this._emitCancel(evdBase, evd.cancelationReason, redirectStack, ignoreBusy);
                    return {
                        cancel: true,
                        reason: evd.cancelationReason
                    };
                }
                const values = fields.map((field, i) => ({ field, value: evd.formValues[i] }));
                // error testing
                let errList = [];
                for (const [i, { field, value }] of values.entries()) {
                    fieldLabels[i].error = undefined;
                    let err;
                    try {
                        err = field.validate?.(value, plr, redirectStack, values);
                    }
                    catch (e) {
                        err = e;
                    }
                    if (err) {
                        errList.push({
                            field,
                            value,
                            error: err
                        });
                        fieldLabels[i].error = String(err);
                    }
                }
                if (errList.length) {
                    fieldDefaultValues = values.map(({ value }) => value);
                    // emit error, retry
                    const errEvd = {
                        player: plr,
                        redirectStack,
                        values,
                        errors: errList
                    };
                    this.emit('err', errEvd);
                    continue renew;
                }
                // emit submit
                const submitEvd = {
                    ...evdBase,
                    values,
                    redirectToPrevious: false
                };
                const { cancel } = this.emit('submit', submitEvd);
                // exec
                if (!cancel)
                    for (const [i, { field, value }] of values.entries()) {
                        try {
                            field.action(value, plr, redirectStack, values);
                        }
                        catch (e) {
                            console.error(`[ModalForm] ${this.name} > action [${i}] (${getFunctionName(field.action)}): ${e instanceof Error ? `${e}\n${e.stack}` : e}`);
                        }
                    }
                // redirection
                if (submitEvd.redirect)
                    submitEvd.redirect.send(plr, redirectStack, ignoreBusy);
                else if (submitEvd.redirectToPrevious)
                    FormBase.showBack(plr, redirectStack, 1, ignoreBusy);
                return {
                    cancel: false,
                    data: submitEvd
                };
            }
        }
    }
}
export class ModalFieldLabel {
    constructor(text, warn) {
        this.text = text;
        this.warning = warn;
    }
    text;
    warning;
    error;
    generate() {
        return (this.error ? `§c${this.error}§r\n` : '') + this.text + (this.warning ? `\n§e${this.warning}§r` : '');
    }
}
new FormBase.Reusable(ModalForm, () => ({
    fields: [],
    title: ''
}));
