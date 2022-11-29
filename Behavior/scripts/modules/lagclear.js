import { scoreTest } from 'library/utils/prototype.js';
import { world } from '@minecraft/server';
const overworld = world.getDimension('overworld');

function scoreTest(name, objective) {
    try {
        const score = parseInt(overworld.runCommandAsync(`scoreboard players test ${name} ${objective} *`).statusMessage.match(/-?\d+/));
        return score;
    } catch {
        return;
    }

}

function lagclear() {
    const entitycount = scoreTest('entitydummy', 'entitycount');
    const entitycountdown = scoreTest('entitydummy', 'entityclear');
    if(entitycount >= 135) {
        if(entitycountdown == 0) {
            overworld.runCommandAsync(`scoreboard players set entitydummy entityclear 400`);
        }
    }
        
    if(entitycountdown >= 1) {
        overworld.runCommandAsync(`scoreboard players remove entitydummy entityclear 1`);
        if(entitycountdown == 350) { overworld.runCommandAsync(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c5"}]}`); }
        if(entitycountdown == 300) { overworld.runCommandAsync(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c4"}]}`); }
        if(entitycountdown == 250) { overworld.runCommandAsync(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c3"}]}`); }
        if(entitycountdown == 200) { overworld.runCommandAsync(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c2"}]}`); }
        if(entitycountdown == 150) { overworld.runCommandAsync(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c1"}]}`); }
        if(entitycountdown == 100) { overworld.runCommandAsync(`function UAC/packages/autolagclearasset`); }
    }
}

export { lagclear }