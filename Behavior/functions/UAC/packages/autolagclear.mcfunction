execute @s ~~~ scoreboard players reset @s lagtimer

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

#player counter
scoreboard players reset playerdummy playercount
execute @a ~~~ scoreboard players add playerdummy playercount 1

#Extra stuff for TPS control
execute @s ~~~ execute @e[r=100,type=xp_orb] ~~~ tp @s[type=xp_orb] @p


#Syncs toggle for mining detection module

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
