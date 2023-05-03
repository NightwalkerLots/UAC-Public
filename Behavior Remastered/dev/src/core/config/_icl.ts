//(also stands as integrated config loader)//

import cc from "../lib/cc.js";
import chat from "../lib/chat.js";
import { compability } from "../lib/compability.js";
import permission from "../lib/permission.js";
import role from "../lib/role.js";
import sdefault from "../lib/sdefault.js";
import { commandToggles, prefix } from "./cc.js";
import { chatGroups } from "./chat.js";
import { disable_autosave_autoload, disable_message_cancel, integrate_message_targets } from "./other.js";
import { permissionKeys, permissionOperatorLevel } from "./permission.js";
import { roles, role_format } from "./role.js";

//// CC ////

cc.prefix = prefix
for (const [k, v] of Object.entries(commandToggles)) {
    const c = cc.get(k)
    if (!c) continue
    
    c.enabled = v
}

//// CHAT GROUP ////

for (const { id, priority, tag_filter } of chatGroups) chat.group.create(id, priority, tag_filter)

//// PERMISSION ////

for (const [k, v] of Object.entries(permissionKeys))
    try { permission.set(k, v) }
    catch (e) { console.error(`[UAC ICL] ERR! Permission: ${e instanceof Error ? e.message : e}`) }
permission.opLevel = permissionOperatorLevel

//// ROLE ////

for (const { id, position, default_role, roles: rolelist } of roles) role.group.create(id, position, default_role, rolelist)

role.config.roleDivider = role_format.role_divider
role.config.messageFormat = role_format.message.format
role.config.nicknameFormat = role_format.nickname.format
role.config.nicknameFormatInterval = role_format.nickname.interval
role.config.nicknameFormatToggle = role_format.nickname.enabled

//// OTHER ////

if (disable_autosave_autoload) {
    sdefault.autoload = false
    sdefault.autosaveInterval = 0
}

compability.disableMessageCancel = disable_message_cancel
compability.integrateMessageTargets = integrate_message_targets
