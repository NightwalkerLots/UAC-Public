import { world } from '@minecraft/server';
const overworld = world.getDimension('overworld');

function scoreTest(name, objective) {
    try {
        const score = parseInt(overworld.runCommand(`scoreboard players test ${name} ${objective} *`).statusMessage.match(/-?\d+/));
        return score;
    } catch {
        return;
    }

}

function lagclear() {
    const entitycount = scoreTest('entitydummy', 'entitycount');
    const entitycountdown = scoreTest('entitydummy', 'entityclear');
    if(entitycount >= 110) {
        if(entitycountdown == 0) {
            overworld.runCommand(`scoreboard players set entitydummy entityclear 400`);
        }
    }
        
    if(entitycountdown >= 1) {
        overworld.runCommand(`scoreboard players remove entitydummy entityclear 1`);
        if(entitycountdown == 350) { overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c5"}]}`); }
        if(entitycountdown == 300) { overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c4"}]}`); }
        if(entitycountdown == 250) { overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c3"}]}`); }
        if(entitycountdown == 200) { overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c2"}]}`); }
        if(entitycountdown == 150) { overworld.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c1"}]}`); }
        if(entitycountdown == 100) { overworld.runCommand(`function UAC/packages/autolagclearasset`); }
    }
}

export { lagclear }