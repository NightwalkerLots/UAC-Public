import { world } from '@minecraft/server';


function scoreTest(target, objective) {
    try {
        const oB = world.scoreboard.getObjective(objective)
        if (typeof target == 'string') return oB.getScore(oB.getParticipants().find(pT => pT.displayName == target))
        return oB.getScore(target.scoreboard)
    }catch (error) {
        let na = 0;
        console.warn(error, error.stack);
        return na;
    }
}

export { scoreTest }