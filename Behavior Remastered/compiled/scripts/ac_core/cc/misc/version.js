import cc from "../../../core/lib/cc.js";
cc.create('uac:version', {
    name: '[UAC] Version',
    description: 'Shows UAC version.',
    trigger: /^uac-?ver(sion)?$/i,
    execute: ({ log }) => {
        log([
            ' ',
            'UAC v3.0.0',
            'SE3 Framework v3.1.2 (customized)',
            ' ',
            'Credits:',
            ' §8:§r Lead Project: §aNightwalkerLots§r',
            ' §8:§r Lead Rewrite: §aFrostIce482§r',
            ' ',
            'For more information, join our Discord server:',
            '§aDiscord.gg/7Us7ER8WUw§r',
            ' ',
        ]);
    }
});
