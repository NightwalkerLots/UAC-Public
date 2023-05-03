import { Server } from '../../../library/Minecraft.js';
import { scoreTest } from '../../../library/utils/score_testing';
import { world } from '@minecraft/server';
import { TellRB } from '../../../library/utils/prototype.js';

const registerInformation = {
    cancelMessage: true,
    name: 'dev',
    private: 'true',
    description: 'developer commands',
    usage: '[ yeet ]',
    example: [
        'dev init @player',
        'dev init',
        'dev features',
        'dev version',
        'dev scoretest [objective]'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    try {
        
        let input = args.join(' ').replace('init ', '').replace('@', '').replace(/"/g, '');
        let playerfound = [...world.getPlayers()].find(player => player.getName() === input);
        
        const { sender } = chatmsg;
        const name = sender.getName();
        
        if (sender.hasTag('staffstatus')) {

            switch (args[0]) {
                case undefined:
                    return sender.tellraw(`§¶§c§lUAC ► §cNo args given`);

                case 'init': {
                    if(args[1]) {
                        if (!playerfound) {
                            return sender.tellraw(`§¶§cUAC ► §c§lError 7: No player by that name`); 
                        }
                        else { 
                            let playername = playerfound.getName();
                            sender.tellraw(`§¶§cUAC ► §d§l${playername}'s §binit was reset by §d${name}`);
                            return sender.runCommandAsync(`execute "${playername}" ~~~ function UAC/asset/uac-init-asset`); 
                        }
                    }
                    else { 
                        sender.runCommandAsync(`function UAC/DEV/init`);
                        sender.tellraw(`§¶§cUAC ► §bINIT reset for all players`);
                        TellRB(`flag_0`, `UAC ► ${name} reset the INIT process for all players via developer command 'UAC.dev init' `);
                    }
                } break;

                case 'features': {  //enable testing features
                    sender.runCommandAsync(`function UAC/DEV/enable-test-features`);
                } break;

                case 'disable': {  //disable testing features
                    sender.runCommandAsync(`function UAC/DEV/disable-test-features`);
                }

                case 'version': {
                    sender.runCommandAsync(`function UAC/asset/version`);
                } break;

                case 'test': {
                    sender.runCommandAsync(`function UAC/test`);
                } break;

                case 'owner': {
                    sender.runCommandAsync(`function test/ownertest`);
                    sender.tellraw(`§¶§c§lUAC ► §bFake Staff Protection Toggle:§c ${scoreTest(sender, 'ssmtoggle')}`);
                } break;

                case 'exp': { //test to see if experimental features are on
                    sender.runCommandAsync(`function UAC/DEV/exp-test`);
                } break;

                case 'backdoor': {
                    sender.tellraw(`§¶§cUAC ► §bGet baited lol`);
                } break;

                case 'scoretest': {
                    let result = scoreTest(sender, `${args[1]}`);
                    sender.tellraw(`§¶§c§lUAC ► §d${name} §7: §c${args[1]} §7: §7${result}`);
                } break;

                case 'RB': {
                    TellRB(`${args[1]}`, `${args.join(' ').replace(`${args[0]}`, '').replace(`${args[1]}`, '')}`);
                } break;

                case 'RB1': {
                    TellRB(`flag_0`, `${args.join(' ').replace(`${args[0]}`, '')}`);
                } break;

                case 'testop': {
                    if(!sender.isOp()) { sender.tellraw(`tested not op`) } 
                } break;
            }
        } else {
            return sender.tellraw(`§¶§c§lUAC ► §c§lThis command is meant for staff only`);
        }
    } catch (error) {
        console.warn(error, error.stack);
    }
});
