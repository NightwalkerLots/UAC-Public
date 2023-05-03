import * as Minecraft from '@minecraft/server';
import { Server } from './serverBuilder.js';
import { Player, world } from '@minecraft/server';

export class PlayerBuilder {
    /**
     * Look if player is in the game
     * @param {string} player Player you are looking for
     * @returns {boolean}
     * @example PlayerBuilder.findPlayer('notbeer'); 
     */
    find(player) {
        const players = this.list();
        return players.includes(player);
    }
    ;


    ;
    /**
     * Get players(s) at a position
     * @param {number} x X position of the entity
     * @param {number} y Y position of the entity
     * @param {number} z Z position of the entity
     * @param {dimension} [dimension] Dimesion of the entity
     * @returns {getPlayerAtPosReturn}
     * @example PlayerBuilder.getEntityAtPos([0, 5, 0], { dimension: 'nether' ]});
     */
    getAtPos([x, y, z], { dimension } = {}) {
        try {
            const entity = Minecraft.world.getDimension(dimension ? dimension : 'overworld').getEntitiesAtBlockLocation(new Minecraft.BlockLocation(x, y, z));
            for (let i = 0; i < entity.length; i++)
                if (entity[i].id !== 'minecraft:player')
                    entity.splice(i, 1);
            return { list: entity, error: false };
        }
        catch (err) {
            return { list: null, error: true };
        }
        ;
    }
    ;
    /**
     * Get list of players in game
     * @returns {Array<string>}
     * @example PlayerBuilder.list();
     */
    list() {
        let data = [];
        data = [...world.getPlayers()].map(player => player.getName())
        return data;
    }
    ;
    /**
     * Get the amount on a specific items player(s) has
     * @param {string} itemIdentifier Item you are looking for
     * @param {number} [itemData] Item data you are looking for
     * @param {string} [player] Player you are searching
     * @returns {Array<getItemCountReturn>}
     * @example PlayerBuilder.getItemCount('minecraft:diamond', '0', 'notbeer');
     */
    getItemCount(itemIdentifier, itemData, player) {
        let itemCount = [];
        const data = Server.runCommandAsync(`clear "${player}" ${itemIdentifier} ${itemData ? itemData : '0'} 0`);
        if (data.error)
            return itemCount;
        data.playerTest.forEach(element => {
            const count = parseInt(element.match(/(?<=.*?\().+?(?=\))/)[0]);
            const player = element.match(/^.*(?= \(\d+\))/)[0];
            itemCount.push({ player, count });
        });
        return itemCount ? itemCount : [];
    }
    ;
    getInventory({ name }) {
        let player = Server.getAllPlayers().filter(p => p.name == name || p.nameTag == name)[0]
        if(!player) return
        
        let items = []
        let container = player.getComponent('minecraft:inventory').container
        for(let i = 0; i < container.size; i++) {
          let slot = container.getItem(i)
          let itemData = {
            id: slot?.id ?? 'minecraft:air',
            amount: slot?.amount ?? 0,
            slot: i + 1,
            data: slot?.data ?? undefined,
          }
          items.push(itemData)
        }
        return items

    };
    /**
     * Get players score on a specific objective
     * @param {string} objective Objective name you want to search
     * @param {string} player Requirements for the entity
     * @param {number} [minimum] Minumum score you are looking for
     * @param {number} [maximum] Maximum score you are looking for
     * @returns {number}
     * @example PlayerBuilder.getScore('Money', 'notbeer', { minimum: 0 });
     
    getScore(objective, player, { minimum, maximum } = {}) {
        const data = Server.runCommandAsync(`scoreboard players test "${player}" ${objective} ${minimum ? minimum : '*'} ${maximum ? maximum : '*'}`);
        if (data.error)
            return;
        return parseInt(data.statusMessage.match(/-?\d+/)[0]);
    }*/
    ;
}
;
export const Player = new PlayerBuilder();
