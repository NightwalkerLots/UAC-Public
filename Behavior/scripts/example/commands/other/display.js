import { Server } from '../../../library/Minecraft.js';
import { tellrawStaff } from '../../../library/utils/prototype.js';
const registerInformation = {
    cancelMessage: true,
    name: 'display',
    description: 'Heads up display for server or self stats',
    usage: '[ self | server | off ]',
    example: [
        'display self',
        'display server',
        'display off',
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg;
    const name = sender.getName();
    let personal = ['self', 'personal'];
    let realm = ['server', 'realm'];
    let off = ['off', 'disable'];
    if (!sender.scoreTest('icmtoggle')) {
        return sender.tellraw(`§¶§cUNITY API §b► §c§lThe Realm Owner currently has Player Commands Disabled`);
    } else if (sender.scoreTest('hmmtoggle') === 1 || sender.scoreTest('hmmtoggle') === 2) {
        return sender.tellraw(`§¶§cUNITY API §b► §c§lRealm owner has set a global hotbar message `);
    } else if (registerInformation.name.match('display')) {
        if (personal.includes(args[0])) {
            sender.runCommand(`playsound note.pling @s ~ ~ ~`);
            sender.tellraw(`§l§¶§cUNITY API §b► §b§lNow showing display for self stats `);
            sender.runCommand(`scoreboard players set @s hometp 1337`);
            tellrawStaff(`§¶§cUNITY API §b► §d${name} §bset their hotbar display to §epersonal`);
        } else if (realm.includes(args[0])) {
            sender.runCommand(`playsound note.pling @s ~ ~ ~`);
            sender.tellraw(`§l§¶§cUNITY API §b► §b§lNow showing display for server stats `);
            sender.runCommand(`scoreboard players set @s hometp 420`);
            tellrawStaff(`§¶§cUNITY API §b► §d${name} §bset their hotbar display to §eserver`);
        } else if (off.includes(args[0])) {
            sender.runCommand(`playsound note.pling @s ~ ~ ~`);
            sender.tellraw(`§l§¶§cUNITY API §b► §b§lStats Display has been §cDISABLED `);
            sender.runCommand(`scoreboard players set @s hometp 3`);
            tellrawStaff(`§¶§cUNITY API §b► §d${name} §bset their hotbar display to §eoff`);
        } else {
            return sender.tellraw(`§¶§cUNITY API §b► §cERROR! §6Usage Example §7:§b§l UAC.display [ self | server | off ]`);
        }
    } else {
        return sender.tellraw(`§¶§cUNITY API §b► §cERROR 2! §6Usage Example §7:§b§l UAC.display [ self | server | off ]`);
    }
});