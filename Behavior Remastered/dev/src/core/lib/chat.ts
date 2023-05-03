import { Player, world } from "@minecraft/server";
import EventEmitter from "./event.js";
import { testTagFilter } from "./misc.js";
import role from "./role.js";
import sdefault from "./sdefault.js";

export class ChatConstructor extends EventEmitter<chatEvents> {
    get group() { return chatGroup }

    send(player: Player, message: string, sendMsg = true, targets?: Player[]) {
        const group = chatGroup.getGroup(player)
        
        const evd: chatEvents['chat'] = {
            sender: player,
            group,
            targets: targets ?? [...group?.getGroupTargets() ?? []],
            message: message,
        }
        const {cancel} = this.emit('chat', evd)

        if (sendMsg && !cancel) {
            const msgOut = role.formatMessage(player, evd.message)
            for (const plr of evd.targets) plr.tell(msgOut)
        }

        return Object.assign(evd, { cancel })
    }
}
const chat = new ChatConstructor('UAC:chat')
export default chat

//// GROUP ////

let listSorted = true

export class ChatGroupConstructor extends Map<string, ChatGroup> {
    create(...args: ConstructorParameters<typeof ChatGroup>) { return new ChatGroup(...args) }

    createFromJSON({id, priority, tagFilter}: chatGroupJSON) {
        return new ChatGroup(id, priority, tagFilter)
    }

    getGroup(player: Player) {
        const mappedTags = player.getTags()

        if (!listSorted) {
            const nl = Array.from(this).sort( ([, { priority: a }], [, { priority: b }]) => b - a)
            this.clear()
            for (const [k, v] of nl) this.set(k, v)

            listSorted = true
        }

        for (const [id, group] of this)
            if (testTagFilter(group.tagFilter, mappedTags))
                return group
        return
    }
}
export const chatGroup = new ChatGroupConstructor

export class ChatGroup {
    constructor(id: string, priority = 0, tagFilter: tagFilter = [], addtoList = true) {
        this.id = id
        this.priority = priority
        this.tagFilter = tagFilter

        if (addtoList) {
            chatGroup.set(id, this)
            listSorted = false
        }
    }
    readonly id: string
    priority: number
    tagFilter: tagFilter
    get isListed() { return chatGroup.get(this.id) === this }

    *getGroupTargets(playerList: Iterable<Player> = world.getPlayers()) {
        for (const plr of playerList)
            if (testTagFilter(this.tagFilter, plr.getTags()) === 1)
                yield plr
    }

    toJSON() {
        const {id, priority, tagFilter} = this
        return {id, priority, tagFilter}
    }
}

export type chatGroupJSON = {
    id: string
    priority: number
    tagFilter: tagFilter
}

//// EVENTS ////

export type chatEvents = {
    chat: {
        readonly sender: Player
        readonly group: ChatGroup | undefined
        targets: Array<Player>
        message: string
    }
}

sdefault.addEventListener('save', ({data}) => {
    data.chat = Array.from(chatGroup.values(), g => g.toJSON())
})

sdefault.addEventListener('load', ({data}) => {
    if (!data.chat) return

    chatGroup.clear()
    for (const gJSON of data.chat) chatGroup.createFromJSON(gJSON)
})
