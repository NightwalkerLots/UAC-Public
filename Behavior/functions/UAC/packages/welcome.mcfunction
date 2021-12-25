scoreboard players add @a welcome 1
scoreboard objectives add welcome dummy welcome
execute @a[scores={welcome=110..111}] ~~~ scoreboard objectives add has_gt dummy
execute @a[scores={welcome=110..111}] ~~~ scoreboard players set @s has_gt 0
execute @a[scores={welcome=120}] ~~~ playsound random.levelup @s ~~~ 2
title @a[scores={welcome=120}] title §¶§c§l► Unity Anti-Cheat v2.4 ◄
execute @a[scores={welcome=120}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §¶§bhas joined for the first time! Let's welcome them."}]}
tellraw @a[scores={welcome=120}] {"rawtext":[{"text":"§¶§cUAC §b► §bfor help type §c/function UAC/help"}]}
#tellraw @a[scores={welcome=120}] {"rawtext":[{"text":"§¶§cUAC §b► §cWARNING§7: §bWhen Testing in local world, make sure all experimental options are on!"}]}
execute @a[scores={welcome=120}] ~~~ function UAC/asset/uac-init-asset
execute @a[scores={welcome=120}] ~~~ function UAC/asset/createdby
execute @a[scores={welcome=120}] ~~~ function UAC/asset/discord
execute @a[scores={welcome=120}] ~~~ function UAC/asset/version

execute @a[scores={welcomed=1,XNEZ=!3892}] ~~~ tag @s add theif
execute @a[scores={welcomed=1,XNEF=!3342}] ~~~ tag @s add theif

execute @a[scores={welcome=120..121}] ~~~ function UAC/modules/permban

XNEZ

execute @a[scores={welcomed=1}] ~~~ scoreboard players set @s welcome 0
#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
