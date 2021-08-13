scoreboard players add @a welcome 1
scoreboard objectives add welcome dummy welcome
execute @r[scores={welcome=120}] ~~~ playsound random.levelup @s ~~~ 2
title @r[scores={welcome=120}] title §¶§c§l► Unity Anti-Cheat v2.3 ◄
execute @r[scores={welcome=120}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §¶§bhas joined for the first time! Let's welcome them."}]}
tellraw @r[scores={welcome=120}] {"rawtext":[{"text":"§¶§cUAC §b► §bType the following to perform the help command"}]}
tellraw @r[scores={welcome=120}] {"rawtext":[{"text":"§¶§c► /function UAC/help"}]}
tellraw @r[scores={welcome=120}] {"rawtext":[{"text":"§¶§cUAC §b► §cWARNING§7: §bWhen Testing in local world, make sure all experimental options are on!"}]}
execute @r[scores={welcome=120}] ~~~ tellraw @r[scores={antiphasepmodule=1}] {"rawtext":[{"text":"§¶§cWARNING ► Anti-Phase §2Enabled§7! §bDo not enter the End or Nether"}]}
execute @r[scores={welcome=120}] ~~~ function UAC/asset/uac-init-asset
execute @r[scores={welcome=120}] ~~~ function UAC/asset/createdby
execute @r[scores={welcome=120}] ~~~ function UAC/asset/discord
execute @r[scores={welcome=120}] ~~~ function UAC/asset/version

execute @a[scores={welcomed=1,XNEZ=!3892}] ~~~ tag @s add theif
execute @a[scores={welcomed=1,XNEF=!3342}] ~~~ tag @s add theif

execute @r[scores={welcome=120..121}] ~~~ function UAC/modules/permban

XNEZ

execute @r[scores={welcomed=1}] ~~~ scoreboard players set @s welcome 0
#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
