#Adds a tag for the enabled/disabled check
execute @r[scores={semtoggle=1}] ~~~ scoreboard players set @r SEM 1
execute @r[scores={semtoggle=0}] ~~~ scoreboard players set @r SEM 0
scoreboard players operation @r semtoggle = semtoggledummy semtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
