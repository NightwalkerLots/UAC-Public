import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'display',
    description: 'Heads up display for server or self stats',
    usage: '[ self | server | off ]',
    example: [
        'display self',
        'display server',
        'display off',
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();
    let personal = ['self', 'personal'];
    let realm = ['server', 'realm'];
    let off = ['off', 'disable'];

    if( Server.player.getScore('icmtoggle', name) === 0) {
        return Server.broadcast(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`, name);
    }else if( Server.player.getScore('hmmtoggle', name) === 1 || Server.player.getScore('hmmtoggle', name) === 2 ) {
        return Server.broadcast(`§¶§cUAC ► §c§lRealm owner has set a global hotbar message `, name);
    }else if( registerInformation.name.match('display') ){
        if(personal.includes(args[0]))
        {
            Server.runCommand( `playsound note.pling "${name}" ~ ~ ~` );
            Server.broadcast(`§l§¶§cUAC ► §b§lNow showing display for self stats `, name);
            Server.runCommand( `scoreboard players set "${name}" hometp 1337` );
            Server.broadcastStaff(`§¶§cUAC ► §d${name} §bset their hotbar display to §epersonal`);
        }
        else if(realm.includes(args[0])) {
            Server.runCommand( `playsound note.pling "${name}" ~ ~ ~` );
            Server.broadcast(`§l§¶§cUAC ► §b§lNow showing display for server stats `, name);
            Server.runCommand( `scoreboard players set "${name}" hometp 420` );
            Server.broadcastStaff(`§¶§cUAC ► §d${name} §bset their hotbar display to §eserver`);
        }
        else if(off.includes(args[0])) {
            Server.runCommand( `playsound note.pling "${name}" ~ ~ ~` );
            Server.broadcast(`§l§¶§cUAC ► §b§lStats Display has been §cDISABLED `, name);
            Server.runCommand( `scoreboard players set "${name}" hometp 3` );
            Server.broadcastStaff(`§¶§cUAC ► §d${name} §bset their hotbar display to §eoff`);
        }else {
            return Server.broadcast(`§¶§cUAC ► §cERROR! §6Usage Example §7:§b§l UAC.display [ self | server | off ]`, name);
        }
    }else {
        return Server.broadcast(`§¶§cUAC ► §cERROR 2! §6Usage Example §7:§b§l UAC.display [ self | server | off ]`, name);
    }
});