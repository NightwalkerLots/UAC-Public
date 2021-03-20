#bridge-file-version: #31
tellraw @p[tag=staffstatus] {"rawtext":[{"text":"§¶§b==== UAC Staff Commands (Caps Sensitive) ===="}]}
tellraw @p[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Stats     §2- /execute (player) ~~~ function UAC/stats"}]}
tellraw @p[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Stats: §2Shows player's time played, warns, and current gamemode"}]}
tellraw @p[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Warn      §2- /execute (player) ~~~ function UAC/warn"}]}
tellraw @p[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Warn Reset§2- /execute (player) ~~~ function UAC/warnreset"}]}
tellraw @p[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Punish    §2- /execute (player) ~~~ function UAC/punish"}]}
tellraw @p[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Punish:§2 This clears Inv and Echest then gives warning"}]}
tellraw @p[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Ban       §2- /tag (player) add Ban"}]}
tellraw @p[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Unban     §2- /function UAC/unbanopen"}]}
tellraw @p[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Clear Lag §2- /function UAC/lagclear"}]}
tellraw @p[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Clear Area§2- /function UAC/cleararea"}]}
tellraw @p[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Show Rules§2- /function UAC/rules"}]}
tellraw @p[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Toggle    §2- /function toggle"}]}
tellraw @p[tag=staffstatus] {"rawtext":[{"text":"§¶§c---------------------------------"}]}
execute @s[tag=staffstatus] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @p[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §bYou must be staff to do this command. The tag for staff is §6staffstatus"}]}
execute @p[tag=staffstatus] ~~~ function UAC/asset/version
execute @p[tag=staffstatus] ~~~ function UAC/asset/discord
execute @p[tag=staffstatus] ~~~ function UAC/asset/createdby
