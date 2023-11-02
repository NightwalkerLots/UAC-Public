import { ObjectiveSortOrder, ScoreboardIdentityType, ScoreboardObjective, world } from "@minecraft/server";


function scoreTest(target, objective) {
    try {
        const oB = world.scoreboard.getObjective(objective)
        if (typeof target == 'string') return oB.getScores().find(pT => pT.displayName == target)?.score
        return oB.getScore(target.scoreboard)
    }catch (error) {
        let na = 0;
        console.warn(error, error.stack);
        return na;
    }
}  
/*
function scoreTest(target, objective) {
    try {
        return world.scoreboard.getObjective(objective).getScore(typeof target === 'string' ? oB.getParticipants().find(pT => pT.displayName == target) : target.scoreboard)
    } catch {
        return NaN
    }
}*/

function setScore(target, objective, amount, add = false) {
    const scoreObj = world.scoreboard.getObjective(objective);
    const dummy = scoreObj.getParticipants().find(pT => pT.displayName == target);
    const score = (add ? target.scoreboard.getScore(scoreObj) : 0) + amount;
    try { 
        if(typeof target === 'string') return scoreObj.setScore(dummy, amount);
        target.scoreboard.setScore(scoreObj, score) 
    } catch { return NaN };
    return score;
};

export { scoreTest, setScore }