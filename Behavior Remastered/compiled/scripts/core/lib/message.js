import { Player, world } from "@minecraft/server";
import { SimulatedPlayer } from "@minecraft/server-gametest";
import { asyncExecCmd } from "./mc.js";
import { prettify } from "./misc.js";
import permission from "./permission.js";
export class MessageConstructor {
    linesPerSegment = 24;
    convertMsg(message) {
        return (Array.isArray(message) ? message : [message]).map(v => typeof v === 'string' ? v : prettify(v)).join('\n');
    }
    convertMsgToArr(message) {
        return (Array.isArray(message) ? message : [message]).flatMap(v => (typeof v === 'string' ? v : prettify(v)).split('\n'));
    }
    async sendMsg(target, message) {
        target = /^\s*@[spear](\[.*\])?\s*$/.test(target) ? target : JSON.stringify(target);
        const arr = this.convertMsgToArr(message);
        const promiseList = [];
        for (let i = 0; i < arr.length; i += this.linesPerSegment)
            promiseList.push(asyncExecCmd(`tellraw ${target} {"rawtext":[{"text":${JSON.stringify(arr.slice(i, i + this.linesPerSegment).join('\n'))}}]}`));
        await Promise.allSettled(promiseList);
    }
    sendMsgToPlayer(target, message) {
        const arr = this.convertMsgToArr(message);
        for (let i = 0; i < arr.length; i += this.linesPerSegment)
            target.tell(arr.slice(i, i + this.linesPerSegment).join('\n'));
    }
    sendMsgToPlayers(target, message, exclude = []) {
        const arr = this.convertMsgToArr(message);
        for (const plr of target)
            if (!exclude.includes(plr))
                for (let i = 0; i < arr.length; i += this.linesPerSegment)
                    plr.tell(arr.slice(i, i + this.linesPerSegment).join('\n'));
    }
    sendMsgToAdmins(minPermLvl, message, exclude = []) {
        const arr = this.convertMsgToArr(message);
        for (const plr of permission.getAdmins(minPermLvl, undefined, exclude))
            for (let i = 0; i < arr.length; i += this.linesPerSegment)
                plr.tell(arr.slice(i, i + this.linesPerSegment).join('\n'));
    }
    sendMsgToAll(message) {
        const arr = this.convertMsgToArr(message);
        for (let i = 0; i < arr.length; i += this.linesPerSegment)
            world.say(arr.slice(i, i + this.linesPerSegment).join('\n'));
    }
}
const message = new MessageConstructor();
export default message;
for (const obj of [Player, SimulatedPlayer]) {
    Object.defineProperty(obj.prototype, 'sendMsg', {
        configurable: true,
        value: function sendMsg(data) {
            if (!(this instanceof obj))
                throw new TypeError(`${obj.name}.sendMsg requires 'this' be a '${obj.name}'`);
            message.sendMsgToPlayer(this, data);
        }
    });
}
