import cc from "../lib/cc.js";
import chat from "../lib/chat.js";
import message from "../lib/message.js";
import playerManager from "../lib/plr.js";
import role from "../lib/role.js";
import server from "../lib/server.js";
cc.create('adminchat', {
    name: 'Admin Chat',
    description: 'Joins / leaves / manages admin chat.',
    usage: [
        {
            usage: ['adminchat', 'join'],
            description: 'Joins admin chat.'
        }, {
            usage: ['adminchat', 'leave'],
            description: 'Leaves admin chat.'
        }, {
            usage: ['adminchat', 'pull', { name: 'target', type: 'player' }],
            description: 'Pulls someone to admin chat.'
        }, {
            usage: ['adminchat', 'kick', { name: 'target', type: 'player' }],
            description: 'Kicks someone from admin chat.'
        }, {
            usage: ['adminchat', 'list'],
            description: 'Shows player list in admin chat.'
        }
    ],
    minPermLvl: 60,
    trigger: /^admin-?chat$/,
    typedParams: new cc.typedParams({
        sequence: ['join'],
        execute: ([], { executer, log }) => {
            if (playerList.has(executer))
                return log(`You are currently in the admin chat.`);
            log([
                'Entered admin chat. Your message will now visible only to players who are in the admin chat.',
                `There ${playerList.size === 1 ? 'is' : 'are'} ${playerList.size ? `${playerList.size} player${playerList.size === 1 ? '' : 's'} here: ${Array.from(playerList.keys(), n => `§d${n.name}§r`).join(', ')}` : 'no one here.'}`
            ]);
            message.sendMsgToPlayers(playerList.values(), `§d${executer.name}§r has joined the admin chat.`);
            executer.addTag(adminChatTag);
            playerList.add(executer);
        }
    }, {
        sequence: ['leave'],
        execute: ([], { executer, log }) => {
            if (!playerList.has(executer))
                return log(`You are currently not in the admin chat.`);
            log('You have left the admin chat.');
            executer.removeTag(adminChatTag);
            playerList.delete(executer);
            message.sendMsgToPlayers(playerList.values(), `§d${executer.name}§r has left the admin chat.`);
        }
    }, {
        sequence: ['list'],
        execute: ([], { log }) => {
            log(`Players in admin chat: ${Array.from(playerList.keys(), n => `§d${n.name}§r`).join(', ') || 'none'}`);
        }
    }, {
        sequence: ['pull', cc.argumentParser.parseSelector],
        execute: async ([, selector], { executer, log }) => {
            const [target] = await selector();
            if (playerList.has(target))
                return log(`§d${target.name}§r is currently in the admin chat.`);
            log(`Pulled §d${target.name}§r to admin chat.`);
            target.sendMsg([
                `You have been pulled into admin chat by §d${executer.name}§r. Your message will now visible only to players who are in the admin chat.`,
                `There ${playerList.size === 1 ? 'is' : 'are'} ${playerList.size ? `${playerList.size} player${playerList.size === 1 ? '' : 's'} here: ${Array.from(playerList.keys(), n => `§d${n}§r`).join(', ')}` : 'no one here.'}`
            ]);
            message.sendMsgToPlayers(playerList.values(), `§d${executer.name}§r pulled §d${target.name}§r the admin chat.`, [executer]);
            target.addTag(adminChatTag);
            playerList.add(target);
        }
    }, {
        sequence: ['kick', cc.argumentParser.parseSelector],
        execute: async ([, selector], { executer, log }) => {
            const [target] = await selector();
            if (!playerList.has(target))
                return log(`§d${target.name}§r is currently not in the admin chat.`);
            log(`Kicked §d${target.name}§r from admin chat.`);
            target.tell(`You have been kicked from admin chat by §d${executer.name}§r.`);
            target.removeTag(adminChatTag);
            playerList.delete(target);
            message.sendMsgToPlayers(playerList.values(), `§d${executer.name}§r pulled §d${target.name}§r the admin chat.`, [executer]);
        }
    }),
    onDelete: () => {
        if (adminChatGroup.isListed)
            chat.group.delete('adminchat');
        chat.removeEventListener('chat', fnChat);
        role.removeEventListener('messageFormat', fnRole);
        server.removeEventListener('playerLoad', fnJoin);
    }
});
const adminChatTag = 'adminchat';
const adminChatGroup = chat.group.create('adminchat', 100, [adminChatTag]);
const playerList = playerManager.createPlayerSet();
const fnChat = chat.addEventListener('chat', (evd, ctrl) => {
    const { sender, group } = evd;
    if (group?.id !== adminChatGroup.id)
        return;
    if (!playerList.has(sender))
        return ctrl.cancel(); // illegal
    evd.targets = evd.targets.filter(plr => playerList.has(plr));
});
const fnRole = role.addEventListener('messageFormat', (evd) => {
    if (!playerList.has(evd.player))
        return;
    evd.format = '§eAdmin Chat§r > ' + evd.format;
});
const fnJoin = server.addEventListener('playerLoad', plr => {
    if (plr.removeTag(adminChatTag))
        plr.tell('Disconnected from admin chat.');
});
