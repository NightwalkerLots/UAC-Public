import './commands/import-commands.js';  //all player chat commands
import { Commands, World, Player, Dimension, Entity, ItemStack, MinecraftItemTypes } from 'mojang-minecraft';

//This runs a test to see if gametest is even on. Curtain modules will switch methods if gametest fails
World.events.tick.subscribe(() => {
    const gt_test = `scoreboard players set @r[scores={has_gt=0}] has_gt 1`
    Commands.run(gt_test, World.getDimension("overworld"));
})

/*
░░████░░░████░░████████░░████████░░░░░░░
░░████░░░████░░███░░███░░████████░░░░░░░
░░████░░░████░░████████░░███░░░░░░░░░░░░ <3
░░████░░░████░░███░░███░░████████░░░░░░░
░░███████████░░███░░███░░████████░░░░░░░
*/

// Filter CBE items
const bannedItems = [
    'minecraft:movingblock',
    'minecraft:beehive',
    'minecraft:bee_nest',
    'minecraft:cod_bucket',
    'minecraft:pufferfish_bucket',
    'minecraft:salmon_bucket',
    'minecraft:tropical_fish_bucket',
    'minecraft:powder_snow_bucket',
    'minecraft:axolotl_bucket'
];

let tpsArray = [];
World.events.tick.subscribe(({deltaTime,currentTick}) => {
    try {
        const currentTPS = deltaTime
        tpsArray.unshift(currentTPS);
        if (tpsArray.length > 250) { tpsArray.pop(); }
        const tps = 1/(tpsArray.reduce((a, b) => a + b, 0) / tpsArray.length);
        console.warn(`${tps.toFixed(5)}`);
        let players = World.getPlayers();
        for (const player of players) {                                                                     //scorecheck for vanilla api
                let acmbool = Boolean(parseInt(Commands.run(`scoreboard players test acmtoggledummy ACM *`, World.getDimension('overworld')).statusMessage.match(/-?\d+/))); 
                let playerInventory = player.getComponent("minecraft:inventory").container;
                let itemArray = [];
                for (let i = 0; i < playerInventory.size; i++) {
                    const item = playerInventory.getItem(i);
                    if (!item) { continue;}
                    console.warn(item.id);
                    if (bannedItems.includes(item.id)) {
                        if(acmbool) {
                            itemArray.unshift(item.id);
                            playerInventory.setItem(i, new ItemStack(MinecraftItemTypes.air, 0, 0)); //removes item
                        }
                    }
                }
                if (itemArray.length) { Commands.run(`execute "${player.nameTag}" ~~~ execute @s[tag=!staffstatus,scores={acmtoggle=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§c§lUAC ► §6Anti-CBE §d${player.nameTag} §bwas temp-kicked for having §c${itemArray}"}]}`, World.getDimension('overworld')); }
                if (itemArray.length) { Commands.run(`execute "${player.nameTag}" ~~~ execute @s[tag=!staffstatus,scores={acmtoggle=1}] ~~~ function UAC/asset/cbeitem_gt_warn`, World.getDimension('overworld')); }
        }
    } catch (error) {
        console.warn(error);
    }
});

// Run when a player loads and joins
// All This was contributed by MrPatches123
const betaPlayerFunctions = {
    runCommand: function (command) {
        const name = this.nameTag ?? this;
        return Commands.run(`${command.replaceAll('@s',`"${name}"`)}`, World.getDimension('overworld'));
    },
    runCommands: function () {
        const commands = (typeof arguments[0] === 'array') ? arguments[0] : [...arguments];
        const name = this.nameTag ?? this;
        let returnArray = [];
        for (const command of commands) {
            return Commands.run(`${command.replaceAll('@s',`"${name}"`)}`, World.getDimension('overworld'));
        } return returnArray
        
    },
    getName: function () {
        //if (/"|\\/.test(this.nameTag)) {
        //    this.nameTag = this.nameTag.replace(/"|\\/g, '');
        //}
         return this.nameTag;
    } //not beta but fixes nameSpoof command tartgeting issues
};
Object.assign(Player.prototype, betaPlayerFunctions);
Object.assign(Entity.prototype, betaPlayerFunctions);
Object.assign(String.prototype, betaPlayerFunctions);

const betaDimensionFunctions = {
    runCommand: function (command) {
        const name = this.nameTag;
        return Commands.run(`${command}`, this);
    },
    runCommands: function () {
        const commands = (typeof arguments[0] === 'array') ? arguments[0] : [...arguments];
        const name = this.nameTag;
        let returnArray = [];
        for (const command of commands) {
            return Commands.run(`${command}`, this);
        } return returnArray
        
    }
}
Object.assign(Dimension.prototype, betaDimensionFunctions);
const world = World
const overworld = World.getDimension('overworld');
let loaded = false;
let playerMap = new Map();

World.events.tick.subscribe(({ currentTick, deltaTime }) => {
    try {
        if (!loaded) {
            try {
                overworld.runCommand('testfor @a');
                overworld.runCommand(`function UAC/packages/serverloaded`).statusMessage;
                loaded = true;
            } catch { }
        } else {
            let players = world.getPlayers()
            const playerlist = players.map(player => player.getName());
            const playersLeave = Object.keys(Object.fromEntries(playerMap)).filter(mapPlayer => !playerlist.some(playerCurrent => playerCurrent === mapPlayer));
            if (playersLeave.length) { playersLeave.forEach(player => playerMap.delete(player)); }
            let string = '';
            for (let player of players) {
                const name = player.getName();
                let object = playerMap.get(name) ?? {};
                let { playerLoaded = false } = object;
                if (!playerLoaded) {
                    try {
                        overworld.runCommand(`testfor @p[name="${name}"]`);
                        overworld.runCommand(`execute "${name}" ~~~ function UAC/packages/playerjoined`).statusMessage;
                        object.playerLoaded = true;
                        playerMap.set(name, object);
                        continue;
                    } catch { }
                }
                for (const property in player){
                    if (typeof player[property] === 'object') {
                      string += `${property}:\n`
                      for (const prop in player[property]) {
                        string += (player[property][prop].toString().includes('function')) ?  '' : `   ${prop}: ${player[property][prop]}\n`;
                      }
                    } else {
                      string += (player[property].toString().includes('function')) ?  '' : `${property}: ${player[property]}\n`;
                    }
                }
                //Commands.run(`say ${string}`, World.getDimension('overworld'));
            }
        }
    } catch (error) {
      //  overworld.runCommand(`w @a[tag=staffstatus] ${error} - ${error.stack}`);
      // Uncomment for debug chat
    }
});