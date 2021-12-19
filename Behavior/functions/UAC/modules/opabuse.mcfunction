#This actually keeps people from doing dmg in creative. using game bug.
#Yes I know weakness in theory  will nerf your damage. However, with strength, your hits won't even register on any mob.
execute @s[m=c,scores={opamtoggle=1}] ~~~ effect @s strength 30 255 true
execute @s[m=c,scores={opamtoggle=1}] ~~~ kill @e[type=splash_potion,r=5]
execute @s[m=c,scores={opamtoggle=1}] ~~~ kill @e[type=arrow,r=5]

#Disable the GodMode tool & vanish mode
execute @s[tag=staffstatus,scores={opamtoggle=1}] ~~~ tag @s remove tgmGodMode
execute @s[tag=staffstatus,scores={opamtoggle=1}] ~~~ scoreboard players reset @s tgmGodMode
execute @s[tag=staffstatus,scores={opamtoggle=1}] ~~~ tag @s remove spectate
execute @s[tag=staffstatus,scores={opamtoggle=1}] ~~~ scoreboard players reset @s vnsh

#Disable autototem
tag @s[tag=staffstatus,scores={opamtoggle=1}] remove totemaut
scoreboard players set @s[tag=staffstatus,scores={opamtoggle=1}] totemaut 0
scoreboard players set @s[tag=staffstatus,scores={opamtoggle=1}] totemtog 0

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
