import cc from "../lib/cc.js";
import { compability } from "../lib/compability.js";

cc.create('compability', {
    name: 'Compability',
    description: 'Configures the pack compability with others.',
    usage: [
        {
            usage: ['compability'],
            description: 'Shows current compability configuration.'
        }, {
            usage: ['compability', 'disable-message-cancel'],
            description: 'Shows more information about message cancelation.'
        }, {
            usage: ['compability', 'disable-message-cancel', 'set', { name: 'value', type: 'boolean' }],
            description: 'Enables / disables message cancelation.'
        }, {
            usage: ['compability', 'integrate-message-targets'],
            description: 'Shows more information about message integration.'
        }, {
            usage: ['compability', 'integrate-message-targets', 'set', { name: 'value', type: 'boolean' }],
            description: 'Enables / disables message integration.'
        }
    ],

    minPermLvl: 80,
    trigger: /^comp(ability)?$/i,
    typedParams: new cc.typedParams(
        {
            sequence: [],
            execute: ([], { log }) => {
                log([
                    ' ',
                    'Compability configuration:',
                    ` §8:§r Disable message cancel §7(disable-message-cancel)§r: ${compability.disableMessageCancel ? 'Yes' : 'No'}`,
                    ` §8:§r Integrate message targets §7(integrate-message-targets)§r: ${compability.integrateMessageTargets ? 'Yes' : 'No'}`,
                    ' ',
                ])
            }
        }, {
            sequence: ['disable-message-cancel'],
            execute: ([], { log }) => {
                log([
                    ' ',
                    `Disable message cancel: ${compability.disableMessageCancel ? 'Yes' : 'No'}`,
                    ' ',
                    "Disables message cancelation. Disabling this will disable message formatting. Chat group will still work.",
                    "Best to disable this when there's another pack that has message formatting you want to use or does not have compability feature in general.",
                    ' ',
                ])
            }
        }, {
            sequence: ['disable-message-cancel', 'set', cc.argumentParser.parseBoolean],
            execute: ([,,v], { log }) => {
                log(`Disable message cancelation has been ${(compability.disableMessageCancel = v) ? 'enabled' : 'disabled'}`)
            }
        }, {
            sequence: ['integrate-message-targets'],
            execute: ([], { log }) => {
                log([
                    ' ',
                    `Integrate message targets: ${compability.integrateMessageTargets ? 'Yes' : 'No'}`,
                    ' ',
                    "Enables message target integration. Enabling this will allow the message only to be sent to the targeted players configured within the chat event instead of overwriting with chat group targets.",
                    "This means if a pack wants a message to be sent to some players then the message will be sent only to these players.",
                    ' ',
                    "Note that the message targets can still be overwritten in some cases, for example: admin chat.",
                    ' '
                ])
            }
        }, {
            sequence: ['integrate-message-targets', 'set', cc.argumentParser.parseBoolean],
            execute: ([,,v], { log }) => {
                log(`Message integration has been ${(compability.integrateMessageTargets = v) ? 'enabled' : 'disabled'}`)
            }
        }
    )
})