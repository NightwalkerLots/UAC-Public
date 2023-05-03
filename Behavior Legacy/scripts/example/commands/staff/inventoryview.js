import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff, content } from '../../../library/utils/prototype.js';
import { ItemStack, MinecraftItemTypes, world } from '@minecraft/server';
const registerInformation = {
    cancelMessage: true,
    name: 'inv',
    staff: 'true',
    description: 'Views a Player Inventory or yours depending if argument zero is provided',
    usage: '[ PlayerName ]',
    example: [
        'inv view @player',
        'inv cone @player',
        'inv save',
        'inv load'
    ]
};
// The framework for grabbing inventory was created by balloon from mcpe realm hub: https://discord.gg/P9Zd6wu97V
// The framework for grabbing inventory was created by balloon from mcpe realm hub: https://discord.gg/P9Zd6wu97V
//const { assign } = Object;
Server.command.register(registerInformation, (chatmsg, args) => {
    try {
        const { sender } = chatmsg;



        const air = new ItemStack(MinecraftItemTypes.acaciaBoat, 0)

        //** @type { Map<Player, {inv:ItemStack[],ss:number}> } */
        let invData = new Map()

        if (!sender.hasTag('staffstatus')) return sender.tellraw(`§¶§cUAC ► §c§lError 4: Only Staff can use this command`)

        //** @type {PlayerInventoryComponentContainer} */
        const c = sender.getComponent('inventory').container

        switch (args[0]) {
            case 'save': {
                try {
                    invData.set(sender, { inv: Array.from(Array(c.size), (v, i) => c.getItem(i) ?? air), ss: sender.selectedSlot })

                    return sender.tellraw(`§bInventory saved. To load your inventory, do §aUAC.inv load§r`);
                } catch (error) {
                    sender.tellraw(`§¶§cUAC ► §c§lError 8: console error`);
                    console.warn(error, error.stack);
                }
            }

            case 'load': {
                try { 
                    const { inv, ss } = invData.get(sender) ?? {}
                    if (!inv) sender.tellraw(`§¶§cUAC ► §c§lError: You don't have your inventory saved.`);
                    for (let i = 0, m = c.size; i < m; i++) {
                        c.setItem(i, inv[i])
                        sender.selectedSlot = ss  
                    }
    
                    return sender.tellraw(`§bInventory loaded.`);
                } catch (error) {
                    sender.tellraw(`§¶§cUAC ► §c§lError 8: console error`);
                    console.warn(error, error.stack);
                    return;
                }
            }

            case 'clone': {
                const targetName = args[1]
                // @ts-ignore

                const target = [...world.getPlayers()].find(player => player.getName() === targetName);
                if (!target) return sender.tellraw(`§¶§cUAC ► §c§lError: Player not found`);
                const tc = target.getComponent('inventory').container

                for (let i = 0, m = c.size; i < m; i++) c.setItem(i, tc.getItem(i) ?? air)
                sender.selectedSlot = target.selectedSlot

                return sender.tellraw(`§bCloned §d${target.name}§b's inventory.`);
            }

            case 'view': {
                content.warn(sender.getInventory(true));
                let input = args.join(' ').replace('view ', '').replace('@', '').replace(/"/g, '');
                let playerfound = [...world.getPlayers()].find(player => player.getName() === input);

                if(!args[1]) { return sender.tellraw(`§¶§cUAC ► §c§lError 7: No player specified`); }
                if(!playerfound) {return sender.tellraw(`§¶§cUAC ► §c§lError 7: No player by that name`); }

                // dump armor
                tellrawStaff(`§d${playerfound.getName()}'s§b inventory checked by §d${sender.name}`);
                sender.runCommandAsync(`execute "${playerfound.getName()}" ~~~ function UAC/asset/enchanted_armor_check`);

                let items = playerfound.getInventory(true);
                console.warn(JSON.stringify(items))
                return tellrawStaff(
                    `§¶§d§l${playerfound.getName()} §binventory:\n${items
                        .map(({ slot, id, amount, data }) => `§¶§6§lslot: §¶§c${slot} §¶§6§lid: §¶§c${id.replace('minecraft:', '')} §¶§6§lamount: §¶§c${amount} §¶§6§ldata: §¶§c${data}`)
                        .join('\n')}`);
            }

            default:
                return sender.tellraw(`§¶§cUAC ► §c§lError 7 ; Command Failed. Usage : §6UAC.inv [save | clone @player | view @player | load]`);
            
        }
    } catch (error) {
        sender.tellraw(`§¶§cUAC ► §c§lError 8: command failure`);
        console.warn(error, error.stack);
    }
});