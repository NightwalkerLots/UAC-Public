import { world, World, Player, BlockLocation, EntityQueryOptions } from 'mojang-minecraft';
const overworld = world.getDimension('overworld');
const { floor } = Math;
export const content = {
    warn: function (message) {
        if (typeof message === 'object' || Array.isArray(message)) {
            console.warn(JSON.stringify(message));
        } else {
            console.warn(message);
        }

    }
};
const betaPlayerFunctions = {
    getName: function () {
        if (/"|\\/.test(this.nameTag)) {
            this.nameTag = this.nameTag.replace(/"|\\/g, '');
        }
        return this.nameTag;
        //not beta but fixes nameSpoof command tartgeting issues
    },
    scoreTest: function (objective) {
        try {
            const score = parseInt(this.runCommand(`scoreboard players test @s ${objective} *`).statusMessage.match(/-?\d+/));
            return score;
        } catch {
            return;
        }
    },
    tellraw: function (message) {
        return this.runCommand(`tellraw @s {"rawtext":[{"text":"${message.replaceAll('"', '\\"')}"}]}`);
    },
    tellrawStringify: function (message) {
        return this.runCommand(`tellraw @s {"rawtext":[{"text":"${JSON.stringify(message).replaceAll('"', '\\"')}"}]}`);
    },
    tellrawJSON: function (json) {
        return this.runCommand(`tellraw @s {"rawtext":[${json}]}`);
    },
    rotation: function (isArray) {
        if (isArray) {
            return [Math.asin(-this.viewVector.y) * 180 / Math.PI, -Math.atan2(this.viewVector.x, this.viewVector.z) * 180 / Math.PI];
        } else {
            return { x: Math.asin(-this.viewVector.y) * 180 / Math.PI, y: -Math.atan2(this.viewVector.x, this.viewVector.z) * 180 / Math.PI };
        }
    },
    queryTopSolid: function (dimension = overworld) {
        const { location: { x, z } } = this;
        const locations = new BlockLocation(floor(x), 320, floor(z))
            .blocksBetween(new BlockLocation(floor(x), -64, floor(z))).reverse();
        for (const location of locations) if (!dimension.getBlock(location).isEmpty) return location.y;
    },
    getInventory: function (array) {
        let inventory = this.getComponent('minecraft:inventory').container;
        if (array) {
            let itemArray = [];
            for (let i = 0; i < inventory.size; i++) {
                let item = inventory.getItem(i);
                if (item) {
                    const { id, amount, data } = item;
                    itemArray.push({ slot: i, id, amount, data });
                }
            } console.warn(JSON.stringify(itemArray));
            return itemArray;

        } else {
            return inventory;
        }

    }
};
export function tellrawStaff(message) {
    try { overworld.runCommand(`tellraw @a[tag=staffstatus] {"rawtext":[{"text":"${message.replaceAll('"', '\\"')}"}]}`); } catch { }
}
export function tellrawServer(message) {
    try { overworld.runCommand(`tellraw @a {"rawtext":[{"text":"${message.replaceAll('"', '\\"')}"}]}`); } catch { }
}
export function queryTopSolid({ location: { x, y, z }, dimension = overworld }) {
    const locations = new BlockLocation(floor(x), 320, floor(z))
        .blocksBetween(new BlockLocation(floor(x), -64, floor(z))).reverse();
    for (const location of locations) if (!dimension.getBlock(location).isEmpty) return location.y;
}
Object.assign(Player.prototype, betaPlayerFunctions);