#Hotbar messages are in uac/modules/hotbarmessage


#Timer for home command
execute @r[scores={icmtoggle=1}] ~~~ scoreboard players remove @s[scores={hometp=1}] hometimer 1
execute @r[scores={hometimer=20}] ~~~ kill @s[scores={hometp=1}]
execute @r[scores={hometimer=45..50}] ~~~ gamerule doimmediaterespawn true
execute @r[scores={hometimer=45..50}] ~~~ gamerule keepinventory true
execute @r[scores={hometimer=1..10}] ~~~ gamerule keepinventory false
execute @r[scores={hometimer=1..10}] ~~~ gamerule doimmediaterespawn false
scoreboard players reset @r[scores={hometp=3}] hometimer

#Item Commands
execute @r[scores={icmtoggle=1}] ~~~ execute @e[r=7,type=item,name=spawn] ~~~ execute @p ~~~ function UAC/itemcommand/spawntp
execute @r[scores={icmtoggle=1}] ~~~ execute @e[r=7,type=item,name=home] ~~~ execute @p ~~~ function UAC/itemcommand/hometp
execute @r[scores={icmtoggle=1}] ~~~ execute @e[r=7,type=item,name=setspawn] ~~~ execute @p ~~~ function UAC/itemcommand/setspawn
execute @r[scores={icmtoggle=1}] ~~~ execute @e[r=7,type=item,name=stats] ~~~ execute @p ~~~ function UAC/itemcommand/playerstats


#Adds a tag for the enabled/disabled check
execute @r[scores={icmtoggle=1}] ~~~ scoreboard players set @r ICM 1
execute @r[scores={icmtoggle=0}] ~~~ scoreboard players set @r ICM 0
scoreboard players operation @r icmtoggle = icmtoggledummy icmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
