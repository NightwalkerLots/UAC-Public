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
    tellraw: function (message) {
        return this.runCommandAsync(`tellraw @s {"rawtext":[{"text":"${message.replaceAll('"', '\\"')}"}]}`);
    },
    tellrawStringify: function (message) {
        return this.runCommandAsync(`tellraw @s {"rawtext":[{"text":"${JSON.stringify(message).replaceAll('"', '\\"')}"}]}`);
    },
    tellrawJSON: function (json) {
        return this.runCommandAsync(`tellraw @s {"rawtext":[${json}]}`);
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
    try { overworld.runCommandAsync(`tellraw @a[tag=staffstatus] {"rawtext":[{"text":"${message.replaceAll('"', '\\"')}"}]}`); } catch { }
}
export function tellrawServer(message) {
    try { overworld.runCommandAsync(`tellraw @a {"rawtext":[{"text":"${message.replaceAll('"', '\\"')}"}]}`); } catch { }
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
        return this.runCommandAsync(`tellraw @s {"rawtext":[{"text":"${message.replaceAll('"', '\\"')}"}]}`);
    }
    catch {return}
}

export function hotbar (player, message) {
    try {
        return overworld.runCommandAsync(`titleraw "${player.nameTag}" actionbar {"rawtext":[{"text":"${message.replaceAll('"', '\\"')}"}]}`);
    }
    catch {return}
}
// return gamemode string 
export function getGamemode (player) {
    try {
        let type = '';
        const score = world.scoreboard.getObjective('gamemode').getScore(player.scoreboard);
        if(score == 0) type = 'survival';
        if(score == 1) type = 'creative';
        if(score == 2) type = 'adventure';
        if(score == 3) type = 'spectator';
        return type.toString();
    } catch {
        return;
    }
}

export function hasitem(player, itemId, clearItems = false) {
    const inventory = player.getComponent("minecraft:inventory").container;
    let itemAmount = 0;
    for (let i = 0; i < 36; i++) {
        let item = inventory.getItem(i);
        if (item?.typeId != itemId) continue;
        itemAmount += item.amount;
    } if (clearItems) player.runCommandAsync(`clear @s ${itemId}`)
    return itemAmount;
};

export function queryTopSolid({ location: { x, y, z }, dimension = overworld }) {
    const locations = new BlockLocation(floor(x), 320, floor(z))
        .blocksBetween(new BlockLocation(floor(x), -64, floor(z))).reverse();
    for (const location of locations) if (!dimension.getBlock(location).isEmpty) return location.y;
}

Object.assign(Player.prototype, betaPlayerFunctions);