import { scoreTest, tellraw, tellrawStaff, tellrawServer } from 'library/utils/prototype.js';
import { world, Player, Dimension, Entity, ItemStack, Location, BlockLocation, Block, MinecraftItemTypes } from '@minecraft/server';

const _player = {
    count: 0,
};

function jesus() {
    let players = world.getPlayers();
    for (let player of players) {   
        const name = player.getName();
        const in_water = player.scoreTest('in_water');
        const water_contact = player.scoreTest('water_contact');
        const swimming = player.scoreTest('is_swimming');
        const riding = player.scoreTest('riding');
        const x = Math.floor(player.location.x);
        const y = Math.floor(player.location.y);
        const z = Math.floor(player.location.z);

        // Below Below player
        let BlockAtPlayer0 = player.dimension.getBlock(new BlockLocation(x, y - 1, z));
        // Below player
        let BlockAtPlayer1 = player.dimension.getBlock(new BlockLocation(x, y, z));
        if( (BlockAtPlayer1.type.id === "minecraft:water" && BlockAtPlayer0.type.id === "minecraft:water") ) {
            if(in_water || water_contact) return;
            if( player.hasTag(`staffstatus`) || riding || swimming || player.hasTag('Is_Gliding') || player.hasTag('Is_On_Ground') ) return;
            _player.count++;
        }
        if(_player.count === 20) {
            tellrawStaff(`§¶§c§lUAC ► §6Anti-Jesus §d${name} §bwas flagged`);
            _player.count = 0;
        }
        if(player.hasTag('Is_On_Ground')) {
            _player.count = 0;
        }
    }
}

export { jesus };