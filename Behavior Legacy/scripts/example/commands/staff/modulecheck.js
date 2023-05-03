import { getGamemode } from '../../../library/utils/prototype.js';
import { Server } from '../../../library/Minecraft.js';
import { scoreTest } from '../../../library/utils/score_testing.js';

const registerInformation = {
    cancelMessage: true,
    name: 'modules',
    staff: 'true',
    description: 'Display all Enabled Modules',
    usage: '',
    example: [
        'modules showon',
        'modules showoff',
        'modules test'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    try {

        
        const { sender } = chatmsg;
        const name = sender.getName();

        let modules = [
            {
                sys: `Anti Clog`,
                dummy: `clmdummy`,
                obj: `clmtoggle`
            },
            {
                sys: `Anti ChatSpam`,
                dummy: `acsdummy`,
                obj: `acstoggle`
            },
            {
                sys: `Anti-Fly`,
                dummy: `afmtoggledummy`,
                obj: `afmtoggle`
            },
            {
                sys: `Anti-Lore`,
                dummy: `almdummy`,
                obj: `almtoggle`
            },
            {
                sys: `Anti EnderChest`,
                dummy: `nemtoggledummy`,
                obj: `nemtoggle`
            },
            {
                sys: `Anti-Reach`,
                dummy: `armtoggledummy`,
                obj: `armtoggle`
            },
            {
                sys: `Anti-Jesus`,
                dummy: `ajmdummy`,
                obj: `ajmtoggle`
            },
            {
                sys: `AFK Kick`,
                dummy: `afkdummy`,
                obj: `afkm`
            },
            {
                sys: `Bottom Bedrock`,
                dummy: `bbmtoggledummy`,
                obj: `bbmtoggle`
            },
            {
                sys: `Chat Ranks`,
                dummy: `crdummy`,
                obj: `chatrank`
            },
            {
                sys: `Death Effects`,
                dummy: `dethtoggledummy`,
                obj: `dethtoggle`
            },
            {
                sys: `Item Bans`,
                dummy: `ibmtoggledummy`,
                obj: `ibmtoggle`
            },
            {
                sys: `Hotbar Messages`,
                dummy: `hmmtoggledummy`,
                obj: `hmmtoggle`
            },
            {
                sys: `Lag Clear`,
                dummy: `ltmtoggledummy`,
                obj: `ltmtoggle`
            },
            {
                sys: `Lock Down`,
                dummy: `lddummy`,
                obj: `SSDEBUG`
            },
            {
                sys: `Player Commands`,
                dummy: `icmtoggledummy`,
                obj: `icmtoggle`
            },
            {
                sys: 'Mining Detection',
                obj: `mdmtoggle`,
                dummy: 'mdmtoggledummy'
            },
            {
                sys: 'Movement Check',
                obj: 'afmtoggle',
                dummy: 'pkdummy'
            },
            {
                sys: `One Player Sleep`,
                dummy: `opsdummy`,
                obj: `opstoggle`
            },
            {
                sys: `Random Spawn`,
                dummy: `rsmtoggledummy`,
                obj: `rsmtoggle`
            },
            {
                sys: `RealmBot Flag Relay`,
                dummy: `rbflagdummy`,
                obj: `acstoggle`
            },
            {
                sys: `Time Played`,
                dummy: `tpmtoggledummy`,
                obj: `tpmtoggle`
            },
            {
                sys: 'Unobtainable Items',
                obj: 'UOIM',
                dummy: 'uoimtoggledummy'
            },
            {
                sys: `World Border`,
                dummy: `wbmtoggledummy`,
                obj: `wbmtoggle`
            }

        ]

        

        if (sender.hasTag('staffstatus')) {

            switch (args[0]) {
                case undefined:
                    return sender.tellraw(`§¶§c§lUAC ► §bUAC.modules { showon / showoff }`);

                case 'test': {
                const message = Object.entries(modules)
                    .map(([key, { dummy, obj, sys }]) => `§6${sys}  §bObj §7: §c${obj} §bDummy §7: §c${dummy}`)
                    .join('\n');

                sender.tellraw(`§¶§c§lUAC MODULES ► \n§b${message}`);
                } break;

                case 'showon': {
                    let count = 0;
                    sender.tellraw(`§¶§c§lUAC MODULES ►`);
                    for( let i of modules ) {
                        if( scoreTest(`${i.dummy.toString()}`, `${i.obj.toString()}`) >= 1) {
                            sender.tellraw(`§¶§6${i.sys} §7► §2Enabled §7: §bMode §7: §c${scoreTest(`${i.dummy.toString()}`, `${i.obj.toString()}`)}`);
                            count++
                        }
                    }
                    if(count === 0) sender.tellraw(`§cNone Enabled`);
                    
                } break;

                case 'showoff': {
                    let count = 0;
                    sender.tellraw(`§¶§c§lUAC MODULES ►`);
                    for( let i of modules ) {
                        if( scoreTest(`${i.dummy.toString()}`, `${i.obj.toString()}`) == 0) {
                            sender.tellraw(`§¶§6${i.sys} §7► §cDisabled §7: §bMode §7: §c${scoreTest(`${i.dummy.toString()}`, `${i.obj.toString()}`)}`);
                            count++
                        }
                    }
                    if(count === 0) sender.tellraw(`§cNone Disabled`);
                } break;
            }
        } else {
            return sender.tellraw(`§¶§c§lUAC ► §c§lThis command is meant for staff only`);
        }
    } catch (error) {
        console.warn(error, error.stack);
    }
});
