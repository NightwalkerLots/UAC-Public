import { world } from "@minecraft/server";
import { getScore } from "../../core/lib/misc.js";
import { setScore } from "../../core/lib/misc2.js";
import playerManager from "../../core/lib/plr.js";
import server from "../../core/lib/server.js";
const i2_31 = 2 ** 31;
class PlayerDataConstructor {
    getFromId(id) {
        const uid = playerManager.parseUid(id);
        const sb = world.scoreboard.getObjective('_uac_id_' + (uid % 256).toString(16));
        const name = sb ? sb.getScores().find(v => v.score - i2_31 === uid)?.participant.displayName : undefined;
        return name == undefined ? undefined : {
            name: name.slice(2),
            uid,
            uidStr: playerManager.stringifyUid(uid)
        };
    }
    getFromName(name) {
        const uid = getScore('\xa7Z' + name, '_uac_nm_' + (name.charCodeAt(0) % 256).toString(16), null);
        return uid == undefined ? undefined : {
            name,
            uid: uid - i2_31,
            uidStr: playerManager.stringifyUid(uid - i2_31)
        };
    }
}
const playerDat = new PlayerDataConstructor;
export default playerDat;
server.addEventListener('playerLoad', plr => {
    const plrName = '\xa7Z' + plr.name;
    const uidCode = plr.uid + i2_31;
    const idSb = '_uac_id_' + (plr.uid % 256).toString(16);
    world.scoreboard.getObjective(idSb) ?? world.scoreboard.addObjective(idSb, idSb);
    setScore(plrName, idSb, uidCode);
    const nameSb = '_uac_nm_' + (plr.name.charCodeAt(0) % 256).toString(16);
    world.scoreboard.getObjective(nameSb) ?? world.scoreboard.addObjective(nameSb, nameSb);
    setScore(plrName, nameSb, uidCode);
}, { priority: Infinity });
