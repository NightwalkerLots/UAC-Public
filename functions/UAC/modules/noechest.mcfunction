execute @s[tag=!staffstatus,scores={nemtoggle=1}] ~ ~ ~ fill ~7 ~7 ~7 ~-7 ~-7 ~-7 air 0 replace ender_chest
clear @s[tag=!staffstatus,scores={nemtoggle=1}] ~~~ ender_chest


#Adds a tag for the enabled/disabled check
execute @s[scores={nemtoggle=1}] ~~~ scoreboard players set @s NEM 1
execute @s[scores={nemtoggle=0}] ~~~ scoreboard players set @s NEM 0
scoreboard players operation @s nemtoggle = nemtoggledummy nemtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
