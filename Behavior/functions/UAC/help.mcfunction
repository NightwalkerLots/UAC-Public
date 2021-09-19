#bridge-file-version: #31
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§c==== UAC Staff Commands (Caps Sensitive) ===="}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► USER MANUAL : §6https://pharohsdragon.wixsite.com/unity/uac-user-manual"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Stats     §2- /execute (player) ~~~ function UAC/stats"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Stats: §2Shows player's time played, warns, and current gamemode"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Warn:     §2- /execute (player) ~~~ function UAC/warn"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Warn Reset§2- /execute (player) ~~~ function UAC/warnreset"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Punish    §2- /execute (player) ~~~ function UAC/punish"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Punish:§2 This clears Inv and Echest then gives warning"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Ban       §2- /tag (player) add Ban"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Unban SoftBan  §2- /execute (player) ~~~ function UAC/unban"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Unban HardBan  §2- /function UAC/unban_window"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Unban HardBan: §2Hard Banned Players can Join the realm while window is open"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Clear Lag §2- /function UAC/lagclear"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Clear Area§2- /function UAC/cleararea"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Godmode   §2- /function UAC/tgm"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Give Kit   §2- /function KIT/"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Vanish   §2- /function UAC/vanish"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Modules   §2- /function UAC/modulecheck"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Itembans  §2- /function UAC/itembancheck"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§c==== Custom Toggles ===="}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Toggle Modules    §2- /function toggle"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Toggle Banned Items   §2- /function banitem"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Toggle WorldBorder Size   §2- /function worldborder"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§c---------------------------------"}]}
execute @s[tag=staffstatus] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §bYou must be staff to do this command. The tag for staff is §6staffstatus"}]}
execute @s[tag=staffstatus] ~~~ function UAC/asset/version
execute @s[tag=staffstatus] ~~~ function UAC/asset/discord
execute @s[tag=staffstatus] ~~~ function UAC/asset/createdby

scoreboard players set @s lstcmd 13
