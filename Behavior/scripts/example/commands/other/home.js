import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
const registerInformation = {
    cancelMessage: true,
    name: 'home',
    description: 'Use this command to list/set/remove/warp to home',
    usage: '<list | set | remove | warp> [home name]',
    example: [
        'home list',
        'home set <home name>',
        'home remove <home name>',
        'home warp <home name>'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();
    const tags = sender.getTags()
    const coordFormat = /(?<=[x-zX-Z]: )(-\d+|\d+)/g;
    const homeName = args.slice(1).join(' ').toLowerCase();
    const homeRegex = new RegExp(`\\$\\(Home{Home-Name: ${homeName}, X: (-\\d+|\\d+), Y: (-\\d+|\\d+), Z: (-\\d+|\\d+)(.*)}\\)`);
    const findHomeNames = /(?<=\$\(Home{Home-Name: ).+?(?=, X: (-\d+|\d+), Y: (-\d+|\d+), Z: (-\d+|\d+)}\))/g;
    const findXYZ = `${tags.toString().match(homeRegex)}`.match(coordFormat);
    let listOptions = ['list', 'all'];
    let setOptions = ['set', 'add'];
    let removeOptions = ['remove', 'unadd'];
    let warpOptions = ['warp', 'tp'];
    if (sender.scoreTest('icmtoggle') === 0) {
        return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);
    } else if (sender.scoreTest('icmtoggle') === 1) {

        if (!args.length || listOptions.includes(args[0])) {
            const allHomes = data.statusMessage.match(findHomeNames);
            return sender.tellraw(`${allHomes ? `§l§¶§cUAC ► §6Homes §7: §b§l${allHomes.length}\n§¶§cUAC ► §6Home Names §7: §b§l${allHomes.join('§b§l, §b§l')}` : '§¶§cUAC ► §c§lNo Homes Set'}`);
        }
        else if (setOptions.includes(args[0])) {
            if (!args[1])
                return sender.tellraw('§¶§cUAC ► §cPlease type a UNIQUE home name to set!');
            if (homeName.match(coordFormat))
                return sender.tellraw('§¶§cUAC ► §cYou may not indentify your home name in a coordinate format!');
            if (data.statusMessage.match(homeRegex))
                return sender.tellraw('§¶§cUAC ► §cYou already have a home set with that name!');
            sender.runCommand(`tag @s add "$(Home{Home-Name: ${homeName}, X: ${Math.trunc(sender.location.x)}, Y: ${Math.trunc(sender.location.y)}, Z: ${Math.trunc(sender.location.z)}})"`);
            sender.runCommand(`playsound note.pling @s ~ ~ ~`);
            tellrawStaff(`§¶§cUAC ► §d${name} §bhas set their §e${homeName} §blocation`);
            return sender.tellraw(`§¶§cUAC ► §bYou have set a home with the name §a${homeName} §bat§r: §a${Math.trunc(sender.location.x)}§r, §a${Math.trunc(sender.location.y)}§r, §a${Math.trunc(sender.location.z)}`);
        }
        else if (removeOptions.includes(args[0])) {
            if (!args[1])
                return sender.tellraw('§¶§cUAC ► §cPlease type a home name to remove!');
            if (!data.statusMessage.match(homeRegex))
                return sender.tellraw("§¶§cUAC ► §cYou don't have a home with that name!");
            else {
                sender.runCommand(`tag @s remove "$(Home{Home-Name: ${homeName}, X: ${findXYZ[0]}, Y: ${findXYZ[1]}, Z: ${findXYZ[2]}})"`);
                return sender.tellraw(`§¶§cUAC ► §bSuccessfully removed home with the name §a${homeName} §bat §a${findXYZ[0]}§r, §a${findXYZ[1]}§r, §a${findXYZ[2]}`);
            }
            ;
        }
        else if (warpOptions.includes(args[0])) {
            if (!args[1])
                return sender.tellraw('§¶§cUAC ► §cPlease type a home name to warp to!');
            if (!data.statusMessage.match(homeRegex))
                return sender.tellraw("§¶§cUAC ► §cYou don't have a home with that name!");
            sender.runCommand(`tp @s ${findXYZ[0]} ${findXYZ[1]} ${findXYZ[2]}`);
            sender.runCommand(`function particle/nether_poof`);
            tellrawStaff(`§¶§cUAC ► §d${name} §bwarped to their §e${homeName} §blocation`);
            return sender.tellraw(`§¶§cUAC ► §bYou have been teleported to §a${args[1]} §bat §a${findXYZ[0]}§r, §a${findXYZ[1]}§r, §a${findXYZ[2]}`);
        }
        else
            return sender.tellraw("§¶§cUAC ► §6USAGE §7: §bUAC.home <list | set | remove | warp> [home name]");
    }
});
