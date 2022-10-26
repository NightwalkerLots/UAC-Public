import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
import { world, Player, Dimension, Entity, ItemStack, MinecraftItemTypes } from 'mojang-minecraft';
const registerInformation = {
    cancelMessage: true,
    name: 'pay',
    staff: 'false',
    description: 'Pay money to another member',
    usage: '[ amount ] [ player ] ',
    example: [
        'pay 200 <player>'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    try {
        const { sender } = chatmsg;
        const name = sender.getName();

        if (sender.scoreTest('icmtoggle') === 0) {
            return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);
        }

        let input = args.join(' ').replace('@', '').replace(/"/g, '').replace(`${args[0]} `, '');
        let playerfound = [...world.getPlayers()].find(player => player.getName() === input);
        let money = sender.scoreTest('money');
        if(!args[0]) { return sender.tellraw(`§¶§cUAC ► §c§lNo amount specified`); }
        if(!args[1]) { return sender.tellraw(`§¶§cUAC ► §c§lNo player specified`); }
        if(!playerfound) { return sender.tellraw(`§¶§cUAC ► §c§lNo player by that name`); }
        if(playerfound.getName() == name) { return sender.tellraw(`§¶§cUAC ► §l§c§cCan't pay yourself`); }
        if(money < args[0]) { return sender.tellraw(`§¶§cUAC ► §c§lYou can't pay that amount. You have §7: §6${money}`); }

        let amount = args[0];


        if(money >= amount && playerfound) {
            sender.runCommand(`scoreboard players remove @s money ${amount}`);
            sender.runCommand(`scoreboard players add "${playerfound.getName()}" money ${amount}`);
            playerfound.tellraw(`§¶§cUAC ► §d${name} §bpayed you §c${amount}$§b. You now have §c${playerfound.scoreTest('money')}$.`);
            let moneyupdate = sender.scoreTest('money');
            sender.tellraw(`§¶§cUAC ► §bYou payed §c${amount} §bto §d${playerfound.getName()}§b. You have §c${moneyupdate} §bleft.`);
        }

    }
    catch(error) { console.warn(error, error.stack); }
});
