#Adds a tag for the enabled/disabled check
execute @s[scores={rsmtoggle=1}] ~~~ scoreboard players set @s RSM 1
execute @s[scores={rsmtoggle=0}] ~~~ scoreboard players set @s RSM 0
scoreboard players operation @s rsmtoggle = rsmtoggledummy rsmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
