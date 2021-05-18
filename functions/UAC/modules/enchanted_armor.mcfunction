#Called apon every few seconds from `packages/autolagclear`

#Adds a tag for the enabled/disabled check
execute @s[scores={damtoggle=1}] ~~~ scoreboard players set @s DAM 1
execute @s[scores={damtoggle=0}] ~~~ scoreboard players set @s DAM 0
scoreboard players operation @s damtoggle = damtoggledummy damtoggle



#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
