import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'inventory',
    description: 'View Player Inventory',
    usage: '[ PlayerName ]',
    example: [
        'Inventory PlayerName'
    ]
};
// The framework for grabbing inventory was created by balloon from mcpe realm hub: https://discord.gg/P9Zd6wu97V
// The framework for grabbing inventory was created by balloon from mcpe realm hub: https://discord.gg/P9Zd6wu97V

Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();
    let playerfound = Server.player.find(args.join(' '));
    let playername = args.join(' ');

    if (sender.hasTag('staffstatus')) {
        if (!args[0]) return Server.broadcast(`§¶§cUAC ► §c§lPlease specify the name of the player of whom you would like to see their inventory`, name);
        else if (!playerfound) return Server.broadcast(`§¶§cUAC ► §c§l${playername} is offline or does not exist`, name);
        else {
            // The framework for grabbing inventory was created by balloon from mcpe realm hub: https://discord.gg/P9Zd6wu97V
            let items = Server.player.getInventory({ name: playername });
            let itemsString = `§¶§d§l${playername}'s §binventory:\n`;
            items?.forEach(item => {
                let slot = item.slot ? `§¶§6§lslot: §¶§c${item.slot}` : '';
                let id = item.id ? `§¶§6§lid: §¶§c${item.id}` : '';
                let amount = item.amount ? `§¶§6§lamount: §¶§c${item.amount}` : '';
                let data = item.data ? `§¶§6§ldata: §¶§c${item.data}  ` : '';
                itemsString += `${slot} ${id} ${amount} ${data}\n`;
            });
            let message = `${itemsString}`;
            Server.broadcast(`${message}`, name);
        }
    } else {
        Server.broadcast(`§¶§cUAC ► §c§lError 4: Only Staff can use this command`, name);
    }
});