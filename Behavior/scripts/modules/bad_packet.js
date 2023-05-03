import { tellrawStaff, TellRB, tp } from '../library/utils/prototype';
import { world, EntityBreathableComponent, EntityMovementComponent, system, Vector } from "@minecraft/server";
import { scoreTest } from '../library/utils/score_testing';

function Check_Packet_Behavior(player) {
    try {
        //check for module bool
        //skip staff & module disable
        //player.onScreenDisplay.setActionBar(`${player.getComponent("minecraft:breathable").suffocateTime}`);
        if(player.hasTag(`staffstatus`)) return;
        if ( scoreTest('pkdummy', 'afmtoggle') != 1) return;

        
        let p_speed = player.getComponent("minecraft:movement");
        let name = player.getName();
        let p_velocity = player.getVelocity();
        const xyVelocity = Math.hypot(p_velocity.x, p_velocity.y).toFixed(4);
        const zyVelocity = Math.hypot(p_velocity.z, p_velocity.y).toFixed(4);
        
        //invalid slot
        if ( player.selectedSlot < 0 || player.selectedSlot > 8 ) {
            tellrawStaff(`§¶§cUAC §6Bad Packet §b► §d${name} §¶§bflaged for selected slot of §c${player.selectedSlot}`);
            TellRB(`flag_1`, `UAC Bad Packet ► ${name} flaged for selected slot of ${player.selectedSlot}`);
        }

        //Anti tp
        if ( xyVelocity > 7.88 || zyVelocity > 7.88) {
            let {x, y, z} = player.location;
            let last_y = scoreTest(player, 'lastpos_y');
            let last_x = scoreTest(player, `lastpos_x`);
            let last_z = scoreTest(player, 'lastpos_z');
            tellrawStaff(`§¶§cUAC STAFF §6Bad Packet §b► §d${name} §¶§bflaged for Teleporting to\nX§7: §c${x}  §bZ§7: §c${z}`);
            TellRB(`flag_1`, `UAC Bad Packet ► ${name} flaged for invalid Position Spoof to x: ${x}  zV: ${z}`);
            p_speed.resetToDefaultValue();
            tp(player, last_x, last_y, last_z);  //tp back. 
            return;
        }

        //invalid speed
        if (p_speed.current >= `0.185`) { 
            let i = false;
            if(i == false) {
                tellrawStaff(`§¶§cUAC STAFF §6Bad Packet §b► §d${name} §¶§bflaged for speed §7: §c${p_speed.current}`);
                TellRB(`flag_1`, `UAC Bad Packet ► ${name} flaged for invalid speed : ${p_speed.current}`);
                i = true;
                p_speed.resetToDefaultValue();
                if (p_speed.current == `0.100000000149011612`) { i = false; }
            }
        }
        
        if ( xyVelocity > 2.88 || zyVelocity > 2.88) {
            let last_y = scoreTest(player, 'lastpos_y');
            let last_x = scoreTest(player, `lastpos_x`);
            let last_z = scoreTest(player, 'lastpos_z');
            tellrawStaff(`§¶§cUAC STAFF §6Bad Packet §b► §d${name} §¶§bflaged for Velocity\nxV§7: §c${xyVelocity}  §bzV§7: §c${zyVelocity}`);
            TellRB(`flag_1`, `UAC Bad Packet ► ${name} flaged for invalid Velocity xV: ${xyVelocity}  zV: ${zyVelocity}`);
            //player.setVelocity(Vector.zero);
            p_speed.resetToDefaultValue();
            tp(player, last_x, last_y, last_z);  //cancel player momentom. 
        }
    } catch(e) {console.warn( JSON.stringify(e.stack), e);}
}

export { Check_Packet_Behavior }