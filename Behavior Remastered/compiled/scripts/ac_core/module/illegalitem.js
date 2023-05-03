import { GameMode, ItemStack, ItemTypes, MinecraftBlockTypes, Player, world } from "@minecraft/server";
import cc from "../../core/lib/cc.js";
import EventEmitter from "../../core/lib/event.js";
import message from "../../core/lib/message.js";
import { convertLocationType } from "../../core/lib/misc.js";
import permission from "../../core/lib/permission.js";
import server from "../../core/lib/server.js";
import { ModuleConfigParser } from "../lib/mcf.js";
import { kick } from "../lib/misc.js";
import { Module } from "../lib/module.js";
import banModule from "./ban.js";
import blacklistModule from "./blacklist.js";
class IllegalItemModuleConstructor extends Module {
    constructor() {
        super('illegalitem', 'Illegal Item', 'Controls banned item, max enchant levels, shulker scanner', {
            testBannedItem: true,
            bannedItem: Object.create(null),
            testMaxStack: true,
            maxStack: Object.create(null),
            stackSizeDefault: 64,
            testEnch: true,
            maxEnchLevels: Object.create(null),
            enchOverrides: Object.create(null),
            testNonEmptyContainer: true,
            automodAction: 'blacklist',
            automodDuration: 31_536_000_000,
            sanitizer: true,
            sanitizeList: []
        });
        this.configParser = new ModuleConfigParser(this.data, {
            'test-banned-item': {
                name: 'Test banned item',
                desc: 'Detects banned item',
                typeDesc: { type: 'boolean' },
                key: 'testBannedItem',
                type: cc.argumentParser.parseBoolean
            },
            'test-max-stack': {
                name: 'Test maximum stack',
                desc: 'Detects illegal item stack',
                typeDesc: { type: 'boolean' },
                key: 'testMaxStack',
                type: cc.argumentParser.parseBoolean
            },
            'test-ench': {
                name: 'Test enchantment',
                desc: 'Detects illegal enchantment',
                typeDesc: { type: 'boolean' },
                key: 'testEnch',
                type: cc.argumentParser.parseBoolean
            },
            'test-non-empty-container': {
                name: 'Test non-empty container',
                desc: 'Detects non-empty block container',
                typeDesc: { type: 'boolean' },
                key: 'testNonEmptyContainer',
                type: cc.argumentParser.parseBoolean
            },
            'sanitizer': {
                name: 'Sanitizer',
                desc: 'Removes malicious NBT data on use / place',
                typeDesc: { type: 'boolean' },
                key: 'sanitizer',
                type: cc.argumentParser.parseBoolean
            },
            'automod-default-action': {
                name: 'Automod default action',
                desc: 'Action for illegal enchantment, max stack, & items for unset action',
                typeDesc: { keyword: ['clear', 'warn', 'kick', 'ban', 'blacklist'] },
                key: 'automodAction',
                type: ['clear', 'warn', 'kick', 'ban', 'blacklist']
            },
            'automod-duration': {
                name: 'Automod duration',
                desc: 'Duration for automod (ban only)',
                typeDesc: { type: 'TimeFormat' },
                key: 'automodDuration',
                type: cc.argumentParser.parseTime
            },
        }),
            false;
    }
    events = new EventEmitter('Module (IllegalItem)');
    sanitizeListCache = new Set();
    // Test as player
    testAsPlayer(plr, item) {
        const itemTest = this.data.testBannedItem && this.testItem(item, creativeList.has(plr));
        if (itemTest)
            return this.action(plr, itemTest.action ?? this.data.automodAction, 'Banned item', `§7(Item: §2${item.id}§7)`) ? 2 : 1;
        const stackTest = this.data.testMaxStack && this.testMaxStack(item);
        if (stackTest)
            return this.action(plr, this.data.automodAction, 'Illegal stack', `§7(Item: §2${item.id}§7, Stack: §6${stackTest.stack}§7/§2${stackTest.max}§7)`) ? 2 : 1;
        const enchTest = this.data.testEnch && this.testEnch(item);
        if (enchTest)
            return this.action(plr, this.data.automodAction, 'Illegal enchantment', `§7(Item: §2${item.id}§7, Enchant: §2${enchTest.id}§7, Level: §6${enchTest.level}§7/§2${enchTest.enchMaxLvl}§7)`) ? 2 : 1;
        return 0;
    }
    // Test as item entity
    async testAsItemEntity(ent) {
        const item = ent.getComponent('item')?.itemStack;
        if (!item)
            return;
        const loc = convertLocationType('Array', ent.location), dim = ent.dimension;
        const [nearby] = dim.getPlayers({ closest: 1, location: ent.location, maxDistance: 5 });
        const fail = (detection, detail) => {
            message.sendMsgToAdmins(60, [
                `§3[§bUAC§3]§r [§e${this.name}§r] §cDropped ${detection}§r detected at ${loc.map(v => `§a${v.toFixed(1)}§r`).join(', ')} (§a${dim.id}§r)! ${detail}`,
                ` §8:§r Closest player: §d${nearby ? nearby.name + (permission.getPlayerLevel(nearby) >= 60 ? '§r ' + '§7(admin)' : '') : '§7<unknown>'}§r`
            ]);
            ent.kill();
        };
        const itemTest = this.data.testBannedItem && this.testItem(item);
        if (itemTest)
            return fail('Banned item', `§7(Item: §2${item.id}§7)`);
        const stackTest = this.data.testMaxStack && this.testMaxStack(item);
        if (stackTest)
            return fail('Illegal stack', `§7(Item: §2${item.id}§7, Stack: §6${stackTest.stack}§7/§2${stackTest.max}§7)`);
        // const enchTest = this.data.testEnch && this.testEnch(item)
        // if (enchTest) return fail('Illegal enchantment', `§7(Item: §2${item.id}§7, Enchant: §2${enchTest.id}§7, Level: §6${enchTest.level}§7/§2${enchTest.enchMaxLvl}§7)`)
        return 0;
    }
    // Tests
    testEnch(item) {
        const enchList = item.getComponent('enchantments').enchantments;
        const maxLvl = enchSlotLevels[enchList.slot] ?? Object.create(null);
        const overrideLvl = this.data.enchOverrides[item.id] ?? Object.create(null);
        for (const { level, type: { id } } of enchList) {
            const enchMaxLvl = overrideLvl[id] ?? maxLvl[id] ?? 0;
            if (level > enchMaxLvl)
                return {
                    id,
                    level,
                    enchMaxLvl
                };
        }
        return false;
    }
    testItem(item, hasCreative = false) {
        const banData = this.data.bannedItem[item.id];
        return !(!banData
            || banData.requireCreative && hasCreative) && banData;
    }
    testMaxStack(item) {
        const max = this.data.maxStack[item.id] ?? this.data.stackSizeDefault;
        return item.amount > max && { stack: item.amount, max };
    }
    testSanitize(item) {
        return this.sanitizeListCache.has(item.id) ? new ItemStack(ItemTypes.get(item.id), item.amount) : undefined;
    }
    // Action
    action(plr, action, detection, detail) {
        message.sendMsgToAdmins(60, `§3[§bUAC§3]§r [§e${this.name}§r] §c${detection}§r detected on §d${plr.name}§r! §7${detail}§r`);
        this.events.emit('action', {
            plr,
            action,
            detail,
            detection
        });
        const kickMsg = `§c${detection}§r detected §7${detail}§r`;
        switch (action) {
            case 'warn':
                plr.tell(`§e${detection} not allowed! §6${detail.replace(/§./g, '')}§e`);
                return false;
            case 'kick':
                message.sendMsgToAdmins(60, `§3[§bUAC§3]§r [§e${this.name}§r] §d${plr.name}§r has been §ekicked§r!`);
                kick(plr, kickMsg);
                return true;
            case 'ban':
                //message.sendMsgToAdmins(60, `§3[§bUAC§3]§r [§e${this.name}§r] §d${plr.name}§r has been §ebanned§r for §a${convertToTime(this.data.automodDuration)}§r!`)
                banModule.ban(plr, `§r[§e${this.name}§r]`, kickMsg, this.data.automodDuration);
                return true;
            case 'blacklist':
                //message.sendMsgToAdmins(60, `§3[§bUAC§3]§r [§e${this.name}§r] §d${plr.name}§r has been §eblacklisted§r!`)
                blacklistModule.add(plr, `§r[§e${this.name}§r]`, kickMsg);
                return true;
            default:
                return false;
        }
    }
}
const illegalItemModule = new IllegalItemModuleConstructor;
export default illegalItemModule;
// Creative
let creativeList = new WeakSet();
new server.interval(() => {
    creativeList = new WeakSet;
    for (const plr of world.getPlayers({ gameMode: GameMode.creative }))
        creativeList.add(plr);
}, 1000);
// Checker
server.addEventListener('tick', () => {
    if (!illegalItemModule.toggle)
        return;
    plrLoop: for (const plr of world.getPlayers()) {
        if (permission.getPlayerLevel(plr) >= 60)
            continue;
        const c = plr.getComponent('inventory').container;
        for (let i = 0, m = c.size; i < m; i++) {
            const item = c.getItem(i);
            if (!item)
                continue;
            const res = illegalItemModule.testAsPlayer(plr, item);
            if (res) {
                c.setItem(i, undefined);
                if (res == 2)
                    continue plrLoop;
            }
        }
    }
});
world.events.blockPlace.subscribe(({ player: plr, block }) => {
    const c = block.getComponent('inventory')?.container;
    if (!illegalItemModule.data.testNonEmptyContainer
        || !illegalItemModule.toggle
        || permission.getPlayerLevel(plr) >= 60
        || block.id === MinecraftBlockTypes.shulkerBox.id
        || block.id === MinecraftBlockTypes.undyedShulkerBox.id
        || !c)
        return;
    for (let i = Math.max(0, c.size - 27); i < c.size; i++) {
        for (let i = 0, m = c.size; i < m; i++) {
            const item = c.getItem(i);
            if (!item)
                continue;
            illegalItemModule.action(plr, illegalItemModule.data.automodAction, 'Non-empty container', `§7(Block: §2${block.id}§r, Location: §2${convertLocationType('Array', block.location).join(', ')}§7)`);
            for (let i = Math.max(0, c.size - 27); i < c.size; i++)
                c.setItem(i, undefined);
            break;
        }
    }
});
function testPlrItemUse(ev) {
    const { source: plr, item } = ev;
    if (!(illegalItemModule.toggle && plr instanceof Player && permission.getPlayerLevel(plr) < 60))
        return;
    const c = plr.getComponent('inventory').container, s = plr.selectedSlot;
    const res = illegalItemModule.testAsPlayer(plr, item);
    if (res) {
        ev.cancel = true;
        c.setItem(s, undefined);
        return;
    }
    const sanitize = illegalItemModule.data.sanitizer && illegalItemModule.testSanitize(item);
    if (sanitize) {
        ev.item = sanitize;
        c.setItem(s, sanitize);
    }
}
world.events.beforeItemUse.subscribe(testPlrItemUse);
world.events.beforeItemUseOn.subscribe(testPlrItemUse);
world.events.entitySpawn.subscribe(({ entity }) => illegalItemModule.testAsItemEntity(entity).catch(e => console.error(e)));
illegalItemModule.toggle = false;
const enchSlotCompatibles = (compatibleEnchantments) => {
    const obj = Object.create(null);
    for (const ench of compatibleEnchantments)
        Object.defineProperty(obj, ench, { get() { return illegalItemModule.data.maxEnchLevels[ench]; } });
    return obj;
};
const enchSlotLevels = {
    // None
    0: enchSlotCompatibles([]),
    // armorHead
    1: enchSlotCompatibles(["protection", "fireProtection", "blastProtection", "projectileProtection", "thorns", "respiration", "aquaAffinity", "unbreaking", "mending", "binding", "vanishing"]),
    // armorTorso
    2: enchSlotCompatibles(["protection", "fireProtection", "blastProtection", "projectileProtection", "thorns", "unbreaking", "mending", "binding", "vanishing"]),
    // armorFeet
    4: enchSlotCompatibles(["protection", "fireProtection", "featherFalling", "blastProtection", "projectileProtection", "thorns", "depthStrider", "unbreaking", "frostWalker", "mending", "binding", "vanishing", "soulSpeed"]),
    // armorLegs
    8: enchSlotCompatibles(["protection", "fireProtection", "blastProtection", "projectileProtection", "thorns", "unbreaking", "mending", "binding", "vanishing", "swiftSneak"]),
    // gArmor
    15: enchSlotCompatibles(["protection", "fireProtection", "featherFalling", "blastProtection", "projectileProtection", "thorns", "respiration", "depthStrider", "aquaAffinity", "unbreaking", "frostWalker", "mending", "binding", "vanishing", "soulSpeed"]),
    // sword
    16: enchSlotCompatibles(["sharpness", "smite", "baneOfArthropods", "knockback", "fireAspect", "looting", "unbreaking", "mending", "vanishing"]),
    // bow
    32: enchSlotCompatibles(["unbreaking", "power", "punch", "flame", "infinity", "mending", "vanishing"]),
    // hoe
    64: enchSlotCompatibles(["efficiency", "silkTouch", "unbreaking", "fortune", "mending", "vanishing"]),
    // shears
    128: enchSlotCompatibles(["efficiency", "silkTouch", "unbreaking", "mending", "vanishing"]),
    // flintsteel
    256: enchSlotCompatibles(["unbreaking", "mending", "vanishing"]),
    // axe
    512: enchSlotCompatibles(["sharpness", "smite", "baneOfArthropods", "efficiency", "silkTouch", "unbreaking", "fortune", "mending", "vanishing"]),
    // pickaxe
    1024: enchSlotCompatibles(["efficiency", "silkTouch", "unbreaking", "fortune", "mending", "vanishing"]),
    // shovel
    2048: enchSlotCompatibles(["efficiency", "silkTouch", "unbreaking", "fortune", "mending", "vanishing"]),
    // gDigging
    3648: enchSlotCompatibles(["sharpness", "smite", "baneOfArthropods", "efficiency", "silkTouch", "unbreaking", "fortune", "mending", "vanishing"]),
    // fishingRod
    4096: enchSlotCompatibles(["unbreaking", "luckOfTheSea", "lure", "mending", "vanishing"]),
    // carrotStick
    8192: enchSlotCompatibles(["unbreaking", "mending", "vanishing"]),
    // elytra
    16384: enchSlotCompatibles(["unbreaking", "mending", "binding", "vanishing"]),
    // spear
    32768: enchSlotCompatibles(["unbreaking", "mending", "vanishing", "impaling", "riptide", "loyalty", "channeling"]),
    // crossbow
    65536: enchSlotCompatibles(["unbreaking", "mending", "vanishing", "multishot", "piercing", "quickCharge"]),
    // shield
    131072: enchSlotCompatibles(["unbreaking", "mending", "vanishing"]),
    // gTool
    131520: enchSlotCompatibles(["efficiency", "silkTouch", "unbreaking", "fortune", "mending", "vanishing"]),
    // cosmeticHead
    262144: enchSlotCompatibles(["binding", "vanishing"]),
    // compass
    524288: enchSlotCompatibles(["binding", "vanishing"]),
    // warped fungus on a stick
    1048576: enchSlotCompatibles(["binding", "vanishing"]),
    // All
    "-1": enchSlotCompatibles(["protection", "fireProtection", "featherFalling", "blastProtection", "projectileProtection", "thorns", "respiration", "depthStrider", "aquaAffinity", "sharpness", "smite", "baneOfArthropods", "knockback", "fireAspect", "looting", "efficiency", "silkTouch", "unbreaking", "fortune", "power", "punch", "flame", "infinity", "luckOfTheSea", "lure", "frostWalker", "mending", "binding", "vanishing", "impaling", "riptide", "loyalty", "channeling", "multishot", "piercing", "quickCharge", "soulSpeed", "swiftSneak"])
};
