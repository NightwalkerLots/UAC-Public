//@ts-check
import { ItemStack, MinecraftItemTypes, Player, PlayerInventoryComponentContainer, world } from 'mojang-minecraft';
import { Server } from '../../../library/Minecraft.js';

const registerInformation = {
    cancelMessage: true,
    name: 'inv',
    staff: 'true',
    description: 'Manages inventory',
    usage: '',
    example: [
        'inv save',
        'inv load',
        'inv clone "Player Name"',
    ]
};

const air = new ItemStack(MinecraftItemTypes.air, 0)

/** @type { Map<Player, {inv:ItemStack[],ss:number}> } */
let invData = new Map()

Server.command.register(registerInformation, (chatmsg, args) => {
    const {sender} = chatmsg

    if (!sender.hasTag('staffstatus')) return sender.tellraw(`§¶§cUAC ► §c§lError 4: Only Staff can use this command`)

    /** @type {PlayerInventoryComponentContainer} */
    const c = sender.getComponent('inventory').container

    switch (args[0]) {
        case 'save': {
            invData.set(sender, { inv: Array.from(Array(c.size), (v, i) => c.getItem(i) ?? air), ss: sender.selectedSlot })

            return sender.tellraw(`§bInventory saved. To load your inventory, do §aUAC.inv load§r`);
        }

        case 'load': {
            const { inv, ss } = invData.get(sender) ?? {}
            if (!inv) return sender.tellraw(`§¶§cUAC ► §c§lError: You don't have your inventory saved.`);

            for (let i = 0, m = c.size; i < m; i++) c.setItem(i, inv[i])
            sender.selectedSlot = ss

            return sender.tellraw(`§bInventory loaded.`);
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

        default:
            return sender.tellraw(`§¶§cUAC ► §c§lError 7: command failure`);
    }
});
