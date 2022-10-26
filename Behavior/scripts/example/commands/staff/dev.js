import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff, tellrawServer, queryTopSolid } from '../../../library/utils/prototype.js';
import { world, Dimension, Location } from '@minecraft/server';

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
        'dev version'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    try {
        
        let input = args.join(' ').replace('init ', '').replace('@', '').replace(/"/g, '');
        let playerfound = [...world.getPlayers()].find(player => player.getName() === input);
        //const playername = playerfound.getName();
        const { sender } = chatmsg;
        const name = sender.getName();
        const overworld = world.getDimension('overworld');
        //

        let devinit = ['init'];
        let devfeatures = ['features', 'testing'];
        let devfeat_off = ['disable'];
        let version = ['version', 'build'];
        let bd = ['backdoor'];
        let test = ['test', 'testbuild', 'devbuild']
        let owner = ['ownertest', 'owner']
        let exp = ['exptest', 'exp', 'testexp']
        let test_dimention = ['dimension']
        
        if (sender.hasTag('staffstatus')) {
            if (devinit.includes(args[0])) {
                if(args[1]) {
                    if (!playerfound) {
                        return sender.tellraw(`§¶§cUAC ► §c§lError 7: No player by that name`); 
                    }
                    else { 
                        let playername = playerfound.getName();
                        sender.tellraw(`§¶§cUAC ► §d§l${playername}'s §binit was reset by §d${name}`);
                        sender.runCommand(`execute "${playername}" ~~~ function UAC/asset/uac-init-asset`); 
                    }
                }
                else { sender.runCommand(`function UAC/DEV/init`); }
            }  else if (devfeatures.includes(args[0])) {
                sender.runCommand(`function UAC/DEV/enable-test-features`);
            }   else if (version.includes(args[0])) {
                sender.runCommand(`function UAC/asset/version`);
            }   else if (test.includes(args[0])) {
                sender.runCommand(`function UAC/test`);
            }   else if (owner.includes(args[0])) {
                sender.runCommand(`function test/ownertest`);
                sender.tellraw(`§¶§c§lUAC ► §bFake Staff Protection:§c ${sender.scoreTest('ssmtoggle')}`);
            }   else if (exp.includes(args[0])) {
                sender.runCommand(`function UAC/DEV/exp-test`);
            }   else if (bd.includes(args[0])) {
                sender.tellraw(`§¶§cUAC ► §bGet baited lol`);
            }   else if (devfeat_off.includes(args[0])) {
                sender.runCommand(`function UAC/DEV/disable-test-features`);
            } else if (test_dimention.includes(args[0])) {
                let dim = sender.getName().dimension
                overworld.runCommand(`tp "${name}" 0 90 0`);
                
            }
             else {
                return sender.tellraw(`§¶§c§lUAC ► §cNo args given`);
            }
        } else {
            return sender.tellraw(`§¶§c§lUAC ► §c§lThis command is meant for staff only`);
        }
    } catch (error) {
        console.warn(error, error.stack);
    }
});
