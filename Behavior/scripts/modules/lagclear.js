import { scoreTest, setScore } from '../library/utils/score_testing.js';
import { world } from '@minecraft/server';
import { overworld } from '../library/utils/cmd_queue.js';



function lagclear() {
    try {
        let entitycount = scoreTest('entitydummy', 'entitycount');
        let entitycountdown = scoreTest('entitydummy', 'entityclear');
        
        if(entitycount >= 145) {
            if(entitycountdown <= 0) {
                setScore('entitydummy', 'entityclear', 400, false);
            }
        }
            
        if(entitycountdown >= 1) {
            overworld.runCommandAsync(`scoreboard players remove entitydummy entityclear 10`);
            if(entitycountdown == 350) { tellrawServer(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c5"}]}`); }
            if(entitycountdown == 300) { tellrawServer(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c4"}]}`); }
            if(entitycountdown == 250) { tellrawServer(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c3"}]}`); }
            if(entitycountdown == 200) { tellrawServer(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c2"}]}`); }
            if(entitycountdown == 150) { tellrawServer(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c1"}]}`); }
            if(entitycountdown == 100) { tellrawServer(`function UAC/packages/autolagclearasset`); }
        }
    } catch(error){console.warn(error);}
}

export { lagclear }