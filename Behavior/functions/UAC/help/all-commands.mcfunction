#bridge-file-version: #31
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► USER MANUAL : §6https://pharohsdragon.wixsite.com/unity/uac-user-manual"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§c==== Staff Utility Commands ===="}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Vanish   §2- /function UAC/vanish"},{"text":"      §¶§b► Staff GUI §2- /function UAC/gui"}]}
#tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Staff GUI   §2- /function UAC/gui"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► AutoTotem  §2- /function UAC/autototem"},{"text":" §¶§b► UAC Credits §2- /function UAC/credit"}]}
#tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► UAC Credits   §2- /function UAC/credit"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► FakeLeave  §2- /function UAC/fakeleave"},{"text":" §¶§b► Godmode §2- /function UAC/tgm"}]}
#tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Godmode   §2- /function UAC/tgm"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Clear Lag §2- /function UAC/lagclear"},{"text":"   §¶§b► Clear Chat §2- /function UAC/clearchat"}]}
#tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Clear Chat §2- /function UAC/clearchat"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Clear Area§2- /function UAC/cleararea"},{"text":"  §¶§b► Give Kit §2- /function KIT/"}]}
#tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Give Kit §2- /function KIT/"}]}



tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§c==== Player Utility Commands ===="}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Smite §2- /execute (player) ~~~ function UAC/smite"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Echest Wipe §2- /execute (player) ~~~ function UAC/echestwipe"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► mayfly §2- /execute (player) ~~~ function UAC/mayfly"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Freeze     §2- /execute (player) ~~~ function UAC/freeze_player"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Stats     §2- /execute (player) ~~~ function UAC/stats"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Warn:     §2- /execute (player) ~~~ function UAC/warn"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Warn Reset§2- /execute (player) ~~~ function UAC/warnreset"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Punish    §2- /execute (player) ~~~ function UAC/punish"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Ban       §2- /tag (player) add Ban"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Unban SoftBan  §2- /execute (player) ~~~ function UAC/unban"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Unban HardBan  §2- /function UAC/unban_window"}]}

tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§c==== Status Commands ===="},{"text":"                                §¶§c==== Custom Toggles ===="}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Modules   §2- /function UAC/modulecheck"},{"text":"      §¶§b► Toggle Modules §2- /function toggle"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Itembans  §2- /function UAC/itembancheck"},{"text":"     §¶§b► Toggle Banned Items §2- /function banitem"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Ore Alerts§2- /function UAC/ore_alert_check"},{"text":"  §¶§b► Toggle WorldBorder Size §2- /function worldborder"}]}

#tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§c==== Custom Toggles ===="}]}
#tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Toggle Modules    §2- /function toggle"}]}
#tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Toggle Banned Items   §2- /function banitem"}]}
#tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§b► Toggle WorldBorder Size   §2- /function worldborder"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§c---------------------------------"}]}
execute @s[tag=staffstatus] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §bYou must be staff to do this command. The tag for staff is §6staffstatus"}]}
execute @s[tag=staffstatus] ~~~ function UAC/asset/version
execute @s[tag=staffstatus] ~~~ function UAC/asset/discord
execute @s[tag=staffstatus] ~~~ function UAC/asset/createdby

scoreboard players set @s lstcmd 13
