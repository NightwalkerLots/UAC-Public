import * as mc from '@minecraft/server';
import * as gt from '@minecraft/server-gametest';
import * as mcui from '@minecraft/server-ui';
import area from '../lib/area.js';
import cc from '../lib/cc.js';
import chat from '../lib/chat.js';
import EntityLock from '../lib/entlock.js';
import event from '../lib/event.js';
import * as form from "../lib/form.js";
import { asyncExecCmd as asyncCmd } from '../lib/mc.js';
import LCCL from '../lib/lccl.js';
import loader from '../lib/loader.js';
import MapProxy from '../lib/mapproxy.js';
import message from '../lib/message.js';
import * as misc from "../lib/misc.js";
import * as misc2 from "../lib/misc2.js";
import permission from '../lib/permission.js';
import playerManager from '../lib/plr.js';
import role from '../lib/role.js';
import server from '../lib/server.js';
import Storage from '../lib/storage.js';
import structure from '../lib/structure.js';
import tempArea from '../lib/temparea.js';
import typeobj from '../lib/types.js';
import dprop from '../lib/dprop.js';
const overworld = mc.world.getDimension('overworld');
export const evalContext = {
    asyncCmd,
    area,
    cc,
    chat,
    dprop,
    EntityLock,
    event,
    LCCL,
    loader,
    MapProxy,
    message,
    misc,
    misc2,
    permission,
    plr: playerManager,
    role,
    server,
    Storage,
    structure,
    temparea: tempArea,
    typeobj,
    get self() { return evalContext; },
    overworld,
    inv: (plr) => { return plr.getComponent('inventory').container; },
    cls: (plr) => { for (let i = 0; i < 100; i++)
        plr.tell('\n'); },
    [Symbol.toStringTag]: 'Self',
    [Symbol.unscopables]: {},
};
const evalInternalContext = {
    mc,
    gt,
    mcui,
    $_: undefined,
    $p: (n) => { return mc.world.getAllPlayers().find(v => v.name === n); },
    $t: (n) => { return Array.from(overworld.getEntities({ type: n.includes(':') ? n : 'minecraft:' + n })); },
    $o: (n) => { return mc.world.scoreboard.getObjective(n); },
};
const vctx = new Proxy(evalContext, {
    has: () => true,
    get: (t, p) => {
        //@ts-expect-error
        if (p in globalThis)
            return globalThis[p];
        if (p in evalContext)
            return evalContext[p];
        if (p in evalInternalContext)
            return evalInternalContext[p];
        //@ts-expect-error
        if (p in mc)
            return mc[p];
        //@ts-expect-error
        if (p in gt)
            return gt[p];
        //@ts-expect-error
        if (p in mcui)
            return mcui[p];
        //@ts-expect-error
        if (p in form)
            return form[p];
        //@ts-expect-error
        if (p in message)
            return typeof message[p] == 'function' ? message[p].bind(message) : message[p];
        throw new ReferenceError(`'${String(p)}' is not defined`);
    },
    set: (t, p, v) => {
        //@ts-expect-error
        globalThis[p] = v;
        return true;
    },
    deleteProperty: (t, p) => {
        //@ts-expect-error
        if (p in globalThis)
            delete globalThis[p];
        return true;
    }
});
cc.create('eval', {
    name: 'Eval',
    description: 'Executes JavaScript code.',
    usage: [
        {
            usage: ['eval'],
            description: 'Enters REPL mode.'
        }, {
            usage: ['eval', { name: 'code', type: 'any' }],
            description: 'Executes code.'
        }
    ],
    minPermLvl: 100,
    trigger: /^eval$/i,
    execute: ({ executer, argFull, log }) => {
        if (argFull)
            execEval(executer, argFull);
        else {
            replList.add(executer);
            log([
                ` `,
                `Entering REPL mode.`,
                `Type '.exit' to exit.`,
                ` `
            ]);
        }
    }
});
function execEval(plr, cmd) {
    const log = plr.sendMsg.bind(plr);
    message.sendMsgToAdmins(permission.getPlayerLevel(plr), `§7${plr.name} is using eval §8-§7 ${cmd.replace(/\u00a7./g, '')}`, [plr]);
    let v, s = '';
    try {
        log(`> ${cmd}`);
        s = misc.getStackTrace();
        v = misc.renameFn(Function(`context`, `with (context) return eval(${JSON.stringify(cmd)})`), 'context').call(plr, vctx);
        if (v instanceof Promise)
            v.then(v => log('(In promise) ' + misc.prettify(v)), e => log('(in promise) Uncaught ' + (e instanceof Error ? `${e}\n${e.stack}` : misc.prettify(e))));
        evalInternalContext.$_ = v;
    }
    catch (e) {
        return log('Uncaught ' + (e instanceof Error ? `${e}\n${!s.length ? e.stack : e.stack?.slice(0, -s.length) + '§8' + e.stack?.slice(e.stack.length - s.length)}` : misc.prettify(e)));
    }
    log(misc.prettify(v));
}
server.addEventListener('beforeChat', (evd, ctrl) => {
    if (!replList.has(evd.sender))
        return;
    ctrl.break();
    evd.cancel = true;
    if (evd.message.startsWith('.exit')) {
        evd.sender.tell(`Exited REPL.`);
        return void replList.delete(evd.sender);
    }
    else
        execEval(evd.sender, evd.message);
}, { priority: 1 });
const replList = new WeakSet();
