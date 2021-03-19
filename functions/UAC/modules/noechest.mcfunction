execute @r[tag=!staffstatus,scores={nemtoggle=1}] ~ ~ ~ fill ~7 ~7 ~7 ~-7 ~-7 ~-7 air 0 replace ender_chest
clear @r[tag=!staffstatus,scores={nemtoggle=1}] ~~~ ender_chest


#Adds a tag for the enabled/disabled check
execute @r[scores={nemtoggle=1}] ~~~ scoreboard players set @r NEM 1
execute @r[scores={nemtoggle=0}] ~~~ scoreboard players set @r NEM 0
scoreboard players operation @r nemtoggle = nemtoggledummy nemtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
