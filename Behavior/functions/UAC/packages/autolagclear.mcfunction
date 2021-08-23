execute @s ~~~ scoreboard players reset @s lagtimer
execute @s[tag=staffstatus,scores={rsmtoggle=1}] ~~~ function UAC/asset/random-spawn-asset

execute @s[scores={bbmtoggle=1}] ~~~ function UAC/modules/bottombedrock
#execute @s[scores={wbmtoggle=1}] ~~~ function UAC/modules/worldborder
execute @s[scores={ibmtoggle=1}] ~~~ function UAC/modules/itemban
execute @s[scores={ssmtoggle=1}] ~~~ function UAC/modules/staffstatus
execute @s[scores={nemtoggle=1},tag=!staffstatus] ~~~ function UAC/asset/echestdisable
function UAC/modules/enchanted_armor
function UAC/packages/bans
function UAC/modules/permban
function UAC/modules/ownerstatus
function UAC/asset/toggle_sync

#Extra stuff for TPS control
execute @s ~~~ execute @e[r=100,type=xp_orb] ~~~ tp @s[type=xp_orb] @p


#Syncs toggle for mining detection module
scoreboard players operation @s mdmtoggle = mdmtoggledummy mdmtoggle

#Syncs the Death Effect Toggle for everyone
scoreboard players operation @s Deathef = BDXdummy Deathef
scoreboard players operation @s dethtoggle = dethtoggledummy dethtoggle
scoreboard players operation @s osmtoggle = osmtoggledummy osmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
