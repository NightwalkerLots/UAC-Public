execute @s[scores={bbmtoggle=1}] ~~~ fill ~10 0 ~-10 ~-10 0 ~10 bedrock


#Adds a tag for the enabled/disabled check
execute @s[scores={bbmtoggle=1}] ~~~ scoreboard players set @s BBM 1
execute @s[scores={bbmtoggle=0}] ~~~ scoreboard players set @s BBM 0
scoreboard players operation @s bbmtoggle = bbmtoggledummy bbmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
