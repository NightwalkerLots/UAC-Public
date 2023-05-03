import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'vip',
    staff: 'false',
    description: 'Enables/Disables/Customizes vip effects for the player',
    usage: '[ vip ]',
    example: [
        'vip',
        'vip trail purple'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();

    let ranktag = `${ sender.getTags().find((tag) => tag.startsWith("rank:"))  }`;
    let colortag = `${ sender.getTags().find((tag) => tag.startsWith("color:"))  }`;
    let trailtag = `${ sender.getTags().find((tag) => tag.startsWith("trail:"))  }`;
    let usage = ['trail'];
    let trailtypes = [ 'purple', 'blue', 'green' ];

    //trails 
    if(args[0]) {
        if(!usage[0].includes(args[0])) { 
            return sender.tellraw(`§¶§cUAC ► §c§lInvaid Argument.\nUsage §7: §6UAC.vip §6[${usage.toString()}] [${trailtypes.toString()}]`); }
    }
    if(usage[0].includes(args[0])) {
        if(!args[1]) { return sender.tellraw(`§¶§cUAC ► §c§lNo Trail Style was selected`); }
        if(!trailtypes.includes(args[1])) { return sender.tellraw(`§¶§cUAC ► §c§lInvaid Style.\nUsage §7: §6UAC.vip §6[${usage.toString()}] [${trailtypes.toString()}]`); }
        if(trailtypes[0].includes(args[1])) {
            try {
                sender.runCommandAsync(`tag @s remove ${trailtag}`);
                sender.runCommandAsync(`tag @s add "trail:purple"`);
                sender.tellraw(`§¶§cUAC ► §b§lTrail type swtiched to §5Purple`);
            } catch {
                sender.runCommandAsync(`tag @s add "trail:purple"`);
                sender.tellraw(`§¶§cUAC ► §b§lTrail type set to §5Purple`);
            }
        }
        if(trailtypes[1].includes(args[1])) {
            try {
                sender.runCommandAsync(`tag @s remove ${trailtag}`);
                sender.runCommandAsync(`tag @s add "trail:blue"`);
                sender.tellraw(`§¶§cUAC ► §d§lTrail type swtiched to §3Blue`);
            } catch {
                sender.runCommandAsync(`tag @s add "trail:blue"`);
                sender.tellraw(`§¶§cUAC ► §d§lTrail type set to §3Blue`);
            }
        }
        if(trailtypes[2].includes(args[1])) {
            try {
                sender.runCommandAsync(`tag @s remove ${trailtag}`);
                sender.runCommandAsync(`tag @s add "trail:green"`);
                sender.tellraw(`§¶§cUAC ► §d§lTrail type swtiched to §2Green`);
            } catch {
                sender.runCommandAsync(`tag @s add "trail:green"`);
                sender.tellraw(`§¶§cUAC ► §d§lTrail type set to §2Green`);
            }
        }
    }
    else {
        sender.runCommandAsync( `function UAC/asset/uac_vip` );
        if(sender.hasTag('UAC_vip')) {
            sender.runCommandAsync(`tag @s remove "${ranktag}"`);
            sender.runCommandAsync(`tag @s remove "${colortag}"`);
            sender.runCommandAsync(`tag @s add "rank:UAC VIP"`);
            sender.runCommandAsync(`tag @s add "color:5"`);
        }
    }
});
