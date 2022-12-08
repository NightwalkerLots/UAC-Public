import { scoreTest } from '../library/utils/score_testing.js';
import { world } from '@minecraft/server';
import { asyncExecCmd } from '../library/utils/cmd_queue.js';

const overworld = world.getDimension('overworld');


function lagclear() {
    try {
        let entitycount = scoreTest('entitydummy', 'entitycount');
        let entitycountdown = scoreTest('entitydummy', 'entityclear');

        if(entitycount >= 135) {
            if(entitycountdown <= 0) {
                asyncExecCmd(`scoreboard players set entitydummy entityclear 400`);
            }
        }
            
        if(entitycountdown >= 1) {
            asyncExecCmd(`scoreboard players remove entitydummy entityclear 10`);
            if(entitycountdown == 350) { asyncExecCmd(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c5"}]}`); }
            if(entitycountdown == 300) { asyncExecCmd(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c4"}]}`); }
            if(entitycountdown == 250) { asyncExecCmd(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c3"}]}`); }
            if(entitycountdown == 200) { asyncExecCmd(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c2"}]}`); }
            if(entitycountdown == 150) { asyncExecCmd(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c1"}]}`); }
            if(entitycountdown == 100) { asyncExecCmd(`function UAC/packages/autolagclearasset`); }
        }
    } catch{}
}

export { lagclear }