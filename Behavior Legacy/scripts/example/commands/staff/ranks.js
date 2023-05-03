import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import { world } from '@minecraft/server';
import { setScore } from '../../../library/utils/score_testing.js'
const overworld = world.getDimension('overworld');
const registerInformation = {
    cancelMessage: true,
    name: 'ranks',
    staff: 'management',
    description: 'Manges chat ranks',
    usage: '[on | off | add | remove | color | give]',
    example: [
        'ranks [on | off]',
        'ranks add [ rank ]',
        'ranks remove',
        'ranks remove @player',
        'ranks color [ color ]',
        'ranks give @player [ rank ]',
        'ranks color edit @player [ color ]'

    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    try {
        const { sender } = chatmsg;
        const self = sender.getName();
        
        const usage = ['on', 'off', 'add', 'remove', 'color', 'give'];

        let ranktag = `${ sender.getTags().find((tag) => tag.startsWith("rank:"))  }`;
        let colortag = `${ sender.getTags().find((tag) => tag.startsWith("color:"))  }`;

        if (sender.hasTag('staffstatus')) {
            if(!usage.includes(args[0])) { return sender.tellraw(`§¶§cUAC ► §c§lInvalid first argument. Usage :§6 ${usage.toString()}`); }

            switch(args[0]) {
                case undefined:
                    return sender.tellraw(`§¶§cUAC ► §c§lNo arguments were specified. Usage :§6 ${usage.toString()}`);
                case 'on': {
                    setScore('crdummy', 'chatrank', 1, false);
                    tellrawStaff(`§¶§cUAC STAFF ► §6Chat Ranks §bwere §2ENABLED §bby  §d${self}`);
                } break;
                case 'off': {
                    setScore('crdummy', 'chatrank', 0, false);
                    tellrawStaff(`§¶§cUAC STAFF ► §6Chat Ranks §bwere §cDISABLED §bby  §d${self}`);
                } break;
                case 'give': { //add rank other
                    let input = args.join(' ').replace('give ', '').replace('@', '').replace(/"/g, '').replace(` ${args[2]}`, '');
                    let playerfound = [...world.getPlayers()].find(player => player.getName() === input);

                    if(!args[1]) { return sender.tellraw(`§¶§cUAC ► §c§lNo player specified`); }
                    if(!playerfound) { return sender.tellraw(`§¶§cUAC ► §c§lNo player by that name`); }
                    if(!args[2]) { return sender.tellraw(`§¶§cUAC ► §c§lNo rank was specified`); }

                    sender.runCommandAsync(`tag "${playerfound.getName()}" add "temprank:${args[2]}"`);
                    tellrawStaff(`§¶§cUAC STAFF ► §6Chat Ranks §bthe §c${args[2]} §brank was given to §d${playerfound.getName()} §bby §d${self}`);
                } break;
                case 'add': { // add rank self
                    try {
                        if(!args[1]) { return sender.tellraw(`§¶§cUAC ► §c§lNo ranks were specified`); }
                        sender.runCommandAsync(`tag @s remove "${ranktag}"`);
                        sender.runCommandAsync(`tag @s add "rank:${args[1]}"`);
                        tellrawStaff(`§¶§cUAC STAFF ► §6Chat Ranks §bthe §c${args[1]} §brank was given to §d${self}`);
    
                    } catch(error) { console.warn(error, error.stack); }
                } break;
                case 'remove': { //remove rank other
                    try {
                        if(args[1]) {
                            let input = args.join(' ').replace('remove ', '').replace('@', '').replace(/"/g, '');
                            let playerfound = [...world.getPlayers()].find(player => player.getName() === input);
                            if(!playerfound) { return sender.tellraw(`§¶§cUAC ► §c§lNo player by that name`); }
    
                            tellrawStaff(`§¶§cUAC STAFF ► §6Chat Ranks §d${playerfound.getName()} §bhad their rank cleared by §d${self}`);
                            sender.runCommandAsync(`tag "${playerfound.getName()}" add rankremove`);
                        } else {
                            tellrawStaff(`§¶§cUAC STAFF ► §6Chat Ranks §bthe §c${ranktag} §brank was cleared from §d${self}`);
                            sender.runCommandAsync(`tag @s remove "${ranktag}"`);
                            sender.runCommandAsync(`tag @s add "rank:Member"`);
                        }
                    } catch(error) { 
                        console.warn(error, error.stack); 
                        sender.tellraw(`§¶§cUAC ► §6Chat Ranks §cno ranks to remove`);
                    }
                } break;
                case 'color': {
                    try {
                        if(!args[1]) { return sender.tellraw(`§¶§cUAC ► §cNo color was specified`); }
                        else {
                            
                            let colors = ['white', 'black', 'blue', 'green', 'red', 'purple', 'yellow', 'pink'];
                            let rankcolor = `${
                                args[1]
                                    .replace('white', '7')
                                    .replace('black', '0')
                                    .replace('blue', 'b')
                                    .replace('green', '2')
                                    .replace('red', 'c')
                                    .replace('purple', '5')
                                    .replace('yellow', '6')
                                    .replace('pink', 'd')
                            }`;
                            if(args[1] === 'edit') {
                                if(!args[2]) { return sender.tellraw(`§¶§cUAC ► §c§lNo player specified`); }
                                let input = args.join(' ').replace('color ', '').replace('edit ', '').replace('@', '').replace(/"/g, '').replace(` ${args[3]}`, '');
                                let playerfound = [...world.getPlayers()].find(player => player.getName() === input);
                                
                                if(!playerfound) { return sender.tellraw(`§¶§cUAC ► §c§lNo player by that name`); }
                                if(!args[3]) { return sender.tellraw(`§¶§cUAC ► §c§lNo color was specified`); }
                                if(!colors.includes(args[3])) { return sender.tellraw(`§¶§cUAC ► §cInvalide Color. Possible Colors : §6${colors.toString()}`) }
        
                                let rankcolorother = `${
                                    args[3]
                                        .replace('white', '7')
                                        .replace('black', '0')
                                        .replace('blue', 'b')
                                        .replace('green', '2')
                                        .replace('red', 'c')
                                        .replace('purple', '5')
                                        .replace('yellow', '6')
                                        .replace('pink', 'd')
                                }`;
                                sender.runCommandAsync(`tag "${playerfound.getName()}" add "tempcolor:${rankcolorother}"`);
                                tellrawStaff(`§¶§cUAC STAFF ► §6Chat Ranks §bthe §c${args[3]} §bcolor was given to §d${playerfound.getName()} §bby §d${self}`);
        
        
                            } else if(args[1] === 'clear') {
                                sender.runCommandAsync(`tag @s remove "${colortag}"`);
                                sender.runCommandAsync(`tag @s add "color:b"`);
                                tellrawStaff(`§¶§cUAC STAFF ► §6Chat Ranks §d${self} §bcleared their rank color`);
                            } else if(colors.includes(args[1])) {
                                if(colortag) { sender.runCommandAsync(`tag @s remove "${colortag}"`);}
                                    sender.runCommandAsync(`tag @s add "color:${rankcolor}"`);
                                    tellrawStaff(`§¶§cUAC STAFF ► §6Chat Ranks §bthe §c${args[1]} §bcolor was given §d${self}`);
                            } else {
                                sender.tellraw(`§¶§cUAC ► §cInvalide Color. §bUAC.ranks color clear§c, or Possible Colors : §6${colors.toString()}`);
                            }
                        }
                    } catch(error) { console.warn(error, error.stack); }
                } break;
            }
        } else { return sender.tellraw(`§¶§cUAC ► §c§lError 4: Only Staff can use this command`); }


    } catch(error) { console.warn(error, error.stack); }
});