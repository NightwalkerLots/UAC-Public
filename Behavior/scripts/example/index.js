import './commands/import-commands.js';
import { World, Commands } from 'mojang-minecraft';

World.events.tick.subscribe(() => {
    const gt_test = `scoreboard players set @r[scores={has_gt=0}] has_gt 1`
    //const gt_test = `say yeet`
    Commands.run(gt_test, World.getDimension("overworld"));
})


/*
World.events.tick.subscribe(() => {
    //const bbmenabled = Commands.run(`testfor @r[scores={BBM=1}]`, World.getDimension("overworld"));
    const testmsg = `execute @a[scores={BBM=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b►This works"}]}`
    Commands.run(testmsg, World.getDimension("overworld"))
   
})

World.events.tick.subscribe(() => {
    //const bbmenabled = Commands.run(`testfor @r[scores={BBM=1}]`, World.getDimension("overworld"));
    const testmsg2 = `execute @a[scores={BBM=!1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b►yeet"}]}`
    Commands.run(testmsg2, World.getDimension("overworld"))
})
*/

/*

World.events.tick.subscribe(() => {
    const bbmenabled = Commands.run(`testfor @r[scores={BBM=1}]`, World.getDimension("overworld"));
    const testmsg = `tellraw @a {"rawtext":[{"text":"§¶§cUAC §b►This works"}]}`;

    if(bbmenabled) {
        Commands.run(testmsg, World.getDimension("overworld"));
    }
    else {
        Commands.run("say §¶§cUAC §b►failed", World.getDimension("overworld"));
    }
})
*/

/*
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░████░░░████░░████████░░████████░░░░░░░
░░████░░░████░░███░░███░░████████░░░░░░░
░░████░░░████░░████████░░███░░░░░░░░░░░░
░░████░░░████░░███░░███░░████████░░░░░░░
░░███████████░░███░░███░░████████░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░█████░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░██░░░░██░░█████░░░░░░░░░░░░░░
░░░░░░░░░░░█░░░░░░████░░░██░░░░░░░░░░░░░
░░░░░░░░░░██░░░░░░██░░░░░░█░░░░░░░░░░░░░
░░░░░░░░░░░█░░░░░░█░░░░░░░█░░░░░░░░░░░░░
░░░░░░░░░░░██░░░░░░░░░░░░██░░░░░░░░░░░░░
░░░░░░░░░░░░██░░░░░░░░░███░░░░░░░░░░░░░░
░░░░░░░░░░░░░██░░░░█████░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░█████░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░████░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░██░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░█░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
