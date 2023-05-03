import { world } from "@minecraft/server";
import cc from "../../core/lib/cc.js";
import { convertToTime } from "../../core/lib/misc.js";
import { ModuleConfigParser } from "../lib/mcf.js";
import { Module } from "../lib/module.js";
import logModule from "./log.js";
export class RBRelayModuleConstructor extends Module {
    constructor() {
        super('rbrelay', 'RBRelay', 'Realmbot Relay', {
            logDetection: true,
            logAction: true,
            logOther: true,
            otherCategoryFilter: '',
            targetTag: 'rb1337'
        });
        this.configParser = new ModuleConfigParser(this.data, {
            'log-detection': {
                name: 'Log detection',
                desc: '',
                typeDesc: { type: 'boolean' },
                key: 'logDetection',
                type: cc.argumentParser.parseBoolean
            },
            'log-action': {
                name: 'Log action',
                desc: '',
                typeDesc: { type: 'boolean' },
                key: 'logAction',
                type: cc.argumentParser.parseBoolean
            },
            'log-other': {
                name: 'Log others',
                desc: 'Player join, player leave, etc...',
                typeDesc: { type: 'boolean' },
                key: 'logOther',
                type: cc.argumentParser.parseBoolean
            },
            'log-other-filter': {
                name: 'Log other category filter',
                desc: 'Filters category types in "other" log type, separate with comma',
                typeDesc: { type: 'string' },
                key: 'otherCategoryFilter',
                type: cc.argumentParser.parseAny
            },
            'target-tag': {
                name: 'Target Tag',
                desc: '',
                typeDesc: { type: 'any' },
                key: 'targetTag',
                type: cc.argumentParser.parseAny
            }
        });
    }
    prefix = 'RB1337: ';
    sendLog(data) {
        if (typeof data === 'string')
            data = { description: data };
        data = Object.assign({
            url: 'https://discord.gg/uac',
            //author: {},
            //description: '',
            anticheat: `Unity Anti-Cheat`,
            color: `1317F2`,
            thumbnail: 'https://cdn.discordapp.com/attachments/824151082791075860/874429993164345354/uac_glitch.gif',
            //footer: {},
        }, data);
        data.author = Object.assign({
            name: 'Unity Anti-Cheat',
            icon_url: 'https://cdn.discordapp.com/attachments/824151082791075860/1081761748387893328/Discord_Certified_Moderator.png',
            url: 'https://discord.gg/uac'
        }, data.author);
        data.footer = Object.assign({
            icon_url: "https://cdn.discordapp.com/attachments/824151082791075860/874492420694360124/Unity_AntiCheat.png",
            text: "Powered by U-E Studios",
            url: 'https://discord.gg/uac'
        }, data.footer);
        this.send(data);
    }
    send(data, plr) {
        if (!plr)
            [plr] = world.getPlayers({ tags: [this.data.targetTag] });
        if (!plr)
            return;
        plr.onScreenDisplay.updateSubtitle(this.prefix + JSON.stringify(data));
    }
}
const rbRelayModule = new RBRelayModuleConstructor;
export default rbRelayModule;
const defaultColor = '1317F2';
const actionColors = {
    alert: 'ddff36',
    warn: 'ddff36',
    mute: 'ffc636',
    kick: 'ff8a24',
    ban: 'ff6536',
    blacklist: 'ff2121',
};
logModule.events.addEventListener('log', data => {
    if (!rbRelayModule.toggle)
        return;
    // action
    if (data.type === 'action' && rbRelayModule.data.logAction) {
        rbRelayModule.sendLog({
            author: { name: '[UAC: Action]' + ' ' + data.modName.replace(/\u00a7./g, '') },
            color: actionColors[data.action] ?? defaultColor,
            description: [
                `**Player**: ${data.name.replace(/\u00a7./g, '')} (#${data.uid})`,
                `**Action**: ${data.action} ${data.actionDuration ? '(' + convertToTime(data.actionDuration) + ')' : ''}`,
                `**Reason**: ${data.reason}`
            ].join('\n')
        });
    }
    // detection
    if (data.type === 'detection' && rbRelayModule.data.logDetection) {
        rbRelayModule.sendLog({
            author: { name: '[UAC: Detection]' + ' ' + data.module },
            color: actionColors[data.action] ?? defaultColor,
            description: [
                `**Player**: ${data.name.replace(/\u00a7./g, '')} (#${data.uid})`,
                `**Detection**: ${data.detection} ${data.detail.replace(/\u00a7./g, '')}`,
                `**Action**: ${data.action} ${data.actionDuration ? '(' + convertToTime(data.actionDuration) + ')' : ''}`,
            ].join('\n')
        });
    }
    // other
    if (data.type === 'other' && rbRelayModule.data.logOther && (rbRelayModule.data.otherCategoryFilter ? rbRelayModule.data.otherCategoryFilter.split(/ *, */g).some(v => data.category.toLowerCase() === v.toLowerCase()) : true)) {
        rbRelayModule.sendLog({
            author: { name: `[UAC: ${data.category.replace(/\b\w/g, v => v.toUpperCase())}]` },
            color: defaultColor,
            description: data.message.replace(/\u00a7./g, '')
        });
    }
});
rbRelayModule.toggle = false;
