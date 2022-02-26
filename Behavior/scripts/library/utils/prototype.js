import { world, World, Player, BlockLocation, EntityQueryOptions } from 'mojang-minecraft';
const overworld = world.getDimension('overworld');
const { floor } = Math;

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