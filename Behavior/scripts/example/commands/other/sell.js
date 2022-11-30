import { Server } from '../../../library/Minecraft.js';
import { scoreTest } from '../../../library/utils/score_testing.js';
const registerInformation = {
    cancelMessage: true,
    name: 'sell',
    staff: 'false',
    description: 'Sell Raw Materials for money',
    usage:'[ iron_ingot | gold_ingot | emerald | diamond | coal | netherite{_ingot/_scrap} | redstone ] [ amount ]',
    example: [
        'sell netherite_scrap 22'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    try {
        const { sender } = chatmsg;
        const name = sender.getName();
        const SellableItems = {
            'coal': 5,
            'quartz': 8,
            'copper_ingot': 10,
            'iron_ingot': 10,
            'redstone': 15,
            'gold_ingot': 25,
            'diamond': 140,
            'emerald': 150,
            'netherite_scrap': 175,
            'netherite_ingot': 300,
        };
        const usage = `§6UAC.sell [item] [amount]`;
        const allitems = `§6coal, copper_ingot, quartz, iron_ingot, redstone, gold_ingot, diamond, emerald, netherite_scrap, netherite_ingot`;
        if ( scoreTest(sender, 'icmtoggle') === 0) {
            return sender.tellraw(`§¶§cUAC ► §c§lThe Realm Owner currently has Player Commands Disabled`);
        }
        if(!args[0]) {return sender.tellraw(`§¶§cUAC ► §cItem not specified. ${usage}`)}
        if(!args[1]) {return sender.tellraw(`§¶§cUAC ► §cAmount not specified. ${usage}`)}
        
        let item = args[0];
        let amount = args[1];
        if(item in SellableItems) {
            if(sender.hasitem(item, amount)) {
                let price = undefined;
                if(item == 'coal') {price = SellableItems.coal}
                if(item == 'quartz') {price = SellableItems.quartz}
                if(item == 'iron_ingot') {price = SellableItems.iron_ingot}
                if(item == 'copper_ingot') {price = SellableItems.copper_ingot}
                if(item == 'redstone') {price = SellableItems.redstone}
                if(item == 'gold_ingot') {price = SellableItems.gold_ingot}
                if(item == 'diamond') {price = SellableItems.diamond}
                if(item == 'emerald') {price = SellableItems.emerald}
                if(item == 'netherite_scrap') {price = SellableItems.netherite_scrap}
                if(item == 'netherite_ingot') {price = SellableItems.netherite_ingot}
                let cost = ( price * amount );
                sender.runCommandAsync(`scoreboard players add @s money ${cost}`);
                sender.runCommandAsync(`clear @s ${item} 0 ${amount}`);
                sender.tellraw(`§¶§cUAC ► §bSold! You now have §c${ scoreTest(sender, 'money')}$. §6Item §7: §c${item} §6Amount §7: §c${amount} §6Total Profit §7: §c${cost} §6 Sell Price Per Item §7: §c${price}`);

            }
            else {
                return sender.tellraw(`§¶§cUAC ► §cYou do not have enough of that item`);
            }
        }
        else {
            return sender.tellraw(`§¶§cUAC ► §cInvalid Item. §bItems ${allitems}`);
        }
    } 
    catch(error) { console.warn(error, error.stack); }
});
