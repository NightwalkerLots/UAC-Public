playsound random.levelup @s ~~~ 2
title @s title §¶§c§l► §bUnity Anti-Cheat §7[ §22§7.§28§7.§29 §7] §c◄
scoreboard objectives add playercounter dummy
scoreboard players add 00player_counter00dummy playercounter 1
tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §¶§bis new! We're now at §6"},{"score":{"name":"00player_counter00dummy","objective":"playercounter"}},{"text":" §¶§bmembers."}]}
function UAC/asset/uac-init-asset


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide