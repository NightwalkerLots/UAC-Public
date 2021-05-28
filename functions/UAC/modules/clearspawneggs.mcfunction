#Adds a tag for the enabled/disabled check
execute @s[scores={semtoggle=1}] ~~~ scoreboard players set @s SEM 1
execute @s[scores={semtoggle=0}] ~~~ scoreboard players set @s SEM 0
scoreboard players operation @s semtoggle = semtoggledummy semtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
