import { Server } from '../../../library/Minecraft.js';
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
    const data = Server.runCommand(`tag "${chatmsg.sender.nameTag}" list`);
    const coordFormat = /(?<=[x-zX-Z]: )(-\d+|\d+)/g;
    const homeName = args.slice(1).join(' ').toLowerCase();
    const homeRegex = new RegExp(`\\$\\(Home{Home-Name: ${homeName}, X: (-\\d+|\\d+), Y: (-\\d+|\\d+), Z: (-\\d+|\\d+)(.*)}\\)`);
    const findHomeNames = /(?<=\$\(Home{Home-Name: ).+?(?=, X: (-\d+|\d+), Y: (-\d+|\d+), Z: (-\d+|\d+)}\))/g;
    const findXYZ = `${data.statusMessage.match(homeRegex)}`.match(coordFormat);
    let listOptions = ['list', 'all'];
    let setOptions = ['set', 'add'];
    let removeOptions = ['remove', 'unadd'];
    let warpOptions = ['warp', 'tp'];
    if( Server.player.getScore('icmtoggle', chatmsg.sender.nameTag) === 0) {
        return Server.broadcast(`§¶§cUAC ► §c§lPlayer Commands aren't enabled `, chatmsg.sender.nameTag);
    } else if( Server.player.getScore('icmtoggle', chatmsg.sender.nameTag) === 1) {

        if (!args.length || listOptions.includes(args[0])) {
            const allHomes = data.statusMessage.match(findHomeNames);
            return Server.broadcast(`${allHomes ? `§l§¶§cUAC ► §6Homes §7: §b§l${allHomes.length}\n§¶§cUAC ► §6Home Names §7: §b§l${allHomes.join('§b§l, §b§l')}` : '§¶§cUAC ► §c§lNo Homes Set'}`, chatmsg.sender.nameTag);
        }
        else if (setOptions.includes(args[0])) {
            if (!args[1])
                return Server.broadcast('§¶§cUAC ► §cPlease type a UNIQUE home name to set!', chatmsg.sender.nameTag);
            if (homeName.match(coordFormat))
                return Server.broadcast('§¶§cUAC ► §cYou may not indentify your home name in a coordinate format!', chatmsg.sender.nameTag);
            if (data.statusMessage.match(homeRegex))
                return Server.broadcast('§¶§cUAC ► §cYou already have a home set with that name!', chatmsg.sender.nameTag);
            Server.runCommand(`tag "${chatmsg.sender.nameTag}" add "$(Home{Home-Name: ${homeName}, X: ${Math.trunc(chatmsg.sender.location.x)}, Y: ${Math.trunc(chatmsg.sender.location.y)}, Z: ${Math.trunc(chatmsg.sender.location.z)}})"`);
            Server.runCommand( `playsound note.pling "${chatmsg.sender.nameTag}" ~ ~ ~` );
            return Server.broadcast(`§¶§cUAC ► §bYou have set a home with the name §a${homeName} §bat§r: §a${Math.trunc(chatmsg.sender.location.x)}§r, §a${Math.trunc(chatmsg.sender.location.y)}§r, §a${Math.trunc(chatmsg.sender.location.z)}`, chatmsg.sender.nameTag);
        }
        else if (removeOptions.includes(args[0])) {
            if (!args[1])
                return Server.broadcast('§¶§cUAC ► §cPlease type a home name to remove!', chatmsg.sender.nameTag);
            if (!data.statusMessage.match(homeRegex))
                return Server.broadcast("§¶§cUAC ► §cYou don't have a home with that name!", chatmsg.sender.nameTag);
            else {
                Server.runCommand(`tag "${chatmsg.sender.nameTag}" remove "$(Home{Home-Name: ${homeName}, X: ${findXYZ[0]}, Y: ${findXYZ[1]}, Z: ${findXYZ[2]}})"`);
                return Server.broadcast(`§¶§cUAC ► §bSuccessfully removed home with the name §a${homeName} §bat §a${findXYZ[0]}§r, §a${findXYZ[1]}§r, §a${findXYZ[2]}`, chatmsg.sender.nameTag);
            }
            ;
        }
        else if (warpOptions.includes(args[0])) {
            if (!args[1])
                return Server.broadcast('§¶§cUAC ► §cPlease type a home name to warp to!', chatmsg.sender.nameTag);
            if (!data.statusMessage.match(homeRegex))
                return Server.broadcast("§¶§cUAC ► §cYou don't have a home with that name!", chatmsg.sender.nameTag);
            Server.runCommand(`execute "${chatmsg.sender.nameTag}" ~~~ tp @s ${findXYZ[0]} ${findXYZ[1]} ${findXYZ[2]}`);
            Server.runCommand( `playsound note.pling "${chatmsg.sender.nameTag}" ~ ~ ~` );
            return Server.broadcast(`§¶§cUAC ► §bYou have been teleported to §a${args[1]} §bat §a${findXYZ[0]}§r, §a${findXYZ[1]}§r, §a${findXYZ[2]}`, chatmsg.sender.nameTag);
        }
        else
            return Server.broadcast("§¶§cUAC ► §6USAGE §7: §bUAC.home <list | set | remove | warp> [home name]", chatmsg.sender.nameTag);
    }
});
