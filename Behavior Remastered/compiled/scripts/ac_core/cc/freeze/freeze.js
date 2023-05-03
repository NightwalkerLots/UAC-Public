import cc from "../../../core/lib/cc.js";
import freezeModule from "../../module/freeze.js";
cc.create('uac:freeze', {
    name: 'Freeze',
    description: 'Freezes someone.',
    usage: [{ usage: ['freeze', { name: 'target', type: ['player'] }] }],
    minPermLvl: 60,
    trigger: /^freeze$/i,
    typedParams: new cc.typedParams({
        sequence: [cc.argumentParser.parseSelector],
        execute: async ([tgt], { executer, log }) => {
            const [plr] = await tgt();
            freezeModule.add(executer, plr);
        }
    })
});
