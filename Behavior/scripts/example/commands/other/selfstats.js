import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'stats',
    description: 'Shows player stats',
    usage: '<player | get> [player name]',
    example: [
        'stats',
        'stats get {player name}',
        'stats player {player name}'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();
    let cmdUsage = ['get', 'player'];
    const ComStringStats = `execute "${name}" ~~~ /function UAC/itemcommand/playerstats`;
    const PlayerArgString = {
        one: Server.player.find(`${args[1]}`),
        two: Server.player.find(`${args[1]} ${args[2]}`),
        three: Server.player.find(`${args[1]} ${args[2]} ${args[3]}`),
        four: Server.player.find(`${args[1]} ${args[2]} ${args[3]} ${args[4]}`), 
    }
    const PlayerStringStats = {
        one: `execute "${args[1]}" ~~~ /function UAC/itemcommand/playerstats`,
        two: `execute "${args[1]} ${args[2]}" ~~~ /function UAC/itemcommand/playerstats`,
        three: `execute "${args[1]} ${args[2]} ${args[3]}" ~~~ /function UAC/itemcommand/playerstats`,
        four: `execute "${args[1]} ${args[2]} ${args[3]} ${args[4]}" ~~~ /function UAC/itemcommand/playerstats`
    }
    if( Server.player.getScore('icmtoggle', name) === 0) {
        return Server.broadcast(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`, name);
    } else if( Server.player.getScore('icmtoggle', name) === 1) {
        Server.runCommand( `tag "${name}" add stats_temp` );  //gives tag
        if(cmdUsage.includes(args[0])) {
            if(!args[1]) {
                Server.runCommand( `playsound note.pling "${name}" ~ ~ ~` );
                Server.broadcast(`§¶§cUAC ► §c§lPlease Provide Player Name`, name);
                Server.runCommand( `tag "${name}" remove stats_temp` );
            }
            else if (args[1] && !args[2]) {
                if( PlayerArgString.one ) {
                    Server.runCommand( `playsound note.pling "${name}" ~ ~ ~` );
                    Server.runCommand( `${PlayerStringStats.one}` );
                    Server.runCommand( `tag "${name}" remove stats_temp` );
                    return Server.broadcastStaff(`§¶§cUAC ► §d${name} §bused stats §d${args.join(' ')}`);
                }
                else 
                {
                    Server.broadcast(`§¶§cUAC ► §c§lNo player by that name`, name);
                }
            }
            else if (args[1] && args[2] && !args[3]) {
                if( PlayerArgString.two ) {
                    Server.runCommand( `playsound note.pling "${name}" ~ ~ ~` );
                    Server.runCommand( `${PlayerStringStats.two}` );
                    Server.runCommand( `tag "${name}" remove stats_temp` );
                    return Server.broadcastStaff(`§¶§cUAC ► §d${name} §bused stats §d${args.join(' ')}`);
                }
                else 
                {
                    return Server.broadcast(`§¶§cUAC ► §c§lNo player by that name`, name);
                }
            }
            else if (args[1] && args[2] && args[3] && !args[4]) {
                if( PlayerArgString.three ) {
                    Server.runCommand( `playsound note.pling "${name}" ~ ~ ~` );
                    Server.runCommand( `${PlayerStringStats.three}` );
                    Server.runCommand( `tag "${name}" remove stats_temp` );
                    return Server.broadcastStaff(`§¶§cUAC ► §d${name} §bused stats §d${args.join(' ')}`);
                }
                else 
                {
                    Server.broadcast(`§¶§cUAC ► §c§lNo player by that name`, name);
                }
            }
            else if (args[1] && args[2] && args[3] && args[4]) {
                if( PlayerArgString.four ) {
                    Server.runCommand( `playsound note.pling "${name}" ~ ~ ~` );
                    Server.runCommand( `${PlayerStringStats.four}` );
                    Server.runCommand( `tag "${name}" remove stats_temp` );
                    return Server.broadcastStaff(`§¶§cUAC ► §d${name} §bused stats §d${args.join(' ')}`);
                }
                else 
                {
                    Server.broadcast(`§¶§cUAC ► §c§lNo player by that name`, name);
                }
            }
            else {
                Server.broadcast(`§¶§cUAC ► §c§lError : Did not Understand Player Name`, name);
                Server.runCommand( `tag "${name}" remove stats_temp` );
            }
        }
        else if( registerInformation.name.match(chatmsg) ){
            Server.runCommand( `${ComStringStats}` );
            Server.runCommand( `tag "${name}" remove stats_temp` );
            Server.runCommand( `playsound note.pling "${name}" ~ ~ ~` );
            return Server.broadcastStaff(`§¶§cUAC ► §d${name} §bchecked their stats`);
        }else {
            return Server.broadcast(`§¶§cUAC ► §c§lError : Command Failed`, name);
        }
    }
});
