import cc from "../../core/lib/cc.js"
import { ActionForm, ModalForm, ModalFieldLabel, ModalFieldTypes, ButtonField, ModalFieldTypesObj } from "../../core/lib/form.js"
import { convertToTime } from "../../core/lib/misc.js"
import { ModuleConfigParser } from "../lib/mcf.js"
import module from "../lib/module.js"

cc.create('uac:gui', {
    name: '[UAC] GUI',
    description: 'Opens UAC GUI.',

    minPermLvl: 80,
    trigger: /^(uac-?)?gui$/i,
    execute: ({executer}) => { gui.send(executer) }
})

const gui = new ActionForm([
    {
        label: 'Enable / disable modules',
        action: (plr, stack) => {
            new ModalForm(
                Array.from(
                    module.values(),
                    m => ({
                        type: 'toggle',
                        label: new ModalFieldLabel(m.name),
                        defaultValue: m.toggle,
                        action: v => m.setToggle(v, plr)
                    } as ModalFieldTypes)
                ),
                'Modules'
            ).send(plr, stack).then(v => { if (!v.cancel) ModalForm.showBack(plr, stack) })
        }
    }, {
        label: 'Manage module',
        action: (plr, stack) => {
            new ActionForm(
                [
                    ...Array.from(module.values())
                        .filter(v => v.configParser)
                        .map(m => ({
                            label: m.name,
                            action: (plr, stack) => {
                                if (!m.configParser) throw new Error
                                new ModalForm(
                                    convertInput(m.configParser),
                                    `Configure ${m.name}`
                                ).send(plr, stack).then(v => { if (!v.cancel) ModalForm.showBack(plr, stack) })
                            }
                        }) as ButtonField),
                    {
                        label: 'Back',
                        action: (plr, stack) => ActionForm.showBack(plr, stack)
                    },
                ],
                'Modules'
            ).send(plr, stack)
        }
    }, {
        label: 'Exit',
        action: () => {}
    }
], 'UAC')

const timeFormatRevertEnum: Record<string, string> = {
    year: 'y',
    month: 'mth',
    week: 'w',
    day: 'd',
    hour: 'h',
    minute: 'm',
    second: 's',
}
const timeFormatRevertRegex = RegExp(`(\\d+) (${Object.keys(timeFormatRevertEnum).join('|')})s? ?`, 'g')

const typeConvMap = new Map<any, (v: any) => ModalFieldRaw>([
    [cc.argumentParser.parseToggle, v => ({
        type: 'toggle',
        defaultValue: v,
    })],
    [cc.argumentParser.parseBoolean, v => ({
        type: 'toggle',
        defaultValue: v,
    })],
    [cc.argumentParser.parseTime, v => ({
        type: 'text',
        placeholderText: '',
        defaultValue: v >= 1_892_160_000_000 ? '60y' : Array.from(convertToTime(v).matchAll(timeFormatRevertRegex), ([m, t = '0', k = '']) => t + timeFormatRevertEnum[k]).join(''),
    })]
])

function convertInput(conf: ModuleConfigParser<any>) {
    return Object.entries(conf.values).map(([k, t]) => {
        const field: any = Array.isArray(t.type) && t.type.every(v => typeof v === 'string') ? {
            type: 'dropdown',
            list: t.type as string[],
            defaultValue: t.type.indexOf(conf.obj[t.key]),

            validate: undefined,
            //@ts-expect-error
            action: (v: any) => conf.execute(k, t.type[v])
        } : typeConvMap.get(t.type)?.(conf.obj[t.key])
        ?? {
            type: 'text',
            placeholderText: '',
            defaultValue: String(conf.obj[t.key])
        }

        field.label = new ModalFieldLabel(t.name + (t.desc ? '\n' + t.desc : '') + (field.type === 'text' ? '\n' + `Type: ${cc.formatType(t.typeDesc)}` : ''))
        if (!('validate' in field)) field.validate = (v: any) => void conf.execute(k, v, false)
        if (!('action' in field)) field.action = (v: any) => conf.execute(k, v)

        return field as ModalFieldTypes
    })
}

type ModalFieldRaw = { [K in keyof ModalFieldTypesObj]: Omit<ModalFieldTypesObj[K], 'label' | 'action'> }[keyof ModalFieldTypesObj]
