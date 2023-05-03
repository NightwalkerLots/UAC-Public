import { Player, world } from "@minecraft/server";
import { asyncExecCmd } from "../../core/lib/mc.js";
import playerDat from "./playerdat.js";
export function getPlayer(name) {
    let sel = name[0] == '@' ? name.slice(1) : name;
    const [plr] = world.getPlayers({ name: sel[0] === '"' && sel[sel.length - 1] === '"' ? sel.slice(1, -1) : sel });
    if (plr)
        return plr;
    if (/^(?<!\\)#[0-9a-zA-Z]{3,5}/.test(name))
        return playerDat.getFromId(name);
    name = name[0] == '\\' ? name.slice(1) : name;
    return playerDat.getFromName(name);
}
export async function kick(plr, message) {
    try {
        await asyncExecCmd(`kick ${JSON.stringify(typeof plr === 'string' ? plr : plr.name)} ${message}`);
    }
    catch {
        if (!(plr instanceof Player))
            return;
        allowKick.add(plr);
        plr.triggerEvent('uac:forcekick');
    }
}
const allowKick = new WeakSet();
world.events.beforeDataDrivenEntityTriggerEvent.subscribe(ev => {
    const { entity: plr, id } = ev;
    if (!(plr instanceof Player && id === 'uac:forcekick'))
        return;
    if (!allowKick.has(plr))
        ev.cancel = true;
});
