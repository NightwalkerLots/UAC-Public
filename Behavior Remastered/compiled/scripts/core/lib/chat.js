import { world } from "@minecraft/server";
import EventEmitter from "./event.js";
import { testTagFilter } from "./misc.js";
import role from "./role.js";
import sdefault from "./sdefault.js";
export class ChatConstructor extends EventEmitter {
    get group() { return chatGroup; }
    send(player, message, sendMsg = true, targets) {
        const group = chatGroup.getGroup(player);
        const evd = {
            sender: player,
            group,
            targets: targets ?? [...group?.getGroupTargets() ?? []],
            message: message,
        };
        const { cancel } = this.emit('chat', evd);
        if (sendMsg && !cancel) {
            const msgOut = role.formatMessage(player, evd.message);
            for (const plr of evd.targets)
                plr.tell(msgOut);
        }
        return Object.assign(evd, { cancel });
    }
}
const chat = new ChatConstructor('UAC:chat');
export default chat;
//// GROUP ////
let listSorted = true;
export class ChatGroupConstructor extends Map {
    create(...args) { return new ChatGroup(...args); }
    createFromJSON({ id, priority, tagFilter }) {
        return new ChatGroup(id, priority, tagFilter);
    }
    getGroup(player) {
        const mappedTags = player.getTags();
        if (!listSorted) {
            const nl = Array.from(this).sort(([, { priority: a }], [, { priority: b }]) => b - a);
            this.clear();
            for (const [k, v] of nl)
                this.set(k, v);
            listSorted = true;
        }
        for (const [id, group] of this)
            if (testTagFilter(group.tagFilter, mappedTags))
                return group;
        return;
    }
}
export const chatGroup = new ChatGroupConstructor;
export class ChatGroup {
    constructor(id, priority = 0, tagFilter = [], addtoList = true) {
        this.id = id;
        this.priority = priority;
        this.tagFilter = tagFilter;
        if (addtoList) {
            chatGroup.set(id, this);
            listSorted = false;
        }
    }
    id;
    priority;
    tagFilter;
    get isListed() { return chatGroup.get(this.id) === this; }
    *getGroupTargets(playerList = world.getPlayers()) {
        for (const plr of playerList)
            if (testTagFilter(this.tagFilter, plr.getTags()) === 1)
                yield plr;
    }
    toJSON() {
        const { id, priority, tagFilter } = this;
        return { id, priority, tagFilter };
    }
}
sdefault.addEventListener('save', ({ data }) => {
    data.chat = Array.from(chatGroup.values(), g => g.toJSON());
});
sdefault.addEventListener('load', ({ data }) => {
    if (!data.chat)
        return;
    chatGroup.clear();
    for (const gJSON of data.chat)
        chatGroup.createFromJSON(gJSON);
});
