#Adds a tag for the enabled/disabled check
execute @r[scores={rsmtoggle=1}] ~~~ scoreboard players set @r RSM 1
execute @r[scores={rsmtoggle=0}] ~~~ scoreboard players set @r RSM 0
scoreboard players operation @r rsmtoggle = rsmtoggledummy rsmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
