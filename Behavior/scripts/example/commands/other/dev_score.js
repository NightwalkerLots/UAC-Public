import { Server } from '../../../library/Minecraft.js';
import { scoreTest } from '../../../library/utils/score_testing.js';
import { asyncExecCmd } from '../../../library/utils/cmd_queue.js';


const registerInformation = {
    cancelMessage: true,
    name: 'score',
    staff: 'private',
    description: ' ',
    usage: '[  ]',
    example: [
        ' '
    ]
};

function hotbar (player, message) {
    try {
        return asyncExecCmd(`titleraw "${player.nameTag}" actionbar {"rawtext":[{"text":"${message.replaceAll('"', '\\"')}"}]}`, player);
    }
    catch {return}
}

Server.command.register(registerInformation, (chatmsg, args) => {
    try {

        
        const { sender } = chatmsg;
        const name = sender.getName();

        hotbar(sender, `§¶§bYOU HAVE BEEN §cFROZEN §bBY AN OPERATOR \n §¶§bLEAVING MAY RESULT IN A BAN test`);
        
        
    } catch (error) {
        console.warn(error, error.stack);
    }
});
