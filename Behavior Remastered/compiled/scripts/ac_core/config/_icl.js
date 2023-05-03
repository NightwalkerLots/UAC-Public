import module from "../lib/module.js";
import uacStorage from "../lib/storage.js";
import chatModule from "../module/chat.js";
import combatModule from "../module/combat.js";
import crasherModule from "../module/crasher.js";
import gamemodeModule from "../module/gamemode.js";
import illegalItemModule from "../module/illegalitem.js";
import movementModule from "../module/movement.js";
import nukerModule from "../module/nuker.js";
import rbRelayModule from "../module/rbrelay.js";
import { bannedItemList } from "./banneditem.js";
import { chatConfig } from "./chat.js";
import { combatConfig } from "./combat.js";
import { crasherConfig } from "./crasher.js";
import { enchOverrideLevel, maxEnchLevel } from "./enchant.js";
import { gamemodeList } from "./gamemode.js";
import { illegalItemConfig } from "./illegalitem.js";
import { defaultMaxItemStack, maxItemStack } from "./maxstack.js";
import { moduleToggle } from "./modules.js";
import { movementConfig } from "./movement.js";
import { nukerConfig } from "./nuker.js";
import { disable_autosave_autoload } from "./other.js";
import { rbRelayConfig } from "./rbrelay.js";
import { sanitizeList } from "./sanitize.js";
for (const [k, v] of Object.entries(moduleToggle)) {
    const m = module.get(k);
    if (m)
        m.setToggle(v, '[Config]');
}
Object.assign(chatModule.data, chatConfig);
Object.assign(movementModule.data, movementConfig);
Object.assign(crasherModule.data, crasherConfig);
Object.assign(illegalItemModule.data, illegalItemConfig);
Object.assign(combatModule.data, combatConfig);
Object.assign(nukerModule.data, nukerConfig);
Object.assign(rbRelayModule.data, rbRelayConfig);
illegalItemModule.data.stackSizeDefault = defaultMaxItemStack;
Object.assign(illegalItemModule.data.bannedItem, bannedItemList);
Object.assign(illegalItemModule.data.maxEnchLevels, maxEnchLevel);
Object.assign(illegalItemModule.data.enchOverrides, enchOverrideLevel);
Object.assign(illegalItemModule.data.maxStack, maxItemStack);
illegalItemModule.sanitizeListCache = new Set(sanitizeList);
for (const [k, v] of Object.entries(gamemodeList).sort(([, { priority: a }], [, { priority: b }]) => b - a))
    gamemodeModule.listCache.set(k, { ...v, allowedGamemodes: new Set(v.allowedGamemodes) });
if (disable_autosave_autoload) {
    uacStorage.autoload = false;
    uacStorage.autosaveInterval = 0;
}
