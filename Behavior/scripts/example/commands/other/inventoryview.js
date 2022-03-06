import { world, EntityQueryOptions } from 'mojang-minecraft';
import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff, content } from '../../../library/utils/prototype.js';
const registerInformation = {
    cancelMessage: true,
    name: 'inventory',
    description: 'Views a Player Inventory or yours depending if argument zero is provided',
    usage: '[ PlayerName ]',
    example: [
        'inventory PlayerName',
        'inventory "Player Name"',
        'inventory'
    ]
};
// The framework for grabbing inventory was created by balloon from mcpe realm hub: https://discord.gg/P9Zd6wu97V
// The framework for grabbing inventory was created by balloon from mcpe realm hub: https://discord.gg/P9Zd6wu97V
const { assign } = Object;
Server.command.register(registerInformation, (chatmsg, args) => {
    try {
        const { sender } = chatmsg;
        content.warn(sender.getInventory(true));
        
        const playerfound = [...world.getPlayers()].find(player => player.getName() === args[0]);
        if (sender.hasTag('staffstatus')) {
            if (!args[0]) {
                let items = sender.getInventory(true);
                content.warn({ items });
                sender.tellraw(`§¶§d§lYour §binventory:\n${items
                    .map(({ slot, id, amount, data }) => `§¶§6§lslot: §¶§c${slot} §¶§6§lid: §¶§c${id} §¶§6§lamount: §¶§c${amount} §¶§6§ldata: §¶§c${data}`)
                    .join('\n')}`);
            } else if (!playerfound) {
                sender.tellraw(`§¶§cUAC ► §c§l${playername} is offline or does not exist`);
            } else {

                const playername = playerfound.getName();
                // The framework for grabbing inventory was created by balloon from mcpe realm hub: https://discord.gg/P9Zd6wu97V
                let items = playerfound.getInventory(true);
                console.warn(JSON.stringify(items))
                sender.tellraw(
                    `§¶§d§l${playername} §binventory:\n${items
                        .map(({ slot, id, amount, data }) => `§¶§6§lslot: §¶§c${slot} §¶§6§lid: §¶§c${id} §¶§6§lamount: §¶§c${amount} §¶§6§ldata: §¶§c${data}`)
                        .join('\n')}`);
            }
        } else {
            sender.tellraw(`§¶§cUAC ► §c§lError 4: Only Staff can use this command`);
        }

    } catch (error) {
        console.warn(error, error.stack);
    }
});