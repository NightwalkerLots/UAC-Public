import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'worldspawn',
    description: 'Configure the World Spawn in UAC',
    usage: '[ set | remove ]',
    example: [
        'worldspawn remove',
        'worldspawn set 0 90 0'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    let worldset = ['set'];
    let worldremove = ['remove']; 

if(Server.player.hasTag('staffstatus', chatmsg.sender.nameTag)) {
    if(worldset.includes(args[0])) {    
        Server.runCommand( `scoreboard players operation worlddum Worldx = "${chatmsg.sender.nameTag}" X_Coordinate` );
        Server.runCommand( `scoreboard players operation worlddum Worldy = "${chatmsg.sender.nameTag}" Y_Coordinate` );
        Server.runCommand( `scoreboard players operation worlddum Worldz = "${chatmsg.sender.nameTag}" Z_Coordinate` );
        Server.runCommand( `scoreboard players set "${chatmsg.sender.nameTag}" Worldx ${Server.player.getScore('X_Coordinate', chatmsg.sender.nameTag)}` );
        Server.runCommand( `scoreboard players set "${chatmsg.sender.nameTag}" Worldy ${Server.player.getScore('Y_Coordinate', chatmsg.sender.nameTag)}` );
        Server.runCommand( `scoreboard players set "${chatmsg.sender.nameTag}" Worldz ${Server.player.getScore('Z_Coordinate', chatmsg.sender.nameTag)}` );
        Server.runCommand( `scoreboard players set worlddum worldcustom 1` );
        Server.broadcast(`§¶§cUAC ► §b§lWorld Spawn configured to §e${Server.player.getScore('Worldx', chatmsg.sender.nameTag)} ${Server.player.getScore('Worldy', chatmsg.sender.nameTag)} ${Server.player.getScore('Worldz', chatmsg.sender.nameTag)}§b! Players will be sent here after passing World Border`, chatmsg.sender.nameTag);
    }
    else if(worldremove.includes(args[0])) {  
        Server.runCommand( `scoreboard players set worlddum worldcustom 0` );
        Server.runCommand( `scoreboard players set worlddum Worldx 0` );
        Server.runCommand( `scoreboard players set worlddum Worldz 0` );
        Server.runCommand( `scoreboard players set worlddum Worldy 0` ); 
        Server.runCommand( `scoreboard players operation "${chatmsg.sender.nameTag}" Worldx = worlddum Worldx` ); 
        Server.runCommand( `scoreboard players operation "${chatmsg.sender.nameTag}" Worldy = worlddum Worldy` ); 
        Server.runCommand( `scoreboard players operation "${chatmsg.sender.nameTag}" Worldz = worlddum Worldz` ); 
        Server.broadcast(`§¶§cUAC ► §b§lCustom World Spawn has been set back to default`, chatmsg.sender.nameTag);
    }
    else {
        Server.broadcast(`§¶§cUAC ► §cERROR 2! §6Usage Example §7:§b§l UAC.worldspawn [ set | remove ]`, chatmsg.sender.nameTag);
    }
}
else {
    Server.broadcast(`§¶§cUAC ► §c§lError 4: Only Staff can configure world spawn`, chatmsg.sender.nameTag);
}
});