import cc from "../lib/cc.js";
import { clamp, testTagFilter } from "../lib/misc.js";
import permission from "../lib/permission.js";
function canView(plr, cc) {
    return permission.getPlayerLevel(plr) >= cc.minPermLvl
        && testTagFilter(cc.tagFilter, plr.getTags()) == 1
        && !cc.hidden
        && cc.enabled;
}
cc.create('help', {
    name: 'Help',
    description: 'Shows command list / details of a command.',
    usage: [
        {
            usage: ['help', { name: 'page', type: 'number', optional: true }, { name: 'commandPerPage', type: 'number', optional: true }],
            description: 'Shows command list in a page.'
        }, {
            usage: ['help', { name: 'command', type: 'any' }],
            description: 'Shows detailed information of a command.'
        }
    ],
    trigger: /^(h|help|l|list)$/i,
    typedParams: new cc.typedParams({
        minArgs: 0,
        sequence: [cc.argumentParser.number(true, 1), cc.argumentParser.number(true, 1)],
        execute: ([page = 0, commandPerPage = 20], { executer, log }) => {
            const list = [...cc.values()]
                .filter(cc => canView(executer, cc))
                .sort((a, b) => a.name.localeCompare(b.name));
            page = clamp(page - 1, 0, Math.trunc((list.length - 1) / 10));
            const newList = list.splice(page * commandPerPage, commandPerPage);
            return log([
                ` `,
                `Command list: §7(showing ${newList.length} command${newList.length == 1 ? '' : 's'} in page ${page + 1})§r`,
                ...newList.map(cc => ` §8:§r ${cc.name || 'Unnamed'} §8-§r §7${cc.description || 'No description'}§r`),
                ` `,
            ]);
        }
    }, {
        sequence: [cc.argumentParser.parseAny],
        execute: ([trigger], { executer, log }) => {
            const cmd = cc.getFromTrigger(trigger);
            if (!cmd || !canView(executer, cmd))
                throw new Error(`Command not found: '${trigger}'`);
            log(' ');
            log([
                cmd.name,
                cmd.description,
            ]);
            log(' ');
            log(cmd.usage ? [
                'Usages:',
                ...cmd.usage.map(({ usage, description }) => {
                    const usageStr = usage.map(v => typeof v == 'string' ? `§a${v}§r`
                        : Array.isArray(v) ? '( ' + v.map(v => `§a${v}§r`).join(' | ') + ' )'
                            : `{§b${v.name}§r${v.optional ? '?' : ''}: ${cc.formatType(v)}}`).join(' ');
                    return ` §8-§r ${usageStr}` + (description ? '\n§7' + description : '');
                })
            ] : ['No usage fonud for this command.']);
            log(' ');
        }
    })
});
