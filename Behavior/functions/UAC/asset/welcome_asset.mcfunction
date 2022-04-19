playsound random.levelup @s ~~~ 2
title @s title §¶§c§l► Unity Anti-Cheat v2.5 ◄
tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §¶§bhas joined for the first time! Let's welcome them."}]}
tellraw @s {"rawtext":[{"text":"§¶§cUAC §b► §bfor help type §c/function UAC/help/all-commands"}]}
function UAC/asset/uac-init-asset


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide