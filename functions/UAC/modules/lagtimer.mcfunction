#Automated LagClear 6minutes
scoreboard players add @r lagtimer 1
execute @r ~~~ execute @s[scores={lagtimer=50..9999999}] ~~~ function UAC/packages/autolagclear


#Adds a tag for the enabled/disabled check
execute @r[scores={ltmtoggle=1}] ~~~ scoreboard players set @r LTM 1
execute @r[scores={ltmtoggle=0}] ~~~ scoreboard players set @r LTM 0
scoreboard players operation @r ltmtoggle = ltmtoggledummy ltmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
