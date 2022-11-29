import { scoreTest, tellrawServer } from 'library/utils/prototype.js';



function ops() {
    let opsbool = scoreTest('opsdummy', 'opstoggle');
    if(opsbool == false) return;

    let players = world.getPlayers();
    for (let player of players) {   
        const name = player.getName();

        if(scoreTest(player.nameTag, 'is_sleeping')) {
            player.runCommandAsync(`time set sunrise`);
            player.runCommandAsync(`time add 2000`);
            player.runCommandAsync(`weather clear`);
            tellrawServer(`§l§¶§cUAC §6SYSTEM ► §d${name} §btriggered one player sleep`);
        }
    }
}

export { ops }