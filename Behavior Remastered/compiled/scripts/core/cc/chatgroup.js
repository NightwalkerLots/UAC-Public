import cc from "../lib/cc.js";
import chat from "../lib/chat.js";
import { ArrayType, ObjectType, ValueType } from "../lib/types.js";
const stringArrType = new ArrayType(String, 'string[]');
const filterObjType = new ObjectType(Object.create(null), undefined, 'TagFilterObject');
const filterObjTypeVal = new ValueType([undefined, stringArrType, filterObjType]);
Object.assign(filterObjType.type, { all: filterObjTypeVal, any: filterObjTypeVal, none: filterObjTypeVal });
const filterType = new ValueType([stringArrType, filterObjType], 'TagFilter');
function formatJSON(obj) {
    return JSON.stringify(obj, null, 1).replace(/\n */g, ' ');
}
cc.create('chatgroup', {
    name: 'Chat Group',
    description: 'Configures chat group',
    usage: [
        {
            usage: ['chat-group', 'create', { name: 'id', type: 'any' }, { name: 'priority', type: 'number', optional: true }, { name: 'tagFilter', type: 'chat.group.tagFilter', optional: true }],
            description: 'Creates a chat group.'
        }, {
            usage: ['chat-group', 'edit', { name: 'id', type: 'any' }, { name: 'property', keyword: ['priority', 'tag-filter'] }, { name: 'value', type: '*' }],
            description: 'Edits a property in a chat group.'
        }, {
            usage: ['chat-group', 'delete', { name: 'id', type: 'any' }],
            description: 'Deletes a chat group.'
        }, {
            usage: ['chat-group', 'list'],
            description: 'Shows chat group list.'
        }
    ],
    minPermLvl: 80,
    trigger: /^chat-?group$/i,
    typedParams: new cc.typedParams({
        minArgs: 2,
        sequence: ['create', cc.argumentParser.parseAny, cc.argumentParser.number(true, 0), cc.argumentParser.type(filterType)],
        execute: ([, id, priority, tagFilter], { log }) => {
            if (chat.group.has(id))
                throw new Error(`Chat group '${id}' already exists`);
            chat.group.create(id, priority, tagFilter);
            return log(`Created chat group '§a${id}§r'.`);
        }
    }, {
        sequence: ['edit', cc.argumentParser.parseAny, 'priority', cc.argumentParser.number(true, 0)],
        execute: ([, id, , val], { log }) => {
            const cg = chat.group.get(id);
            if (!cg)
                throw new Error(`Chat group '${id}' not found`);
            cg['priority'] = val;
            return log(`Edited chat group '§a${id}§r' property '§a${'priority'}§r' to '§a${val}§r'.`);
        }
    }, {
        sequence: ['edit', cc.argumentParser.parseAny, 'tag-filter', cc.argumentParser.type(filterType)],
        execute: ([, id, , val], { log }) => {
            const cg = chat.group.get(id);
            if (!cg)
                throw new Error(`Chat group '${id}' not found`);
            cg['tagFilter'] = val;
            return log(`Edited chat group '§a${id}§r' property '§a${'tagFilter'}§r' to '§a${formatJSON(val)}§r'.`);
        }
    }, {
        sequence: ['delete', cc.argumentParser.parseAny],
        execute: ([, id], { log }) => {
            if (!chat.group.has(id))
                throw new Error(`Chat group '${id}' not found`);
            chat.group.delete(id);
            return log(`Deleted chat group '§a${id}§r'.`);
        }
    }, {
        sequence: ['list'],
        execute: ([], { log }) => {
            log([
                ` `,
                `Chat group list:`,
                ...Array.from(chat.group.values())
                    .sort(({ priority: a }, { priority: b }) => b - a)
                    .map(g => ` §8:§r §a${g.id}§r §7(priority: §a${g.priority}§7, tag filter: §a${JSON.stringify(g.tagFilter, null, 1).replace(/\n */g, ' ')}§7)`),
                ` `
            ]);
        }
    })
});
