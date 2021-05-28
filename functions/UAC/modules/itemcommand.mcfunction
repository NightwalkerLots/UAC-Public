#Hotbar messages are in uac/modules/hotbarmessage


#Timer for home command
execute @s[scores={icmtoggle=1}] ~~~ scoreboard players remove @s[scores={hometp=1}] hometimer 1
execute @s[scores={hometimer=20}] ~~~ kill @s[scores={hometp=1}]
execute @s[scores={hometimer=45..50}] ~~~ gamerule doimmediaterespawn true
execute @s[scores={hometimer=45..50}] ~~~ gamerule keepinventory true
execute @s[scores={hometimer=1..15}] ~~~ gamerule keepinventory false
execute @s[scores={hometimer=1..15}] ~~~ gamerule doimmediaterespawn false
execute @s[scores={hometimer=1..5}] ~~~ scoreboard players set @s hometp 3
scoreboard players reset @s[scores={hometp=3}] hometimer

#Item Commands
execute @s[scores={icmtoggle=1}] ~~~ execute @e[r=7,type=item,name="spawn"] ~~~ execute @p ~~~ function UAC/itemcommand/spawntp
execute @s[scores={icmtoggle=1}] ~~~ execute @e[r=7,type=item,name="home"] ~~~ execute @p ~~~ function UAC/itemcommand/hometp
execute @s[scores={icmtoggle=1}] ~~~ execute @e[r=7,type=item,name="setspawn"] ~~~ execute @p ~~~ function UAC/itemcommand/setspawn
execute @s[scores={icmtoggle=1}] ~~~ execute @e[r=7,type=item,name="stats"] ~~~ execute @p ~~~ function UAC/itemcommand/playerstats


#Adds a tag for the enabled/disabled check
execute @s[scores={icmtoggle=1}] ~~~ scoreboard players set @s ICM 1
execute @s[scores={icmtoggle=0}] ~~~ scoreboard players set @s ICM 0
scoreboard players operation @s icmtoggle = icmtoggledummy icmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
