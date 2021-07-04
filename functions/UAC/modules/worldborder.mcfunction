#Adds a tag for the enabled/disabled check
execute @s[scores={wbmtoggle=1}] ~~~ scoreboard players set @s WBM 1
execute @s[scores={wbmtoggle=0}] ~~~ scoreboard players set @s WBM 0
scoreboard players operation @s wbmtoggle = wbmtoggledummy wbmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
