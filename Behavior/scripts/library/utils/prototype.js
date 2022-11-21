import { world, Player, BlockLocation, EntityQueryOptions, GameMode } from '@minecraft/server';
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
    scoreTestOther: function (target, objective) {
        try {
            const score = parseInt(runCommand(`scoreboard players test "${target}" ${objective} *`).statusMessage.match(/-?\d+/));
            return score;
        } catch {
            return;
        }
    },
    /*
        if(sender.hasitem('iron_ingot', 32)) {
                sender.tellraw(`you have it`);
            }
    */
    hasitem: function (item, amount) {
        try {
            let id = item.toString();
            const target = this.runCommand(`testfor @s[hasitem={item=${id},quantity=${amount ? amount : 1}..}]`);
            let result = target.toString();
            return result;
        } catch {
            return false;
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
export function FindPlayer(input) {
    let players = world.getPlayers();
    for (let player of players) {
        const name = player.getName();
        if(name.match(input)) {
            return true;
        } else { return false; }
    }
}

export function tellraw (message) {
    try {
        return this.runCommand(`tellraw @s {"rawtext":[{"text":"${message.replaceAll('"', '\\"')}"}]}`);
    }
    catch {return}
}

export function scoreTest (objective) {
    try {
        const score = parseInt(this.runCommand(`scoreboard players test @s ${objective} *`).statusMessage.match(/-?\d+/));
        return score;
    } catch {
        return;
    }
}
// return gamemode string 
export function getGamemode (player) {
    try {
        let type = '';
        const score = parseInt(player.runCommand(`scoreboard players test @s gamemode *`).statusMessage.match(/-?\d+/));
        if(score == 0) type = 'survival';
        if(score == 1) type = 'creative';
        if(score == 2) type = 'adventure';
        if(score == 3) type = 'spectator';
        return type.toString();
    } catch {
        return;
    }
}

export function queryTopSolid({ location: { x, y, z }, dimension = overworld }) {
    const locations = new BlockLocation(floor(x), 320, floor(z))
        .blocksBetween(new BlockLocation(floor(x), -64, floor(z))).reverse();
    for (const location of locations) if (!dimension.getBlock(location).isEmpty) return location.y;
}
Object.assign(Player.prototype, betaPlayerFunctions);