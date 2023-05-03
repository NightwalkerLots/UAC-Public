import cc, { CCTypedFlags } from "../../../core/lib/cc.js";
import { convertToTime } from "../../../core/lib/misc.js";
import logModule, { logData } from "../../module/log.js";

const listFilterDetection = new CCTypedFlags({
    type: 'detection',
    module: cc.argumentParser.parseAny,
    detection: cc.argumentParser.parseAny,
    name: cc.argumentParser.parseAny,
    uid: cc.argumentParser.parseAny,
    action: cc.argumentParser.parseAny,
}, 'FilterDetection')

const listFilterAction = new CCTypedFlags({
    type: 'action',
    modName: cc.argumentParser.parseAny,
    modUid: cc.argumentParser.parseAny,
    name: cc.argumentParser.parseAny,
    uid: cc.argumentParser.parseAny,
    action: cc.argumentParser.parseAny,
    reason: cc.argumentParser.parseAny,
}, 'FilterAction')

const listFilterOther = new CCTypedFlags({
    type: 'other',
    category: cc.argumentParser.parseAny,
    message: cc.argumentParser.parseAny,
    name: cc.argumentParser.parseAny,
    uid: cc.argumentParser.parseAny,
}, 'FilterOther')

const viewOptions = new CCTypedFlags({
    from: Date,
    to: Date,
    fast: cc.argumentParser.parseBoolean,
    page: cc.argumentParser.number(true, 1),
    listperpage: cc.argumentParser.number(true, 10),
}, 'ViewOptions')

cc.create('uac:log', {
    name: '[UAC] Log',
    description: 'Shows log',
    usage: [
        {
            usage: ['log', 'list', { name: 'options', type: 'ViewOptions', optional: true }, { name: 'filter', type: ['FilterAction', 'FilterDetection', 'FilterOther'] }],
            description: 'Shows log entries.' + viewOptions.generateUsage() + listFilterAction.generateUsage() + listFilterDetection.generateUsage() + listFilterOther.generateUsage()
        }, {
            usage: ['log', 'info', { name: 'index', type: 'number' }],
            description: 'Shows detailed information for a log entry.'
        }, {
            usage: ['log', 'size'],
            description: 'Calculates log size.'
        }, {
            usage: ['log', 'capacity'],
            description: 'Calculates log entries capacity.'
        }, {
            usage: ['log', 'clear'],
            description: 'Clears log'
        }
    ],

    minPermLvl: 60,
    trigger: /^(uac-?)?(mod(eration)?-?)?log$/i,
    typedParams: new cc.typedParams(
        {
            minArgs: 1,
            sequence: ['list', viewOptions, [listFilterAction, listFilterDetection, listFilterOther]],
            execute: async ([
                ,
                {
                    from = new Date(0),
                    to = new Date(864e13),
                    page = 1,
                    listperpage = 72,
                    fast = false
                } = {} as any,
                fi = {} as any
            ], { executer, log }) => {
                log('Please wait.')

                const stime = from.getTime(), etime = to.getTime() // time
                let c = 0, sl = (page - 1) * listperpage, el = sl + listperpage // page
                const fient = Object.entries(fi) // filter

                let i = 0, l: [number, logData][] = []
                l:
                for await (const data of fast ? logModule.readAll() : logModule.readAllSlow()) {
                    i++
                    if (data.timestamp > etime) continue
                    if (data.timestamp < stime) break

                    //@ts-expect-error
                    for (const [k, v] of fient) if (data[k] !== v) continue l

                    if (c++ < sl) continue
                    if (c > el) break

                    l.push([i - 1, data])
                }
                
                if (l.length === 0) log('Nothing to show.')
                else log([
                    ' ',
                    `Page ${page}, showing ${l.length} log entr${l.length === 1 ? 'y' : 'ies'}`,
                    ...l.map(
                        ([i, data]) => ` §8:§r §7#${i.toString().padStart(4, '0')} ${new Date(data.timestamp).toLocaleString()}§r ` + (
                            data.type === 'detection' ? `§e${data.module}§r/§c${data.detection}§r -> §d${data.name}§r (§2#${data.uid}§r) (§e${data.action}§r) ${data.detail}§r`
                            : data.type === 'action' ? `§d${data.modName}§r -> §d${data.name}§r (§2#${data.uid}§r) (§e${data.action}§r) ${data.reason}§r`
                            : data.message
                        )
                    ),
                    ' '
                ])
            }
        }, {
            sequence: ['info', cc.argumentParser.parseNumber],
            execute: async ([,i], { executer, log }) => {
                const entry = await logModule.read(i)
                if (!entry) throw new Error('No data in this index.')

                log([
                    ' ',
                    `Log info for #${i.toString().padStart(4, '0')}:`
                ])
                switch (entry.type) {
                    case 'action':
                        log([
                            ` §8:§r Time: §a${new Date(entry.timestamp).toLocaleString()}§r`,
                            ` §8:§r Type: §a${entry.type}§r`,
                            ` §8:§r Moderator: §d${entry.modName}§r`,
                            ` §8:§r Player: §d${entry.name}§r (§2#${entry.uid}§r)`,
                            ` §8:§r Action: §e${entry.action}§r ${entry.actionDuration ? `(§a${convertToTime(entry.actionDuration)}§r)` : ''}`,
                            ` §8:§r Reason: ${entry.reason}`,
                            ' ',
                        ])
                        break
                    
                    case 'detection':
                        log([
                            ` §8:§r Time: §a${new Date(entry.timestamp).toLocaleString()}§r`,
                            ` §8:§r Type: §a${entry.type}§r`,
                            ` §8:§r Module: §e${entry.module}§r`,
                            ` §8:§r Detection: §c${entry.detection}§r`,
                            ` §8:§r Detail: ${entry.detail}§r`,
                            ` §8:§r Player: §d${entry.name}§r (§2#${entry.uid}§r)`,
                            ` §8:§r Action: §e${entry.action}§r ${entry.actionDuration ? `(§a${convertToTime(entry.actionDuration)}§r)` : ''}`,
                            ' ',
                        ])
                        break
                    
                    case 'other':
                        log([
                            ` §8:§r Time: §a${new Date(entry.timestamp).toLocaleString()}§r`,
                            ` §8:§r Type: §a${entry.type}§r`,
                            ` §8:§r Player: §d${entry.name}§r (§2#${entry.uid}§r)`,
                            ` §8:§r Category: §e${entry.category}§r`,
                            ` §8:§r Message: ${entry.message}`,
                            ' ',
                        ])
                        break
                }
            }
        }, {
            sequence: ['size'],
            execute: async ([], { log }) => {
                log(`Calculating. Please wait...`)
                log(`Log size: §a${await logModule.getAllLength()}§r`)
            }
        }, {
            sequence: [['cap', 'capacity']],
            execute: async ([], { log }) => {
                log(`Calculating. Please wait...`)
                const buf = logModule.getChunkBufferSize(), s = logModule.getStorageChunks().length
                log([
                    `Log entries capacity: §a${buf * s - buf}§r`,
                    `Chunks: §a${s}§r @ buffer: §a${buf}§r`,
                ])
            }
        }, {
            sequence: ['clear'],
            execute: async ([], { executer, log }) => {
                log('Clearing logs. Please wait...')
                await logModule.clear()

                log('Log cleared.')
                logModule.push({
                    timestamp: Date.now(),
                    type: 'other',
                    name: executer.name,
                    uid: executer.uidStr,
                    category: 'other',
                    message: `§d${executer.name}§r cleared log`
                })
            }
        }
    )
})
