scoreboard players add @a welcome 1
scoreboard objectives add welcome dummy welcome
execute @r[scores={welcome=120}] ~~~ playsound random.levelup @s ~~~ 2
title @r[scores={welcome=120}] title §¶§c§l► Unity Anti-Cheat v2.2 ◄
execute @r[scores={welcome=120}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §¶§bhas joined for the first time! Let's welcome them."}]}
tellraw @r[scores={welcome=120}] {"rawtext":[{"text":"§¶§cUAC §b► §bType the following to perform the help command"}]}
tellraw @r[scores={welcome=120}] {"rawtext":[{"text":"§¶§c► /function UAC/help"}]}
execute @r[scores={welcome=120}] ~~~ tellraw @r[scores={antiphasepmodule=1}] {"rawtext":[{"text":"§¶§cWARNING ► Anti-Phase §2Enabled§7! §bDo not enter the End or Nether"}]}
execute @r[scores={welcome=120}] ~~~ function UAC/asset/uac-init-asset
execute @r[scores={welcome=120}] ~~~ function UAC/asset/createdby
execute @r[scores={welcome=120}] ~~~ function UAC/asset/discord
execute @r[scores={welcome=120}] ~~~ function UAC/asset/version


execute @r[scores={welcome=120..121}] ~~~ function UAC/modules/permban


scoreboard players set @r[scores={welcome=121..999}] welcomed 1
execute @r[scores={welcomed=1}] ~~~ scoreboard players reset @s welcome
execute @r[scores={vipmodule=1}] ~~~ scoreboard objectives setdisplay sidebar vip

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
