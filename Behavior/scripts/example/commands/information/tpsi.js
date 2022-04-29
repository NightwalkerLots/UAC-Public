//@ts-check
import { world } from 'mojang-minecraft';
import { Server } from '../../../library/Minecraft.js';

const registerInformation = {
    cancelMessage: true,
    name: 'tps',
    staff: 'true',
    description: 'Shows TPS',
    usage: '',
    example: [
        'tps'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    const {sender} = chatmsg

    const latestTPS = tpsarr[tpsarr.length - 1] ?? 20,
        size = tpsarr.length,
        avgTPS = tpsarr.reduce((a, b) => a + b, 0) / size,
        minTPS = Math.min(...tpsarr)

    sender.tellraw(`Server TPS: §a${latestTPS.toFixed(2)}§r (Average: §a${avgTPS.toFixed(2)}§r, Min: §a${minTPS.toFixed(2)}§r)`)
});

let stress = 0,
    tpsarr = []

world.events.tick.subscribe(({deltaTime}) => {
    const tps = 1 / deltaTime
    tpsarr.push(tps)
    tpsarr.splice(0, Math.max( ~~Math.min( tpsarr.length - tps, tpsarr.length - 1 ), 0) )
})
