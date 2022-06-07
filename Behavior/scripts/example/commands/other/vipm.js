import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
const registerInformation = {
    cancelMessage: true,
    name: 'vip',
    staff: 'false',
    description: 'Enables/Disables vip effects for the player',
    usage: '[ vip ]',
    example: [
        'vip'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();

    let ranktag = `${ sender.getTags().find((tag) => tag.startsWith("rank:"))  }`;
    let colortag = `${ sender.getTags().find((tag) => tag.startsWith("color:"))  }`;

    if(args[0])
    {
        tellrawStaff(`§¶§cUAC ► §e§lYou found a Easter Egg! Yeet! Hello There. Let this be our little secret ;)`);
    }
    else {
        sender.runCommand( `function UAC/asset/uac_vip` );
        if(sender.hasTag('UAC_vip')) {
            sender.runCommand(`tag @s remove "${ranktag}"`);
            sender.runCommand(`tag @s remove "${colortag}"`);
            sender.runCommand(`tag @s add "rank:UAC VIP"`);
            sender.runCommand(`tag @s add "color:5"`);
        }
    }
});
