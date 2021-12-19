import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'test',
    description: 'test',
    usage: '[ test ]',
    example: [
        'test'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    const bbmenabled = Server.runCommand(`testfor @r[scores={BBM=1}]`);

    if(bbmenabled) {
        Server.runCommand(`tellraw @a {"rawtext":[{"text":"§¶§cUAC §b►This works"}]} `);
        Server.broadcast(`${bbmenabled}`);
    }
    else {
        Server.broadcast(`${bbmenabled}`);
    }
});

